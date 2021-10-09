import React from 'react'
import { X } from 'react-feather'
import { Modal } from 'react-bootstrap'
import { DangerButton, GrayButton } from '../../button/Index'

const Index = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            centered
            className="custom-modal"
        >
            <Modal.Header>
                <div className="d-flex">
                    <div><h6 className="mb-0">Are tou sure?</h6></div>
                    <div className="ms-auto">
                        <GrayButton
                            type="button"
                            onClick={props.onHide}
                            style={{ padding: "7px 10px", borderRadius: "50%" }}
                        ><X size={16} /></GrayButton>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {props.message}

                <div className="pt-4">
                    <DangerButton
                        type="button"
                        disabled={props.loading}
                        style={{ padding: "8px 20px", borderRadius: 4, marginRight: 5 }}
                        onClick={props.doDelete}
                    >{props.loading ? "Deleting ..." : "Yes"}</DangerButton>

                    <GrayButton
                        type="button"
                        style={{ padding: "8px 20px", borderRadius: 4 }}
                        onClick={props.onHide}
                    >No</GrayButton>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Index;
