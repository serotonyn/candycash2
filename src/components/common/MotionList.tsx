import { motion } from "framer-motion";
import { ReactNode } from "react";

import { tokens } from "@fluentui/react-components";

interface OwnProps {
  children: ReactNode;
}

export const MotionList = ({ children }: OwnProps) => {
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
      }}>
      {children}
    </motion.div>
  );
};
