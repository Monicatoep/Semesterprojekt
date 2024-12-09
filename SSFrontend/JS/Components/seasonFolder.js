export default {
  props: ['season'],
  template:
    /*html*/
    `
      <div>
      <h2 class="text-center">{{ season.title }}</h2>
      <p>{{ season.description }}</p>
      
      <div class="Button-container"> 
        <button id="backButton" class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
        <button id="addButton" class="btn btn-secondary" @click="$emit('show-add-page', season)">Tilføj</button>
      </div>

        <div class="container mt-4">
          <div class="row">
            <!-- Loop through filtered photos and create a card for each -->
            <div class="col-lg-3 col-md-6 mb-4" v-for="photo in filteredPhotos" :key="photo.id">
              <div class="card-season">
                <img :src="photo.uploadedImage" class="card-img-top" alt="Photo" />
                <div class="card-body">
                  <!--<h5 class="card-title">Sæson: {{ getSeasonName(photo.photoSeason) }}</h5>-->
                  <p class="card-text">Temperaturinterval: {{ getTemperatureName(photo.photoTemp) }}</p>
                  <button id="showDeletePageButton" class="btn btn-danger" @click="$emit('show-delete-page', photo)">Slet</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    `,

  data() {
    return {
      photos: [], // Unfiltered photos fetched from the API
      // Define the mappings for Temperature and Season enums
      temperatureEnum: {
        0: "Under 0°C",
        1: "0-12°C",
        2: "13-18°C",
        3: "19-23°C",
        4: "24-30°C",
        5: "Over 30°C"
      },
      seasonEnum: {
        0: "Sommer",
        1: "Efterår",
        2: "Vinter",
        3: "Forår"
      }
    };
  },

  computed: {
    filteredPhotos() {
      // Filter photos where the season matches the current folder's season
      return this.photos.filter(photo => photo.photoSeason === this.season.value);
    }
  },

  methods: {
    async helperGetAndShow(url) {
      try {
        const response = await axios.get(url);
        this.photos = response.data; // Populate photos array with data from API
      } catch (ex) {
        alert(ex.message);
      }
    },
    getTemperatureName(value) {
      // Map temperature enum value to name
      return this.temperatureEnum[value] || "Unknown";
    },
    getSeasonName(value) {
      // Map season enum value to name
      return this.seasonEnum[value] || "Unknown";
    }
    
  },

  // Call getAllPhotos when the component is mounted
  mounted() {
    const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"; 
    //const baseUrl = "http://localhost:5122/api/photos"; // Local testing, change to your own localhost
    this.helperGetAndShow(baseUrl);
  }
  

};
