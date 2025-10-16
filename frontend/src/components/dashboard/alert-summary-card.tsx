import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Alert, AlertSeverity } from "@shared/schema";
import { AlertCircle, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AlertSummaryCardProps {
  alerts: Alert[];
  onViewAll: () => void;
}

const severityConfig: Record<AlertSeverity, { color: string; bg: string; textColor: string }> = {
  critical: { color: "bg-destructive", bg: "bg-destructive/10", textColor: "text-destructive" },
  warning: { color: "bg-chart-4", bg: "bg-chart-4/10", textColor: "text-chart-4" },
  info: { color: "bg-chart-2", bg: "bg-chart-2/10", textColor: "text-chart-2" },
  low: { color: "bg-muted-foreground", bg: "bg-muted", textColor: "text-muted-foreground" },
};

const statusIcons: Record<Alert["status"], LucideIcon> = {
  active: AlertCircle,
  acknowledged: Clock,
  resolved: CheckCircle,
  "auto-remediated": CheckCircle,
};

export function AlertSummaryCard({ alerts, onViewAll }: AlertSummaryCardProps) {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <Card data-testid="card-alert-summary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-chart-4" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-chart-3" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          recentAlerts.map((alert) => {
            const StatusIcon = statusIcons[alert.status];
            const severityStyle = severityConfig[alert.severity];

            return (
              <div
                key={alert.id}
                className="p-4 rounded-md border bg-card hover-elevate"
                data-testid={`alert-${alert.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-md", severityStyle.bg)}>
                    <StatusIcon className={cn("h-4 w-4", severityStyle.textColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm" data-testid={`alert-title-${alert.id}`}>{alert.title}</h4>
                      <Badge
                        variant="outline"
                        className={cn("text-xs capitalize", severityStyle.textColor)}
                        data-testid={`alert-severity-${alert.id}`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">{alert.source}</span>
                      <span className="text-muted-foreground">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      {alert.autoRemediated && (
                        <Badge variant="outline" className="border-chart-3 text-chart-3 text-xs">
                          Auto-remediated
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewAll}
          data-testid="button-view-all-alerts"
        >
          View All Alerts
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
