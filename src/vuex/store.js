import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import system from './Modules/system'
import systemAccount from './Modules/systemAccount'

export default new Vuex.Store({
  modules:{
    system,systemAccount
  },
  state: {
  
  },
  getters:{
    
  },
  mutations: {

  },
  actions: {

  }
})
