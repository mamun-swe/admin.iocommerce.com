import React from 'react'

const Index = (props) => {
    return (
        <div>
            <img
                src={props.src}
                className="img-fluid"
                alt={props.alt}
                style={{
                    width: props.x ? props.x : "100%",
                    height: props.y ? props.y : "100%"
                }}
            />
        </div>
    )
}

export default Index;