import photo from './Components/photo.js';
import temperature from './Components/temperature.js';
const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"

  Vue.createApp({
    components: {
      photo,
      temperature
    },
    data() {
      
    },
  }).mount('#app');