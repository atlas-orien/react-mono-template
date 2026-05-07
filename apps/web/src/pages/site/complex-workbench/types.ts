export type WorkbenchLaneId = "intake" | "review" | "ship"

export interface WorkbenchTask {
  id: string
  titleKey: string
  lane: WorkbenchLaneId
  owner: string
  priority: "low" | "medium" | "high"
}

export interface WorkbenchEvent {
  id: string
  taskId: string
  messageKey: string
  createdAt: string
}

export interface WorkbenchData {
  tasks: WorkbenchTask[]
  events: WorkbenchEvent[]
}

export interface WorkbenchLaneModel {
  id: WorkbenchLaneId
  titleKey: string
  tasks: WorkbenchTask[]
}

export interface WorkbenchActivityItem {
  id: string
  messageKey: string
  taskTitleKey: string
  createdAt: string
}
