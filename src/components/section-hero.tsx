import { GlowEffect } from "@/components/ui/glow-effect";
import { ModalButton } from "@/components/modal-button";
import { CubeAnimation } from "@/components/ui/cube-animation";

import imageOne from "@/assets/hero-image-one.png";
import imageTwo from "@/assets/hero-image-two.png";
import imageThree from "@/assets/hero-image-three.png";
import imageFour from "@/assets/hero-image-four.png";
import imageFive from "@/assets/hero-image-five.png";

import X from "@/components/icons/x";
import Google from "@/components/icons/google";
import GitHub from "@/components/icons/github";

const HeroComponent = () => {
  return (
    <div className="bg-gray-950">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Crypto Genesis</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-600 text-2xl tracking-tight ">
                Crypto Genesis
              </span>
            </a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
            <ModalButton
              screen="GetWallet"
              variant="link"
              className="text-sm font-semibold leading-6 text-gray-400"
            >
              Get a wallet
            </ModalButton>
            <ModalButton
              screen="WhatIsAWallet"
              variant="link"
              className="text-sm font-semibold leading-6 text-gray-400"
            >
              Learn about wallets
            </ModalButton>
          </div>
        </nav>
      </header>
      <div>
        <div className="relative isolate">
          <CubeAnimation />

          <GlowEffect />

          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl mb-36 sm:mb-0">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-600">
                    Start your crypto journey here.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-300 sm:max-w-md lg:max-w-none">
                    In the beginning, there was Crypto Genesis. Your cosmic
                    launchpad into the crypto universe – buy your first coin,
                    swap at light speed, and manage your digital treasures with
                    celestial ease!
                  </p>
                  <div className="mt-10 flex items-center flex-wrap gap-6">
                    <ModalButton variant="fancy" screen="">
                      Get started
                    </ModalButton>

                    <ModalButton variant="outline" screen="ConnectSocials">
                      Sign in with socials
                    </ModalButton>

                    <div className="hidden sm:flex items-center gap-x-2">
                      <Google width={24} height={24} />
                      <X width={20} height={20} />
                      <GitHub width={24} height={24} />
                    </div>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src={imageThree}
                        alt="people using Crypto Genesis"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg ring ring-cyan-500/40"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src={imageTwo}
                        alt="people using Crypto Genesis"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg ring ring-cyan-400/40"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={imageOne}
                        alt="people using Crypto Genesis"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg ring ring-cyan-400/40"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src={imageFive}
                        alt="people using Crypto Genesis"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg ring ring-cyan-300/80"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={imageFour}
                        alt="people using Crypto Genesis"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg ring ring-cyan-300/80"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
