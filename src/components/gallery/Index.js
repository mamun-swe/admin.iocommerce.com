
import React, { useState } from 'react'
import { useWindowSize } from '../window/windowSize'
import ReactImageMagnify from 'react-image-magnify'

export const Gallery = (props) => {
    const size = useWindowSize()
    const [largeImage, setLargeImage] = useState(props.data.large)

    console.log(props.data)

    return (
        <div className="row">

            {/* Large images container */}
            <div className="col-12 col-lg-6">
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: '...',
                        src: largeImage,
                        width: size.width <= 1200 ? 300 : 450,
                        height: size.width <= 1200 ? 300 : 450
                    },
                    style: { margin: 'auto' },
                    imageClassName: 'magnifiySmallImage',
                    largeImage: {
                        src: largeImage,
                        width: 1200,
                        height: 1800
                    },
                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
                }} />
            </div>

            {/* Small images container */}
            <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                <div
                    className="border float-start m-1"
                    onClick={() => setLargeImage(props.data.large)}
                    style={{ width: 80, height: 80, cursor: "pointer" }}
                >
                    <img src={props.data.large} className="img-fluid" alt="..." width="80" height="80" />
                </div>

                {props.data && props.data.additional && props.data.additional.length ?
                    props.data.additional.map((item, i) =>
                        <div
                            key={i}
                            className="border float-start m-1"
                            onClick={() => setLargeImage(item)}
                            style={{ width: 80, height: 80, cursor: "pointer" }}
                        >
                            <img src={item} className="img-fluid" alt="..." width="80" height="80" />
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
};
