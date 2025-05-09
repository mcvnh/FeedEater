CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`global_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image` text,
	`link` text NOT NULL,
	`pub_date` integer NOT NULL,
	`feed_id` integer NOT NULL,
	FOREIGN KEY (`feed_id`) REFERENCES `feeds`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_global_id_unique` ON `articles` (`global_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `articles_link_unique` ON `articles` (`link`);--> statement-breakpoint
CREATE TABLE `feeds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`last_sync_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `feeds_url_unique` ON `feeds` (`url`);--> statement-breakpoint
CREATE TABLE `feeds_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`feed_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`feed_id`) REFERENCES `feeds`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
