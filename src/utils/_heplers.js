
// Formate array data as options
export const OptionMaker = data => {
    let options = []
    if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i]
            options.push({
                label: element,
                value: element,
            })
        }
    }

    return options
}

// Date formate
export const DateFormate = (date) => {
    const givenDate = new Date(date)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const day = givenDate.getDate()
    const month = months[givenDate.getMonth()]
    const year = givenDate.getFullYear()
    const changeDate = day + " " + month + ", " + year

    return changeDate
}

// Phone number valid check
export const isValidPhone = () => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i
    return regex
}

// E-mail valid check
export const isValidEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return regex
}