import { useMemo, useState } from "react"
import { useComplexWorkbenchData } from "./complex-workbench-data"
import type { WorkbenchLaneId } from "./types"
import { buildComplexWorkbenchViewModel } from "./view-model/workbench-view-model"

export function useComplexWorkbenchPage() {
  const data = useComplexWorkbenchData()
  const [selectedLaneId, setSelectedLaneId] =
    useState<WorkbenchLaneId>("intake")

  const viewModel = useMemo(
    () => buildComplexWorkbenchViewModel(data, selectedLaneId),
    [data, selectedLaneId]
  )

  return {
    ...viewModel,
    selectLane: setSelectedLaneId,
  }
}
