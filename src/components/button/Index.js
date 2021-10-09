import React from 'react'
import './style.scss'

// Gray button
const GrayButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-gray shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Primary button
const PrimaryButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-primary shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Primary outline button
const PrimaryOutlineButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-primary-outline shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

// Primary outline badge button
const PrimaryOutlineBadgeButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-primary-outline-badge shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
            {props.badgeValue ? <div className="badge-container flex-center flex-column">{props.badgeValue}</div> : null}
        </button>
    )
}

// Success button
const SuccessButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-success shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Danger button
const DangerButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-danger shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export {
    GrayButton,
    PrimaryButton,
    PrimaryOutlineButton,
    PrimaryOutlineBadgeButton,
    SuccessButton,
    DangerButton
};