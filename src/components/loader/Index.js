import React from 'react'
import './style.scss'

export const Loader = () => {
    return (
        <div className="data-loader-container">
            <div className="flex-center flex-column">
                <div className="loader"></div>
            </div>
        </div>
    );
};