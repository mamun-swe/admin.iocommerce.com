import Axios from 'axios'
import swal from 'sweetalert'
import { api } from '../api'
import { ErrorHandeller } from './Error'

// Index of items
const Index = async (page, limit, header) => {
    try {
        const response = await Axios.get(`${api}customer?page=${page}&limit=${limit}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${api}customer`, data, header)
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
    const response = await Axios.get(`${api}customer/${id}`, header)
    return response
}

// Update specific item
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${api}customer/${id}`, data, header)
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

// Search item
const Search = async (query, header) => {
    try {
        const response = await Axios.post(`${api}customer/search`, query, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Orders of specific customer
const Orders = async (id, header) => {
    const response = await Axios.get(`${api}customer/${id}/orders`, header)
    return response
}


const Customer = {
    Index,
    Store,
    Show,
    Update,
    Search,
    Orders
}

export default Customer