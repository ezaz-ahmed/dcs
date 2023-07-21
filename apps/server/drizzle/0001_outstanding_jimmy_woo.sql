ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'donor' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "donor";