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
        updateTime(){
          const now = new Date();
          this.currentTime = now.toLocaleTimeString(); //formate time to string
        }
   
      },
      mounted() {
          this.helperGetAndShow();
          setInterval(() => this.helperGetAndShow(),10000);
        
        this.updateTime(); //initial call time
        setInterval(() => {
          this.updateTime();
        }, 1000);
      },        
  }).mount('#app');