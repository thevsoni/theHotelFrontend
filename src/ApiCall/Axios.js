import axios from 'axios'

const Axios = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://thehotelbackend.onrender.com",
})

export default Axios;
