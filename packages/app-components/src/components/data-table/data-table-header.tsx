import { Plus, RefreshCw, RotateCcw, SquarePen, Trash } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip"
import type { ReactNode } from "react"

import type {
  DataTableBuiltInQueryField,
  DataTableQueryField,
} from "./data-table.types"
import { getQueryFieldLayoutStyle } from "./data-table.utils"

function getCustomQueryFieldLayoutStyle(field: DataTableQueryField<object>) {
  if (field.type === "select") {
    return {
      flex: "0 0 auto",
      minWidth: "auto",
      maxWidth: "none",
    }
  }

  if (field.type === "date-range") {
    return {
      flex: "0 1 220px",
      minWidth: "200px",
      maxWidth: "240px",
    }
  }

  return getQueryFieldLayoutStyle(field)
}

function getToolbarWidthClass(actionCount: number) {
  if (actionCount >= 3) return "sm:w-[7.5rem]"
  if (actionCount === 2) return "sm:w-[5rem]"
  if (actionCount === 1) return "sm:w-8"
  return "sm:w-auto"
}

function QueryFieldItem<TQuery extends object>({
  field,
  renderQueryFieldControl,
  compact = false,
}: {
  field: DataTableQueryField<TQuery>
  renderQueryFieldControl: (field: DataTableQueryField<TQuery>) => ReactNode
  compact?: boolean
}) {
  return (
    <label
      key={field.key}
      className="flex min-w-0 flex-col gap-1"
      style={
        compact
          ? getCustomQueryFieldLayoutStyle(field as DataTableQueryField<object>)
          : getQueryFieldLayoutStyle(field as DataTableQueryField<object>)
      }
    >
      {renderQueryFieldControl(field)}
      {field.description ? (
        <span className="text-xs leading-4 text-muted-foreground">
          {field.description}
        </span>
      ) : null}
    </label>
  )
}

