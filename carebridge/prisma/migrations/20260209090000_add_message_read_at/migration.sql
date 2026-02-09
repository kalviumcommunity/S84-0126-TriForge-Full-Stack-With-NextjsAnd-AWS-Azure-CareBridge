-- Add read tracking for messages
ALTER TABLE "messages" ADD COLUMN "readAt" TIMESTAMP(3);
