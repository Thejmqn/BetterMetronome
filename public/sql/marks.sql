DROP TABLE IF EXISTS `marks`;
CREATE TABLE `marks`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `song_id` INT UNSIGNED NOT NULL,
    `measure` INT UNSIGNED NOT NULL,
    `value` VARCHAR(4) NOT NULL
);
ALTER TABLE
    `marks` ADD CONSTRAINT `marks_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
