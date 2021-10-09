
import swal from 'sweetalert'

export const ErrorHandeller = error => {
    const errorResponse = error && error.response ? error.response.data : null

    if (errorResponse) {
        if (errorResponse.message === 'unauthorized request') {
            swal({
                title: "Error!",
                text: errorResponse.message + ' Logging out...',
                icon: "error",
                button: false,
            })

            setTimeout(() => {
                localStorage.clear()
                window.location.reload()
            }, 2000)
        } else if (errorResponse.message === 'Token expired') {
            swal({
                title: "Error!",
                text: error.message + ' Logging out...',
                icon: "error",
                button: false,
            })

            setTimeout(() => {
                localStorage.clear()
                window.location.reload()
            }, 2000)
        } else {
            swal({
                title: "Error Occurred!",
                text: errorResponse.message,
                icon: "error",
                button: false,
            })

            // window.location.replace("/501")
        }
    }
}
