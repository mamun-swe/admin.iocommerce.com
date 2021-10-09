
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'react-feather'
import JoditEditor from 'jodit-react'
import {
    GrayButton,
    PrimaryButton
} from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { FileUploader } from '../../components/fileUploader/Single'
import { SingleSelect, Creatable } from '../../components/select/Index'
import { MultiFileUploader } from '../../components/fileUploader/Multi'
import { Loader } from '../../components/loader/Index'
import Requests from '../../utils/Requests/Index'

const Create = () => {
    const editor = useRef(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(true)
    const [isCreate, setCreate] = useState(false)
    const [category, setCategory] = useState({ options: [], value: null, error: null })
    const [tags, setTags] = useState({ value: [], error: null })
    const [content, setContent] = useState('')
    const [image, setImage] = useState({ value: null, error: null })
    const [images, setImages] = useState({ value: [], error: null })
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    })

    const config = {
        readonly: false,
        minHeight: 350,
        uploader: {
            "insertImageAsBase64URI": true
        }
    }

    // Fetch data
    const fetchData = useCallback(async () => {
        const optionsRes = await Requests.Options.Index(header)
        if (optionsRes) setCategory(exCategory => ({ ...exCategory, options: optionsRes.categories }))
        setLoading(false)
    }, [header])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Handle form submission
    const onSubmit = async data => {

        if (!category.value) return setCategory({ ...category, error: "Category is required." })
        if (!tags.value.length) return setTags({ ...tags, error: "Tags is required." })
        if (!image.value) return setImage({ ...image, error: "Product image is required." })
        if (!images.value.length) return setImages({ ...images, error: "Additional images is required." })

        setCreate(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('category', category.value)
        formData.append('tags', tags.value)
        formData.append('sku', data.sku)
        formData.append('stockAmount', data.stockAmount)
        formData.append('purchasePrice', data.purchasePrice)
        formData.append('salePrice', data.salePrice)
        formData.append('description', content)
        formData.append('video', data.video)
        formData.append('image', image.value)
        for (const key of Object.keys(images.value)) {
            formData.append('images', images.value[key])
        }


        await Requests.Product.Store(formData, header)
        setCreate(false)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / product store"
                message="Store new product for visible to website."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/product">
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
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name */}
                        <div className="form-group mb-4">
                            {errors.name && errors.name.message ?
                                <p className="text-danger">{errors.name && errors.name.message}</p>
                                : <p>Product name</p>}

                            <input
                                type="text"
                                placeholder="Enter product name"
                                className={errors.name ? "form-control shadow-none error" : "form-control shadow-none"}
                                {...register("name", { required: "Product name is required" })}
                            />
                        </div>

                        <div className="row">

                            {/* Category */}
                            <div className="col-12 col-lg-4">
                                <div className="form-group mb-4">
                                    {category.error ?
                                        <p className="text-danger">{category.error}</p>
                                        : <p>Category</p>}

                                    <SingleSelect
                                        placeholder="category"
                                        error={category.error}
                                        options={category.options}
                                        value={event => setCategory({ ...category, value: event.value, error: null })}
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="col-12 col-lg-8">
                                <div className="form-group mb-4">
                                    {tags.error ?
                                        <p className="text-danger">{tags.error}</p>
                                        : <p>Tags</p>}

                                    <Creatable
                                        placeholder="Enter tags"
                                        error={tags.error}
                                        value={event => setTags({ value: event, error: null })}
                                    />
                                </div>
                            </div>

                            {/* SKU */}
                            <div className="col-12 col-lg-6 col-xl-3">
                                <div className="form-group mb-4">
                                    {errors.sku && errors.sku.message ?
                                        <p className="text-danger">{errors.sku && errors.sku.message}</p>
                                        : <p>Product SKU</p>}

                                    <input
                                        type="text"
                                        placeholder="Enter product SKU"
                                        className={errors.sku ? "form-control shadow-none error" : "form-control shadow-none"}
                                        {...register("sku", { required: "Product SKU is required" })}
                                    />
                                </div>
                            </div>

                            {/* Stock amount */}
                            <div className="col-12 col-lg-6 col-xl-3">
                                <div className="form-group mb-4">
                                    {errors.stockAmount && errors.stockAmount.message ?
                                        <p className="text-danger">{errors.stockAmount && errors.stockAmount.message}</p>
                                        : <p>Stock amount</p>}

                                    <input
                                        type="number"
                                        placeholder="Enter stock amount"
                                        className={errors.stockAmount ? "form-control shadow-none error" : "form-control shadow-none"}
                                        {...register("stockAmount", { required: "Stock amount is required" })}
                                    />
                                </div>
                            </div>

                            {/* Purchase price */}
                            <div className="col-12 col-lg-6 col-xl-3">
                                <div className="form-group mb-4">
                                    {errors.purchasePrice && errors.purchasePrice.message ?
                                        <p className="text-danger">{errors.purchasePrice && errors.purchasePrice.message}</p>
                                        : <p>Purchase price</p>}

                                    <input
                                        type="number"
                                        placeholder="Enter stock amount"
                                        className={errors.purchasePrice ? "form-control shadow-none error" : "form-control shadow-none"}
                                        {...register("purchasePrice", { required: "Purchase price is required" })}
                                    />
                                </div>
                            </div>

                            {/* Sale price */}
                            <div className="col-12 col-lg-6 col-xl-3">
                                <div className="form-group mb-4">
                                    {errors.salePrice && errors.salePrice.message ?
                                        <p className="text-danger">{errors.salePrice && errors.salePrice.message}</p>
                                        : <p>Sale price</p>}

                                    <input
                                        type="number"
                                        placeholder="Enter stock amount"
                                        className={errors.salePrice ? "form-control shadow-none error" : "form-control shadow-none"}
                                        {...register("salePrice", { required: "Sale price is required" })}
                                    />
                                </div>
                            </div>

                        </div>


                        {/* Description */}
                        <div className="form-group mb-4">
                            <p>Description</p>

                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={8}
                                onBlur={newContent => setContent(newContent)}
                            />
                        </div>

                        {/* Youtube embed link */}
                        <div className="form-group mb-4">
                            <p>Youtube embed link</p>

                            <input
                                type="text"
                                placeholder="Enter youtube embed link"
                                className="form-control shadow-none"
                                {...register("video")}
                            />
                        </div>

                        {/* Single File uploader */}
                        <FileUploader
                            width={100}
                            height={100}
                            limit={100}
                            title="Product image"
                            error={image.error}
                            dataHandeller={(data) => setImage({ ...image, value: data.image || null, error: data.error || null })}
                        />

                        {/* Additional images */}
                        <MultiFileUploader
                            width={100}
                            height={100}
                            limit={8192}
                            error={images.error}
                            title="Additional images"
                            dataHandeller={(data) => setImages({ ...images, value: data.images || null, error: data.error || null })}
                        />

                        <div className="text-end">
                            <PrimaryButton
                                type="submit"
                                disabled={isCreate}
                                className="px-4"
                            >
                                {isCreate ? "Loading ..." : "Submit"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    );
}

export default Create;