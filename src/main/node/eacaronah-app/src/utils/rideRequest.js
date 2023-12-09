export const RideRequestToMap = (user) => {
    return {
        "Nome": user.name,
        "Email": user.email,
        "Telefone": user.phone,
        "Instituto": user.institution,
        "Curso": user.course,
    }
}