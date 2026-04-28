import type { ReactNode } from "react"

export interface MobileBottomNavItem {
  key?: string
  label: ReactNode
  href?: string
  active?: boolean
  icon?: ReactNode
  onSelect?: () => void
}

export interface MobileBottomNavProps {
  label?: string
  items: MobileBottomNavItem[]
}

export function MobileBottomNav({
  label = "Primary navigation",
  items,
}: MobileBottomNavProps) {
  if (!items.length) {
    return null
  }

  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-(--app-border) bg-[var(--surface)] px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 text-[var(--surface-foreground)] shadow-[0_-18px_48px_rgba(0,0,0,0.2)] md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-flow-col auto-cols-fr gap-1">
        {items.map((item) => (
          <MobileBottomNavButton key={item.key ?? item.href} item={item} />
        ))}
      </div>
    </nav>
  )
}

function MobileBottomNavButton({ item }: { item: MobileBottomNavItem }) {
  const content = (
    <>
      <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
        {item.icon}
      </span>
      <span className="w-full truncate text-center text-[11px] leading-4 font-medium">
        {item.label}
      </span>
    </>
  )
  const className = [
    "flex h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-2 outline-hidden transition",
    item.active
      ? "bg-[var(--surface-hover)] text-(--app-primary)"
      : "text-(--app-muted-text) hover:bg-[var(--surface-hover)] hover:text-(--app-text) focus-visible:ring-2 focus-visible:ring-(--app-primary)",
  ].join(" ")

  if (item.href) {
    return (
      <a
        href={item.href}
        className={className}
        aria-current={item.active ? "page" : undefined}
        onClick={(event) => {
          if (!item.onSelect) {
            return
          }

          event.preventDefault()
          item.onSelect()
        }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      aria-current={item.active ? "page" : undefined}
      onClick={item.onSelect}
    >
      {content}
    </button>
  )
}
