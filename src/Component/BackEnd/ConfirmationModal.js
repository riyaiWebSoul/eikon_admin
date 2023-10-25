import React from 'react'

const ConfirmationModal = ({ handleUpdate, setShowConfirmationModal }) => {
    return <div>
        <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Update</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={setShowConfirmationModal}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <div className="modal-body my-3">Are you sure you want to update?</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={setShowConfirmationModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdate}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </div>
}

export default ConfirmationModal