import { z } from "zod"
import type { TFunction } from "i18next"

export function createLoginSchema(t: TFunction) {
  return z.object({
    identifier: z.string().trim().min(1, t("validation.required", { ns: "common" })),
    password: z.string().trim().min(1, t("validation.required", { ns: "common" })),
  })
}

export function createRegisterSchema(t: TFunction) {
  const emailValidator = z.email()

  return z
    .object({
      username: z.string().trim().min(1, t("validation.required", { ns: "common" })),
      displayName: z.string(),
      email: z
        .string()
        .trim()
        .refine(
          (value) => value === "" || emailValidator.safeParse(value).success,
          {
            message: t("validation.emailInvalid", { ns: "common" }),
          }
        ),
      password: z.string().trim().min(1, t("validation.required", { ns: "common" })),
      confirmPassword: z
        .string()
        .trim()
        .min(1, t("validation.required", { ns: "common" })),
    })
    .refine((value) => value.password === value.confirmPassword, {
      path: ["confirmPassword"],
      message: t("register.error.passwordMismatch"),
    })
}
