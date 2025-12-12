import React from "react";

interface AltafLogoProps {
  className?: string;
  color?: string;
  isWhite?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const AltafLogo: React.FC<AltafLogoProps> = ({
  className = "",
  color = "#8c2e47",
  isWhite = false,
  size = "md",
}) => {
  const fillColor = isWhite ? "#ffffff" : color;

  // Size classes for responsive scaling
  const sizeClasses = {
    sm: "w-24 h-auto", // ~96px width
    md: "w-32 h-auto", // ~128px width
    lg: "w-40 h-auto", // ~160px width
    xl: "w-48 h-auto", // ~192px width
  };

  return (
    <svg
      viewBox="0 0"
      className={`${sizeClasses[size]} ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main ALTAF text */}
      <g fill={fillColor}>
        {/* Letter A (first) */}
        <path d="M30 150l4-5 22-50s1-4 0-5c-1-1-1-1-1-1h12l23 52s3 4 4 5c1 2 3 3 3 3l-16 0s2-2 1-4c-1-2-8-17-8-17l-22 0s-4 0-5 2c-1 2-5 14-5 14s-1 3-1 3c0 1 2 2 2 2h-12v0zm20-27l21 0-11-24-10 24z" />

        {/* Letter L */}
        <path d="M95 75h14s-1 3-1 4c0 1 0 45 0 52c8 0 31-1 32-1c2 0 8-1 8-1l-2 8h-51s2-3 1-5c0-3 0-53 0-53s0-2-1-3h0z" />

        {/* Letter T */}
        <path d="M135 82l1-8h59l1 8s-12-2-18-3s-8 0-8 0l0 43s0 8 1 9c0 2 1 4 1 4h-14s1-4 1-9c0-5 0-47 0-47s-16-1-25 2z" />

        {/* Letter A (second) */}
        <path d="M200 150l4-5 22-50s1-4 0-5c-1-1-1-1-1-1h12l23 52s3 4 4 5c1 2 3 3 3 3l-16 0s2-2 1-4c-1-2-8-17-8-17l-22 0s-4 0-5 2c-1 2-5 14-5 14s-1 3-1 3c0 1 2 2 2 2h-12v0zm20-27l21 0-11-24-10 24z" />

        {/* Letter F */}
        <path d="M275 75h43l1 8s-12-2-18-3c-6 0-15 0-15 0l0 22c4 0 29 1 30-1l0 8c-1-1-21-1-25-1c-5 0-5 1-5 5l0 10s0 8 1 9c0 2 1 4 1 4h-14s1-4 1-9c0-3 0-24 0-37v0c0-5 0-10 0-10v-2c0-1-1-3-1-3z" />
      </g>

      {/* DEVELOPMENTS text */}
      <g fill={fillColor}>
        {/* D */}
        <path d="M30 180v13h4c1 0 3 0 5-1c1 0 3-2 3-5c0-2-1-4-3-5c-1-1-4-1-5-1h-4zm4 1c1 0 2 0 3 1c2 1 3 3 3 4c0 2-1 3-2 4c-1 1-3 1-3 1h-2v-10h1z" />

        {/* E */}
        <polygon points="50 180 42 180 42 193 50 193 50 192 43 192 43 187 49 187 49 186 43 186 43 181 50 181 50 180" />

        {/* V */}
        <polygon points="62 180 60 180 57 188 54 180 52 180 58 193 58 193 62 180" />

        {/* E */}
        <polygon points="74 180 66 180 66 193 74 193 74 192 67 192 67 187 73 187 73 186 67 186 67 181 74 181 74 180" />

        {/* L */}
        <polygon points="82 180 80 180 80 193 87 193 87 192 82 192 82 180" />

        {/* O */}
        <path d="M95 180c-4 0-7 3-7 7c0 3 3 7 7 7s7-3 7-7c0-3-3-7-7-7zm0 2c3 0 5 3 5 5c0 1 0 3-1 3c-1 1-2 1-4 1c-3 0-5-2-5-5c0-2 1-5 5-5z" />

        {/* P */}
        <path d="M108 180v13h2v-6h1c2 0 3 0 4-1c1-1 1-2 1-3c0-1 0-2-1-3c-1-1-2-1-4-1h-3zm3 1c1 0 2 0 3 1c0 0 1 1 1 1c0 1 0 1-1 2c-1 0-1 0-2 0h-1v-4h1z" />

        {/* M */}
        <polygon points="125 180 123 180 120 185 117 180 115 180 115 193 117 193 117 183 120 187 120 187 123 183 123 193 125 193 125 180" />

        {/* E */}
        <polygon points="137 180 129 180 129 193 137 193 137 192 130 192 130 187 136 187 136 186 130 186 130 181 137 181 137 180" />

        {/* N */}
        <polygon points="150 180 148 180 148 189 141 180 139 180 139 193 141 193 141 184 148 193 150 193 150 180" />

        {/* T */}
        <polygon points="162 180 152 180 152 181 156 181 156 193 158 193 158 181 162 181 162 180" />

        {/* S */}
        <path d="M170 181c-1-1-2-1-3-1c-2 0-4 1-4 3c0 1 0 1 1 2c1 1 1 1 3 2c1 0 2 1 2 2s-1 2-2 2c-2 0-3-1-3-2v2c1 1 2 1 3 1c2 0 4-1 4-3c0-1 0-2-1-2c0-1-1-1-2-1c-3-1-3-2-3-3c0-1 1-1 2-1c1 0 2 0 3 1v-2z" />
      </g>
    </svg>
  );
};

export default AltafLogo;
