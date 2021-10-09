import React from 'react'
import {
    DropdownButton,
    Dropdown
} from 'react-bootstrap'
import {
    Settings,
    Edit3,
    LogOut
} from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { ShortName } from '../shortName/Index'

const DropdownComponent = () => {
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <DropdownButton
            title={
                <ShortName
                    name="Admin"
                    x={38}
                    y={38}
                    size={18}
                />
            }>

            <Dropdown.Header>
                <ShortName
                    name="Admin"
                    x={55}
                    y={55}
                    size={25}
                />
                <h6 className="text-capitalize mt-2 mb-0">Admin Profile</h6>
            </Dropdown.Header>

            <div className="dropdown-body">
                <Dropdown.Item as={Link} to="/dashboard/profile">
                    <Settings size={15} className="icon" />
                    <span>My Profile</span>
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/dashboard/profile/change-password">
                    <Edit3 size={15} className="icon" />
                    <span>Edit Password</span>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                    <LogOut size={15} className="icon" />
                    <span>Sign Out</span>
                </Dropdown.Item>
            </div>
        </DropdownButton>
    )
}

export default DropdownComponent;
