import { buildWorkbenchActivity, buildWorkbenchLanes } from "../domain/logic"
import type { WorkbenchData, WorkbenchLaneId } from "../types"

export interface ComplexWorkbenchViewModel {
  lanes: ReturnType<typeof buildWorkbenchLanes>
  activity: ReturnType<typeof buildWorkbenchActivity>
  selectedLaneId: WorkbenchLaneId
  totalTasks: number
  selectedLaneTaskCount: number
}

export function buildComplexWorkbenchViewModel(
  data: WorkbenchData,
  selectedLaneId: WorkbenchLaneId
): ComplexWorkbenchViewModel {
  const lanes = buildWorkbenchLanes(data.tasks)
  const selectedLane = lanes.find((lane) => lane.id === selectedLaneId)

  return {
    lanes,
    activity: buildWorkbenchActivity(data),
    selectedLaneId,
    totalTasks: data.tasks.length,
    selectedLaneTaskCount: selectedLane?.tasks.length ?? 0,
  }
}
