import { useTranslation } from "react-i18next"
import { Button } from "@workspace/ui-components/stable/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui-components/stable/card"

export default function GuidePage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-10 py-4">
      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("guide.title")}
          </h1>
          <p className="text-sm text-(--app-muted-text)">{t("guide.subtitle")}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("guide.buttons.title")}</CardTitle>
              <CardDescription>{t("guide.buttons.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  size="lg"
                >
                  {t("guide.buttons.danger")}
                </Button>
                <Button type="button" variant="primary" size="lg">
                  {t("guide.buttons.primary")}
                </Button>
                <Button type="button" variant="secondary" size="lg">
                  {t("guide.buttons.secondary")}
                </Button>
                <Button type="button" variant="outline" size="lg">
                  {t("guide.buttons.outline")}
                </Button>
                <Button type="button" variant="ghost" size="lg">
                  {t("guide.buttons.ghost")}
                </Button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground) transition-colors [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)] hover:bg-(--primary-hover) active:bg-(--primary-active) disabled:bg-(--primary-disabled)"
                >
                  左斜按钮
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground) transition-colors [clip-path:polygon(0_0,88%_0,100%_100%,12%_100%)] hover:bg-(--primary-hover) active:bg-(--primary-active) disabled:bg-(--primary-disabled)"
                >
                  右斜按钮
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("guide.guide.title")}
          </h2>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.intro")}</p>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.step1")}</p>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.step2")}</p>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.step3")}</p>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.template")}</p>
          <p className="text-sm text-(--app-muted-text)">{t("guide.guide.tip")}</p>
        </div>
      </section>
    </div>
  )
}
