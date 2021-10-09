
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import _ from 'lodash'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { MultiSelect } from '../../components/select/Index'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [permissions, setPermissions] = useState({ options: [], values: [] })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // fetch permissions
    const fetchData = useCallback(async () => {
        let options = []
        let selectedOptions = []

        const response = await Requests.Acl.Routes(header)

        if (response.data && response.data.length) {
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i]
                options.push({ label: _.capitalize(element.group), value: element.group })
            }
        }

        setPermissions({ options: options, values: selectedOptions })
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])


    // Handle permission
    const handlePermission = event => {
        setPermissions(exPermission => ({ ...exPermission, values: event }))
        clearErrors('permissions')
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

        setLoading(true)
        await Requests.Acl.Store(formData, header)
        setLoading(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / role create"
                message="Make new role for admin."
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
                                options={permissions.options}
                                values={handlePermission}
                            />
                        </div>

                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                className="px-4"
                                disabled={isLoading}
                            >{isLoading ? "Creating ..." : "Create"}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Create;