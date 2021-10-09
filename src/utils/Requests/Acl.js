import Axios from 'axios'
import swal from 'sweetalert'
import { aclApi } from '../api'
import { ErrorHandeller } from './Error'

// List of items
const Role = async (header) => {
    try {
        const response = await Axios.get(`${aclApi}role`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Index of routes
const Routes = async (header) => {
    try {
        const response = await Axios.get(`${aclApi}role/route/paths`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}


// Store item
const Store = async (data, header) => {
    try {
        const response = await Axios.post(`${aclApi}role`, data, header)
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

// Show item
const Show = async (id, header) => {
    try {
        const response = await Axios.get(`${aclApi}role/${id}`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Update specific items
const Update = async (id, data, header) => {
    try {
        const response = await Axios.put(`${aclApi}role/${id}`, data, header)
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

// Delete item
const Delete = async (id, header) => {
    try {
        const response = await Axios.delete(`${aclApi}role/${id}`, header)
        if (response.status === 200) {
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

const Acl = {
    Role,
    Routes,
    Store,
    Show,
    Update,
    Delete
}

export default Acl