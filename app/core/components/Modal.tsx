import React from "react"

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal inline-block" : "modal hidden"

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a>
      </div>
    </div>
  )
}

export default Modal
