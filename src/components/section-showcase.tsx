import { BadgeCheckIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import showcaseImage from "@/assets/showcase.png";
import bgGradient from "@/assets/bg-gradient.jpg";

import { ButtonModal } from "@/components/button-modal";

const features = [
  {
    name: "Cosmic Convenience: ",
    description:
      "Login with your favorite social accounts and blast off into the crypto universe in seconds.",
    icon: BadgeCheckIcon,
  },
  {
    name: "Earth-to-Crypto Launchpad: ",
    description:
      "Use your earthly currency to fuel your journey – buy crypto directly with fiat, no lunar exchange required.",
    icon: BadgeCheckIcon,
  },
  {
    name: "Warp-Speed Swaps: ",
    description:
      "Trade cryptocurrencies at the speed of light, with real-time rates that won't leave you lost in space.",
    icon: BadgeCheckIcon,
  },
  {
    name: "Galactic Portfolio: ",
    description:
      "Track and manage your growing collection of digital assets in one sleek, user-friendly command center.",
    icon: BadgeCheckIcon,
  },
];

const SectionShowcase = () => {
  const { scrollY } = useScroll();

  const containerY = useTransform(scrollY, [0, 300], [50, 0]);
  const screenshotScale = useTransform(scrollY, [0, 700], [0, 1]);
  const containerScale = useTransform(scrollY, [0, 400], [0.25, 1]);

  return (
    <section className="bg-gradient-to-b from-gray-950 to-gray-800 py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          style={{ scale: containerScale, translateY: containerY }}
          className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24 sm:ring-1 sm:ring-indigo-400 shadow-2xl shadow-cyan-300"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
            <div className="lg:row-start-2 lg:max-w-md">
              <h2 className="text-3xl tracking-tight sm:text-4xl font-bold py-1  text-transparent bg-clip-text bg-gradient-to-r from-teal-100 to-indigo-400">
                Stellar features for your crypto odyssey
              </h2>
              <p className="mt-6 text-base leading-8 text-gray-300">
                You can get started with just a few clicks. We've got you
                covered. Use Email, Socials or your preferred wallet to get
                started.
              </p>
              <ButtonModal
                screen="AllWallets"
                variant="link"
                className="px-0 underline"
              >
                See supported wallets
              </ButtonModal>
            </div>
            <div className="hidden sm:block relative min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none lg:h-[48rem]">
              <img
                src={bgGradient}
                alt="Product screenshot"
                className="absolute inset-0 w-full h-full rounded-xl opacity-40"
              />
              <motion.img
                src={showcaseImage}
                alt="Product screenshots"
                className="absolute top-0 right-[23%]"
                width="1440"
                height="1080"
                style={{ scale: screenshotScale }}
              />
            </div>
            <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
              <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt className="ml-9 inline-block font-semibold text-white">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-cyan-500"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="inline ml-1">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#a5f3fc] to-[#06b6d4] opacity-25"
              style={{
                clipPath: `polygon(
                  74.1% 44.1%,
                  100% 61.6%,
                  97.5% 26.9%,
                  85.5% 0.1%,
                  80.7% 2%,
                  72.5% 32.5%,
                  60.2% 62.4%,
                  52.4% 68.1%,
                  47.5% 58.3%,
                  45.2% 34.5%,
                  27.5% 76.7%,
                  0.1% 64.9%,
                  17.9% 100%,
                  27.6% 76.8%,
                  76.1% 97.7%,
                  74.1% 44.1%
                )`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionShowcase;
