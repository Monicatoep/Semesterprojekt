import SeasonList from './Components/seasonList.js';
import SeasonFolder from './Components/seasonFolder.js';

const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"

  Vue.createApp({
    components: {
      SeasonList,
      SeasonFolder
    },
    data() {
      return {
        currentComponent: 'SeasonList', // Start with the SeasonList component
        seasons: [
          { title: 'Forår', description: '' },
          { title: 'Sommer', description: '' },
          { title: 'Efterår', description: '' },
          { title: 'Vinter', description: '' }
        ],
        selectedSeason: null, // For storing the selected season
        addData: {}
      };
    },
    methods: {
      showFolder(season) {
        this.selectedSeason = season;
        this.currentComponent = 'SeasonFolder';
      },
      goBack() {
        this.selectedSeason = null;
        this.currentComponent = 'SeasonList';
      },
      addPhoto(){

      }
    }
  }).mount('#app');
  