import { LogOutIcon, User2Icon } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const NavigationItemDisconnect = () => {
  const { open } = useWeb3Modal();

  return (
    <button
      type="button"
      className="text-left"
      onClick={() => open({ view: "AccountSettings" as any })}
    >
      <h5 className="text-sm font-medium leading-none gap-2 flex">
        <LogOutIcon size={14} /> Disconnect wallet
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        Bye bye, so long...
      </p>
    </button>
  );
};

export default NavigationItemDisconnect;
