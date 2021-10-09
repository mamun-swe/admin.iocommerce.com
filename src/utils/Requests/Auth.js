import Axios from 'axios'
import { authApi } from '../api'
import { ErrorHandeller } from './Error'

// Login
const Login = async (data) => {
    try {
        const response = await Axios.post(`${authApi}login`, data)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Reset
const Reset = async (data) => {
    const response = await Axios.post(`${authApi}reset`, data)
    return response
}

const Auth = {
    Login,
    Reset
}

export default Auth