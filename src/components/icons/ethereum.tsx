type EthereumProps = React.SVGProps<SVGSVGElement>;

function Ethereum(props: EthereumProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      style={{ width: "20px", height: "20px" }}
      {...props}
    >
      <g fill="none" fillRule="evenodd" {...props}>
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <g fill="#FFF" fillRule="nonzero">
          <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" />
          <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
          <path d="M16.498 27.995v-6.028L9 17.616z" />
          <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
          <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
        </g>
      </g>
    </svg>
  );
}

export default Ethereum;
