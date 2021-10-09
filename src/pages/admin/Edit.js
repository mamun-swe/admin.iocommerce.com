
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { SingleSelect } from '../../components/select/Index'
import { Loader } from '../../components/loader/Index'
import Requests from '../../utils/Requests/Index'

const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(true)
    const [isUpdate, setUpdate] = useState(false)
    const [data, setData] = useState({})
    const [role, setRole] = useState({ options: [], value: null, error: null })
    const [status, setStatus] = useState(null)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        let paths = []
        const roles = await Requests.Acl.Role(header)
        const response = await Requests.Admin.Show(id, header)

        if (roles.data && roles.data.length) {
            for (let i = 0; i < roles.data.length; i++) {
                const element = roles.data[i]
                paths.push({
                    label: element.role,
                    value: element._id
                })
            }
        }

        setData(response.data)
        setStatus(response.data.accountStatus)
        setRole(exRoles => ({ ...exRoles, options: paths, value: response.data.role._id }))

        setLoading(false)
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    // Handle checkbox
    const handleCheckBox = event => setStatus(event.target.value)

    // Submit Form
    const onSubmit = async (data) => {
        if (!role.value) return setRole({ ...role, error: "Role is required." })

        setUpdate(true)
        const formData = {
            ...data,
            role: role.value,
            accountStatus: status
        }

        await Requests.Admin.Update(id, formData, header)
        setUpdate(false)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / admin edit"
                message={`Edit ${data.name}.`}
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
                                        defaultValue={data.name ? data.name : null}
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
                                    <p>E-mail</p>

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter e-mail"
                                        defaultValue={data.email ? data.email : null}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    <p>Phone</p>

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter phone number"
                                        defaultValue={data.phone ? data.phone : null}
                                        readOnly
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
                                        defaultValue={data.address && data.address.presentAddress ? data.address.presentAddress : null}
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
                                        defaultValue={data.address && data.address.permanentAddress ? data.address.permanentAddress : null}
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
                                        deafult={data.role ? { label: data.role.role, value: data.role.role } : null}
                                        value={event => setRole({ ...role, value: event.value, error: null })}
                                    />
                                </div>
                            </div>

                            {/* Active Status */}
                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-4 pt-4">
                                    <Form.Group controlId="isActive">
                                        <Form.Check
                                            type="checkbox"
                                            value="Active"
                                            label="Active"
                                            checked={status === 'Active'}
                                            onChange={handleCheckBox}
                                        />
                                    </Form.Group>

                                    <Form.Group className="ms-3" controlId="isDeactive">
                                        <Form.Check
                                            type="checkbox"
                                            value="Deactive"
                                            label="Deactive"
                                            checked={status === 'Deactive'}
                                            onChange={handleCheckBox}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="col-12 text-end">
                                <PrimaryButton
                                    type="submit"
                                    className="px-4"
                                    disabled={isUpdate}
                                >{isUpdate ? "Updating ..." : "Update"}</PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Edit;