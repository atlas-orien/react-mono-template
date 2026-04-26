import type { ReactNode } from "react"
import { Pin, X } from "lucide-react"
import { cn } from "@workspace/ui-core/lib/utils.js"

export interface WorkspaceTabItem {
  key: string
  label: ReactNode
  href: string
  active?: boolean
  pinned?: boolean
  onSelect?: () => void
  onClose?: () => void
}

export interface WorkspaceTabsProps {
  label?: ReactNode
  items: WorkspaceTabItem[]
}

export function WorkspaceTabs({ label, items }: WorkspaceTabsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="border-t border-border/70 bg-background/92 px-4 py-2 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex min-w-0 items-center gap-3">
        {label ? (
          <div className="shrink-0 text-xs font-medium text-muted-foreground">
            {label}
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <li
                  key={item.key}
                  className="inline-flex shrink-0 items-center gap-1.5"
                >
                  <div className="group inline-flex min-w-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={item.onSelect}
                      className={cn(
                        "inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-0.5 text-left outline-hidden transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                        item.active && "text-foreground"
                      )}
                    >
                      {item.pinned ? (
                        <Pin
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-muted-foreground"
                          strokeWidth={2.2}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "max-w-40 truncate",
                          item.active ? "font-semibold" : "font-medium"
                        )}
                      >
                        {item.label}
                      </span>
                    </button>

                    {!item.pinned ? (
                      <button
                        type="button"
                        onClick={item.onClose}
                        className="inline-flex size-4.5 items-center justify-center rounded-full text-muted-foreground outline-hidden transition hover:bg-[var(--surface-hover)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        aria-label="Close tab"
                      >
                        <X
                          aria-hidden="true"
                          className="size-3"
                          strokeWidth={2.4}
                        />
                      </button>
                    ) : null}
                  </div>

                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="shrink-0 px-0.5 text-muted-foreground/70"
                    >
                      /
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
