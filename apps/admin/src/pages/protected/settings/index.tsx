import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Switch } from "@workspace/ui-components/stable/switch"

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>系统设置</CardTitle>
        <CardDescription>
          当前先提供壳层配置位，后续可挂接通知、审计、上传策略和环境开关。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            ["启用操作审计提示", true],
            ["启用高风险权限二次确认", true],
            ["允许成员自行创建 API Token", false],
          ].map(([label, checked]) => (
            <label
              key={String(label)}
              className="flex items-center justify-between gap-4 rounded-(--ui-radius-lg) border border-(--app-border) px-4 py-3"
            >
              <span className="text-sm font-medium">{label}</span>
              <Switch checked={Boolean(checked)} />
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
