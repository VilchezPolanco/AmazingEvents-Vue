const {createApp} = Vue 
const app = createApp({
    data(){
        return{
            arrayEventos: [],
            inputSearch:``,
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
            console.log (this.arrayEventos)

            /*Filtra por categoria */
            const category = this.arrayEventos.map (evento => evento.category) //me devuelve la categoria
            let setInfo = Array.from(new Set (category)) //no me da valores duplicados y me devuelve el primero y lo vuelve a hacer array
            this.arrayCategory= setInfo
        })
        .catch(error =>console.log(error))
    },

    methods:{

    },

    computed:{
        /*filtra si category tiene eventos guardados */
        filtro (){
            this.eventosFiltrados= this.arrayEventos.filter(evento =>evento.name.toLowerCase().includes(this.inputSearch.toLowerCase())
            && (this.chequeados.includes(evento.category)|| this.chequeados.length ==0))
        }
    },

})
app.mount("#app")