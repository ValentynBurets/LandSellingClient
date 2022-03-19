import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:18108/api/",
    headers: {
        "Content-type": "application/json",
        "accept": "application/json'"
    }
});