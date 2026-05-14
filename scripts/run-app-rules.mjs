import { spawn } from "node:child_process"

const child = spawn("vitest", ["run", "--root", "..", "rules"], {
  env: {
    ...process.env,
    APP_ROOT: process.cwd(),
  },
  stdio: "inherit",
  shell: process.platform === "win32",
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
