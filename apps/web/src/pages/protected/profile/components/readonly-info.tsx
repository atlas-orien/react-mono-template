import type { ReactNode } from "react"
import { CopyableText } from "@workspace/app-components"

export interface ReadonlyInfoProps {
  icon: ReactNode
  label: string
  value: string
  copyable: boolean
}

export function ReadonlyInfo({
  icon,
  label,
  value,
  copyable,
}: ReadonlyInfoProps) {
  return (
    <div className="min-w-0 rounded-lg border border-(--app-border) bg-(--surface) p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-(--app-muted-text) [&_svg]:size-4">
        {icon}
        <span>{label}</span>
      </div>
      <div className="min-w-0 text-sm font-medium">
        {copyable ? (
          <CopyableText value={value} textClassName="truncate">
            {value}
          </CopyableText>
        ) : (
          <span className="block truncate">{value}</span>
        )}
      </div>
    </div>
  )
}
