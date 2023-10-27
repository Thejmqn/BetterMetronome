DROP TABLE IF EXISTS `tempos`;
CREATE TABLE `tempos`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `song_id` INT UNSIGNED NOT NULL,
    `measure` INT UNSIGNED NOT NULL,
    `value` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `tempos` ADD CONSTRAINT `tempos_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `songs`(`id`);
