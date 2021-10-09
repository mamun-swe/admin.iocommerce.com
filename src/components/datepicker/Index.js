import React from 'react'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const DatePicker = (props) => {
    return (
        <div>
            <ReactDatePicker
                className="form-control shadow-none"
                selected={new Date(props.default)}
                onChange={(date) => props.value(date)}
            />
        </div>
    );
}