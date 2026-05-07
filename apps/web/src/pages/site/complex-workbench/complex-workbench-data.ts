import type { WorkbenchData } from "./types"

export function useComplexWorkbenchData(): WorkbenchData {
  return {
    tasks: [
      {
        id: "task-page-map",
        titleKey: "complexWorkbench.tasks.pageMap",
        lane: "intake",
        owner: "AI",
        priority: "medium",
      },
      {
        id: "task-view-model",
        titleKey: "complexWorkbench.tasks.viewModel",
        lane: "review",
        owner: "UX",
        priority: "high",
      },
      {
        id: "task-rules",
        titleKey: "complexWorkbench.tasks.rules",
        lane: "ship",
        owner: "FE",
        priority: "low",
      },
    ],
    events: [
      {
        id: "event-page-map",
        taskId: "task-page-map",
        messageKey: "complexWorkbench.events.pageMap",
        createdAt: "09:20",
      },
      {
        id: "event-view-model",
        taskId: "task-view-model",
        messageKey: "complexWorkbench.events.viewModel",
        createdAt: "10:05",
      },
      {
        id: "event-rules",
        taskId: "task-rules",
        messageKey: "complexWorkbench.events.rules",
        createdAt: "10:40",
      },
    ],
  }
}
