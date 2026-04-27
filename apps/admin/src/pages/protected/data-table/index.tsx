import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Input } from "@workspace/ui-components"
import {
  DataTable,
  type DateRangeValue,
  type DataTableFetchResult,
  type DataTableQueryField,
  type DataTableSortState,
} from "@workspace/app-components"

interface CustomerRow {
  id: string
  name: string
  tier: "Enterprise" | "Growth" | "Starter"
  status: "Active" | "Paused"
  region: string
  createdAt: Date
}

const tiers: CustomerRow["tier"][] = ["Enterprise", "Growth", "Starter"]
const statuses: CustomerRow["status"][] = ["Active", "Paused"]
const regions = ["North China", "East China", "South China", "West China"]
const owners = ["Alice", "Bob", "Cathy", "David"]
const channels = ["Direct", "Partner", "Online", "Field"]
const industries = ["Retail", "Finance", "Education", "Manufacturing"]
const segments = ["Strategic", "Enterprise", "Growth", "SMB"]

const customerRows: CustomerRow[] = Array.from({ length: 100 }, (_, index) => ({
  id: `C-${String(index + 1001)}`,
  name: `Customer ${index + 1}`,
  tier: tiers[index % tiers.length],
  status: statuses[index % statuses.length],
  region: regions[index % regions.length],
  createdAt: new Date(2026, 0, 1 + index, 9 + (index % 8), (index * 7) % 60, 0),
}))

interface CustomerTableQuery {
  keyword: string
  status: "" | CustomerRow["status"]
  region: "" | CustomerRow["region"]
  createdAt?: DateRangeValue
  custom01: string
  custom02: string
  custom03: string
  custom04: string
  custom05: string
  custom06: string
  custom07: string
  custom08: string
  custom09: string
  custom10: string
  custom11: string
  custom12: string
  custom13: string
  custom14: string
  custom15: string
  custom16: string
  custom17: string
  custom18: string
  custom19: string
  custom20: string
}

const customQueryFields: DataTableQueryField<CustomerTableQuery>[] = Array.from(
  { length: 20 },
  (_, index) => ({
    key: `custom${String(index + 1).padStart(2, "0")}` as keyof CustomerTableQuery & string,
    type: "text",
    label: `Custom ${index + 1}`,
    placeholder: `Custom ${index + 1}`,
  })
)

