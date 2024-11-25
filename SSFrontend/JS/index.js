const SeasonList = {
    props: ['seasons'],
    template: `
      <div class="row">
        <div class="col-md-6 mb-4" v-for="season in seasons" :key="season.title">
          <div class="card" style="width: 100%;">
            <div class="card-body">
              <h5 class="card-title">{{ season.title }}</h5>
              <p class="card-text">{{ season.description }}</p>
              <button class="btn btn-primary" @click="$emit('show-folder', season)">Se mappe</button>
            </div>
          </div>
        </div>
      </div>
    `
  };
  
  const SeasonFolder = {
    props: ['season'],
    template: `
      <div>
        <h2>{{ season.title }}</h2>
        <p>{{ season.description }}</p>
        <button class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
      </div>
    `
  };
  
  Vue.createApp({
    components: {
      SeasonList,
      SeasonFolder
    },
    data() {
      return {
        currentComponent: 'SeasonList', // Start with the SeasonList component
        seasons: [
          { title: 'Forår', description: 'Historier om foråret' },
          { title: 'Sommer', description: 'Historier om sommeren' },
          { title: 'Efterår', description: 'Historier om efteråret' },
          { title: 'Vinter', description: 'Historier om vinteren' }
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
  