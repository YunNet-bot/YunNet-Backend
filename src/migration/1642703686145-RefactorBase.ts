import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorBase1642703686145 implements MigrationInterface {
    name = 'RefactorBase1642703686145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `switch` DROP FOREIGN KEY `switch_fk_self_upper_id`");
        await queryRunner.query("ALTER TABLE `lock` DROP FOREIGN KEY `lock_fk_lock_type`");
        await queryRunner.query("ALTER TABLE `lock` DROP FOREIGN KEY `lock_fk_user`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `iptable_fk_group`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `iptable_fk_ip_type`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `iptable_fk_switch`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `iptable_fk_user`");
        await queryRunner.query("DROP INDEX `lock_fk_lock_type_idx` ON `lock`");
        await queryRunner.query("DROP INDEX `lock_fk_user_idx` ON `lock`");
        await queryRunner.query("DROP INDEX `username_UNIQUE` ON `user`");
        await queryRunner.query("DROP INDEX `back_mail_UNIQUE` ON `user`");
        await queryRunner.query("ALTER TABLE `ip_type` CHANGE `ip_type_id` `ip_tid` int(11) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `lock` CHANGE `lock_id` `lock_id` int UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `lock` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lock_id`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lock_type_id`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `gid`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lock_by_user_id`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password_hash`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `nick`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `back_mail`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `ip_type_id`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `switch_id`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `gid`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `lock_id`");
        await queryRunner.query("ALTER TABLE `lock` ADD `lid` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `lock` ADD `lock_tid` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `lock` ADD `lock_by_uid` int(10) UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `account` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_4ab2df0a57a74fdf904e0e2708` (`account`)");
        await queryRunner.query("ALTER TABLE `user` ADD `password` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `name` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `mail` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `isAdmin` tinyint(1) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `iptable` ADD `ip_tid` int(11) UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `iptable` ADD `sid` int(11) NULL");
        await queryRunner.query("ALTER TABLE `iptable` ADD `lid` int(10) UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `ip_type` CHANGE `ip_tid` `ip_tid` int UNSIGNED NOT NULL");
        await queryRunner.query("CREATE INDEX `lock_fk_user_idx` ON `lock` (`lock_by_uid`)");
        await queryRunner.query("CREATE INDEX `lock_fk_lock_type_idx` ON `lock` (`lock_tid`)");
        await queryRunner.query("CREATE UNIQUE INDEX `account_UNIQUE` ON `user` (`account`)");
        await queryRunner.query("CREATE INDEX `iptable_fk_user` ON `iptable` (`uid`)");
        await queryRunner.query("CREATE INDEX `iptable_fk_switch` ON `iptable` (`sid`)");
        await queryRunner.query("CREATE INDEX `iptable_fk_ip_type` ON `iptable` (`ip_tid`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a920c02bc47aab0c3c8a29610a` ON `iptable` (`mac`)");
        await queryRunner.query("ALTER TABLE `switch` ADD CONSTRAINT `FK_12e45e6f90f85bb8b58e7790a0f` FOREIGN KEY (`upper_switch`) REFERENCES `switch`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `lock` ADD CONSTRAINT `FK_2bc1f1c48d970844a2335edf64d` FOREIGN KEY (`lock_tid`) REFERENCES `lock_type`(`lock_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `lock` ADD CONSTRAINT `FK_95acaa49d5b74f1b7e515c42bca` FOREIGN KEY (`lock_by_uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `FK_9f8ad48f4851d26a7f1682fe179` FOREIGN KEY (`ip_tid`) REFERENCES `ip_type`(`ip_tid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `FK_654f54f8b40a45c2517bc836be9` FOREIGN KEY (`sid`) REFERENCES `switch`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `FK_5b38686607753b566d0dbbb179c` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `FK_5b38686607753b566d0dbbb179c`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `FK_654f54f8b40a45c2517bc836be9`");
        await queryRunner.query("ALTER TABLE `iptable` DROP FOREIGN KEY `FK_9f8ad48f4851d26a7f1682fe179`");
        await queryRunner.query("ALTER TABLE `lock` DROP FOREIGN KEY `FK_95acaa49d5b74f1b7e515c42bca`");
        await queryRunner.query("ALTER TABLE `lock` DROP FOREIGN KEY `FK_2bc1f1c48d970844a2335edf64d`");
        await queryRunner.query("ALTER TABLE `switch` DROP FOREIGN KEY `FK_12e45e6f90f85bb8b58e7790a0f`");
        await queryRunner.query("DROP INDEX `IDX_a920c02bc47aab0c3c8a29610a` ON `iptable`");
        await queryRunner.query("DROP INDEX `iptable_fk_ip_type` ON `iptable`");
        await queryRunner.query("DROP INDEX `iptable_fk_switch` ON `iptable`");
        await queryRunner.query("DROP INDEX `iptable_fk_user` ON `iptable`");
        await queryRunner.query("DROP INDEX `account_UNIQUE` ON `user`");
        await queryRunner.query("DROP INDEX `lock_fk_lock_type_idx` ON `lock`");
        await queryRunner.query("DROP INDEX `lock_fk_user_idx` ON `lock`");
        await queryRunner.query("ALTER TABLE `ip_type` CHANGE `ip_tid` `ip_tid` int(11) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `lid`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `sid`");
        await queryRunner.query("ALTER TABLE `iptable` DROP COLUMN `ip_tid`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `isAdmin`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `mail`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_4ab2df0a57a74fdf904e0e2708`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `account`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lock_by_uid`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lock_tid`");
        await queryRunner.query("ALTER TABLE `lock` DROP COLUMN `lid`");
        await queryRunner.query("ALTER TABLE `iptable` ADD `lock_id` int UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `iptable` ADD `gid` int(11) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `iptable` ADD `switch_id` int NULL");
        await queryRunner.query("ALTER TABLE `iptable` ADD `ip_type_id` int(11) UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `note` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `back_mail` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `nick` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `password_hash` mediumtext NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `lock` ADD `lock_by_user_id` int UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `lock` ADD `gid` int UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `lock` ADD `lock_type_id` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `lock` ADD `lock_id` int UNSIGNED NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `lock` ADD PRIMARY KEY (`lock_id`)");
        await queryRunner.query("ALTER TABLE `lock` CHANGE `lock_id` `lock_id` int UNSIGNED NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `ip_type` CHANGE `ip_tid` `ip_type_id` int(11) UNSIGNED NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `back_mail_UNIQUE` ON `user` (`back_mail`)");
        await queryRunner.query("CREATE UNIQUE INDEX `username_UNIQUE` ON `user` (`username`)");
        await queryRunner.query("CREATE INDEX `lock_fk_user_idx` ON `lock` (`lock_by_user_id`)");
        await queryRunner.query("CREATE INDEX `lock_fk_lock_type_idx` ON `lock` (`lock_type_id`)");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `iptable_fk_user` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `iptable_fk_switch` FOREIGN KEY (`switch_id`) REFERENCES `switch`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `iptable_fk_ip_type` FOREIGN KEY (`ip_type_id`) REFERENCES `ip_type`(`ip_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `iptable` ADD CONSTRAINT `iptable_fk_group` FOREIGN KEY (`gid`) REFERENCES `group`(`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `lock` ADD CONSTRAINT `lock_fk_user` FOREIGN KEY (`lock_by_user_id`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `lock` ADD CONSTRAINT `lock_fk_lock_type` FOREIGN KEY (`lock_type_id`) REFERENCES `lock_type`(`lock_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `switch` ADD CONSTRAINT `switch_fk_self_upper_id` FOREIGN KEY (`upper_switch`) REFERENCES `switch`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
