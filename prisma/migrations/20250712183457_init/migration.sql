-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);
