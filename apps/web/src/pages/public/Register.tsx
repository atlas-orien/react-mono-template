import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  getAuthUserProfileApi,
  loginApi,
  registerApi,
  registerAppUserApi,
} from "@/api"
import { createRegisterSchema } from "@/forms/authSchemas"
import { Button } from "@workspace/ui-components/stable/button"

const authShellClassName =
  "relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[var(--ui-radius-xl)] border border-(--app-border) bg-(--app-surface) shadow-[var(--ui-shadow-soft)] sm:grid-cols-2"
const authAsideClassName =
  "relative hidden flex-col justify-between border-r border-(--app-border) bg-[linear-gradient(155deg,var(--app-active-bg)_0%,var(--app-surface)_65%)] p-10 text-(--app-text) sm:flex"
const authContentClassName = "p-8 sm:p-10"
const authInputWrapperClassName = "space-y-2"
const authLabelClassName = "text-sm font-medium text-(--app-text)"
const authErrorClassName = "text-sm text-[var(--destructive)]"
const authFooterClassName = "mt-6 text-sm text-(--app-muted-text)"
const authLinkClassName =
  "font-medium text-(--app-text) underline-offset-4 transition hover:underline"
const authInputClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30"

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const registerSchema = useMemo(() => createRegisterSchema(t), [t])
  type RegisterFormValues = z.infer<typeof registerSchema>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleRegister = handleSubmit(async (values) => {
    const payload = {
      username: values.username.trim(),
      password: values.password,
      display_name: values.displayName.trim() || undefined,
      email: values.email.trim() || undefined,
    }
    try {
      await registerApi(payload)
      const tokens = await loginApi({
        identifier: payload.username,
        password: payload.password,
      })
      const authUser = await getAuthUserProfileApi(tokens.accessToken)

      await registerAppUserApi({
        userId: authUser.id,
        displayId: authUser.display_user_id || authUser.username,
        displayName: authUser.display_name || authUser.username,
        remark: null,
      })

      navigate("/login", { replace: true })
    } catch (err) {
      console.error("Register failed:", err)
    }
  })

  return (
    <div className={authShellClassName}>
      <section className={authAsideClassName}>
        <div>
          <p className="text-xs tracking-[0.22em] text-(--app-muted-text)">
            {t("register.brand")}
          </p>
          <h1 className="mt-4 text-4xl/tight  font-semibold">
            {t("register.hero.titleLine1")}
            <br />
            {t("register.hero.titleLine2")}
          </h1>
        </div>
        <div className="space-y-3 text-sm text-(--app-muted-text)">
          <p>{t("register.hero.desc1")}</p>
          <p>{t("register.hero.desc2")}</p>
        </div>
      </section>

      <section className={authContentClassName}>
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.16em] text-(--app-muted-text)">
            {t("register.welcome")}
          </p>
          <h2 className="text-3xl font-semibold text-(--app-text)">
            {t("register.title")}
          </h2>
          <p className="text-sm text-(--app-muted-text)">
            {t("register.subtitle")}
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <label className={authInputWrapperClassName}>
            <span className={authLabelClassName}>
              {t("register.form.username.label")}
            </span>
            <input
              type="text"
              placeholder={t("register.form.username.placeholder")}
              {...register("username")}
              className={authInputClassName}
            />
            {errors.username && (
              <p className={authErrorClassName}>{errors.username.message}</p>
            )}
          </label>

          <label className={authInputWrapperClassName}>
            <span className={authLabelClassName}>
              {t("register.form.displayName.label")}
            </span>
            <input
              type="text"
              placeholder={t("register.form.displayName.placeholder")}
              {...register("displayName")}
              className={authInputClassName}
            />
            {errors.displayName && (
              <p className={authErrorClassName}>{errors.displayName.message}</p>
            )}
          </label>

          <label className={authInputWrapperClassName}>
            <span className={authLabelClassName}>
              {t("register.form.email.label")}
            </span>
            <input
              type="email"
              placeholder={t("register.form.email.placeholder")}
              {...register("email")}
              className={authInputClassName}
            />
            {errors.email && (
              <p className={authErrorClassName}>{errors.email.message}</p>
            )}
          </label>

          <label className={authInputWrapperClassName}>
            <span className={authLabelClassName}>
              {t("register.form.password.label")}
            </span>
            <input
              type="password"
              placeholder={t("register.form.password.placeholder")}
              {...register("password")}
              className={authInputClassName}
            />
            {errors.password && (
              <p className={authErrorClassName}>{errors.password.message}</p>
            )}
          </label>

          <label className={authInputWrapperClassName}>
            <span className={authLabelClassName}>
              {t("register.form.confirmPassword.label")}
            </span>
            <input
              type="password"
              placeholder={t("register.form.confirmPassword.placeholder")}
              {...register("confirmPassword")}
              className={authInputClassName}
            />
            {errors.confirmPassword && (
              <p className={authErrorClassName}>
                {errors.confirmPassword.message}
              </p>
            )}
          </label>

          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting
              ? t("register.form.submitting")
              : t("register.form.submit")}
          </Button>
        </form>

        <p className={authFooterClassName}>
          {t("register.footer.toLoginPrefix")}{" "}
          <Link to="/login" className={authLinkClassName}>
            {t("register.footer.toLoginAction")}
          </Link>
        </p>
      </section>
    </div>
  )
}
