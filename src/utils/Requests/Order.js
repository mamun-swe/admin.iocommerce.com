import Axios from 'axios'
import { api } from '../api'
import { ErrorHandeller } from './Error'

// Index of items
const Index = async (page, perPage, header) => {
    try {
        const response = await Axios.get(`${api}order?limit=${perPage}&page=${page}`, header)
        if (response.status === 200) return response
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Show specific item
const Show = async (id, header) => {
    const response = await Axios.get(`${api}order/${id}`, header)
    return response
}

// Change order status
const ChangeOrderStatus = async (id, data, header) => {
    const response = await Axios.put(`${api}order/change-order-status/${id}`, data, header)
    return response
}

// Change payment status
const ChangePaymentStatus = async (id, data, header) => {
    const response = await Axios.put(`${api}order/change-payment-status/${id}`, data, header)
    return response
}

const Order = {
    Index,
    Show,
    ChangeOrderStatus,
    ChangePaymentStatus
}

export default Order