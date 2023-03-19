-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_topics" (
    "id" SERIAL NOT NULL,
    "news_id" INTEGER NOT NULL,
    "topics_id" INTEGER NOT NULL,

    CONSTRAINT "news_topics_pkey" PRIMARY KEY ("id")
);
