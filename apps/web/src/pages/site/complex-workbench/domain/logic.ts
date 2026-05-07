import { workbenchLaneOrder, workbenchLaneTitleKeys } from "../constants"
import type {
  WorkbenchActivityItem,
  WorkbenchData,
  WorkbenchLaneModel,
} from "../types"

export function buildWorkbenchLanes(
  tasks: WorkbenchData["tasks"]
): WorkbenchLaneModel[] {
  return workbenchLaneOrder.map((laneId) => ({
    id: laneId,
    titleKey: workbenchLaneTitleKeys[laneId],
    tasks: tasks.filter((task) => task.lane === laneId),
  }))
}

export function buildWorkbenchActivity(
  data: WorkbenchData
): WorkbenchActivityItem[] {
  const tasksById = new Map(data.tasks.map((task) => [task.id, task]))

  return data.events.flatMap((event) => {
    const task = tasksById.get(event.taskId)

    if (!task) {
      return []
    }

    return [
      {
        id: event.id,
        messageKey: event.messageKey,
        taskTitleKey: task.titleKey,
        createdAt: event.createdAt,
      },
    ]
  })
}
