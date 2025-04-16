import { motion } from "framer-motion";

import { tokens } from "@fluentui/react-components";


import { HTMLMotionProps } from "framer-motion";

export const MotionList = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXXL,
        height: "100%",
      }} {...props}>
      {children}
    </motion.div>
  );
};
