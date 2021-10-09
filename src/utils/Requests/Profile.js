import Axios from 'axios'
import swal from 'sweetalert'
import { api } from '../api'
import { ErrorHandeller } from './Error'

// My profile
const MyProfile = async (header) => {
    try {
        const response = await Axios.get(`${api}profile`, header)
        if (response.status === 200) return response.data
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Update my profile
const UpdateProfile = async (data, header) => {
    try {
        const response = await Axios.put(`${api}profile`, data, header)
        if (response.status === 201) {
            swal({
                title: "Successfully!",
                text: response.data.message,
                icon: "success",
                button: false,
            })
            return true
        }
    } catch (error) {
        if (error) return ErrorHandeller(error)
    }
}

// Change password
const ChangePassword = async (data, header) => {
    const response = await Axios.put(`${api}profile/change-password`, data, header)
    return response
}

const Profile = {
    MyProfile,
    UpdateProfile,
    ChangePassword
}

export default Profile