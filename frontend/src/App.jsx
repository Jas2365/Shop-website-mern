import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Box minHeight={"100vh"} bg={useColorModeValue("blue.100", "blue.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>

      <Toaster />
    </Box>
  );
}

export default App;
