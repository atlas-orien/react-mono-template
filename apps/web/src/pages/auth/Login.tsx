import { useDispatch } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ensureCurrentAppUserPermissions,
  loginApi,
  meApi,
} from "@/api"
import { createLoginSchema } from "@/forms/authSchemas"
import { loginSuccess } from "@/store/authSlice"
import { setAccess } from "@/store/accessSlice"
import { Button } from "@workspace/ui-components/stable/button"
import { Input } from "@workspace/ui-components/stable/input"

const authShellClassName =
  "relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[var(--ui-radius-xl)] border border-(--app-border) bg-(--app-surface) shadow-[var(--ui-shadow-soft)] sm:grid-cols-2"
const authAsideClassName =
  "relative hidden flex-col justify-between border-r border-(--app-border) bg-[linear-gradient(155deg,var(--app-active-bg)_0%,var(--app-surface)_65%)] p-10 text-(--app-text) sm:flex"
const authContentClassName = "p-8 sm:p-10"
const authInputWrapperClassName = "space-y-2"
const authLabelClassName = "text-sm font-medium text-(--app-text)"
const authErrorClassName = "text-sm text-[var(--destructive)]"
const authFooterClassName = "text-sm text-(--app-muted-text)"
const authLinkClassName =
  "font-medium text-(--app-text) underline-offset-4 transition hover:underline"

export default function LoginPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])
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

  const from = location.state?.from?.pathname ?? "/home"

  const handleLogin = handleSubmit(async (values) => {
    try {
      const res = await loginApi(values)
      const token = res.accessToken
      const refreshToken = res.refreshToken

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      const user = await meApi()
      const access = await ensureCurrentAppUserPermissions(user)

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
    <div className={authShellClassName}>
      <section className={authAsideClassName}>
        <div className="space-y-10">
          <div>
            <p className="text-xs tracking-[0.22em] text-(--app-muted-text)">
              {t("login.brand")}
            </p>
            <h1 className="mt-4 text-4xl/tight  font-semibold">
              {t("login.hero.titleLine1")}
              <br />
              {t("login.hero.titleLine2")}
            </h1>
          </div>
          <div className="space-y-3 text-sm text-(--app-muted-text)">
            <p>{t("login.hero.desc1")}</p>
            <p>{t("login.hero.desc2")}</p>
          </div>
        </div>
      </section>

      <section className={authContentClassName}>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.16em] text-(--app-muted-text)">
              {t("login.welcome")}
            </p>
            <h2 className="text-3xl font-semibold text-(--app-text)">
              {t("login.title")}
            </h2>
            <p className="text-sm text-(--app-muted-text)">
              {t("login.subtitle")}
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-5">
              <label className={authInputWrapperClassName}>
                <span className={authLabelClassName}>
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
                {errors.identifier && (
                  <p className={authErrorClassName}>{errors.identifier.message}</p>
                )}
              </label>

              <label className={authInputWrapperClassName}>
                <span className={authLabelClassName}>
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
                {errors.password && (
                  <p className={authErrorClassName}>{errors.password.message}</p>
                )}
              </label>

              <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting
                  ? t("login.form.submitting")
                  : t("login.form.submit")}
              </Button>
            </div>
          </form>

          <p className={authFooterClassName}>
            {t("login.footer.toRegisterPrefix")}{" "}
            <Link to="/register" className={authLinkClassName}>
              {t("login.footer.toRegisterAction")}
            </Link>
          </p>

        </div>
      </section>
    </div>
  )
}
