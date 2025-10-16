import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Activity, Shield, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AgentStatusCard } from "@/components/dashboard/agent-status-card";
import { AlertSummaryCard } from "@/components/dashboard/alert-summary-card";
import { PatchStatusCard } from "@/components/dashboard/patch-status-card";
import { RecentAutomationsCard } from "@/components/dashboard/recent-automations-card";
import { RoutineTasksCard } from "@/components/dashboard/routine-tasks-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert as AlertUI, AlertDescription } from "@/components/ui/alert";
import type { DashboardMetrics, Alert, Patch, RoutineTask, AIAgent, AutomationActivity } from "@shared/schema";

function MetricsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-lg border bg-card">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-16 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
  });

  const { data: patches, isLoading: patchesLoading } = useQuery<Patch[]>({
    queryKey: ["/api/patches"],
  });

  const { data: tasks, isLoading: tasksLoading } = useQuery<RoutineTask[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: agents, isLoading: agentsLoading } = useQuery<AIAgent[]>({
    queryKey: ["/api/agents"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<AutomationActivity[]>({
    queryKey: ["/api/automations"],
  });

  const isLoading = metricsLoading || alertsLoading || patchesLoading || tasksLoading || agentsLoading || activitiesLoading;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Pilot</h1>
              </div>
              <div className="hidden md:block text-sm text-muted-foreground">
                Autonomous IT Management System
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-64 pl-9"
                  data-testid="input-search"
                />
              </div>
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor and manage all AI agent activities in real-time
          </p>
        </div>

        {metricsError && (
          <AlertUI variant="destructive" className="mb-6">
            <AlertDescription>
              Failed to load dashboard data. Please try refreshing the page.
            </AlertDescription>
          </AlertUI>
        )}

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Alerts"
                value={metrics?.totalAlerts ?? 0}
                trend={metrics?.alertTrend}
                icon={AlertTriangle}
                iconColor="text-chart-4"
                testId="metric-total-alerts"
              />
              <MetricCard
                title="Patches Deployed"
                value={metrics?.patchesDeployed ?? 0}
                trend={metrics?.patchesDeployedTrend}
                icon={Shield}
                iconColor="text-chart-3"
                testId="metric-patches-deployed"
              />
              <MetricCard
                title="Tasks Automated"
                value={metrics?.tasksAutomated ?? 0}
                trend={metrics?.tasksAutomatedTrend}
                icon={Activity}
                iconColor="text-primary"
                testId="metric-tasks-automated"
              />
              <MetricCard
                title="System Uptime"
                value={`${metrics?.systemUptime ?? 0}%`}
                trend={metrics?.uptimeTrend}
                icon={TrendingUp}
                iconColor="text-chart-3"
                testId="metric-system-uptime"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AlertSummaryCard
                  alerts={alerts ?? []}
                  onViewAll={() => console.log("View all alerts")}
                />
              </div>
              <div>
                <AgentStatusCard agents={agents ?? []} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <PatchStatusCard
                patches={patches ?? []}
                onViewDetails={() => console.log("View patch details")}
              />
              <RoutineTasksCard tasks={tasks ?? []} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <RecentAutomationsCard activities={activities ?? []} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
