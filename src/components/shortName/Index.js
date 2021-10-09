import React from 'react'

export const ShortName = (props) => {
    const styles = {
        container: {
            width: props.x ? props.x : 50,
            height: props.y ? props.y : 50,
            background: "#dfdfdf",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%"
        },
        text: {
            fontSize: props.size ? props.size : 20,
            fontWeight: 600,
            color: "#000",
            margin: 0
        }
    }
    return (
        <div style={styles.container}>
            <h5 style={styles.text}>{props.name ? props.name.toUpperCase().slice(0, 1) : null}</h5>
        </div>
    )
}