export default {
    props: ['seasons'],
    template: 
    /*html*/
    `
    <h1 class="text-center mt-4">Velkommen til Seasonal Stories!</h1>
      <div class="row">
        <div class="col-md-6 mb-4" v-for="season in seasons" :key="season.title">
          <div class="card border-0 text-center" style="width: 100%;">
            <div class="card-body" style="background-color: #FFECC8;">
              <h5 id="title" class="card-title">{{ season.title }}</h5>
              <p class="card-text">{{ season.description }}</p>
              <img id="image" src="folderimage.png" style="cursor: pointer;" @click="$emit('show-folder', season)">
            </div>
          </div>
        </div>
      </div>
    `
  };
  