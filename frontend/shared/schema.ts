import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Alert types and schemas
export type AlertSeverity = "critical" | "warning" | "info" | "low";
export type AlertStatus = "active" | "acknowledged" | "resolved" | "auto-remediated";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  source: string;
  timestamp: string;
  status: AlertStatus;
  affectedSystems: string[];
  autoRemediated: boolean;
  agentAction?: string;
  rootCause?: string;
}

// Patch Management types
export type PatchStatus = "pending" | "in-progress" | "completed" | "failed" | "rollback";

export interface Patch {
  id: string;
  name: string;
  version: string;
  severity: "critical" | "high" | "medium" | "low";
  affectedSystems: number;
  status: PatchStatus;
  deployedAt?: string;
  scheduledFor?: string;
  completionPercentage: number;
  canRollback: boolean;
}

export interface PatchPolicy {
  id: string;
  name: string;
  autoDeployment: boolean;
  maintenanceWindow: string;
  testPhaseRequired: boolean;
  approvalRequired: boolean;
}

// Routine Task Automation types
export type TaskType = "user-onboarding" | "user-offboarding" | "software-installation" | "password-reset" | "system-maintenance";
export type TaskStatus = "pending" | "in-progress" | "completed" | "failed";

export interface RoutineTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  status: TaskStatus;
  requestedBy: string;
  requestedAt: string;
  completedAt?: string;
  automatedBy: string;
}

// AI Agent types
export type AgentType = "patch-management" | "alert-management" | "routine-tasks";
export type AgentStatus = "active" | "idle" | "processing" | "error";

export interface AIAgent {
  id: string;
  type: AgentType;
  name: string;
  status: AgentStatus;
  currentTask?: string;
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
}

// Automation Activity types
export interface AutomationActivity {
  id: string;
  type: string;
  description: string;
  outcome: "success" | "failed" | "partial";
  timestamp: string;
  agentId: string;
  agentName: string;
  details?: string;
}

// Root Cause Analysis types
export interface RootCauseAnalysis {
  id: string;
  alertId: string;
  timestamp: string;
  rootCause: string;
  affectedComponents: string[];
  recommendation: string;
  preventionSteps: string[];
  confidence: number;
}

// Workflow Builder types
export type WorkflowNodeType = "trigger" | "condition" | "action";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
  config: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  nodes: WorkflowNode[];
  createdAt: string;
  lastRun?: string;
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalAlerts: number;
  criticalAlerts: number;
  alertTrend: number;
  patchesDeployed: number;
  patchesDeployedTrend: number;
  tasksAutomated: number;
  tasksAutomatedTrend: number;
  systemUptime: number;
  uptimeTrend: number;
}
