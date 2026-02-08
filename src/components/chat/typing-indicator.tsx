import { AnimatedOrb } from "./animated-orb"

export function TypingIndicator() {
  return (
    <div className="slide-in-from-bottom-2 flex gap-3 mr-auto max-w-[90%] md:max-w-[80%] animate-in duration-300 fade-in">
      <div className="shrink-0">
        <AnimatedOrb size={32} />
      </div>

      {/* Typing dots */}
      <div
        className="bg-white px-4 py-3 border border-stone-200 rounded-2xl rounded-bl-md"
        style={{
          boxShadow:
            "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
        }}
        role="status"
        aria-label="Assistant is typing"
      >
        <div className="flex items-center gap-1">
          <span className="bg-stone-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="bg-stone-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="bg-stone-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
