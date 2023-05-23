const { createApp } = Vue
const app = createApp({

    data() {
        return {
            arrayEventos: [],
            eventsPastFilter: [],
            eventsUpcomingFilter: [],
            asistencia: "",
            eventoMenorAsistencia: "",
            eventoMayorCapacidad: "",
            categoriasFiltradas: [],
            tablaUpcoming: "",
            tablaPast: "",
        }
    },

    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(res => res.json())
            .then(data => {
                this.arrayEventos = data.events

                this.eventsPastFilter = this.arrayEventos.filter(evento => evento.date < data.currentDate)
                this.eventsUpcomingFilter = this.arrayEventos.filter(evento => evento.date > data.currentDate)

                this.asistencia = this.mayorAsistencia(this.eventsPastFilter)
                this.eventoMenorAsistencia = this.menorAsistencia(this.eventsPastFilter)
                this.eventoMayorCapacidad = this.mayorCapacidad(this.arrayEventos)

                this.categorias = this.arrayEventos.map(evento => evento.category)
                this.categoriasFiltradas = [...new Set(this.categorias)]

                this.tablaUpcoming = this.imprimirtablaUpcoming(this.eventsUpcomingFilter)
                this.tablaPast= this.imprimirtablaPast(this.eventsPastFilter)
            })
            .catch(error => console.log(error))

    },

    methods: {
        mayorAsistencia(eventsPastFilter) {
            let mayor = 0
            let mayorEvento
            for (let evento of eventsPastFilter) {
                let porcentaje = evento.assistance / evento.capacity * 100
                if (porcentaje > mayor){
                    mayor = porcentaje
                    mayorEvento = evento
                }
            }
            return `${mayorEvento.name} ${mayor.toFixed(2)}%`
        },

        menorAsistencia(eventsPastFilter) {
            let menor = 0
            let menorEvento
            for (let evento of eventsPastFilter) {
                let porcentaje = evento.assistance / evento.capacity * 100
                if (menor == 0 || porcentaje < menor){
                    menor = porcentaje
                    menorEvento = evento
                }
            }
            return `${menorEvento.name} ${menor.toFixed(2)}%`
        },

        mayorCapacidad(eventos) {
            let mayor = 0
            let mayorCapacidad
            for (let evento of eventos) {
                let capacidad = evento.capacity
                if (capacidad > mayor) {
                    mayor = capacidad
                    mayorCapacidad = evento
                }
            }
            return `${mayorCapacidad.name} ${mayorCapacidad.capacity.toLocaleString()}`
        },

        imprimirtablaUpcoming(eventos) {
            let informacionUpcoming = []
            let categoriasUpcoming = Array.from(new Set(eventos.map(evento => evento.category)))
            let gananciaUpcoming = []
            for (let categoria of categoriasUpcoming) {
                let acomulador = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        acomulador += evento.estimate * evento.price
                    }
                }
                gananciaUpcoming.push(acomulador)
                console.log(gananciaUpcoming)
            }

            let asistanceUp = []
            for (let categoria of categoriasUpcoming) {
                let estimado = 0
                let capacidad = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        estimado += evento.estimate
                        capacidad += evento.capacity
                    }
                }
                asistanceUp.push(estimado * 100 / capacidad)
            }
            informacionUpcoming.push(categoriasUpcoming, gananciaUpcoming, asistanceUp)

            let template = ""
            for (let i = 0; i < informacionUpcoming[0].length; i++) {
                template += `
                <tr>
                    <td>${informacionUpcoming[0][i]}</td>
                    <td>${informacionUpcoming[1][i].toLocaleString()}</td>
                    <td>${informacionUpcoming[2][i].toFixed(2)}%</td>
                </tr>`
            }
            return template
        },

        imprimirtablaPast(eventos) {
            let informacionPast = []
            let categoriasPast = Array.from(new Set(eventos.map(item => item.category)))

            let gananciaPast = []
            for (let categoria of categoriasPast) {
                let acomulador = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        acomulador += evento.assistance * evento.price
                    }
                }
                gananciaPast.push(acomulador)
                console.log(gananciaPast)
            }

            let asistancePa = []
            for (let categoria of categoriasPast) {
                let asistencia = 0
                let capacidad = 0
                for (let evento of eventos) {
                    if (evento.category == categoria) {
                        asistencia += evento.assistance
                        capacidad += evento.capacity
                    }
                }
                asistancePa.push(asistencia * 100 / capacidad)
            }
            informacionPast.push(categoriasPast, gananciaPast, asistancePa)

            let template = ``
            for (let i = 0; i < informacionPast[0].length; i++) {

                template += `
                <tr>
                    <td>${informacionPast[0][i]}</td>
                    <td>${informacionPast[1][i].toLocaleString()}</td>
                    <td>${informacionPast[2][i].toFixed(2)}%</td>
                </tr>`

            }
            return template

        },
    },


})
app.mount(`#app`)