import { User2Icon } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const NavigationItemProfile = () => {
  const { open } = useWeb3Modal();

  return (
    <button
      type="button"
      className="text-left"
      onClick={() => open({ view: "Profile" as any })}
    >
      <h5 className="text-sm font-medium leading-none gap-2 flex">
        <User2Icon size={14} /> Profile
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        View your profile and manage your account
      </p>
    </button>
  );
};

export default NavigationItemProfile;
