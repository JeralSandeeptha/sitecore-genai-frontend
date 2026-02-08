import type React from "react"

export function AnimatedOrb({
  className,
  variant = "default",
  size = 32,
}: { className?: string; variant?: "default" | "red"; size?: number }) {
  const colors =
    variant === "red"
      ? {
          bg: "#fef2f2",
          circle1: "#E63946",
          circle2: "#F28482",
          circle3: "#A855F7",
          circle4: "#D946EF",
          circle5: "#E879F9",
        }
      : {
          bg: "#F5F0FF",
          circle1: "#E63946",
          circle2: "#F28482",
          circle3: "#A855F7",
          circle4: "#D946EF",
          circle5: "#E879F9",
        }

  const blurAmount = Math.max(6, size * 0.15)
  const circle1Size = size * 0.45
  const circle2Size = size * 0.35
  const circle3Size = size * 0.5
  const circle4Size = size * 0.25
  const circle5Size = size * 0.3

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: colors.bg,
        animation: "orb-hue-rotate 8s linear infinite",
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      }}
      aria-hidden="true"
    >
      {/* Blur container - blur scales with size */}
      <div
        className="absolute inset-0 flex justify-center items-center"
        style={
          {
            "--orb-blur": `${blurAmount}px`,
            animation: "orb-hue-rotate-blur 6s linear infinite reverse",
          } as React.CSSProperties
        }
      >
        {/* Circle 1 - large */}
        <div
          className="absolute rounded-full orb-circle-1"
          style={{
            width: circle1Size,
            height: circle1Size,
            opacity: 0.9,
            backgroundColor: colors.circle1,
          }}
        />
        {/* Circle 2 - medium */}
        <div
          className="absolute rounded-full orb-circle-2"
          style={{
            width: circle2Size,
            height: circle2Size,
            opacity: 0.85,
            backgroundColor: colors.circle2,
          }}
        />
        {/* Circle 3 - large */}
        <div
          className="absolute rounded-full orb-circle-3"
          style={{
            width: circle3Size,
            height: circle3Size,
            opacity: 0.9,
            backgroundColor: colors.circle3,
          }}
        />
        {/* Circle 4 - small */}
        <div
          className="absolute rounded-full orb-circle-4"
          style={{
            width: circle4Size,
            height: circle4Size,
            opacity: 0.8,
            backgroundColor: colors.circle4,
          }}
        />
        {/* Circle 5 - new medium circle */}
        <div
          className="absolute rounded-full orb-circle-5"
          style={{
            width: circle5Size,
            height: circle5Size,
            opacity: 0.85,
            backgroundColor: colors.circle5,
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
