const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
]

export const ToFullDate = (date, rideTime) => {
    var dateParts = date.split("/");
    const time = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])

    return time.getDate() + "/" + (time.getMonth() + 1) + " (" + daysOfWeek[time.getDay()] + ") - " + rideTime
}