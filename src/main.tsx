import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles.css";
import App from "@/App.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ProviderAppKit } from "@/components/provider-appkit.tsx";
import { MoralisProvider } from "@/components/moralis-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderAppKit>
      <MoralisProvider>
        <App />
        <Toaster />
      </MoralisProvider>
    </ProviderAppKit>
  </React.StrictMode>
);
