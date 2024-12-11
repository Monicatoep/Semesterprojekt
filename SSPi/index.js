import photo from './Components/photo.js';

const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/temperatures"

  Vue.createApp({
    components: {
      photo,
      
    },
    data() {
        return {
       
            temperature  : {},
          };
      
    },    methods: {
        async helperGetAndShow() {
          try {
          
            const response = await axios.get(baseUrl + "/get-latest");
            this.temperature = response.data;
          } catch (ex) {
            alert(ex.message);
          }
        }
   
      },
      mounted() {
          this.helperGetAndShow();
          setInterval(() => this.helperGetAndShow(),10000)
        }
  }).mount('#app');