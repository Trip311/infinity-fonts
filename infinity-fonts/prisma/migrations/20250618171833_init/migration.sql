-- CreateTable
CREATE TABLE "Font" (
    "id" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "designer" TEXT,
    "license" TEXT NOT NULL,
    "category" TEXT,
    "subsets" TEXT[],
    "variants" TEXT[],
    "version" TEXT,
    "lastModified" TIMESTAMP(3),
    "files" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "license" TEXT NOT NULL,
    "tags" TEXT[],
    "version" TEXT,
    "lastModified" TIMESTAMP(3),
    "files" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);
