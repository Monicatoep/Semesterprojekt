Vue.createApp({
    data() {
        return {
            stories: [
                { title: 'Story 1', description: 'This is the first story' },
                { title: 'Story 2', description: 'This is the second story' },
                { title: 'Story 3', description: 'This is the third story' },
                { title: 'Story 4', description: 'This is the fourth story' }
              ]
           
        }
    }
}).mount("#app")