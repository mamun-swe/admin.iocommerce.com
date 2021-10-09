import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../components/button/Index'
import { Images } from '../../utils/Images'

const Index = () => {
    return (
        <div className="four-o-four" style={{ marginTop: "-70px" }}>
            <div className="flex-center flex-column px-4">
                <img src={Images.ServerError} className="img-fluid" alt="Server error" />
                <p>Opps !! Unexpected server error !!</p>
                <Link to="/">
                    <PrimaryButton style={{ padding: "8px 30px" }}>Go Back</PrimaryButton>
                </Link>
            </div>
        </div>
    );
}

export default Index;