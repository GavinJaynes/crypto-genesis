import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, bsc, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: "Crypto Genesis",
  description: "Build the New Internet Hackathon - Submission by Garlic",
  url: "https://crypto-genesis.netlify.app/",
  icons: ["https://crypto-genesis.netlify.app/genesis.png"],
};

const chains = [mainnet, arbitrum, bsc] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    socials: ["google", "x", "github"],
  },
});

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeVariables: {
    "--w3m-z-index": 0,
  },
});

export function ProviderAppKit({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
