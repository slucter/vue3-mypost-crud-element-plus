import { createStore } from 'vuex'
import globalModule from './global'

export default createStore({
    modules: {
       global: globalModule
    }
})