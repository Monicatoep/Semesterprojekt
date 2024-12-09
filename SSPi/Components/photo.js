const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos";
export default {
        template:
      /*html*/
      `
      <div class="photo">
      <img :src="selectedPhoto.uploadedImage" class="card-img-top" alt="Photo" />
      </div>
      `,
  
    data() {
      return {
        photos: [],
        selectedPhoto  : Object,
        counter: 0
      };
    }, 
    methods: {
      async helperGetAndShow() {
        try {
        this.counter = 0
          const response = await axios.get(baseUrl);
          this.photos = response.data;
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