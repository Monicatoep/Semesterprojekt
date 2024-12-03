// const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"
const baseUrl = "http://localhost:5122/api/photos"; // Local testing, change to your own localhost

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

      const fd = new FormData();
      
      fd.append("UploadedImage", this.selectedFile);
      fd.append("PhotoSeason", this.addData.season);
      fd.append("PhotoTemp", this.addData.temperature);

      try {
        const response = await axios.post(baseUrl, fd, {
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
