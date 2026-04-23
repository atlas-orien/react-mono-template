import { registerLocaleMessages } from "@workspace/locales/i18n"
import enMessages from "./en/messages"
import zhCNMessages from "./zhCN/messages"

export function registerAdminLocaleMessages() {
  registerLocaleMessages({
    en: enMessages,
    zhCN: zhCNMessages,
  })
}
