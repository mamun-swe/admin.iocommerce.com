
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import _ from 'lodash'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { MultiSelect } from '../../components/select/Index'
import { Loader } from '../../components/loader/Index'
import Requests from '../../utils/Requests/Index'

const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const [data, setData] = useState(null)
    const [isUpdate, setUpdate] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [permissions, setPermissions] = useState({ options: [], values: [] })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // fetch permissions
    const fetchData = useCallback(async () => {
        try {
            let options = []
            let selectedOptions = []

            const response = await Requests.Acl.Routes(header)
            const roleResponse = await Requests.Acl.Show(id, header)

            if (roleResponse && roleResponse.status) {
                setData(roleResponse.data)

                if (roleResponse.data.rights && roleResponse.data.rights.length) {
                    for (let i = 0; i < roleResponse.data.rights.length; i++) {
                        const element = roleResponse.data.rights[i]
                        selectedOptions.push({ value: element, label: _.capitalize(element) })
                    }
                }
            }

            if (response.data && response.data.length) {
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i]
                    options.push({ label: _.capitalize(element.group), value: element.group })
                }
            }

            setPermissions({ options: options, values: selectedOptions })
            setLoading(false)
        } catch (error) {
            if (error) console.log(error)
        }
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    // Handle permission
    const handlePermission = data => {
        setPermissions(exPermission => ({ ...exPermission, values: data.map(item => ({ value: item.value, label: _.capitalize(item.label) })) }))
        clearErrors(["permissions"])
    }

    // Submit Form
    const onSubmit = async (data) => {
        if (!permissions.values.length) {
            return setError("permissions", {
                type: "manual",
                message: "Permissions is required.",
            });
        }

        const formData = {
            ...data,
            rights: permissions.values.map(item => item.value)
        }

        setUpdate(true)
        await Requests.Acl.Update(id, formData, header)
        setUpdate(false)
    }

    if (isLoading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / role edit"
                message="Edit role for admin."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/role">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Role */}
                        <div className="form-group mb-4">
                            {errors.role && errors.role.message ?
                                <p className="text-danger">{errors.role && errors.role.message}</p>
                                : <p>Role</p>}

                            <input
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Enter role title"
                                defaultValue={data && data.role ? data.role : null}
                                {...register("role", { required: "Role title is required" })}
                            />
                        </div>


                        {/* Permission */}
                        <div className="form-group mb-4">
                            {errors.permissions && errors.permissions.message ?
                                <p className="text-danger">{errors.permissions && errors.permissions.message}</p>
                                : <p>Permissions</p>}

                            <MultiSelect
                                placeholder="permissions"
                                error={errors.permissions}
                                deafult={permissions.values}
                                options={permissions.options}
                                values={handlePermission}
                            />
                        </div>

                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                className="px-4"
                                disabled={isUpdate}
                            >{isUpdate ? "Updating ..." : "Update"}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Edit;