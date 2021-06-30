import { motion } from "framer-motion";
import { base } from "./constants";

const MotionWrapper = ({ variants = base, children, ...props }) => (
  <motion.div
    variants={variants}
    transition={{
      duration: 0.5,
      ease: [0.83, 0, 0.17, 1],
    }}
    initial="initial"
    animate="in"
    exit="out"
    {...props}
  >
    {children}
  </motion.div>
);

export default MotionWrapper;
