import React from 'react'
import './style.scss'
import { useWindowSize } from '../window/windowSize'

const Layout = (props) => {
    const display = useWindowSize()

    return (
        <div className="page-layout">
            <div className={props.container}>

                {/* Page Header */}
                <div className="row page-header">
                    <div className="col-12">
                        <div className="d-flex">
                            <div>
                                <p><span>{props.page}</span></p>
                                <h5>{props.message}</h5>
                            </div>
                            <div className="ms-auto text-end" style={{ minWidth: display.width > 576 ? 200 : 120 }}>
                                {props.button}
                            </div>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
}

const Main = (props) => {
    return (
        <div className="container-fluid mb-4">
            <div className="row">
                {props.children}
            </div>
        </div>
    );
}


export { Layout, Main };