import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Patch } from "@shared/schema";
import { Shield, ArrowRight } from "lucide-react";

interface PatchStatusCardProps {
  patches: Patch[];
  onViewDetails: () => void;
}

export function PatchStatusCard({ patches, onViewDetails }: PatchStatusCardProps) {
  const pending = patches.filter(p => p.status === "pending").length;
  const inProgress = patches.filter(p => p.status === "in-progress").length;
  const completed = patches.filter(p => p.status === "completed").length;
  const failed = patches.filter(p => p.status === "failed").length;

  const totalPatches = patches.length;
  const completionRate = totalPatches > 0 ? Math.round((completed / totalPatches) * 100) : 0;

  return (
    <Card data-testid="card-patch-status">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-chart-3" />
          Patch Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-2xl font-bold tabular-nums" data-testid="patch-completion-rate">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-3" data-testid="patch-progress-bar" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md bg-muted/50" data-testid="patch-stat-pending">
            <div className="text-2xl font-bold tabular-nums text-chart-4">{pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="p-4 rounded-md bg-muted/50" data-testid="patch-stat-in-progress">
            <div className="text-2xl font-bold tabular-nums text-chart-2">{inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="p-4 rounded-md bg-muted/50" data-testid="patch-stat-completed">
            <div className="text-2xl font-bold tabular-nums text-chart-3">{completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="p-4 rounded-md bg-muted/50" data-testid="patch-stat-failed">
            <div className="text-2xl font-bold tabular-nums text-destructive">{failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>

        {patches.slice(0, 3).map((patch) => (
          <div key={patch.id} className="flex items-center justify-between gap-4 p-3 rounded-md border" data-testid={`patch-${patch.id}`}>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate" data-testid={`patch-name-${patch.id}`}>{patch.name}</div>
              <div className="text-xs text-muted-foreground">{patch.affectedSystems} systems</div>
            </div>
            <Badge
              variant={patch.status === "completed" ? "default" : "outline"}
              className={patch.status === "failed" ? "border-destructive text-destructive" : ""}
              data-testid={`patch-status-${patch.id}`}
            >
              {patch.status}
            </Badge>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={onViewDetails}
          data-testid="button-view-patch-details"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
