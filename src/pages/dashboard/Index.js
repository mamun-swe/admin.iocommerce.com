// import React, { useEffect, useState, useCallback } from 'react'
import React from 'react'
import './style.scss'
// import { Loader } from '../../components/loader/Index'
import { Layout, Main } from '../../components/layout/Index'
// import { OrderChart, OrderStatusChart } from '../../components/chart/Index'
import { OrderChart } from '../../components/chart/Index'
import { DollarSign, ShoppingBag, ShoppingCart, Users } from 'react-feather'
// import Requests from '../../utils/Requests/Index'

const Index = () => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [header] = useState({
    //     headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    // })

    // const fetchData = useCallback(async () => {
    //     setLoading(true)
    //     const response = await Requests.Dashboard.Index(header)
    //     if (response) setData(response)
    //     setLoading(false)
    // }, [header])

    // useEffect(() => {
    //     fetchData(1)
    // }, [fetchData])

    // if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="Dashboard"
                message="Welcome to dashboard"
                container="container-fluid"
            />

            <Main>
                <div className="dashboard-container col-12 mb-4">
                    <div className="row">

                        {/* Earning container */}
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5>Earnings</h5>
                                    <p>Total Earnings of the Month</p>
                                    <h4 className="mb-0">Tk. 43,567.53</h4>
                                </div>
                            </div>
                        </div>

                        {/* Overview container */}
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card border-0">
                                <div className="card-body">
                                    <h5>Overview</h5>
                                    <p className="mb-4">All Earning Overview</p>

                                    <div className="row">

                                        {/* Total Sale */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-5 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <ShoppingBag size={20} color="#063cdd" />
                                                </div>
                                                <div className="ps-2">
                                                    <p className="text-muted mb-1">Total Sale</p>
                                                    <h6 className="mb-0">Tk. 43,567.53</h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Net Profit */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-5 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <DollarSign size={20} color="#063cdd" />
                                                </div>
                                                <div className="ps-2">
                                                    <p className="text-muted mb-1">Net Profit</p>
                                                    <h6 className="mb-0">Tk. 43,567.53</h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total Order */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-5 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <ShoppingCart size={20} color="#063cdd" />
                                                </div>
                                                <div className="ps-2">
                                                    <p className="text-muted mb-1">Total Order</p>
                                                    <h6 className="mb-0">43,532</h6>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customers */}
                                        <div className="col-6 col-md-3 col-lg-6 col-xl-3 mb-5 mb-xl-0">
                                            <div className="d-flex">
                                                <div className="icon-container flex-center flex-coulmn">
                                                    <Users size={20} color="#063cdd" />
                                                </div>
                                                <div className="ps-2">
                                                    <p className="text-muted mb-1">Customers</p>
                                                    <h6 className="mb-0">43,567</h6>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Order Summary Chart */}
                    <div className="row">
                        <div className="col-12 mb-4">
                            <OrderChart />
                        </div>
                    </div>

                    <div className="row">

                        {/* Order status chart */}
                        {/* <div className="col-12 col-xl-5 mb-4 mb-xl-0">
                            <div className="card border-0">
                                <div className="card-body">
                                    <OrderStatusChart />
                                </div>
                            </div>
                        </div> */}

                        {/* Product of this month */}
                        {/* <div className="col-12 col-xl-7 products-container">
                            <div className="card border-0">
                                <div className="card-header px-0 px-lg-3 pb-0">
                                    <h6>Products of the Month</h6>
                                    <p className="text-muted">Overview of Latest Month</p>
                                </div>
                                <div className="card-body p-0 p-lg-3">
                                    <table className="table table-sm table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <td className="ps-2 ps-lg-3">Products</td>
                                                <td className="ps-2"></td>
                                                <td>Sale Price</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.products && data.products.map((product, i) =>
                                                <tr key={i}>
                                                    <td className="ps-2 ps-lg-3" style={{ maxWidth: 50 }}>
                                                        <img src={product.thumbnail} className="img-fluid" alt="..." />
                                                    </td>
                                                    <td className="custom-td ps-2">{product.name}</td>
                                                    <td className="custom-td" style={{ minWidth: 90 }}>Tk. {product.salePrice}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Main>
        </div>
    );
}

export default Index;