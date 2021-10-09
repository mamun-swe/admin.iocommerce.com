import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../components/button/Index'
import { Images } from '../../utils/Images'

const Index = () => {
    return (
        <div className="four-o-four" style={{ marginTop: "-70px" }}>
            <div className="flex-center flex-column px-4">
                <img src={Images.FourOFour} className="img-fluid" alt="Page not found" />
                <p>What are you looking for ? Page not found !</p>
                <Link to="/">
                    <PrimaryButton style={{ padding: "8px 30px" }}>Go Back</PrimaryButton>
                </Link>
            </div>
        </div>
    );
}

export default Index;