
import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import Requests from '../../utils/Requests/Index'

const ChangePassword = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Submit Form
    const onSubmit = async (data) => {
        try {
            if (data.newPassword !== data.confirmPassword) {
                return setError("confirmPassword", {
                    type: "manual",
                    message: "Password doesn't match with new password",
                })
            }

            setLoading(true)
            const response = await Requests.Profile.ChangePassword(data, header)
            if (response.status === 201) {
                swal({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    button: false
                })
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                swal({
                    title: "Success!",
                    text: error.response.data.message,
                    icon: "error",
                    button: false
                })
            }
        }
    }

    return (
        <div>
            <Layout
                page="dashboard / change password"
                message="Update your old password."
                container="container-fluid"
            />

            <Main>
                <div className="col-12 col-lg-6 col-xl-5 m-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Old Password */}
                        <div className="form-group mb-4">
                            {errors.oldPassword && errors.oldPassword.message ?
                                <p className="text-danger">{errors.oldPassword && errors.oldPassword.message}</p>
                                : <p>Old password</p>}

                            <input
                                type="password"
                                className="form-control shadow-none"
                                placeholder="Enter old password"
                                {...register("oldPassword", {
                                    required: "Old password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimun length 8 character"
                                    }
                                })}
                            />
                        </div>

                        {/* New Password */}
                        <div className="form-group mb-4">
                            {errors.newPassword && errors.newPassword.message ?
                                <p className="text-danger">{errors.newPassword && errors.newPassword.message}</p>
                                : <p>New password</p>}

                            <input
                                type="password"
                                className="form-control shadow-none"
                                placeholder="Enter new password"
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimun length 8 character"
                                    }
                                })}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mb-4">
                            {errors.confirmPassword && errors.confirmPassword.message ?
                                <p className="text-danger">{errors.confirmPassword && errors.confirmPassword.message}</p>
                                : <p>Confirm password</p>}

                            <input
                                type="password"
                                className="form-control shadow-none"
                                placeholder="Enter confirm password"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimun length 8 character"
                                    }
                                })}
                            />
                        </div>

                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                className="px-4"
                                disabled={isLoading}
                            >{isLoading ? "Updating ..." : "Update Password"}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default ChangePassword;