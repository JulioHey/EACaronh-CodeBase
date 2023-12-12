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
    },
    sendOTP: function ({email}) {
        return axios.post(`${url}/user/send-otp`, {
            email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }})
    },
    checkOTP: function ({email, code}) {
        return axios.post(`${url}/user/check-otp`, {
            email, code
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }})
    },
    register: function ({user, institutionUser}) {
        return axios.post(`${url}/user/register`, {
          user, institutionUser
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }})
    }
}
