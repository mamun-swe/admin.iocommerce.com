import React, { useState, useCallback, useEffect } from 'react'
import swal from 'sweetalert'
import { useParams } from 'react-router'
import { Layout, Main } from '../../components/layout/Index'

import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Show = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [header] = useState({ headers: { Authorization: "Bearer " + localStorage.getItem('token') } })

    // Get order history
    const fetchData = useCallback(async () => {
        try {
            const response = await Requests.Order.Show(id, header)
            if (response.status === 200) setData(response.data.data)
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
            }
        }
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    // handle order status
    const handleOrderStatus = async event => {
        try {
            const value = event.target.value
            const data = { status: value }
            const response = await Requests.Order.ChangeOrderStatus(id, data, header)
            if (response.status === 201) {
                fetchData()
                swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    button: false,
                })
            }
        } catch (error) {
            if (error) {
                swal({
                    title: "Error!",
                    text: "Network error.",
                    icon: "error",
                    button: false,
                })
            }
        }
    }

    // handle payment status
    const handlePaymentStatus = async event => {
        try {
            const value = event.target.value
            const data = { status: value }
            const response = await Requests.Order.ChangePaymentStatus(id, data, header)
            if (response.status === 201) {
                fetchData()
                swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    button: false,
                })
            }
        } catch (error) {
            if (error) {
                swal({
                    title: "Error!",
                    text: "Network error.",
                    icon: "error",
                    button: false,
                })
            }
        }
    }

    const columns = [
        {
            name: '',
            grow: 0,
            cell: row => <img
                src={row.image}
                className="img-fluid"
                alt={row.name}
                style={{ height: 40, width: 40 }}
            />,
        },
        {
            name: 'Product',
            cell: row =>
                <div>
                    <p className="mb-2">{row.name}</p>
                    <p className="mb-0">SKU: {row.sku}</p>
                </div>
        },
        {
            name: 'Purchase Price',
            selector: row => row.purchasePrice + " tk."
        },
        {
            name: 'Sale Price',
            selector: row => row.salePrice + " tk."
        },
        {
            name: 'Quantity',
            selector: row => row.quantity
        },
        {
            name: 'Subtotal',
            selector: row => row.subTotal + " tk."
        }
    ]

    if (isLoading) return <p className="text-center mt-5">Loading...</p>

    return (
        <div>
            <Layout
                page="dashboard / order show"
                container="container-fluid"
            />

            <Main>
                <div className="col-12">

                    {/* Order details */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Order Code</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.orderCode || "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Pay with</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.paymentMethod || "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Payment Status</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.paymentStatus || "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Order Status</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.status || "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Delivery Address</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.deliveryAddress || "N/A"}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Subtotal</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.subTotalPrice || 0} tk.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Delivery Charge</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.deliveryCharge || 0} tk.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 140 }}>
                                                    <p className="font-13 mb-0">Total</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.totalPrice || 0} tk.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 70 }}>
                                                    <p className="font-13 mb-0">Customer</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.customer && data.customer.name ? data.customer.name : "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: 70 }}>
                                                    <p className="font-13 mb-0">Phone</p>
                                                </td>
                                                <td>
                                                    <p className="font-13 mb-0">: {data.customer && data.customer.phone ? data.customer.phone : "N/A"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    {/* Order Status */}
                                                    <div className="form-group change-status mb-2">
                                                        <p className="mb-1"><i>Order Status</i></p>
                                                        <select
                                                            style={{ width: 165, fontSize: 13, height: 42 }}
                                                            className="form-control shadow-none"
                                                            defaultValue={data.status}
                                                            onChange={handleOrderStatus}
                                                        >
                                                            <option value="Created">Created</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Confirmed">Confirmed</option>
                                                            <option value="Picked">Picked</option>
                                                            <option value="Received in Warehouse">Received in Warehouse</option>
                                                            <option value="Packed">Packed</option>
                                                            <option value="Handed Over to Courier">Handed Over to Courier</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </div>

                                                    {/* Payment Status */}
                                                    <div className="form-group change-status mb-2">
                                                        <p className="mb-1"><i>Payment Status</i></p>
                                                        <select
                                                            style={{ width: 165, fontSize: 13, height: 42 }}
                                                            className="form-control shadow-none"
                                                            defaultValue={data.paymentStatus}
                                                            onChange={handlePaymentStatus}
                                                        >
                                                            <option value="Paid">Paid</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Partially Paid">Partially Paid</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order products */}
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-header p-2 bg-white border-0">
                            <p className="font-15 font-weight-bolder mb-0">Products</p>
                        </div>
                        <div className="card-body p-0">
                            <DataTable
                                columns={columns}
                                data={data.products}
                                loading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </Main>
        </div>
    );
};

export default Show;