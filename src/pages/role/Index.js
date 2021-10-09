
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Edit2, Plus } from 'react-feather'
import { GrayButton, SuccessButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import DataTable from '../../components/table/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await Requests.Acl.Role(header)

        setData(response.data)
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Permissions',
            cell: row =>
                <div className="py-2">
                    <ol>
                        {row.rights && row.rights.map((item, i) =>
                            <li className="text-capitalize mb-1" key={i}>{item}</li>
                        )}
                    </ol>
                </div>
        },
        {
            name: 'Action',
            grow: 0,
            cell: row =>
                <div>
                    <SuccessButton
                        style={{ borderRadius: "50%", padding: "6px 9px", marginRight: 5 }}
                        onClick={() => history.push(`/dashboard/role/edit/${row._id}`)}
                    ><Edit2 size={16} />
                    </SuccessButton>
                </div>
        }
    ]

    return (
        <div>
            <Layout
                page="dashboard / role"
                message="Role & Permissions."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/role/store">
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
                    />
                </div>
            </Main>
        </div>
    );
}

export default Index;