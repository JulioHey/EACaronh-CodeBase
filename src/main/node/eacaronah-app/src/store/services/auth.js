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
            }
        })
    },
    sendOTP: function ({email}) {
        return axios.post(`${url}/user/send-otp`, {
            email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
    },
    checkOTP: function ({email, code}) {
        return axios.post(`${url}/user/check-otp`, {
            email,
            code
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
    },
    register: function ({name, email, birthDate, documentNumber, phone, institution}) {
        return axios.post(`${url}/user/register`, {
            "user": {
                name,
                email,
                birth_date: birthDate,
                document_number: documentNumber,
                phone_number: phone,
            },
            institution_user: {
                "institution_name": "USP",
                "registration_number": institution.registration_number,
                "role": "STUDENT",
                "student_user": {
                    "period": institution.period,
                    "program_type": "GRADUATION",
                    "ingress_year": institution.ingress_year,
                    "course": institution.course
                }
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
    }
}
