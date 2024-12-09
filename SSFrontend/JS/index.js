import SeasonList from './Components/seasonList.js';
import SeasonFolder from './Components/seasonFolder.js';
import AddPage from './Components/addPage.js';
import DeletePage from './Components/deletePage.js';


const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"

  Vue.createApp({
    components: {
      SeasonList,
      SeasonFolder, 
      AddPage,
      DeletePage
    },
    data() {
      return {
        currentComponent: 'SeasonList', // Start with the SeasonList component
        seasons: [
          { title: 'Sommer', value: 0 },
          { title: 'Efterår', value: 1 },
          { title: 'Vinter', value: 2 },
          { title: 'Forår', value: 3 }
        ],
        selectedSeason: null // For storing the selected season
      };
    },
    methods: {
      showFolder(season) {
        this.selectedSeason = season;
        this.currentComponent = 'SeasonFolder';
      },
      showAddPage() {
        this.currentComponent = 'AddPage';
      },
      goBack() {
        this.selectedSeason = null;
        this.currentComponent = 'SeasonList';
      },
      showDeletePage(photo){
        this.selectedPhoto = photo
        this.currentComponent = 'DeletePage';
      }
    }
  }).mount('#app');