const {createApp} = Vue
const app = createApp({
    data(){
        return {
           info:[],
           idParam:null
        }
    },

    created(){
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
        .then(res => res.json())
        .then(data =>{
          this.info = data.events

            /* te deja usar los metodos de location */
          const params = new URLSearchParams(location.search)
            /* uno de los metodos get para capturar el id*/
          this.idParam = parseInt(params.get(`_id`))
        })
        .catch(error => console.log(error))
    },

    computed:{
        filtrarPorId(){
            return this.info.filter(evento => evento._id === this.idParam)
        }
    },

})
app.mount("#app")