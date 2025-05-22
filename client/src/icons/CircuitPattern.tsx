import React from "react";

interface CircuitPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

const CircuitPattern: React.FC<CircuitPatternProps> = ({ 
  className = "", 
  color = "#14ffc8", 
  opacity = 0.05 
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <g fill="none" stroke={color} strokeWidth="1">
        <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
        <path d="M-31 229L237 261 390 382 731 737M520 660L309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
        <path d="M520 660L309 538 295 764 731 737M520 660L309 538 40 599M390 382L102 382-31 229 126.5 79.5 237 261" />
        <path d="M520 660L309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
        <path d="M520 660L309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
        <path d="M520 660L309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
        <path d="M520 660L309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
      </g>
      <g fill={color}>
        <circle cx="769" cy="229" r="5" />
        <circle cx="539" cy="269" r="5" />
        <circle cx="603" cy="493" r="5" />
        <circle cx="731" cy="737" r="5" />
        <circle cx="520" cy="660" r="5" />
        <circle cx="309" cy="538" r="5" />
        <circle cx="295" cy="764" r="5" />
        <circle cx="40" cy="599" r="5" />
        <circle cx="102" cy="382" r="5" />
        <circle cx="127" cy="80" r="5" />
        <circle cx="370" cy="105" r="5" />
        <circle cx="578" cy="42" r="5" />
        <circle cx="237" cy="261" r="5" />
        <circle cx="390" cy="382" r="5" />
      </g>
    </svg>
  );
};

export default CircuitPattern;
