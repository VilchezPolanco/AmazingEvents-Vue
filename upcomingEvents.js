const {createApp} = Vue
const app = createApp( {
    data(){
        return {
            arrayEventos: [],
            inputSearch:"",
            eventosFiltradosPast:[],
            arrayCategory:[],
            chequeados:[],
            eventosFiltrados:[],
        }
    },

    created(){
        
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
        .then(res => res.json())
        .then(data =>{
            this.arrayEventos = data.events
            this.eventosFiltradosPast = this.arrayEventos.filter(evento => evento.date > data.currentDate)
            
             /*Filtra por categoria */
             const category = this.arrayEventos.map (evento => evento.category) //me devuelve la categoria
             let setInfo = Array.from(new Set (category)) //no me da valores duplicados y me devuelve el primero y lo vuelve a hacer array
             this.arrayCategory= setInfo
        })
        .catch(error =>console.error(error))
    },

    methods:{

    },

    computed:{

        filtro (){
            this.eventosFiltrados = this.eventosFiltradosPast.filter(evento =>evento.name.toLowerCase().includes(this.inputSearch.toLowerCase())
            && (this.chequeados.includes(evento.category)|| this.chequeados.length ==0))
        }
    },

})
app.mount(`#app`)