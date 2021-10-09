import React, { useState } from 'react'
import './style.scss'
import { Plus } from 'react-feather'

export const FileUploader = (props) => {
    const [selectedFile, setSelectedFile] = useState(props.deafult ? props.deafult : null)

    // Handle image
    const handleImage = event => {
        const file = event.target.files[0]
        if (file) {
            const size = parseInt(file.size) / 1000

            if (size > props.limit) {
                props.dataHandeller({ error: `Select less than ${props.limit}KB file.` })
                return
            }

            props.dataHandeller({ image: file })
            setSelectedFile(URL.createObjectURL(file))
        }
    }

    return (
        <div className="img-select-container">
            <div className="form-group mb-4">
                {props.error ? <small className="text-danger">{props.error}</small> : <small>{props.title}</small>}

                <div className="d-flex">

                    {/* Selected / Default file preview */}
                    {selectedFile || props.default ?
                        <div className="preview-container text-center me-2">
                            <div
                                className="image border"
                                style={{ width: props.width ? props.width : 80, height: props.height ? props.height : 80 }}
                            >
                                <img src={selectedFile || props.default} className="img-fluid" alt="..." />
                                {props.loading ?
                                    <div className="thumbnail-overlay flex-center flex-column">
                                        <div className="loader"></div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                        : null}

                    {/* Loading overlay */}
                    {props.loading &&
                        <div className="thumbnail-overlay flex-center flex-column">
                            <div className="loader"></div>
                        </div>
                    }

                    {/* New file add container */}
                    {!props.loading &&
                        <div className="add-container text-center">
                            <div
                                className="image-plus border"
                                style={{ width: props.width ? props.width : 80, height: props.height ? props.height : 80 }}
                            >
                                <input
                                    type="file"
                                    accept=".jpg, .png, .jpeg"
                                    className="upload"
                                    onChange={handleImage}
                                />
                                <div className="flex-center flex-column">
                                    <Plus size={22} />
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};