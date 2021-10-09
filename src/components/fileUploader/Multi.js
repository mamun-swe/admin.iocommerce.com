import React, { useEffect, useState } from 'react'
import './style.scss'
import { Plus } from 'react-feather'

export const MultiFileUploader = (props) => {
    const [error, setError] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState({
        values: null,
        previews: props.deafult && props.deafult.length ? [...props.deafult] : []
    })

    useEffect(() => {
        if (props.error) setError(props.error)
    }, [props.error])

    // Handle image
    const handleImages = event => {
        let size = 0
        let fileArray = []
        const files = event.target.files

        for (let i = 0; i < files.length; i++) {
            fileArray.push(URL.createObjectURL(files[i]))
            size += files[i].size
        }

        if (fileArray.length < 2) {
            return setError('Select more than 2 files.')
        } else if (parseInt(size / 1000) > props.limit) {
            return setError('Total size limit is 8MB')
        }
        setSelectedFiles({ values: files, previews: fileArray })
        props.dataHandeller({ images: files })
    }

    return (
        <div className="img-select-container">
            <div className="form-group mb-4">
                {error ? <small className="text-danger">{error}</small> : <small>{props.title}</small>}

                <div className="d-flex">

                    {/* Files preview */}
                    {selectedFiles.previews && selectedFiles.previews.length ?
                        selectedFiles.previews.map((file, i) =>
                            <div className="preview-container text-center me-2" key={i}>
                                <div className="image border" style={{ width: props.width ? props.width : 80, height: props.height ? props.height : 80 }}>
                                    <img src={file} className="img-fluid" alt="..." />
                                    {props.loading ?
                                        <div className="thumbnail-overlay flex-center flex-column">
                                            <div className="loader"></div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        ) : null}

                    {/* Loading overlay */}
                    {props.loading &&
                        <div className="thumbnail-overlay flex-center flex-column">
                            <div className="loader"></div>
                        </div>
                    }

                    {/* Files select  */}
                    {!props.loading &&
                        <div className="add-container text-center">
                            <div
                                className="image-plus border"
                                style={{ width: props.width ? props.width : 80, height: props.height ? props.height : 80 }}
                            >
                                <input
                                    type="file"
                                    className="upload"
                                    multiple
                                    accept=".jpg, .png, .jpeg"
                                    onChange={handleImages} />
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