import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AutomationActivity } from "@shared/schema";
import { Activity, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentAutomationsCardProps {
  activities: AutomationActivity[];
}

const outcomeConfig = {
  success: { icon: CheckCircle, color: "text-chart-3", bg: "bg-chart-3/10" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  partial: { icon: AlertTriangle, color: "text-chart-4", bg: "bg-chart-4/10" },
};

export function RecentAutomationsCard({ activities }: RecentAutomationsCardProps) {
  const recentActivities = activities.slice(0, 6);

  return (
    <Card data-testid="card-recent-automations">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Automations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const config = outcomeConfig[activity.outcome];
            const OutcomeIcon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-md border hover-elevate"
                data-testid={`automation-${activity.id}`}
              >
                <div className={cn("p-2 rounded-md", config.bg)}>
                  <OutcomeIcon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="font-semibold text-sm" data-testid={`automation-type-${activity.id}`}>{activity.type}</h4>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("text-xs capitalize shrink-0", config.color)}
                      data-testid={`automation-outcome-${activity.id}`}
                    >
                      {activity.outcome}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-2">
                    <span className="text-muted-foreground">{activity.agentName}</span>
                    <span className="text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
