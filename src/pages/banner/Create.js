
import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { SingleSelect } from '../../components/select/Index'
import { FileUploader } from '../../components/fileUploader/Single'
import { Loader } from '../../components/loader/Index'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const [loading, setLoading] = useState(false)
    const [isStore, setStore] = useState(false)
    const [category, setCategory] = useState({ options: [], value: null, error: null })
    const [image, setImage] = useState({ value: null, error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    // Fetch category data 
    const fetchData = useCallback(async () => {
        setLoading(true)
        const response = await Requests.Options.Index(header)

        setCategory(exCategory => ({ ...exCategory, options: response.categories }))
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Handle form submission
    const handleSubmit = async event => {
        event.preventDefault()

        if (!category.value) return setCategory({ ...category, error: "Category is required." })
        if (!image.value) return setImage({ ...image, error: "Image is required." })

        setStore(true)
        const formData = new FormData()
        formData.append('category', category.value)
        formData.append('image', image.value)

        await Requests.Banner.Store(formData, header)
        setStore(false)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / banner store"
                message="Store new banner for visible to website."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/banner">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>
                <div className="col-12">
                    <form onSubmit={handleSubmit}>

                        {/* Category */}
                        <div className="form-group mb-4">
                            {category.error ? <p className="text-danger">{category.error}</p> : <p>Category</p>}

                            <SingleSelect
                                placeholder="category"
                                error={category.error}
                                options={category.options}
                                value={event => setCategory({ ...category, value: event.value, error: null })}
                            />
                        </div>


                        {/* File uploader */}
                        <FileUploader
                            width={150}
                            height={80}
                            limit={200}
                            title="Banner image"
                            error={image.error}
                            dataHandeller={(data) => setImage({ ...image, value: data.image || null, error: data.error || null })}
                        />


                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                disabled={isStore}
                                className="px-4"
                            >
                                {isStore ? "Loading ..." : "Submit"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Create;