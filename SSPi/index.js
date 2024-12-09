import photo from './Components/photo.js';
const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"

  Vue.createApp({
    components: {
      photo
    },
    data() {
      return {
        currentComponent: 'photo'
      };
    },
  }).mount('#app');