export default function DataTablePage() {
  const { t } = useTranslation()
  const fetchData = useCallback(
    async ({
      page,
      pageSize,
      query,
      signal,
      sort,
    }: {
      page: number
      pageSize: number
      query: CustomerTableQuery
      signal: AbortSignal
      sort: DataTableSortState | null
    }): Promise<DataTableFetchResult<CustomerRow>> => {
      void signal
      await new Promise((resolve) => setTimeout(resolve, 120))

      const filteredRows = customerRows.filter((row) => {
        const keyword = query.keyword.trim().toLowerCase()
        const owner = owners[Number(row.id.slice(-1)) % owners.length]
        const searchCandidates = [row.id, row.name, row.region, owner]

        const matchesKeyword =
          keyword.length === 0 ||
          searchCandidates.some((candidate) =>
            candidate.toLowerCase().includes(keyword)
          )

        const matchesStatus =
          query.status.length === 0 || row.status === query.status

        const matchesRegion =
          query.region.length === 0 || row.region === query.region

        const from = query.createdAt?.from
        const to = query.createdAt?.to
        const matchesCreatedAt =
          (!from || row.createdAt >= startOfDay(from)) &&
          (!to || row.createdAt <= endOfDay(to))

        return (
          matchesKeyword && matchesStatus && matchesRegion && matchesCreatedAt
        )
      })

      const sortedRows = [...filteredRows].sort((left, right) => {
        if (!sort) {
          return 0
        }

        const leftValue = getCustomerSortValue(left, sort.columnKey)
        const rightValue = getCustomerSortValue(right, sort.columnKey)
        const result = compareSortValues(leftValue, rightValue)

        return sort.direction === "asc" ? result : -result
      })

      const start = (page - 1) * pageSize
      const end = start + pageSize

      return {
        items: sortedRows.slice(start, end),
        total: sortedRows.length,
      }
    },
    []
  )

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
      <DataTable<CustomerRow, CustomerTableQuery>
        // fixedLeftColumns={1}
        // fixedRightColumns={2}
        columns={[
          {
            key: "seq",
            header: "#",
            width: 48,
            sortable: false,
            renderCell: (_row: CustomerRow, rowIndex: number) => rowIndex + 1,
          },
          {
            key: "id",
            header: "ID",
            sortable: true,
            renderCell: (row: CustomerRow) => row.id,
          },
          {
            key: "name",
            header: "Name",
            sortable: true,
            renderCell: (row: CustomerRow) => row.name,
          },
          {
            key: "tier",
            header: "Tier",
            renderCell: (row: CustomerRow) => row.tier,
          },
          {
            key: "status",
            header: "Status",
            sortable: false,
            renderCell: (row: CustomerRow) => (
              <Badge
                variant={row.status === "Active" ? "default" : "secondary"}
              >
                {row.status}
              </Badge>
            ),
          },
          {
            key: "region",
            header: "Region",
            renderCell: (row: CustomerRow) => row.region,
          },
          {
            key: "createdAt",
            header: "Created At",
            sortable: true,
            renderCell: (row: CustomerRow) => formatDateTime(row.createdAt),
          },
          {
            key: "owner",
            header: "Owner",
            renderCell: (row: CustomerRow) =>
              owners[Number(row.id.slice(-1)) % owners.length],
          },
          {
            key: "channel",
            header: "Channel",
            renderCell: (row: CustomerRow) =>
              channels[Number(row.id.slice(-2)) % channels.length],
          },
          {
            key: "industry",
            header: "Industry",
            renderCell: (row: CustomerRow) =>
              industries[Number(row.id.slice(-1)) % industries.length],
          },
          {
            key: "segment",
            header: "Segment",
            renderCell: (row: CustomerRow) =>
              segments[Number(row.id.slice(-2)) % segments.length],
          },
          {
            key: "city",
            header: "City",
            renderCell: (row: CustomerRow) => row.region.replace(" China", ""),
          },
          {
            key: "renewal",
            header: "Renewal",
            renderCell: (row: CustomerRow) =>
              formatDateTime(addDays(row.createdAt, 90)).slice(0, 10),
          },
          {
            key: "contractValue",
            header: "Contract",
            sortable: false,
            renderCell: (row: CustomerRow) =>
              `$${(Number(row.id.slice(-2)) * 1200).toLocaleString()}`,
          },
          {
            key: "users",
            header: "Users",
            sortable: false,
            renderCell: (row: CustomerRow) => Number(row.id.slice(-2)) + 12,
          },
          {
            key: "storage",
            header: "Storage",
            renderCell: (row: CustomerRow) =>
              `${Number(row.id.slice(-2)) % 80} GB`,
          },
          {
            key: "health",
            header: "Health",
            renderCell: (row: CustomerRow) =>
              ["Great", "Good", "Watch", "Risk"][Number(row.id.slice(-1)) % 4],
          },
          {
            key: "lastActive",
            header: "Last Active",
            width: 140,
            sortable: false,
            renderCell: (row: CustomerRow) =>
              formatDateTime(addDays(row.createdAt, 7)).slice(5, 16),
          },
          {
            key: "plan",
            header: "Plan",
            renderCell: (row: CustomerRow) =>
              row.tier === "Enterprise" ? "Annual" : "Monthly",
          },
          {
            key: "source",
            header: "Source",
            renderCell: (row: CustomerRow) =>
              ["Expo", "Referral", "Ads", "SEO"][Number(row.id.slice(-1)) % 4],
          },
          {
            key: "score",
            header: "Score",
            sortable: false,
            renderCell: (row: CustomerRow) =>
              60 + (Number(row.id.slice(-2)) % 40),
          },
        ]}
        fetchData={fetchData}
        getRowId={(row: CustomerRow) => row.id}
        height="100%"
        insert={{
          label: t("datatable.insert.label", "Insert"),
          title: t("datatable.insert.title", "Create customer"),
          description: t(
            "datatable.insert.description",
            "Fill in the customer basics before saving."
          ),
          renderContent: () => (
            <div className="grid gap-4 py-2">
              <Input value="New Customer" onValueChange={() => {}} />
              <Input value="North China" onValueChange={() => {}} />
            </div>
          ),
          onConfirm: async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
          },
        }}
        bulkDelete={false}
        bulkUpdate={{
          fields: [
            {
              key: "status",
              label: t("datatable.fields.status", "Status"),
              type: "select",
              options: [
                {
                  label: t("datatable.options.status.active", "Active"),
                  value: "Active",
                },
                {
                  label: t("datatable.options.status.paused", "Paused"),
                  value: "Paused",
                },
              ],
            },
            {
              key: "region",
              label: t("datatable.fields.region", "Region"),
              type: "select",
              options: regions.map((region) => ({
                label: region,
                value: region,
              })),
            },
          ],
          onSubmit: async ({ fieldKey, selectedRowKeys, value }) => {
            void fieldKey
            void selectedRowKeys
            void value
            await new Promise((resolve) => setTimeout(resolve, 200))
          },
        }}
        initialPageSize={15}
        initialQuery={{
          keyword: "",
          status: "",
          region: "",
          createdAt: undefined,
          custom01: "",
          custom02: "",
          custom03: "",
          custom04: "",
          custom05: "",
          custom06: "",
          custom07: "",
          custom08: "",
          custom09: "",
          custom10: "",
          custom11: "",
          custom12: "",
          custom13: "",
          custom14: "",
          custom15: "",
          custom16: "",
          custom17: "",
          custom18: "",
          custom19: "",
          custom20: "",
        }}
        selection={{}}
        builtInQueryFields={[
          {
            key: "keyword",
            type: "search",
            label: t("datatable.fields.keyword", "Keyword"),
            placeholder: t("datatable.searchPlaceholder", "Search customers"),
          },
        ]}
        auditQuery={{
          columns: ["createdAt"],
          rangeKey: "createdAt",
          label: t("datatable.fields.createdAt", "Created At"),
        }}
        queryFields={[
          {
            key: "status",
            type: "select",
            label: t("datatable.fields.status", "Status"),
            placeholder: t("datatable.fields.status", "Status"),
            options: [
              {
                label: t("datatable.options.status.active", "Active"),
                value: "Active",
              },
              {
                label: t("datatable.options.status.paused", "Paused"),
                value: "Paused",
              },
            ],
          },
          {
            key: "region",
            type: "select",
            label: t("datatable.fields.region", "Region"),
            placeholder: t("datatable.fields.region", "Region"),
            options: regions.map((region) => ({
              label: region,
              value: region,
            })),
          },
          ...customQueryFields,
        ]}
        pageSizeOptions={[10, 15, 30, 50]}
        rowActions={{
          edit: {
            title: (row) => `Edit ${row.name}`,
            description: (row) =>
              `Update customer ${row.id} in a modal dialog.`,
            renderContent: ({ row }) => (
              <div className="grid gap-4 py-2">
                <Input value={row.name} onValueChange={() => {}} disabled />
                <Input value={row.region} onValueChange={() => {}} disabled />
              </div>
            ),
            onConfirm: async (row) => {
              console.info("edit row", row.id)
              await new Promise((resolve) => setTimeout(resolve, 200))
            },
          },
          delete: {
            title: (row) =>
              t("datatable.actions.deleteTitle", {
                defaultValue: "Delete {{name}}?",
                name: row.name,
              }),
            description: (row) =>
              t("datatable.actions.deleteDescription", {
                defaultValue:
                  "This action will remove customer {{id}} from the current list.",
                id: row.id,
              }),
            onConfirm: async (row) => {
              console.info("delete row", row.id)
              await new Promise((resolve) => setTimeout(resolve, 200))
            },
          },
        }}
      />
    </div>
  )
}

