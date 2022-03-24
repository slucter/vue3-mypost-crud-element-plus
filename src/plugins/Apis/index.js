import { http } from '../Axios/axios'

// GET DATA

export const getPost = () => {
    return http.get('/posts')
}
export const getPostByUserId = (uid) => {
    return http.get('/posts', { params: { userId: uid } })
}
export const getPostId = (id) => {
    return http.get(`/posts/${id}`)
}

export const getCommentsId = (id) => {
    return http.get('/comments', { params: { postId: id } })
}
export const getLogin = (params) => {
    return http.get('/users', { params: params })
}


// PUT DATA

export const putPostId = (id, field) => {
    return http.put(`/posts/${id}`, field)
}

// DELETE DATA

export const deletePostId = (id) => {
    return http.delete(`/posts/${id}`)
}