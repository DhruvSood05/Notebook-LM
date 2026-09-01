import { eq, and, desc } from "drizzle-orm";

import { db } from "../lib/db/index.js";
import { workspace } from "../lib/db/schema.js";

import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../validators/workspace.validator.js";

// the things we needed to select from our workspace once its created : workspace select
export const workspaceSelect = {
  id: workspace.id,
  title: workspace.title,
  description: workspace.description,
  icon: workspace.icon,
  defaultModel: workspace.defaultModel,
  createdAt: workspace.createdAt,
  updatedAt: workspace.updatedAt,
} as const;

export type WorkspaceRecord = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  defaultModel: string;
  createdAt: Date;
  updatedAt: Date;
};

export function findWorkspacesByUserId(userId: string) {
  return db
    .select(workspaceSelect)
    .from(workspace)
    .where(eq(workspace.userId, userId))
    .orderBy(desc(workspace.updatedAt));
}

export function findWorkspaceByIdAndUserId(
  workspaceId: string,
  userId: string,
) {
  return db
    .select(workspaceSelect)
    .from(workspace)
    .where(and(eq(workspace.id, workspaceId), eq(workspace.userId, userId)))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export function createWorkspaceRecord(
  userId: string,
  data: CreateWorkspaceInput,
) {
  return db
    .insert(workspace)
    .values({
      userId,
      ...data,
    })
    .returning(workspaceSelect)
    .then((rows) => rows[0]);
}

export function updateWorkspaceRecord(
  workspaceId: string,
  data: UpdateWorkspaceInput,
) {
  return db
    .update(workspace)
    .set(data)
    .where(eq(workspace.id, workspaceId))
    .returning(workspaceSelect)
    .then((rows) => rows[0]);
}

export async function deleteWorkspaceRecord(workspaceId: string) {
  await db.delete(workspace).where(eq(workspace.id, workspaceId));
}
