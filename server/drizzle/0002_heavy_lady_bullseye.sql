CREATE TYPE "public"."source_status" AS ENUM('PENDING', 'PROCESSING', 'READY', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('PDF', 'WEBSITE', 'YOUTUBE', 'TEXT', 'MARKDOWN');--> statement-breakpoint
CREATE TABLE "source" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"type" "source_type" NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"url" text,
	"status" "source_status" DEFAULT 'PENDING' NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_chunk" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"index" integer NOT NULL,
	"content" text NOT NULL,
	"token_count" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "source" ADD CONSTRAINT "source_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_chunk" ADD CONSTRAINT "source_chunk_source_id_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "source_workspace_id_idx" ON "source" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "source_workspace_id_type_idx" ON "source" USING btree ("workspace_id","type");--> statement-breakpoint
CREATE INDEX "source_workspace_id_status_idx" ON "source" USING btree ("workspace_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "source_chunk_source_id_index_uidx" ON "source_chunk" USING btree ("source_id","index");--> statement-breakpoint
CREATE INDEX "source_chunk_source_id_idx" ON "source_chunk" USING btree ("source_id");