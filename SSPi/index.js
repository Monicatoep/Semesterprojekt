import photo from './Components/photo.js';

const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/temperatures"

  Vue.createApp({
    components: {
      photo,
      
    },
    data() {
        return {
       
            temperature  : {},
            currentTime : "",
             currentDate: "",
          };
      
    },    methods: {
        async helperGetAndShow() {
          try {
          
            const response = await axios.get(baseUrl + "/get-latest");
            this.temperature = response.data;
          } catch (ex) {
            alert(ex.message);
          }
        },
        updateTimeAndDate() {
          const now = new Date();
          this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Time uden sekunder
          this.currentDate = now.toLocaleDateString(); // Format date
        }
   
      },
      mounted() {
          this.helperGetAndShow();
          setInterval(() => this.helperGetAndShow(),10000);
        
          this.updateTimeAndDate(); // Initial call
          setInterval(() => {
            this.updateTimeAndDate();
          }, 1000); // Update every second
      },        
  }).mount('#app');