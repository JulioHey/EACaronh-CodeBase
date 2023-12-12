import axios from 'axios';

const url = "http://127.0.0.1:9001"

export const RideService = {
    GetCar : (token) => {
        return axios.get(`${url}/car`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    GetRidesFromUser : (token) => {
        return axios.get(`${url}/ride/user`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    GetRequestsByRide: (id, token) => {
        return axios.get(`${url}/ride/${id}/request`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    GetRequests: (token) => {
      return axios.get(`${url}/riderequest`, {
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Authorization": `Bearer ${token}`
          }
      })
    },
    CreateRide : (ride, token) => {
        return axios.post(`${url}/ride`, {
            ride
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    SearchRides: (token, date, to) => {
        return axios.get(`${url}/ride?date=${date}&to=${to}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    RequestRide: (rideId, token) => {
        return axios.post(`${url}/ride/${rideId}`, {
            ride_id: rideId
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    AcceptRequest: (rideRequestID, token) => {
        return axios.put(`${url}/riderequest/${rideRequestID}/accept`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    DeclineRequest: (rideRequestID, token) => {
        return axios.put(`${url}/riderequest/${rideRequestID}/decline`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    GetParticipantsByRide: (rideId, token) => {
        return axios.get(`${url}/ride/${rideId}/participants`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
    RenounceRideRequest: (rideRequestID, token) => {
        return axios.put(`${url}/riderequest/${rideRequestID}/renounce`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        })
    },
}