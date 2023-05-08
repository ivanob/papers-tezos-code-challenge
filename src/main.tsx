import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import TezosDashboard from "./TezosDashboard";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
        <TezosDashboard/>
    </ChakraProvider>
  </React.StrictMode>
);
