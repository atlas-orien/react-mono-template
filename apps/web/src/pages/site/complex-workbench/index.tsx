import { WorkbenchActivity } from "./components/workbench-activity"
import { WorkbenchBoard } from "./components/workbench-board"
import { WorkbenchHeader } from "./components/workbench-header"
import { useComplexWorkbenchPage } from "./use-complex-workbench-page"

export default function ComplexWorkbenchPage() {
  const workbench = useComplexWorkbenchPage()

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <WorkbenchHeader
        totalTasks={workbench.totalTasks}
        selectedLaneTaskCount={workbench.selectedLaneTaskCount}
      />
      <WorkbenchBoard
        lanes={workbench.lanes}
        selectedLaneId={workbench.selectedLaneId}
        onSelectLane={workbench.selectLane}
      />
      <WorkbenchActivity activity={workbench.activity} />
    </main>
  )
}
