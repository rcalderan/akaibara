import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const products=[
  {
    _id: 1,
    type: "yakisoba",
    name: "Yakisoba Vegetariano",
    description:
      "Yakisoba com legumes. Macarrão especial grelhado com cenoura, brócolis, repolho e cocumelos champignon e shitake!",
    ingredients: [
      "Macarrão especial",
      "cenoura",
      "Brócolis",
      "repolho",
      "chamignon",
      " cogumelho shitake"
    ],
    option: [
      { price: 16.0, weigth: 500, active: true },
      { price: 25.9, weigth: 800, active: true }
    ],
    src: "img/Yakisoba-1.jpg",
    open: true
  },
  {
    _id: 2,
    type: "yakisoba",
    name: "Yakisoba Carne",
    description:
      "Yakisoba com carne bovina. Macarrão especial grelhado com carne bovina (contra filé) e legumes: cenoura, brócolis, repolho e champignon!",
    ingredients: [
      "Macarrão especial",
      "Carne bovina",
      "cenoura",
      "Brócolis",
      "repolho",
      "chamignon"
    ],
    option: [
      { price: 18.0, weigth: 500, active: true },
      { price: 28.5, weigth: 800, active: true }
    ],
    src: "img/Yakisoba-11.jpg",
    open: true
  },
  {
    _id: 3,
    type: "yakisoba",
    name: "Yakisoba Frango",
    description:
      "Yakisoba de frango. Macarrão especial grelhado com carne de frango (super macia) com legumes: cenoura, brócolis, repolho e champignon!",
    ingredients: [
      "Macarrão especial",
      "Frango",
      "cenoura",
      "Brócolis",
      "repolho",
      "chamignon"
    ],
    option: [
      { price: 17.0, weigth: 500, active: true },
      { price: 26.0, weigth: 800, active: true }
    ],
    src: "img/Yakisoba-4.jpg",
    open: true
  },
  {
    _id: 4,
    type: "yakisoba",
    name: "Yakisoba completo",
    ingredients: [
      "Macarrão especial",
      "Carne bovina",
      "Frango",
      "cenoura",
      "Brócolis",
      "repolho",
      "chamignon",
      "cogumelo shitake"
    ],
    description:
      "Yakisoba completo. Macarrão especial grelhado com contra filé, frango legumes e cogumelos. Com Cenoura, brócolis, repolho, champignon e shitake!",
    option: [
      { price: 20.0, weigth: 500, active: true },
      { price: 32.0, weigth: 800, active: true }
    ],
    src: "img/Yakisoba-14.jpg",
    open: true
  },
  {
    _id: 5,
    type: "kare",
    name: "Karê De carne Nivel 1",
    description: "Karê de carne levemente picante. Sugestão: Muito bom com arroz branco! por +R$6,00 acrescentamos 500g de arroz japonês.",
    ingredients: ["Molho Curry", "Carne bovina", "Cebola", "cenoura"],
    option: [
      { price: 16.0, weigth: 500, active: true },
      { price: 25.0, weigth: 800, active: true }
    ],
    src: "img/11.jpg",
    open: true
  },
  {
    _id: 6,
    type: "kare",
    name: "Karê de carne Nivel 2",
    description: "Karê de carne picância na medida. Sugestão: Muito bom com arroz branco! por +R$6,00 acrescentamos 500g de arroz japonês.",
    ingredients: ["Molho Curry", "Carne bovina", "Cebola", "cenoura"],
    option: [
      { price: 16.0, weigth: 500, active: true },
      { price: 25.0, weigth: 800, active: true }
    ],
    src: "img/12.jpg",
    open: false
  },
  {
    _id: 7,
    type: "kare",
    name: "Karê de carne Nivel 3",
    description: "Karê de carne picante! Sugestão: Muito bom com arroz branco! por +R$6,00 acrescentamos 500g de arroz japonês.",
    ingredients: ["Molho Curry", "Carne bovina", "Cebola", "cenoura"],
    option: [
      { price: 17.0, weigth: 500, active: true },
      { price: 26.0, weigth: 800, active: true }
    ],
    src: "img/13.jpg",
    open: true
  },
  {
    _id: 8,
    type: "kare",
    name: "Karê de carne Nivel 4",
    description: "Karê de carne Desafio de Picância. Sugestão: Muito bom com arroz branco! por +R$6,00 acrescentamos 500g de arroz japonês.",
    ingredients: ["Molho Curry", "Carne bovina", "Cebola", "cenoura"],
    option: [
      { price: 17.0, weigth: 500, active: true },
      { price: 26.0, weigth: 800, active: true }
    ],
    src: "img/14.jpg",
    open: false
  },
  {
    _id: 9,
    type: "outros",
    name: "Frango Xadrez",
    description: "O Frango Xadrez mais gostoso que você vai experimentar",
    ingredients: [
      "Frango",
      "Pimentão verde",
      "Pimentão Vermelho",
      "Cebola",
      "Cenoura",
      "Castanha de Caju"
    ],
    option: [
      { price: 19.0, weigth: 500, active: true },
      { price: 28.5, weigth: 500, active: true }
    ],
    src: "img/10.jpg",
    open: false
  },
  {
    _id: 10,
    type: "outros",
    name: "Yakimeshi Tradicional",
    description: "Yakimeshi (chahan) tradicional ",
    ingredients: ["Arroz Japonês", "Ovo", "Legumes"],
    option: [{ price: 12.9, weigth: 500, active: true }],
    src: "img/3.jpg",
    open: false
  },
  {
    _id: 11,
    type: "outros",
    name: "Yakimeshi com bacon",
    description: "Yakimeshi (chahan) com bacon ",
    ingredients: ["Arroz Japonês", "Ovo", "Bacon", "Legumes"],
    option: [{ price: 15.9, weigth: 500, active: true }],
    src: "img/6.jpg",
    open: false
  },
  {
    _id: 12,
    type: "outros",
    name: "Arroz Branco",
    description: "Arroz branco tipo japonês",
    ingredients: ["Gohan (arroz Japonês)"],
    option: [{ price: 5.0, weigth: 500, active: true }],
    src: "img/6.jpg",
    open: false
  }
]
const people=[
   {
    _id: 0,
    type: "visitor",
    email: "",
    cpf: "",
    name: "",
    phone: [],
    info: "",
    who: 0,
    defaultAddress:0,
    addresses:[ {
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: ""
    }]
  },{
    _id: 1,
    type: "admin",
    email: "",
    cpf: "",
    name: "Akaibara Admin",
    phone: [16997696789,1633729897],
    info: "",
    who: 1,
    defaultAddress:0,
    addresses:[ {
      cep: "",
      logradouro: "Rua Benedito da Silva",
      numero: "1090",
      bairro: "Jardim São Carlos",
      cidade: "São Carlos",
      uf: "SP"
    }]
  },

]
export default new Vuex.Store({
  state: {
    defaults:{
      product:products[0],
      user:people[0]
    },
    user: people[0],
    people,
    catalog:products,
  },
  mutations: {    
    updateUser(state, user) {
      state.user = user
    }, 
    updatePeople(state, people) {
      state.people = people
    },
    updateCatalog(state, catalog) {
      state.catalog = catalog
    },
  },
  actions: {    
    updateUser(newUser){
      return newUser
    },
    updatePeople(){
      return this.state.people
    },
    updateCatalog(){
      return this.state.catalog
    }
    /*
    async updateCatalog(context) {
      const result = await Axios.get('/api/catalog')
      context.commit('updateCatalog', result.data)
      return result.data
    }*/
  },
  modules: {
  }
})
