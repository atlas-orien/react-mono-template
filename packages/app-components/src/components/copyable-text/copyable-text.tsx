import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react"
import { Check, Copy } from "lucide-react"
import { IconButton } from "@workspace/ui-components"
import { cn } from "@workspace/ui-core/lib/utils.js"

export interface CopyableTextProps {
  value: string
  children?: ReactNode
  className?: string
  textClassName?: string
  disabled?: boolean
  copyLabel?: string
  copiedLabel?: string
}

export function CopyableText({
  value,
  children,
  className,
  textClassName,
  disabled = false,
  copyLabel = "复制",
  copiedLabel = "已复制",
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    if (disabled || value.trim().length === 0) {
      return
    }

    await copyToClipboard(value)
    setCopied(true)

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current)
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false)
      resetTimerRef.current = null
    }, 1200)
  }

  const stopTrigger = (
    event:
      | MouseEvent<HTMLSpanElement>
      | PointerEvent<HTMLSpanElement>
      | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 align-middle",
        className
      )}
    >
      <span
        className={cn("min-w-0 truncate", textClassName)}
        title={typeof children === "string" ? children : value}
      >
        {children ?? value}
      </span>
      <span
        className="inline-flex shrink-0"
        onPointerDown={stopTrigger}
        onMouseDown={stopTrigger}
        onClick={stopTrigger}
      >
        <IconButton
          label={copied ? copiedLabel : copyLabel}
          onClick={(event) => {
            stopTrigger(event)
            void handleCopy()
          }}
          disabled={disabled || value.trim().length === 0}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </IconButton>
      </span>
    </span>
  )
}

async function copyToClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "true")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}
