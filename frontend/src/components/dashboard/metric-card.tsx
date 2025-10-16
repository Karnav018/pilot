import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  testId?: string;
}

export function MetricCard({ title, value, trend, icon: Icon, iconColor = "text-primary", testId }: MetricCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <Card data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold tabular-nums" data-testid={`${testId}-value`}>{value}</div>
        {trend !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {isPositive && <ArrowUp className="h-3 w-3 text-chart-3" />}
            {isNegative && <ArrowDown className="h-3 w-3 text-destructive" />}
            <span className={cn(
              "font-medium tabular-nums",
              isPositive && "text-chart-3",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}>
              {trend > 0 && "+"}{trend}%
            </span>
            <span className="text-muted-foreground">from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
