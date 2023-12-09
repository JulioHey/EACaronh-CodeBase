export const RideToMap = (ride) => {
    return {
        "Local": ride.local,
        "Destino": ride.destination,
        "Preço": ride.price,
        "Hora": ride.time,
        "Data": ride.date,
        "Espaços Livres": ride.seats,
    }
}

