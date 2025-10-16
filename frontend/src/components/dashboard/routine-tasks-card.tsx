import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { RoutineTask, TaskType } from "@shared/schema";
import { Settings, UserPlus, UserMinus, Download, Key } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

interface RoutineTasksCardProps {
  tasks: RoutineTask[];
}
const taskIcons: Record<TaskType, ComponentType<SVGProps<SVGSVGElement>>> = {
  "user-onboarding": UserPlus,
  "user-offboarding": UserMinus,
  "software-installation": Download,
  "password-reset": Key,
  "system-maintenance": Settings,
};

const statusColors = {
  pending: "bg-muted text-muted-foreground",
  "in-progress": "bg-chart-2 text-white",
  completed: "bg-chart-3 text-white",
  failed: "bg-destructive text-destructive-foreground",
};

export function RoutineTasksCard({ tasks }: RoutineTasksCardProps) {
  const completedToday = tasks.filter(t => t.status === "completed").length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 0;

  return (
    <Card data-testid="card-routine-tasks">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Routine Task Automation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tasks Completed Today</span>
            <span className="text-lg font-bold tabular-nums">{completedToday}/{totalTasks}</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="space-y-2">
          {tasks.slice(0, 5).map((task) => {
            const TaskIcon = taskIcons[task.type];
            
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-md border hover-elevate"
                data-testid={`task-${task.id}`}
              >
                <div className="p-2 rounded-md bg-muted">
                  <TaskIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate" data-testid={`task-title-${task.id}`}>{task.title}</h4>
                  <p className="text-xs text-muted-foreground">{task.requestedBy}</p>
                </div>
                <Badge className={cn("text-xs", statusColors[task.status])} data-testid={`task-status-${task.id}`}>
                  {task.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
