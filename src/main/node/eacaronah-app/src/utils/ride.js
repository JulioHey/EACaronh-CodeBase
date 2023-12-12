

export const ToMapCard = (ride) => {
    return {
        "Local": ride.to_address,
        "Preço": ride.price,
        "Espaços Livres": ride.seats,
    }
}