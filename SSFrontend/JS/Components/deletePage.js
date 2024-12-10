const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/photos"
//const baseUrl = "http://localhost:5122/api"; // Local testing, change to your own localhost

export default {
    props: {
      photo: {
        type: Object,
        required: true, // Ensure the photo prop is provided
      },
    },
    
    template: 
    /*html*/
    `
      <div class="card p-4 text-center">
        <h5>Er du sikker på du vil slette billedet?</h5>
        <img :src="photo.uploadedImage" class="card-img-top" alt="Photo" />
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" @click="$emit('go-back')">Fortryd</button>
          <button id="deleteButton" class="btn btn-danger" @click="(deletePhoto(photo.id))">Slet</button>
        </div>
      </div>
    `,
  

  methods: {
    async deletePhoto(deleteId) {
        const url = baseUrl + "/" + deleteId
        await axios.delete(url)
        this.$emit('go-back');
      }
    }
};
  

