// import jwtDecode from 'jwt-decode'

export const isLoggedin = () => {
    const token = localStorage.getItem("token")
    if (token) {
        return true
        // const decodeToken = jwtDecode(token)
        // if (decodeToken && decodeToken.role === requestedRole) {
        //     return true
        // }
    }
    return false
};