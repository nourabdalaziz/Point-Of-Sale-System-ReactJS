import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Components_Styles/modal.css";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="main-modal-div">{children}</div>,
    elRef.current
  );
};

export default Modal;
