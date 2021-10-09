import Axios from 'axios'
import { api } from '../api'
import { ErrorHandeller } from './Error'

// Index
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}options`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

const Options = {
    Index
}

export default Options