import axios from 'axios'

export default axios.create({
    baseURL: 'https://bank-app-1c3de.firebaseio.com',
    headers: {
        // 'Accept': 'application/json',
    },
    
})