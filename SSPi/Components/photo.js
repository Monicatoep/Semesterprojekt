const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos";
export default {
   props : {
        temperature :{
            type: Object,
            required: true,
        }
   },
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
        selectedPhoto  : {uploadedImage :'https://zealandscience.s3.eu-west-1.amazonaws.com/staticphotos/DefaultSeasonalStory.png'},
        counter: 0,
       tempString :"test"
      };
    }, 
    methods: {
        async waitForTemperature() {
            // Vent, indtil temperature.value er defineret
            while (!this.temperature || typeof this.temperature.value === "undefined") {
              await new Promise(resolve => setTimeout(resolve, 10000)); // Vent 100ms
            }
        },
      async helperGetAndShow() {
        try {
            await this.waitForTemperature();
        this.counter = 0

          const response = await axios.get(baseUrl+"?seasonEnabled=enable&temperatureInterval="
                                          +this.temperature.value.toString() , 
                                          {validateStatus: function(status) {return status < 500}});
          if (response.status === 404) {
          this.selectedPhoto.uploadedImage = 'https://zealandscience.s3.eu-west-1.amazonaws.com/staticphotos/NoPhotosSeasonalStory.png';
          }
          else {
          this.photos = response.data;
          this.selectedPhoto = this.photos[0]
          }
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
      //setInterval(() => {
        this.helperGetAndShow().then(() => {
          if (this.photos.length > 0) {
            setInterval(() => {
              this.slideshow(); // Start slideshowet og skift hvert 10. sekund
            }, 2000); // 10000 ms = 10 sekunder
          }
          setInterval(()=> this.helperGetAndShow(),10000)
        });
      //}, 60000); 
      }
    };