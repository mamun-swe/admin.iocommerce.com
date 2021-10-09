import React from 'react'
import './style.scss'
import { Menu } from 'react-feather'
import Dropdown from './Dropdown'
import Image from '../image/Index'

import { Images } from '../../utils/Images'

const Index = (props) => {
    return (
        <div className="navbar-container">
            <div className="d-flex">
                <div><Image src={Images.LogoSm} alt="Company logo" x={50} y={42} /></div>
                <div><h6 className="text-capitalize mb-0">Admin</h6></div>
                <div className="ms-auto">
                    <Dropdown />
                </div>

                {props.menu &&
                    <div className="d-lg-none ps-2">
                        <button
                            type="button"
                            className="btn shadow-none rounded-circle"
                            onClick={props.drawer}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Index;