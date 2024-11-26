import SeasonList from './Components/seasonList.js';
import SeasonFolder from './Components/seasonFolder.js';
  
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
        selectedSeason: null // For storing the selected season
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
      }
    }
  }).mount('#app');
  