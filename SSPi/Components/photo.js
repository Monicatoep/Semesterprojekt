const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos";
export default {
        template:
      /*html*/
      `
                  <img :src="selectedPhoto.uploadedImage" class="card-img-top" alt="Photo" />
 
      `,
  
    data() {
      return {
        photos: [], // Unfiltered photos fetched from the API
        selectedPhoto  : Object,
        counter: 0
      };
    },
  
    computed: {

    },
  
    methods: {
      async helperGetAndShow() {
        try {
        this.counter = 0
          const response = await axios.get(baseUrl);
          this.photos = response.data; // Populate photos array with data from API
          this.selectedPhoto = this.photos[0]
        } catch (ex) {
          alert(ex.message);
        }
      },
      slideshow(){
        
            this.selectedPhoto = this.photos[this.counter++]
            if (this.counter > this.photos.length-1)
                this.counter = 0
            
        }

      
  
      
    },
  
    // Call getAllPhotos when the component is mounted
    mounted() {
        this.helperGetAndShow().then(() => {
          if (this.photos.length > 0) {
            setInterval(() => {
              this.slideshow(); // Start slideshowet og skift hvert 10. sekund
            }, 10000); // 10000 ms = 10 sekunder
          }
        });
      }
    };

