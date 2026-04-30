import { z } from "zod"
import type { TFunction } from "i18next"

export function createLoginSchema(t: TFunction) {
  return z.object({
    identifier: z.string().trim().min(1, t("validation.required", { ns: "common" })),
    password: z.string().trim().min(1, t("validation.required", { ns: "common" })),
  })
}