function IconToolButton({
  icon,
  label,
  disabled = false,
  onClick,
  className,
}: {
  icon: ReactNode
  label: ReactNode
  disabled?: boolean
  onClick: () => void
  className: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button type="button" disabled={disabled} onClick={onClick} className={className}>
          {icon}
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function QueryToolGroup({
  loading,
  resolvedResetLabel,
  resolvedRefreshLabel,
  onResetQuery,
  onRetry,
}: {
  loading: boolean
  resolvedResetLabel: ReactNode
  resolvedRefreshLabel: ReactNode
  onResetQuery: () => void
  onRetry: () => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <IconToolButton
        icon={<RotateCcw aria-hidden="true" className="size-4.5" />}
        label={resolvedResetLabel}
        disabled={loading}
        onClick={onResetQuery}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      />
      <IconToolButton
        icon={<RefreshCw aria-hidden="true" className="size-4.5" />}
        label={resolvedRefreshLabel}
        disabled={loading}
        onClick={onRetry}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      />
    </div>
  )
}

function ToolbarActions({
  insert,
  bulkDelete,
  bulkUpdate,
  toolbarActions,
  rowSelectionEnabled,
  deleting,
  selectedRowKeysCount,
  resolvedInsertLabel,
  resolvedBulkUpdateLabel,
  resolvedBulkDeleteLabel,
  onOpenInsert,
  onOpenBulkUpdate,
  onOpenBulkDelete,
}: {
  insert: false | { disabled?: boolean; label?: ReactNode }
  bulkDelete: false | { label?: ReactNode }
  bulkUpdate: false | { label?: ReactNode }
  toolbarActions?: ReactNode
  rowSelectionEnabled: boolean
  deleting: boolean
  selectedRowKeysCount: number
  resolvedInsertLabel: ReactNode
  resolvedBulkUpdateLabel: (count: number) => ReactNode
  resolvedBulkDeleteLabel: (count: number) => ReactNode
  onOpenInsert: () => void
  onOpenBulkUpdate: () => void
  onOpenBulkDelete: () => void
}) {
  if (
    insert === false &&
    bulkDelete === false &&
    bulkUpdate === false &&
    !toolbarActions
  ) {
    return null
  }

  const insertTooltip =
    insert !== false ? insert.label ?? resolvedInsertLabel : null
  const bulkUpdateTooltip =
    bulkUpdate !== false
      ? bulkUpdate.label ?? resolvedBulkUpdateLabel(selectedRowKeysCount)
      : null
  const bulkDeleteTooltip =
    bulkDelete !== false
      ? bulkDelete.label ?? resolvedBulkDeleteLabel(selectedRowKeysCount)
      : null
  const actionCount =
    (insert !== false ? 1 : 0) +
    (bulkUpdate !== false ? 1 : 0) +
    (bulkDelete !== false && rowSelectionEnabled ? 1 : 0)

  return (
    <div
      className={`w-8 flex-none self-stretch ${getToolbarWidthClass(actionCount)}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-1.5 sm:flex-row sm:items-center sm:justify-center sm:gap-1">
          {insert !== false ? (
            <IconToolButton
              icon={<Plus aria-hidden="true" className="size-4" />}
              label={insertTooltip}
              disabled={insert.disabled === true}
              onClick={onOpenInsert}
              className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            />
          ) : null}
          {bulkUpdate !== false ? (
            <IconToolButton
              icon={<SquarePen aria-hidden="true" className="size-4" />}
              label={bulkUpdateTooltip}
              disabled={selectedRowKeysCount === 0}
              onClick={onOpenBulkUpdate}
              className="inline-flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            />
          ) : null}
          {bulkDelete !== false && rowSelectionEnabled ? (
            <IconToolButton
              icon={<Trash aria-hidden="true" className="size-4" />}
              label={bulkDeleteTooltip}
              disabled={selectedRowKeysCount === 0 || deleting}
              onClick={onOpenBulkDelete}
              className="inline-flex size-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            />
          ) : null}
          {toolbarActions}
        </div>
      </div>
    </div>
  )
}

export function DataTableHeader<TQuery extends object>({
  hasAnyQueryFields,
  leadingBuiltInSearchField,
  trailingBuiltInQueryFields,
  queryFields,
  queryTools,
  loading,
  insert,
  bulkDelete,
  bulkUpdate,
  toolbarActions,
  rowSelectionEnabled,
  deleting,
  selectedRowKeysCount,
  resolvedResetLabel,
  resolvedRefreshLabel,
  resolvedInsertLabel,
  resolvedBulkUpdateLabel,
  resolvedBulkDeleteLabel,
  renderQueryFieldControl,
  onResetQuery,
  onRetry,
  onOpenInsert,
  onOpenBulkUpdate,
  onOpenBulkDelete,
}: {
  hasAnyQueryFields: boolean
  leadingBuiltInSearchField: DataTableBuiltInQueryField<TQuery> | null
  trailingBuiltInQueryFields: readonly DataTableBuiltInQueryField<TQuery>[]
  queryFields: readonly DataTableQueryField<TQuery>[]
  queryTools: boolean
  loading: boolean
  insert: false | { disabled?: boolean; label?: ReactNode }
  bulkDelete: false | { label?: ReactNode }
  bulkUpdate: false | { label?: ReactNode }
  toolbarActions?: ReactNode
  rowSelectionEnabled: boolean
  deleting: boolean
  selectedRowKeysCount: number
  resolvedResetLabel: ReactNode
  resolvedRefreshLabel: ReactNode
  resolvedInsertLabel: ReactNode
  resolvedBulkUpdateLabel: (count: number) => ReactNode
  resolvedBulkDeleteLabel: (count: number) => ReactNode
  renderQueryFieldControl: (field: DataTableQueryField<TQuery>) => ReactNode
  onResetQuery: () => void
  onRetry: () => void
  onOpenInsert: () => void
  onOpenBulkUpdate: () => void
  onOpenBulkDelete: () => void
}) {
  return hasAnyQueryFields ? (
    <div className="flex min-w-0 items-start gap-4">
      <div className="min-w-0 flex-1 overflow-x-auto pb-2">
        <div className="flex min-w-max items-center gap-1.5 sm:gap-2.5">
          {leadingBuiltInSearchField ? (
            <QueryFieldItem
              key={leadingBuiltInSearchField.key}
              field={leadingBuiltInSearchField}
              renderQueryFieldControl={renderQueryFieldControl}
            />
          ) : null}

          {queryTools ? (
            <QueryToolGroup
              loading={loading}
              resolvedResetLabel={resolvedResetLabel}
              resolvedRefreshLabel={resolvedRefreshLabel}
              onResetQuery={onResetQuery}
              onRetry={onRetry}
            />
          ) : null}

          {trailingBuiltInQueryFields.map((field) => (
            <QueryFieldItem
              key={field.key}
              field={field}
              renderQueryFieldControl={renderQueryFieldControl}
            />
          ))}

          {queryFields.map((field) => (
            <QueryFieldItem
              key={field.key}
              field={field}
              renderQueryFieldControl={renderQueryFieldControl}
              compact
            />
          ))}
        </div>
      </div>

      <ToolbarActions
        insert={insert}
        bulkDelete={bulkDelete}
        bulkUpdate={bulkUpdate}
        toolbarActions={toolbarActions}
        rowSelectionEnabled={rowSelectionEnabled}
        deleting={deleting}
        selectedRowKeysCount={selectedRowKeysCount}
        resolvedInsertLabel={resolvedInsertLabel}
        resolvedBulkUpdateLabel={resolvedBulkUpdateLabel}
        resolvedBulkDeleteLabel={resolvedBulkDeleteLabel}
        onOpenInsert={onOpenInsert}
        onOpenBulkUpdate={onOpenBulkUpdate}
        onOpenBulkDelete={onOpenBulkDelete}
      />
    </div>
  ) : (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {queryTools ? (
          <QueryToolGroup
            loading={loading}
            resolvedResetLabel={resolvedResetLabel}
            resolvedRefreshLabel={resolvedRefreshLabel}
            onResetQuery={onResetQuery}
            onRetry={onRetry}
          />
        ) : null}
      </div>

      <ToolbarActions
        insert={insert}
        bulkDelete={bulkDelete}
        bulkUpdate={bulkUpdate}
        toolbarActions={toolbarActions}
        rowSelectionEnabled={rowSelectionEnabled}
        deleting={deleting}
        selectedRowKeysCount={selectedRowKeysCount}
        resolvedInsertLabel={resolvedInsertLabel}
        resolvedBulkUpdateLabel={resolvedBulkUpdateLabel}
        resolvedBulkDeleteLabel={resolvedBulkDeleteLabel}
        onOpenInsert={onOpenInsert}
        onOpenBulkUpdate={onOpenBulkUpdate}
        onOpenBulkDelete={onOpenBulkDelete}
      />
    </div>
  )
}
