import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BicepsFlexedIcon, WalletIcon } from "lucide-react";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import { truncatedAddress } from "@/lib/utils";
import NavigationItemWallet from "./navigation-item-wallet";
import NavigationItemNetTotal from "./navigation-item-net-total";
import NavigationItemNetwork from "./navigation-item-network";
import NavigationItemNetworkSwitch from "./navigation-item-network-switch";
import NavigationItemProfile from "./navigation-item-profile";
import NavigationItemDisconnect from "./navigation-item-disconnect";

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: "Connected wallet",
  //   href: "/docs/primitives/alert-dialog",
  //   description:
  //     "A modal dialog that interrupts the user with important content and expects a response.",
  // },
  // {
  //   title: "Switch wallet account",
  //   href: "/docs/primitives/hover-card",
  //   description:
  //     "For sighted users to preview content available behind a link.",
  // },
  // {
  //   title: "Connect network",
  //   href: "/docs/primitives/progress",
  //   description:
  //     "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  // },
  // {
  //   title: "Switch networks",
  //   href: "/docs/primitives/scroll-area",
  //   description: "Visually or semantically separates content.",
  // },
  // {
  //   title: "Account settings",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  {
    title: "Disconnect wallet",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element ",
  },
];

const NavigationAccount = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2">
            <BicepsFlexedIcon size={16} />
            Do stuff
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <BicepsFlexedIcon />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Wallet Pal
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed wallet assistant to help you keep
                      track of your crypto assets.
                    </p>
                  </a>
                </NavigationMenuLink>
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
          <NavigationMenuTrigger className="gap-2">
            <WalletIcon size={16} />
            {truncatedAddress(address!)}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemWallet address={address!} />
              </li>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetTotal />
              </li>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetwork />
              </li>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemNetworkSwitch />
              </li>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemProfile />
              </li>

              <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <NavigationItemDisconnect />
              </li>

              {/* {components.map((component) => (
                <ListItemHref key={component.title} title={component.title}>
                  {component.description}
                </ListItemHref>
              ))} */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <ButtonAccount />
        </NavigationMenuItem> */}
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
