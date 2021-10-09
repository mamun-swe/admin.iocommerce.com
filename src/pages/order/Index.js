
import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Eye } from 'react-feather'
import { SuccessButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { DateFormate } from '../../utils/_heplers'
import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch data
    const fetchData = useCallback(async (page) => {
        setLoading(true)
        const response = await Requests.Order.Index(page, perPage, header)

        setData(response.data.data)
        setTotalRows(response.data.data.length)
        setLoading(false)
    }, [perPage, header])

    const handlePageChange = page => fetchData(page)

    // Data paginate
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.Order.Index(page, newPerPage, header)

        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    const columns = [
        {
            name: 'Order Code',
            grow: 0,
            selector: row => 'FF' + row.orderCode,
        },
        {
            name: 'Order Date',
            cell: row => <div>{DateFormate(row.createdAt)}</div>,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            grow: 0,
            cell: row =>
                <div>
                    <SuccessButton
                        style={{ borderRadius: "50%", padding: "6px 9px" }}
                        onClick={() => history.push(`/dashboard/order/${row._id}`)}
                    ><Eye size={16} />
                    </SuccessButton>
                </div>
        },
    ]

    return (
        <div>
            <Layout
                page="dashboard / order list"
                message={`${data.length} orders are available.`}
                container="container-fluid"
            />

            <Main>
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        totalRows={totalRows}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </Main>
        </div>
    );
}

export default Index;