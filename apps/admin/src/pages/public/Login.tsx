import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { getCurrentUserPermissionsApi, meApi, loginApi } from "@/api"
import { createAuthLoginSchema } from "@workspace/app-kit/login"
import { loginSuccess } from "@/store/authSlice"
import { setAccess } from "@/store/accessSlice"
import { Alert } from "@workspace/ui-components/stable/alert"
import { Badge } from "@workspace/ui-components/stable/badge"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"
import { Input } from "@workspace/ui-components/stable/input"
import { Separator } from "@workspace/ui-components/stable/separator"

export default function LoginPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loginSchema = useMemo(() => createAuthLoginSchema(t), [t])
  type LoginFormValues = z.infer<typeof loginSchema>
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const from = location.state?.from?.pathname ?? "/"

  const handleLogin = handleSubmit(async (values) => {
    try {
      const res = await loginApi(values)
      const token = res.accessToken
      const refreshToken = res.refreshToken

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      const [user, access] = await Promise.all([
        meApi(),
        getCurrentUserPermissionsApi(),
      ])

      dispatch(loginSuccess({ token, user }))
      dispatch(
        setAccess({
          roleCodes: access.roleCodes,
          permissionCodes: access.permissionCodes,
        })
      )

      navigate(from, { replace: true })
    } catch (err) {
      console.error("Login failed:", err)
    }
  })

  return (
    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <Badge variant="outline">Admin Blueprint</Badge>
          <CardTitle>基于 `apps/web` 模板的新管理台入口</CardTitle>
          <CardDescription>
            保留现有鉴权恢复、React Query、Redux 和本地服务端联调接法，UI
            改用 workspace 自有组件。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-(--app-muted-text)">
            <p>默认复用当前 `auth/file` 服务代理。</p>
            <p>建议先启动本地服务端，再用 `pnpm -C apps/admin dev` 联调。</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-xs tracking-[0.18em] text-(--app-muted-text)">
            Workspace Admin
          </p>
          <CardTitle>登录管理台</CardTitle>
          <CardDescription>
            使用本地服务端账号流程进入后台壳层。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <Alert
              title="Local Backend Ready"
              description="本地服务端启动后，登录、会话恢复和权限接口会通过 dev proxy 转发。"
            />

            <Separator />

            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-(--app-text)">
                  {t("login.form.identifier.label")}
                </span>
                <Controller
                  control={control}
                  name="identifier"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onValueChange={field.onChange}
                      type="text"
                      placeholder={t("login.form.identifier.placeholder")}
                    />
                  )}
                />
                {errors.identifier ? (
                  <p className="text-sm text-destructive">
                    {errors.identifier.message}
                  </p>
                ) : null}
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-(--app-text)">
                  {t("login.form.password.label")}
                </span>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onValueChange={field.onChange}
                      type="password"
                      placeholder={t("login.form.password.placeholder")}
                    />
                  )}
                />
                {errors.password ? (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                ) : null}
              </label>

              <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting
                  ? t("login.form.submitting")
                  : t("login.form.submit")}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
