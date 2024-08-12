export const GlowCircle = () => {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-10"
      aria-hidden="true"
    >
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1_2)">
          <circle cx="300" cy="300" r="200" fill="url(#paint0_radial_1_2)" />
        </g>
        <defs>
          <filter
            id="filter0_f_1_2"
            x="0"
            y="0"
            width="600"
            height="600"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_1_2"
            />
          </filter>
          <radialGradient
            id="paint0_radial_1_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(300 300) rotate(90) scale(200)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#7DD3FC" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GlowCircle;
