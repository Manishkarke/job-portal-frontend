import React from 'react'
import { createPortal } from 'react-dom'

const tailwindCLass = {
    backdrop: "fixed z-30 top-0 left-0 w-full h-screen bg-neutral-200",
    modal: "fixed z-30 top-1/4 left-1/4 right-1/4 bg-white shadow-xl rounded-lg",
    modalContent: ""
}
export const ModalLayout = ({children, closeModal}) => {
  return createPortal(
    <>
    <div className={tailwindCLass.backdrop} onClick={() => closeModal(false)} />
    <div className={tailwindCLass.modal}>
        <div className={tailwindCLass.modalContent}>
            {children}
        </div>
    </div>
    </>, document.getElementById('portal')
  )
}
