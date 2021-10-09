
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2 } from 'react-feather'
import {
    GrayButton,
    DangerButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'

import DataTable from '../../components/table/Index'
import DeleteModal from '../../components/modals/delete/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        const response = await Requests.Banner.Index(header)

        setData(response.data)
        setLoading(false)
    }, [header])


    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    const columns = [
        {
            name: 'Image',
            grow: 1,
            cell: row => <img height={50} style={{ maxWidth: 150 }} alt={row.image} src={row.image} />,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Action',
            grow: 0,
            cell: row =>
                <div>
                    <DangerButton
                        style={{ borderRadius: "50%", padding: "6px 9px" }}
                        onClick={() => setDelete({ value: row, show: true })}
                    ><Trash2 size={16} /></DangerButton>
                </div>
        },
    ]

    // Handle delete
    const handleDelete = async () => {
        setDelete({ ...isDelete, loading: true })

        await Requests.Banner.Delete(isDelete.value._id, header)
        fetchData()
        setDelete({ ...isDelete, show: false, loading: false })
    }

    return (
        <div>
            <Layout
                page="dashboard / banner list"
                message="Banners that use in website."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/banner/store">
                            <GrayButton type="button">
                                <Plus size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>ADD NEW</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        pagination={false}
                        paginationServer={false}
                    />
                </div>
            </Main>

            {/* Delete confirmation modal */}
            <DeleteModal
                show={isDelete.show}
                loading={isDelete.loading}
                message={
                    <div>
                        <h6>Want to delete this banner ?</h6>
                        <img src={isDelete.value ? isDelete.value.image : null} className="img-fluid" height={150} alt="Banner" />
                    </div>
                }
                onHide={() => setDelete({ value: null, show: false, loading: false })}
                doDelete={handleDelete}
            />
        </div>
    );
}

export default Index;