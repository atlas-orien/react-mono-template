export const metricCards = [
  { label: "今日成交额", value: "¥ 284.6k", delta: "+12.4%", marker: "GMV" },
  { label: "新增会员", value: "1,842", delta: "+6.8%", marker: "USR" },
  { label: "待处理工单", value: "27", delta: "-8.1%", marker: "TKT" },
  { label: "系统可用率", value: "99.96%", delta: "+0.2%", marker: "SLA" },
]

export const revenueTrend = [
  { day: "Mon", revenue: 128, orders: 92 },
  { day: "Tue", revenue: 164, orders: 118 },
  { day: "Wed", revenue: 152, orders: 124 },
  { day: "Thu", revenue: 196, orders: 148 },
  { day: "Fri", revenue: 238, orders: 172 },
  { day: "Sat", revenue: 214, orders: 156 },
  { day: "Sun", revenue: 286, orders: 198 },
]

export const channelStats = [
  { channel: "直营商城", value: 42 },
  { channel: "渠道伙伴", value: 28 },
  { channel: "小程序", value: 22 },
  { channel: "线下门店", value: 17 },
]

export const userSegments = [
  { key: "new", label: "新用户", value: 38 },
  { key: "active", label: "活跃用户", value: 44 },
  { key: "silent", label: "沉默用户", value: 18 },
]

export const serviceStatus = [
  ["API 网关", "正常", "38ms"],
  ["任务队列", "正常", "12 jobs"],
  ["消息通知", "观察中", "96.4%"],
]

export const orders = [
  ["SO-20260426-01", "华东大区", "待复核", "¥ 128,000"],
  ["SO-20260426-02", "直营商城", "已发货", "¥ 52,600"],
  ["SO-20260426-03", "渠道伙伴", "待付款", "¥ 310,500"],
  ["SO-20260426-04", "小程序商城", "已完成", "¥ 86,200"],
]

export const riskItems = [
  { label: "退款工单积压", value: 62 },
  { label: "权限变更待审", value: 38 },
  { label: "库存同步延迟", value: 14 },
]
