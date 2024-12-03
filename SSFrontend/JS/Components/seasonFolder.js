const baseUrl = "http://localhost:5122/api/photos"

export default {
    props: ['season'],
    template: 
    /*html*/
    `
      <div>
        <h2>{{ season.title }}</h2>
        <p>{{ season.description }}</p>
        
        <button v-on:click="getAllPhotos" class="btn btn-primary">Get all Photos</button>
        
        <ul id="photoslist" v-if="photos.length">
            <li v-for="photo in photos">
                {{ photo.phototemp }} {{ photo.photoseason }} {{ photo.uploadedimage }}
            </li>
        </ul>

        <div v-else>No Photos</div>
        <button id="backButton" class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
        <button id="addButton" class="btn btn-secondary" @click="$emit('show-add-page', season)">Tilføj</button>
      </div>
    `,

    data() {
      return {
          photos: [],
      }
   },

    methods: {
      getAllPhotos() {
          this.helperGetAndShow(baseUrl)
      },
      async helperGetAndShow(url) { 
          try {
              const response = await axios.get(url)
              this.photos = await response.data
          } catch (ex) {
              alert(ex.message) 
          }
      }
    }
  };