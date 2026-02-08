import { cn } from "@/lib/utils"
import type { Message } from "./chat-shell"
import { User } from "lucide-react"
import { MarkdownRenderer } from "./markdown-renderer"
import { AnimatedOrb } from "./animated-orb"

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
}

// Format time for display
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-2 max-w-[90%] md:max-w-[80%]",
        isUser
          ? "ml-auto flex-row-reverse user-message-enter"
          : "mr-auto animate-in fade-in slide-in-from-bottom-2 duration-300 items-end",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex justify-center items-center rounded-full w-8 h-8 shrink-0",
          isUser ? "bg-white" : "gradient-red-purple",
          !isUser && isStreaming && "sticky bottom-4 self-end transition-all duration-300",
        )}
        style={{
          boxShadow:
            "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
        }}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4 text-stone-800" /> : <AnimatedOrb className="w-8 h-8 shrink-0" />}
      </div>

      {/* Message content */}
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        {/* Role label (optional, shown on larger screens) */}
        <span className="hidden sm:block mt-2 mb-1 text-stone-400 text-xs">{isUser ? "You" : "Assistant"}</span>

        {/* Bubble */}
        <div
          className={cn(
            "border-none rounded-2xl overflow-hidden",
            isUser
              ? "bg-white text-stone-800 border border-stone-200 rounded-br-md"
              : "bg-transparent text-stone-800 rounded-bl-md",
          )}
          style={{
            boxShadow: isUser
              ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
              : "none",
            willChange: isStreaming ? "height" : "auto",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className={cn(isUser ? "px-4 py-3" : "py-1")}
            style={{
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
            }}
          >
            {isUser ? (
              <div className="flex flex-col gap-2">
                {message.imageData && (
                  <div className="border border-stone-200 rounded-lg w-20 h-20 overflow-hidden">
                    <img
                      src={message.imageData || "/placeholder.svg"}
                      alt="Uploaded image"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
              </div>
            ) : (
              <MarkdownRenderer content={message.content || " "} isStreaming={isStreaming} />
            )}
          </div>
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-stone-400 text-xs">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  )
}
