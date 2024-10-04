-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "paragraph1" TEXT NOT NULL,
    "paragraph2" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subItems" TEXT NOT NULL
);
