const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api"
//const baseUrl = "http://localhost:5122/api"; // Local testing, change to your own localhost

export default {
  props: ['season'],
  template:
    /*html*/
    `
    <h1 class="text-center mt-4">Tilføj dine minder</h1>
    <h2 class="text-center">{{ season.title }}</h2>

    <div>
    <label class="header-large">Vælg temperatur:</label>
    <div class="temperature-grid">
      <div v-for="temp in temperatureIntervals" :key="temp.value" class="temperature-item">
        <input 
          type="radio" 
          :id="'temp-' + temp.value" 
          :value="temp.value" 
          v-model="addData.temperature" 
        />
        <label :for="'temp-' + temp.value">{{ temp.name }}</label>
      </div>
    </div>
  </div>
  
  <br>
  
  <div class="form-group d-flex align-items-center mb-3">
    <label for="formFile" class="header-large me-0">Vælg billede:</label>
    <input 
    ref="fileInput"  
      class="form-control" 
      type="file" 
      id="formFile" 
      @change="onUpload" 
    />
  </div>
  <br>
  <button id="uploadButton" class="btn btn-primary" @click="addPhoto">Upload Foto</button>
  


      <p id="outputMessage" v-if="addMessage">{{ addMessage }}</p>
      <!-- Pop-up modal -->
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup">
          <p>{{ popupMessage }}</p>
          <button class="btn btn-secondary" @click="closePopup">OK</button>
        </div>
      </div>
    <button id="backButton" class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
  `,

  data() {
    return {
      addData: { temperature: 0, season: this.season.value },
      selectedFile: null,
      addMessage: '',
      showPopup: false,
      popupMessage: "",
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
    
    resetForm() {
      this.addData = { temperature: 0 };  // Nulstil addData
      this.selectedFile = null;  // Fjern valgt billede

      // Nulstil file input-feltet
    this.$nextTick(() => {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';  // Nulstil file input
      }
    });
    },
    async addPhoto() {
      if (!this.selectedFile) {
        this.showPopupMessage("Der mangler at blive valgt et billede.");
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
        this.showPopupMessage("Der skete en fejl under upload af filen.");
        return;
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
        this.showPopupMessage(`Succes: Billedet er uploadet`);
          // Nulstil formularen efter upload
        this.resetForm();
      } catch (error) {
        console.error("Upload error:", error);
        this.showPopupMessage(
      `Fejl: Der opstod en fejl ved upload.${error.message}`);
      }
    },

    onUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
        this.showPopupMessage = "No file selected.";
      }
    },
    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },

    closePopup() {
      this.showPopup = false;
      this.popupMessage = "";
  },
},
};
