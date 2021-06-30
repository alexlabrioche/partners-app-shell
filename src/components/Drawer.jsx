// import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "./animations/MotionWrapper";
import { PortalSource, PortalTarget } from "../shared/portals";

import styles from "./Drawer.module.css";
import { slideRightVariant } from "./animations/constants";

const TYPES = {
  HEADER: "DRAWER_HEADER",
  ACTIONS: "DRAWER_ACTIONS",
  CONTENT: "DRAWER_CONTENT",
};

const Drawer = ({ visible, hide, children }) => {
  const root = document.getElementById("drawer_root");

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
            variants={slideRightVariant}
            onClick={preventClickOutside}
            className={styles.drawer}
          >
            <PortalTarget type={TYPES.HEADER} />
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

export const DrawerHeader = ({ children }) => (
  <PortalSource type={TYPES.HEADER}>
    <div className={styles.header}>{children}</div>
  </PortalSource>
);

export const DrawerActions = ({ children }) => (
  <PortalSource type={TYPES.ACTIONS}>
    <div className={styles.actions}>{children}</div>
  </PortalSource>
);

export const DrawerContent = ({ children }) => (
  <PortalSource type={TYPES.CONTENT}>
    <div className={styles.content}>{children}</div>
  </PortalSource>
);

export default Drawer;
