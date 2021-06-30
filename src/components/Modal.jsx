// import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "./animations/MotionWrapper";
import { PortalSource, PortalTarget } from "../shared/portals";

import styles from "./Modal.module.css";
import { modalVariant } from "./animations/constants";

const TYPES = {
  TITLE: "MODAL_TITLE",
  ACTIONS: "MODAL_ACTIONS",
  CONTENT: "MODAL_CONTENT",
};

const Modal = ({ visible, hide, children }) => {
  const root = document.getElementById("modal_root");

  const onCloseHandler = (e) => {
    e.stopPropagation();
    hide();
  };

  const preventClickOutside = (e) => e.stopPropagation();

  return createPortal(
    <AnimatePresence>
      {visible && (
        <MotionWrapper onClick={onCloseHandler} className={styles.overlay}>
          <MotionWrapper
            variants={modalVariant}
            onClick={preventClickOutside}
            className={styles.modal}
          >
            <div className={styles.close}>
              <a onClick={onCloseHandler}>X</a>
            </div>
            <PortalTarget type={TYPES.TITLE} />
            <PortalTarget type={TYPES.CONTENT} />
            <PortalTarget type={TYPES.ACTIONS} />
            {children}
          </MotionWrapper>
        </MotionWrapper>
      )}
    </AnimatePresence>,
    root
  );
};

export const ModalTitle = ({ children }) => (
  <PortalSource type={TYPES.TITLE}>
    <div className={styles.title}>{children}</div>
  </PortalSource>
);

export const ModalActions = ({ children }) => (
  <PortalSource type={TYPES.ACTIONS}>
    <div className={styles.actions}>{children}</div>
  </PortalSource>
);

export const ModalContent = ({ children }) => (
  <PortalSource type={TYPES.CONTENT}>
    <div className={styles.content}>{children}</div>
  </PortalSource>
);

export default Modal;
