import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coins : [],
    detailCurrency : [],
    isReady : true,
    searchCoin : ''
  },
  mutations: {
    SET_COINS(state, payload) {
      state.coins = payload
    },
    SET_DETAIL_CURRENCY(state, payload){
      state.detailCurrency = payload
    },
    CHANGE_LOADDING(state, payload){
      state.isReady = payload
    },
    CHANGE_COIN_SEARCH(state, payload) {
      state.searchCoin = payload
    }
  },
  actions: {
    async getCoinsApi({commit}) {
      commit('CHANGE_LOADDING', true)
      try {
        const request = await fetch('https://api.coincap.io/v2/assets?limit=50')
        const response = await request.json()
        let {data} = response
        data = data.map( coin => {
          return {
            id  : coin.id,
            rank : coin.rank,
            symbol : coin.symbol.toLowerCase(),
            name : coin.name,
            price : coin.priceUsd,
            market : coin.marketCapUsd,
            change : coin.changePercent24Hr
          }
        })
        commit('SET_COINS', data)
      }catch (e) {
        throw new Error(e)
      }finally {
        commit('CHANGE_LOADDING', false)
      }
    },
    async getMoreDetailCurrencyCurrent({commit}, payload) {
      commit('CHANGE_LOADDING', true)
      const now = new Date()
      const end = now.getTime()
      now.setDate(now.getDate() - 1)
      const start = now.getTime()
      try {
        const request = await fetch(`https://api.coincap.io/v2/assets/${payload}/history?interval=h1&start=${start}&end=${end}`)
        const response = await request.json()
        let {data} = response
        data = data.map(c => {
          return {
            date : c.date.split('T')[1].split('Z')[0].split('.')[0],
            price : c.priceUsd
          }
        })

        commit('SET_DETAIL_CURRENCY', data)
      }catch (e) {
        throw new Error(e)
      }finally {
        commit('CHANGE_LOADDING', false)
      }
    },
    setSearchCoin({commit}, payload){
      const name = payload.charAt(0).toUpperCase().concat( payload.substring(1) )
      commit('CHANGE_COIN_SEARCH', name)
    }
  },
  modules: {
  },
  getters: {
    getOneCurrency(state) {
      return (name) => {
        return state.coins.find( coin => coin.id == name)
      }
    },
    getCoinsFiltered(state) {
      return name => {
        return state.coins.filter( coin => coin.name.includes(name) )
      }
    }
  }
})
