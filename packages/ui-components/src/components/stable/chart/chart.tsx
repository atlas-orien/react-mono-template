import type { CSSProperties } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer as CoreChartContainer,
  ChartLegend as CoreChartLegend,
  ChartLegendContent as CoreChartLegendContent,
  ChartTooltip as CoreChartTooltip,
  ChartTooltipContent as CoreChartTooltipContent,
  type ChartConfig,
  type ChartContainerProps,
  type ChartLegendContentProps,
  type ChartTooltipContentProps,
} from "@workspace/ui-core/primitives/chart"

export type { ChartConfig }

export function ChartContainer(props: ChartContainerProps) {
  return <CoreChartContainer {...props} />
}

export const ChartTooltip = CoreChartTooltip
export const ChartTooltipContent = CoreChartTooltipContent
export const ChartLegend = CoreChartLegend
export const ChartLegendContent = CoreChartLegendContent

export type TrendChartSeries = {
  key: string
  label: string
  color?: string
}

export interface TrendLineChartProps {
  data: Array<Record<string, number | string>>
  xKey: string
  series: TrendChartSeries[]
  height?: number
}

export function TrendLineChart({
  data,
  xKey,
  series,
  height = 260,
}: TrendLineChartProps) {
  const config = series.reduce<ChartConfig>((acc, item, index) => {
    acc[item.key] = {
      label: item.label,
      color: item.color ?? `var(--chart-${(index % 5) + 1})`,
    }
    return acc
  }, {})

  return (
    <ChartContainer
      config={config}
      className="h-[var(--chart-height)] w-full"
      style={{ "--chart-height": `${height}px` } as CSSProperties}
    >
      <LineChart data={data} margin={{ left: 4, right: 16, top: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((item) => (
          <Line
            key={item.key}
            dataKey={item.key}
            type="monotone"
            stroke={`var(--color-${item.key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}

export interface CategoryBarChartProps {
  data: Array<Record<string, number | string>>
  xKey: string
  valueKey: string
  label?: string
  color?: string
  height?: number
}

export function CategoryBarChart({
  data,
  xKey,
  valueKey,
  label = "Value",
  color = "var(--chart-1)",
  height = 260,
}: CategoryBarChartProps) {
  const config: ChartConfig = {
    [valueKey]: {
      label,
      color,
    },
  }

  return (
    <ChartContainer
      config={config}
      className="h-[var(--chart-height)] w-full"
      style={{ "--chart-height": `${height}px` } as CSSProperties}
    >
      <BarChart data={data} margin={{ left: 4, right: 16, top: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={valueKey} fill={`var(--color-${valueKey})`} radius={6}>
          <LabelList
            dataKey={valueKey}
            position="top"
            offset={8}
            className="fill-(--app-muted-text)"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export interface DonutChartProps {
  data: Array<{
    key: string
    label: string
    value: number
    color?: string
  }>
  height?: number
}

export function DonutChart({ data, height = 260 }: DonutChartProps) {
  const config = data.reduce<ChartConfig>((acc, item, index) => {
    acc[item.key] = {
      label: item.label,
      color: item.color ?? `var(--chart-${(index % 5) + 1})`,
    }
    return acc
  }, {})

  return (
    <ChartContainer
      config={config}
      className="h-[var(--chart-height)] w-full"
      style={{ "--chart-height": `${height}px` } as CSSProperties}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          innerRadius={64}
          outerRadius={92}
          paddingAngle={3}
        >
          {data.map((item) => (
            <Cell key={item.key} fill={`var(--color-${item.key})`} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="key" />}
          verticalAlign="bottom"
        />
      </PieChart>
    </ChartContainer>
  )
}

export type {
  ChartContainerProps,
  ChartLegendContentProps,
  ChartTooltipContentProps,
}
