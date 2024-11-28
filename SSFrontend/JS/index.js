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
        // addData: { selectedFile: null, temperature: 0, season: selectedSeason },
        // temperatureIntervals: [
        //   {name: "Under 0°C", value: 0},
        //   {name: "0-12°C", value: 1},
        //   {name: "13-18°C", value: 2},
        //   {name: "19-23°C", value: 3},
        //   {name: "24-30°C", value: 4},
        //   {name: "Over 30°C", value: 5},
        // ]
      };
    },
    methods: {
      showFolder(season) {
        this.selectedSeason = season;
        this.currentComponent = 'SeasonFolder';
      },
      showAddPage() {
        this.currentComponent = 'AddPhoto';
      },
      goBack() {
        this.selectedSeason = null;
        this.currentComponent = 'SeasonList';
      },
      async addPhoto() {
        try {
          this.addData.selectedFile = this.onUpload()
          response = await axios.post(baseUrl, this.addData)
          this.addMessage = "response " + response.status + " " + response.statusText
        } catch (ex) {
          alert(ex.message)
        }
      },
      onFileSelected (event) {
        this.selectedFile = event.target.files[0]
        this.url = URL.createObjectURL(this.selectedFile)
      },
      onUpload () {
        const fd = new FormData()
        fd.append('image', this.selectedFile)
        axios.post(baseUrl, fd, {
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + ' %')
          }
        })
          .then(res => {
            console.log(res)
          })
      }, 
      selectTemp () {

      }
    }
  }).mount('#app');
  