import * as React from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { BicepsFlexedIcon, WalletIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import { getEvmChain, formatNumber } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import NavigationItemWallet from "@/components/navigation-item-wallet";
import NavigationItemNetwork from "@/components/navigation-item-network";
import NavigationItemProfile from "@/components/navigation-item-profile";
import NavigationItemNetTotal from "@/components/navigation-item-net-total";
import NavigationItemDisconnect from "@/components/navigation-item-disconnect";
import NavigationItemNetworkSwitch from "@/components/navigation-item-network-switch";

const NavigationAccount = () => {
  const { open } = useWeb3Modal();
  const { address, chainId } = useAccount();

  const { totalNetWorth } = useWalletTokens({
    address,
    chain: getEvmChain(chainId || 56),
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2">
            <BicepsFlexedIcon size={16} />
            Do stuff
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] w-[340px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <div className="flex gap-4 h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 no-underline outline-none focus:shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-600 text-2xl tracking-tight">
                    Crypto Genesis
                  </span>
                  <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-300">
                    Beautifully designed wallet assistant to help you take
                    charge of your crypto assets.
                  </p>
                </div>
              </li>
              <ListItemButton
                onClick={() => open({ view: "OnRampProviders" })}
                title="Buy crypto"
              >
                Buy crypto with your credit card.
              </ListItemButton>
              <ListItemButton
                onClick={() => open({ view: "Swap" as any })}
                title="Swap crypto"
              >
                Swap your crypto assets with ease and see real-time updates.
              </ListItemButton>
              <ListItemButton
                onClick={() => open({ view: "Transactions" as any })}
                title="Transactions"
              >
                View your transaction history.
              </ListItemButton>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2 ">
            <WalletIcon size={16} />${formatNumber(totalNetWorth)} USD
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid  gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] w-[340px]">
              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemWallet address={address!} />
              </li>

              <span className="sm:hidden block w-3/4 h-px bg-gradient-to-tr from-gray-800/0 via-gray-800 to-gray-800/0 mx-auto"></span>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetTotal />
              </li>

              <span className="sm:hidden block w-3/4 h-px bg-gradient-to-tr from-gray-800/0 via-gray-800 to-gray-800/0 mx-auto"></span>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetwork />
              </li>

              <span className="sm:hidden block w-3/4 h-px bg-gradient-to-tr from-gray-800/0 via-gray-800 to-gray-800/0 mx-auto"></span>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetworkSwitch />
              </li>

              <span className="sm:hidden block w-3/4 h-px bg-gradient-to-tr from-gray-800/0 via-gray-800 to-gray-800/0 mx-auto"></span>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemProfile />
              </li>

              <span className="sm:hidden block w-3/4 h-px bg-gradient-to-tr from-gray-800/0 via-gray-800 to-gray-800/0 mx-auto"></span>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemDisconnect />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationAccount;

const ListItemHref = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItemHref.displayName = "ListItemHref";

const ListItemButton = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          ref={ref}
          className={cn(
            "block select-none text-left space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  );
});
ListItemButton.displayName = "ListItemButton";
