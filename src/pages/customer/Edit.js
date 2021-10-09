
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { isValidEmail, isValidPhone } from '../../utils/_heplers'
import { Loader } from '../../components/loader/Index'
import { DatePicker } from '../../components/datepicker/Index'
import Requests from '../../utils/Requests/Index'

const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(true)
    const [isUpdate, setUpdate] = useState(false)

    const [data, setData] = useState({})
    const [dob, setDob] = useState({ value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const fetchData = useCallback(async () => {
        const response = await Requests.Customer.Show(id, header)
        if (response.status === 200) {
            setData(response.data.data)
            setDob(exDob => ({ ...exDob, value: response.data.data.dob }))
        }

        setLoading(false)
    }, [id, header])

    useEffect(() => {
        fetchData()
    }, [id, header, fetchData])

    // Submit Form
    const onSubmit = async (data) => {
        try {
            if (!dob.value) return setDob({ ...dob, error: "D.O.B is required." })

            const formData = {
                ...data,
                dob: dob.value
            }

            setUpdate(true)
            await Requests.Customer.Update(id, formData, header)
            setUpdate(false)
        } catch (error) {
            if (error) console.log(error)
        }
    }

    if (isLoading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / customer edit"
                message={`Edit ${data.name}.`}
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/customer">
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
                                        defaultValue={data ? data.name : null}
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
                                        defaultValue={data ? data.email : null}
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
                                        defaultValue={data ? data.phone : null}
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

                            {/* Gender */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.gender && errors.gender.message ?
                                        <p className="text-danger">{errors.gender && errors.gender.message}</p>
                                        : <p>Gender</p>}

                                    <select
                                        className="form-control shadow-none"
                                        defaultValue={data ? data.gender : null}
                                        {...register("gender", { required: "Gender is required" })}
                                    >
                                        <option value="">-- Select Gender --</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Marital Status */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.maritalStatus && errors.maritalStatus.message ?
                                        <p className="text-danger">{errors.maritalStatus && errors.maritalStatus.message}</p>
                                        : <p>Marital status</p>}

                                    <select
                                        className="form-control shadow-none"
                                        defaultValue={data ? data.maritalStatus : null}
                                        {...register("maritalStatus", { required: "Marital status is required" })}
                                    >
                                        <option value="">-- Select marital status --</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>
                            </div>

                            {/* D.O.B */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.dob && errors.dob.message ?
                                        <p className="text-danger">{errors.dob && errors.dob.message}</p>
                                        : <p>Date of birth</p>}

                                    <DatePicker
                                        default={dob.value ? dob.value : null}
                                        value={event => setDob({ value: event, error: null })}
                                    />
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