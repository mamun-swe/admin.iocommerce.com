
import React, { useState } from 'react'
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
import { districts } from '../../utils/Districts'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [shippingArea, setShippingArea] = useState({ options: districts, value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Submit Form
    const onSubmit = async (data) => {
        if (!shippingArea.value) return setShippingArea({ ...shippingArea, error: "Shipping area is required." })

        const formData = {
            ...data,
            shippingArea: shippingArea.value
        }

        setLoading(true)
        await Requests.Customer.Store(formData, header)
        setLoading(false)
    }

    return (
        <div>
            <Layout
                page="dashboard / customer create"
                message="Make New Customer."
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

                            {/* Gender */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.gender && errors.gender.message ?
                                        <p className="text-danger">{errors.gender && errors.gender.message}</p>
                                        : <p>Gender</p>}

                                    <select
                                        className="form-control shadow-none"
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

                                    <input
                                        type="date"
                                        className="form-control shadow-none"
                                        {...register("dob", { required: "Date of birth is required" })}
                                    />
                                </div>
                            </div>

                            {/* Shipping Area */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {shippingArea.error ? <p className="text-danger">{shippingArea.error}</p> : <p>Shipping area</p>}

                                    <SingleSelect
                                        placeholder="area"
                                        error={shippingArea.error}
                                        options={shippingArea.options}
                                        value={event => setShippingArea({ ...shippingArea, value: event.value, error: null })}
                                    />
                                </div>
                            </div>

                            {/* Delivery address */}
                            <div className="col-12 col-lg-6">
                                <div className="form-group mb-4">
                                    {errors.deliveryAddress && errors.deliveryAddress.message ?
                                        <p className="text-danger">{errors.deliveryAddress && errors.deliveryAddress.message}</p>
                                        : <p>Delivery address</p>}

                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Enter address"
                                        {...register("deliveryAddress", { required: "Delivery address is required" })}
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