"use client";

import React, { useState, useEffect } from "react";
import { IconButton, Skeleton, chakra } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

// Custom ClientOnly component to prevent SSR issues
export function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return fallback;
  return children;
}

// Provide next-themes ThemeProvider wrapper
export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

// Update ColorModeButton using Chakra UI components
export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref
) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        sx={{
          _icon: {
            width: "1.25rem",
            height: "1.25rem",
          },
        }}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

const Span = chakra("span");

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      display="contents"
      className="chakra-theme light"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  );
});

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      display="contents"
      className="chakra-theme dark"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  );
});
