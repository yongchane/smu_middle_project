"use client";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
