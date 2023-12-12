import axios from 'axios';

const url = "http://127.0.0.1:9000"

export const AuthService = {
    login: function ({email, password}) {
        return axios.post(`${url}/login`, {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }})
    }
}
