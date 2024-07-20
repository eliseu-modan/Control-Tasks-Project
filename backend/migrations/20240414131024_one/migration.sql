-- CreateTable
CREATE TABLE `CreateMessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `dateInitial` DATETIME(3) NULL,
    `dateFinally` DATETIME(3) NULL,
    `dataConcluided` DATETIME(3) NULL,
    `currentTask` BOOLEAN NOT NULL DEFAULT false,
    `permanent` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreateUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL,

    UNIQUE INDEX `CreateUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CreateMessages` ADD CONSTRAINT `CreateMessages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `CreateUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
