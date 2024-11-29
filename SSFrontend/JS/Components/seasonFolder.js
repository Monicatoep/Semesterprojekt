export default {
    props: ['season'],
    template: `
      <div>
        <h2>{{ season.title }}</h2>
        <p>{{ season.description }}</p>
        <button id="backButton" class="btn btn-secondary" @click="$emit('go-back')">Tilbage</button>
        <button id="addButton" class="btn btn-secondary" @click="$emit('show-add-page', season)">Tilføj</button>
      </div>
    `
  };
  