DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(32) NOT NULL,
    `description` VARCHAR(256) NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `num_measures` INT NOT NULL,
    `initial_tempo` INT NOT NULL,
    `initial_time_signature` INT NOT NULL,
    `initial_key` INT NOT NULL
);
ALTER TABLE
    `songs` ADD CONSTRAINT `songs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);