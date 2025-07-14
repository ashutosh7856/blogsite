-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "content" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_link_key" ON "Link"("link");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_content_fkey" FOREIGN KEY ("content") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
