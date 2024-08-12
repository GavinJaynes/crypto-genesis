import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles.css";
import App from "@/App.tsx";
import { Toaster } from "@/components/ui/sonner";
import { ProviderAppKit } from "@/components/provider-appkit.tsx";
import { ProviderMoralis } from "@/components/provider-moralis";

import { ThemeProvider } from "@/components/provider-theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProviderAppKit>
        <ProviderMoralis>
          <App />
          <Toaster />
        </ProviderMoralis>
      </ProviderAppKit>
    </ThemeProvider>
  </React.StrictMode>
);
