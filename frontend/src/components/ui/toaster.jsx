"use client";

import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast({
  // Optional default options; you can set placement or others here
  defaultOptions: {
    position: "bottom",
  },
});

// Export the toast function as "toaster" for consistency with your usage
export const toaster = toast;

export const Toaster = () => {
  return <ToastContainer />;
};
