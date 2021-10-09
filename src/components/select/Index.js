import React from 'react'
import Select, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import CreatableSelect from 'react-select/creatable'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: 42,
        fontSize: 14,
        color: '#000',
        background: '#fff',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
        borderRadius: 4
    })
}

const errorStyle = {
    control: (provided) => ({
        ...provided,
        minHeight: 42,
        fontSize: 14,
        color: '#000',
        boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
        border: '1px solid red',
        borderRadius: 4
    })
}

// Single select
export const SingleSelect = (props) => {
    const handleSelect = event => props.value(event)

    return (
        <div>
            <Select
                styles={props.error ? errorStyle : customStyles}
                options={props.options}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={`Select ${props.placeholder}`}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.deafult ? { ...props.deafult } : null}
            />
        </div>
    );
}

// Multi Select
export const MultiSelect = (props) => {
    const handleSelect = event => props.values(event)

    return (
        <div>
            <Select
                isMulti
                ref={props.refs}
                styles={props.error ? errorStyle : customStyles}
                options={props.options || null}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={`Select ${props.placeholder}`}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.deafult ? props.deafult.map(item => ({ value: item.value, label: item.label })) : null}
            />
        </div>
    );
}

// Createable select
export const Creatable = (props) => {
    const handleSelect = event => {
        let values = []
        if (event && event.length) {
            for (let i = 0; i < event.length; i++) {
                const element = event[i]
                values.push(element.value)
            }
        }
        props.value(values)
    }

    return (
        <div>
            <CreatableSelect
                styles={props.error ? errorStyle : customStyles}
                isMulti
                options={props.options}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={props.placeholder}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.deafult ? props.deafult : null}
            />
        </div>
    );
}

// Searcable select
export const SearchableSelect = (props) => {
    const { Option } = components
    const styles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            fontSize: 14,
            color: '#000',
            background: '#fff',
            boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
            border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
            borderRadius: 25,
            paddingLeft: 5,
            paddingRight: 5
        })
    }

    // Add image in each option
    const Imageoption = (props) => (
        <Option {...props}>
            {props.data.image ? <img src={props.data.image} style={{ width: 30, height: 30, marginRight: 5 }} alt="..." /> : null}
            {props.data.label}
        </Option>
    );

    // Search from API
    const searchOptions = (inputValue, callback) => {
        props.search(inputValue).then(results => {
            if (results) {
                setTimeout(() => {
                    callback(results)
                }, 1000)
            }
        })
    }

    // Handle select
    const handleSelect = event => props.values(event)

    return (
        <div>
            <AsyncSelect
                cacheOptions
                styles={styles}
                isMulti={props.isMulti}
                onChange={handleSelect}
                loadOptions={searchOptions}
                placeholder={props.placeholder}
                loadingMessage={() => 'Searching ...'}
                noOptionsMessage={() => 'No results found !'}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Option: Imageoption
                }}
            />
        </div>
    )
}