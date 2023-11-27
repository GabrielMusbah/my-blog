-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "img" TEXT,
    "resume" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false
);
