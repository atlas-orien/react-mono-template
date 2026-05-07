import { useTranslation } from "react-i18next"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@workspace/ui-components"
import type { WorkbenchLaneId, WorkbenchLaneModel } from "../types"

export interface WorkbenchBoardProps {
  lanes: WorkbenchLaneModel[]
  selectedLaneId: WorkbenchLaneId
  onSelectLane: (laneId: WorkbenchLaneId) => void
}

export function WorkbenchBoard({
  lanes,
  selectedLaneId,
  onSelectLane,
}: WorkbenchBoardProps) {
  const { t } = useTranslation()

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {lanes.map((lane) => (
        <Card key={lane.id}>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center justify-between gap-3">
                <span>{t(lane.titleKey)}</span>
                <Button
                  size="sm"
                  variant={lane.id === selectedLaneId ? "default" : "outline"}
                  onClick={() => onSelectLane(lane.id)}
                >
                  {t("complexWorkbench.board.focus")}
                </Button>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lane.tasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-md border border-(--app-border) bg-(--app-muted-bg) p-3"
                >
                  <div className="font-medium text-(--app-text)">
                    {t(task.titleKey)}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-(--app-muted-text)">
                    <span>{task.owner}</span>
                    <span>
                      {t(`complexWorkbench.priority.${task.priority}`)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
