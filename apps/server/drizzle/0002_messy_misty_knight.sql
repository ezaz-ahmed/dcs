ALTER TABLE "user" ALTER COLUMN "hash" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "refresh_token" varchar(255);