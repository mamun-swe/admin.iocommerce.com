import Axios from 'axios'
import swal from 'sweetalert'
import { api } from '../api'
import { ErrorHandeller } from './Error'

// Index of items
const Index = async (header) => {
    try {
        const response = await Axios.get(`${api}category`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}category`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Show specific item
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${api}category/${id}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Update specific item
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}category/${id}`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

const Category = {
    Index,
    Store,
    Show,
    Update
}

export default Category