import { Avatar } from "@workspace/ui-components/stable/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"

const members = [
  { name: "Avery Chen", role: "Owner", team: "Platform" },
  { name: "Mila Zhou", role: "Operator", team: "Fulfillment" },
  { name: "Noah Lin", role: "Analyst", team: "Data" },
]

export default function MembersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>会员中心</CardTitle>
        <CardDescription>
          这里预留成员/账号管理入口，适合后续接权限、组织、邀请流程。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-3 rounded-(--ui-radius-lg) border border-(--app-border) px-4 py-3"
            >
              <Avatar alt={member.name} fallback={member.name.charAt(0)} />
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-(--app-muted-text)">
                  {member.role} · {member.team}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
