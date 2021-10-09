import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, MapPin, Phone, User } from 'react-feather'
import { Loader } from '../../components/loader/Index'
import { ShortName } from '../../components/shortName/Index'
import { Layout, Main } from '../../components/layout/Index'
import { GrayButton } from '../../components/button/Index'
import { DateFormate } from '../../utils/_heplers'

import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Show = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [orders, setOrders] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [orderLoading, setOrderLoading] = useState(true)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async () => {
        const response = await Requests.Customer.Show(id, header)
        if (response.status === 200) {
            setData(response.data.data)
        }
        setLoading(false)
    }, [id, header])

    // Fetch orders
    const fetchOrders = useCallback(async () => {
        try {
            const response = await Requests.Customer.Orders(id, header)
            if (response.status === 200) {
                setOrders(response.data.data)
            }
            setOrderLoading(false)
        } catch (error) {
            if (error) setOrderLoading(false)
        }
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    useEffect(() => {
        fetchOrders()
    }, [id, header, fetchOrders])

    const columns = [
        {
            name: 'Order Code',
            grow: 0,
            selector: row => <Link to={`/dashboard/order/${row._id}`}>{row.orderCode}</Link>
        },
        {
            name: 'Order Date',
            cell: row => <div>{DateFormate(row.createdAt)}</div>,
            sortable: true,
        },
        {
            name: 'Amount (tk)',
            selector: row => row.totalPrice,
            sortable: true,
        },
        {
            name: 'Order Status',
            selector: row => row.status,
            sortable: true,
        }
    ]

    if (isLoading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / customer info"
                message={`Information of ${data.name || "N/A"}.`}
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/customer">
                            <GrayButton
                                type="button"
                            >
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12 col-lg-4 col-xl-3">
                    <div className="card border-0">
                        <div className="card-body p-2">
                            <ShortName
                                name={data.name || "N/A"}
                                x={80}
                                y={80}
                                size={40}
                            />

                            {/* Content container */}
                            <div className="pt-3">
                                <h6>{data.name || "N/A"}</h6>

                                <p className="pb-2 mb-2 border-bottom"><User size={15} /> <b>Personal Info.</b></p>
                                <p className="mb-4">{data.gender || "N/A"} | {data.maritalStatus || "N/A"} | {data.dob ? DateFormate(data.dob) : null}</p>

                                <p className="pb-2 mb-2 border-bottom"><Phone size={14} /> <b>Contact</b></p>
                                <p className="mb-1">{data.phone || "N/A"}</p>
                                <p className="text-lowercase mb-4">{data.email || "N/A"}</p>

                                <p className="pb-2 mb-2 border-bottom"><MapPin size={14} /> <b>Last Delivered Addres</b></p>
                                <p className="text-capitalize mb-1">{data.shippingArea ? data.shippingArea[0] : "N/A"}</p>
                                <p className="text-capitalize mb-4">{data.deliveryAddress ? data.deliveryAddress[0] : "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Orders history */}
                <div className="col-12 col-lg-8 col-xl-9">
                    <div className="card border-0">
                        <div className="card-body p-2">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h6 className="mb-0 ps-1">Orders History</h6>
                                    <DataTable
                                        columns={columns}
                                        data={orders}
                                        loading={orderLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Main>
        </div >
    );
}

export default Show;
