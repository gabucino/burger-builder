import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-a402a.firebaseio.com/'
})

export default instance