import type { WorkbenchLaneId } from "./types"

export const workbenchLaneTitleKeys: Record<WorkbenchLaneId, string> = {
  intake: "complexWorkbench.lanes.intake",
  review: "complexWorkbench.lanes.review",
  ship: "complexWorkbench.lanes.ship",
}

export const workbenchLaneOrder: WorkbenchLaneId[] = [
  "intake",
  "review",
  "ship",
]
