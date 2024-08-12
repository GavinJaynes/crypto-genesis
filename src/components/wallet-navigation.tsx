import { EvmErc20TokenBalanceWithPrice } from "@moralisweb3/common-evm-utils";

const WalletNavigation = ({
  isLoading,
  walletTokens,
}: {
  isLoading: boolean;
  walletTokens: EvmErc20TokenBalanceWithPrice[];
}) => {
  if (isLoading || !walletTokens || walletTokens.length === 0) {
    return null;
  }

  return (
    <nav className="fixed right-3 sm:right-6 top-0 h-screen w-12">
      <ul className="flex flex-col gap-6 sm:justify-center py-10 items-center h-full">
        {walletTokens.map((token, index) => (
          <li key={index} className="text-xs">
            <a href={`#${token.symbol}`}>
              <span className="sr-only">{token.symbol}</span>
              <img
                src={token.logo}
                width={50}
                height={50}
                alt={token.symbol}
                className="rounded-full w-6 h-auto"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default WalletNavigation;
