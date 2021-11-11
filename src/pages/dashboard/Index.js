import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import { Loader } from '../../components/loader/Index'
import { Layout, Main } from '../../components/layout/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await Requests.Dashboard.Index(header)
        if (response) setData(response)
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    return (
        <div>
            <Layout
                page="Dashboard"
                message="Welcome to dashboard"
                container="container-fluid"
            />

            <Main>

                {loading && !Object.keys(data).length ? <Loader /> : null}

                {!loading && Object.keys(data).length ?
                    <div className="dashboard-container col-12 mb-4">
                        <div className="row">

                            <div className="col-6 col-lg-4 col-xl-3 mb-4 mb-xl-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="mb-0">Admin</h5>
                                        <p>Total avaiable admin</p>
                                        <h4 className="mb-0">{data.admin || 0}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-lg-4 col-xl-3 mb-4 mb-xl-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="mb-0">Customer</h5>
                                        <p>Total avaiable customers</p>
                                        <h4 className="mb-0">{data.customer || 0}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-lg-4 col-xl-3 mb-4 mb-xl-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="mb-0">Category</h5>
                                        <p>Total avaiable categories</p>
                                        <h4 className="mb-0">{data.category || 0}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-lg-4 col-xl-3 mb-4 mb-xl-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="mb-0">Products</h5>
                                        <p>Total avaiable products</p>
                                        <h4 className="mb-0">{data.category || 0}</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    : null
                }

            </Main>
        </div>
    );
}

export default Index;