function formatDateTime(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0")

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

function startOfDay(date: Date) {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value
}

function endOfDay(date: Date) {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value
}

function addDays(date: Date, days: number) {
  const value = new Date(date)
  value.setDate(value.getDate() + days)
  return value
}

function getCustomerSortValue(row: CustomerRow, columnKey: string) {
  switch (columnKey) {
    case "id":
      return row.id
    case "name":
      return row.name
    case "tier":
      return row.tier
    case "status":
      return row.status
    case "region":
      return row.region
    case "createdAt":
      return row.createdAt.getTime()
    case "owner":
      return owners[Number(row.id.slice(-1)) % owners.length]
    case "channel":
      return channels[Number(row.id.slice(-2)) % channels.length]
    case "industry":
      return industries[Number(row.id.slice(-1)) % industries.length]
    case "segment":
      return segments[Number(row.id.slice(-2)) % segments.length]
    case "city":
      return row.region.replace(" China", "")
    case "renewal":
      return addDays(row.createdAt, 90).getTime()
    case "contractValue":
      return Number(row.id.slice(-2)) * 1200
    case "users":
      return Number(row.id.slice(-2)) + 12
    case "storage":
      return Number(row.id.slice(-2)) % 80
    case "health":
      return ["Great", "Good", "Watch", "Risk"][Number(row.id.slice(-1)) % 4]
    case "lastActive":
      return addDays(row.createdAt, 7).getTime()
    case "plan":
      return row.tier === "Enterprise" ? "Annual" : "Monthly"
    case "source":
      return ["Expo", "Referral", "Ads", "SEO"][Number(row.id.slice(-1)) % 4]
    case "score":
      return 60 + (Number(row.id.slice(-2)) % 40)
    default:
      return row.id
  }
}

function compareSortValues(left: string | number, right: string | number) {
  if (typeof left === "number" && typeof right === "number") {
    return left - right
  }

  return String(left).localeCompare(String(right), "en")
}
