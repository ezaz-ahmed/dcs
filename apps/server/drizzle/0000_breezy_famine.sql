CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"hash" varchar(255),
	"donor" "role",
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
