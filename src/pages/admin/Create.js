
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { isValidEmail, isValidPhone } from '../../utils/_heplers'
import { SingleSelect } from '../../components/select/Index'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [role, setRole] = useState({ options: [], value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        let paths = []
        const roles = await Requests.Acl.Role(header)

        if (roles.data && roles.data.length) {
            for (let i = 0; i < roles.data.length; i++) {
                const element = roles.data[i]
                paths.push({
                    label: element.role,
                    value: element._id
                })
            }
        }

        setRole(exRoles => ({ ...exRoles, options: paths }))
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [header, fetchData])

    // Submit Form
    const onSubmit = async (data) => {
        if (!role.value) return setRole({ ...role, error: "Role is required." })

        const formData = {
            ...data,
            role: role.value
        }

        setLoading(true)
        await Requests.Admin.Store(formData, header)
        setLoading(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / admin create"
                message="Make New Admin."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/admin">
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
                        <div className="row">

                            {/* Name */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.name && errors.name.message ?
                                        <p className="text-danger">{errors.name && errors.name.message}</p>
                                        : <p>Name</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter name"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 5,
                                                message: "Minimun length 5 character"
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.email && errors.email.message ?
                                        <p className="text-danger">{errors.email && errors.email.message}</p>
                                        : <p>E-mail</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter e-mail"
                                        {...register("email", {
                                            required: "E-mail is required",
                                            pattern: {
                                                value: isValidEmail(),
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.phone && errors.phone.message ?
                                        <p className="text-danger">{errors.phone && errors.phone.message}</p>
                                        : <p>Phone</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter phone number"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: isValidPhone(),
                                                message: "Phone number is not valid."
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Present Address */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.presentAddress && errors.presentAddress.message ?
                                        <p className="text-danger">{errors.presentAddress && errors.presentAddress.message}</p>
                                        : <p>Present Address</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter address"
                                        {...register("presentAddress", { required: "Present address is required" })}
                                    />
                                </div>
                            </div>

                            {/* Permanent Address */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.permanentAddress && errors.permanentAddress.message ?
                                        <p className="text-danger">{errors.permanentAddress && errors.permanentAddress.message}</p>
                                        : <p>Permanent Address</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter address"
                                        {...register("permanentAddress", { required: "Permanent address is required" })}
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {role.error ? <p className="text-danger">{role.error}</p> : <p>Role</p>}

                                    <SingleSelect
                                        placeholder="role"
                                        error={role.error}
                                        options={role.options}
                                        value={event => setRole({ ...role, value: event.value, error: null })}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="col-12">
                                <div className="form-group mb-4">
                                    {errors.password && errors.password.message ?
                                        <p className="text-danger">{errors.password && errors.password.message}</p>
                                        : <p>Password</p>}

                                    <input
                                        type="password"
                                        className="form-control shadow-none"
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Minimun length 8 character"
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="col-12 text-end">
                                <PrimaryButton
                                    type="submit"
                                    className="px-4"
                                    disabled={isLoading}
                                >{isLoading ? "Creating ..." : "Create"}</PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Create;