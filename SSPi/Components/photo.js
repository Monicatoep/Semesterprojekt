const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos";
export default {
        template:
      /*html*/
      `
        <div>
          
          
          <div class="container mt-4">
            <div class="row">
              <!-- Loop through filtered photos and create a card for each -->
              <div class="col-lg-3 col-md-6 mb-4" v-for="photo in photos" :key="photo.id">
                <div class="card">
                  <img :src="photo.uploadedImage" class="card-img-top" alt="Photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
  
    data() {
      return {
        photos: [], // Unfiltered photos fetched from the API
        
      };
    },
  
    computed: {

    },
  
    methods: {
      async helperGetAndShow() {
        try {
          const response = await axios.get(baseUrl);
          this.photos = response.data; // Populate photos array with data from API
        } catch (ex) {
          alert(ex.message);
        }
      }
  
      
    },
  
    // Call getAllPhotos when the component is mounted
    mounted() {
       
      //const baseUrl = "http://localhost:5122/api/photos"; // Local testing, change to your own localhost
      this.helperGetAndShow(baseUrl);
    }
  };




