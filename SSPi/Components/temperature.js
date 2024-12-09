const baseUrl = "https://seasonalstoryrest.azurewebsites.net/api/temperatures";
export default {
        template:
      /*html*/
      `
      
      `,
  
    data() {
      return {
       
        temperature  : Object,
      };
    }, 
    methods: {
      async helperGetAndShow() {
        try {
        
          const response = await axios.get(baseUrl + "/get-latest");
          this.temperature = response.data;
        } catch (ex) {
          alert(ex.message);
        }
      }
 
    },
    mounted() {
        this.helperGetAndShow();
      }
    };