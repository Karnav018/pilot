import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bot, Activity, Shield, Bell, Settings } from "lucide-react";
import type { AIAgent } from "@shared/schema";
import { cn } from "@/lib/utils";

interface AgentStatusCardProps {
  agents: AIAgent[];
}

const statusColors = {
  active: "bg-chart-3 text-white",
  idle: "bg-muted text-muted-foreground",
  processing: "bg-chart-2 text-white",
  error: "bg-destructive text-destructive-foreground",
};

const agentIcons = {
  "patch-management": Shield,
  "alert-management": Bell,
  "routine-tasks": Settings,
};

export function AgentStatusCard({ agents }: AgentStatusCardProps) {
  return (
    <Card data-testid="card-agent-status">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>AI Agents</CardTitle>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {agents.filter(a => a.status === "active").length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent) => {
          const AgentIcon = agentIcons[agent.type];
          
          return (
            <div
              key={agent.id}
              className="flex items-start gap-4 p-4 rounded-md border hover-elevate"
              data-testid={`agent-${agent.id}`}
            >
              <div className="p-2 rounded-md bg-primary/10">
                <AgentIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm" data-testid={`agent-name-${agent.id}`}>{agent.name}</h4>
                  <Badge className={cn("text-xs", statusColors[agent.status])} data-testid={`agent-status-${agent.id}`}>
                    {agent.status}
                  </Badge>
                </div>
                {agent.currentTask && (
                  <p className="text-xs text-muted-foreground mb-2" data-testid={`agent-task-${agent.id}`}>
                    {agent.currentTask}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{agent.tasksCompleted} tasks</span>
                  </div>
                  <div className="text-muted-foreground">
                    {agent.successRate}% success
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
