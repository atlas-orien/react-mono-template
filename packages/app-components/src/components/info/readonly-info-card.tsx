import type { ReactNode } from "react"
import { Card, CardContent } from "@workspace/ui-core/components/card"
import { CopyableText } from "../copyable-text"

export interface ReadonlyInfoCardProps {
  icon?: ReactNode
  label: ReactNode
  value: string
  copyable?: boolean
}

export function ReadonlyInfoCard({
  icon,
  label,
  value,
  copyable = false,
}: ReadonlyInfoCardProps) {
  return (
    <Card className="min-w-0 rounded-lg bg-(--surface) py-0">
      <CardContent className="space-y-2 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-(--app-muted-text) [&_svg]:size-4">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <span className="min-w-0 truncate">{label}</span>
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
      </CardContent>
    </Card>
  )
}
