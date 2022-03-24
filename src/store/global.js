import { 
    getPost, 
    getPostId, 
    getCommentsId, 
    getLogin, 
    getPostByUserId,

    putPostId,
    deletePostId

} from '../plugins/Apis/index'

export default {
    state: () => ({ 
        postDetail: null,
        posts: [],
        comments: [],
        userData: null,
    }),
    mutations: {
        GET_POSTS (state, payload) {
            state.posts.push(...payload)
        },
        OVERIDE_POSTS (state, payload) {
            state.posts = payload
        },
        GET_POST_DETAIL (state, payload) {
            state.postDetail = payload
        },
        GET_POST_COMMENTS (state, payload) {
            state.comments = payload
        },
        GET_USER_LOGIN (state, payload) {
            state.userData = payload
        }
    },
    actions: { 
        getPostHome ({ commit }, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    let results = (await getPost()).data
                    let itemsFav = localStorage.getItem('favItems')
                    let fav = !itemsFav ? [] : JSON.parse(itemsFav)
                    results = results.map((e, idx) => {
                        let inc = fav.findIndex((fvi) => fvi.id === e.id)
                        if (inc < 0) return e
                        return e = fav[inc]
                    })
                    commit('GET_POSTS', results)
                    resolve(results)
                } catch (error) {
                    reject(error)
                }
            })
        },
        getPostAdmin ({ commit }, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    let userData = localStorage.getItem('userMyPost')
                    userData = !userData ? null : JSON.parse(userData)
                    if (!userData) throw 'User Not Found'
                    let results = (await getPostByUserId(userData.id)).data
                    let itemsFav = localStorage.getItem('favItems')
                    let fav = !itemsFav ? [] : JSON.parse(itemsFav)
                    results = results.map((e, idx) => {
                        let inc = fav.findIndex((fvi) => fvi.id === e.id)
                        if (inc < 0) return e
                        return e = fav[inc]
                    })
                    commit('GET_POSTS', results)
                    resolve(results)
                } catch (error) {
                    reject(error)
                }
            })
        },
        getPostLiked ({ commit,state }, payload) {
            return new Promise(async (resolve, reject) => {
                try {
                    let itemsFav = localStorage.getItem('favItems')
                    let results = !itemsFav ? [] : JSON.parse(itemsFav)
                    commit('GET_POSTS', results)
                    resolve(results)
                } catch (error) {
                    reject(error)
                }
            })
        },
        getPostDetail ({commit}, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await getPostId(id)).data
                    resolve(result)
                    commit('GET_POST_DETAIL', result)
                } catch (error) {
                    reject(error)
                }
            })
        },
        getCommentsByPost ({commit}, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await getCommentsId(id)).data
                    result = result.map((e) => {
                        return { ...e, nameClip: e.name.length >= 21 ? e.name.substring(0,20) + '...' : e.name}
                    })
                    resolve(result)
                    commit('GET_POST_COMMENTS', result)
                } catch (error) {
                    reject(error)
                }
            })
        },
        getUserLogin ({commit}, form) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await getLogin(form)).data
                    if (!result.length) throw 'User Not Found'
                    commit('GET_USER_LOGIN', result)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        },

        editPostId ({commit}, {id, field }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await putPostId(id, field)).data
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        },
        deletePostById ({commit},  id) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await deletePostId(id)).data
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }
    },
    namespaced: true
  }