export const RideRequestToMap = (rideRequest) => {
    return {
        "Motorista": rideRequest.driver.name,
        "Local": rideRequest.ride.to,
        "Preço": rideRequest.ride.price,
        "Status": rideRequest.status,
    }
}