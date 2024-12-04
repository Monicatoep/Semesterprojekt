//const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api"
const baseUrl = "http://localhost:5122/api"; // Local testing, change to your own localhost

export default {
  props: ['season'],
  template:
    /*html*/
    `
    <label>Vælg temperatur:</label>
    <div v-for="temp in temperatureIntervals" :key="temp.value">
      <input 
        type="radio" 
        :id="'temp-' + temp.value" 
        :value="temp.value" 
        v-model="addData.temperature" 
      />
      <label :for="'temp-' + temp.value">{{ temp.name }}</label>
    </div>
  </div>

  <label>Vælg billede:</label>
      <div class="mb-3">
        <label for="formFile" class="form-label"></label>
        <input 
          class="form-control" 
          type="file" 
          id="formFile" 
          @change="onUpload" 
        />
      </div>
      
      <button class="btn btn-primary" @click="addPhoto">Upload Foto</button>
      <p v-if="addMessage">{{ addMessage }}</p>
    </div>
    <button id="backButton" class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
  `,

  data() {
    return {
      addData: { temperature: 0, season: this.season.value },
      selectedFile: null,
      addMessage: '',
      temperatureIntervals: [
        { name: "Under 0°C", value: 0 },
        { name: "0-12°C", value: 1 },
        { name: "13-18°C", value: 2 },
        { name: "19-23°C", value: 3 },
        { name: "24-30°C", value: 4 },
        { name: "Over 30°C", value: 5 }
      ]
    };
  },

  methods: {
    async addPhoto() {
      if (!this.selectedFile) {
        this.addMessage = "Der mangler at blive valgt et billede.";
        return;
      }

      //Var with 4 random letters
      //We need to add this to the image name to make it unique
      const randomLetter = Math.random().toString(36).substring(7);
      //Adding v1/ to the image name to make it easier to identify files in the bucket. 
      //We can update this to v2/ if we want to clean old files from the bucket easily by deleting the folder.
      const randomFileName = "v1/" + randomLetter + this.selectedFile.name;

      try {
        // Step 1: Request a pre-signed URL from the backend using just the file name and type
        const { data } = await axios.get(baseUrl + "/s3/get-presigned-url", {
          params: {
            fileName: randomFileName,
            fileType: this.selectedFile.type,
          },
        });

        const presignedUrl = data.url;

        // Step 2: Upload the whole image file directly to S3
        await axios.put(presignedUrl, this.selectedFile, {
          headers: {
            "Content-Type": this.selectedFile.type,
          },
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      const fd = new FormData();
      //The link that the image is accessible from after uploading to S3 is added to the form data
      fd.append("UploadedImage", "https://zealandscience.s3.eu-west-1.amazonaws.com/" + randomFileName);
      fd.append("PhotoSeason", this.addData.season);
      fd.append("PhotoTemp", this.addData.temperature);

      try {
        const response = await axios.post(baseUrl + "/photos", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.addMessage = `Response: ${response.status} ${response.statusText}`;
      } catch (error) {
        this.addMessage = `Error: ${error.message}`;
        console.error("Upload error:", error);
      }
    },

    onUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
        this.addMessage = "No file selected.";
      }
    }
  }
};
