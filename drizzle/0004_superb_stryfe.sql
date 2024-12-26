ALTER TABLE "dates" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dates" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL;