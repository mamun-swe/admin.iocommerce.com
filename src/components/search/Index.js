import React, { useState } from 'react'
import './style.scss'
import { Search } from 'react-feather'

const Index = (props) => {
    const [data, setData] = useState({ value: null, error: false })

    const handleChange = event => {
        if (event.target.value) {
            setData({ value: event.target.value, error: false })
        } else {
            props.clear()
        }
    }

    // Submit Form
    const onSubmit = event => {
        event.preventDefault()

        if (!data.value) return setData({ ...data, error: true })
        props.search({ query: data.value })
    }

    return (
        <div className="search-component">
            <form onSubmit={onSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        name="query"
                        placeholder={`${'Search'} ${props.placeholder}`}
                        className={data.error ? "form-control form-control-sm shadow-none error" : "form-control form-control-sm shadow-none"}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="btn btn-sm shadow-none"
                        disabled={props.loading}
                    >
                        {props.loading ? <div className="btn-loader"></div> : <Search size={18} />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Index;
