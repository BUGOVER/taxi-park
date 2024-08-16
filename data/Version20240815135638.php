<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240815135638 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('driver');
        $table->addColumn('driver_id', 'integer', ['unsigned' => true]);
        $table->addColumn('car_id', 'integer', ['unsigned' => true]);
        $table->addColumn('full_name', 'string', ['length' => 200]);
        $table->addColumn('date_birth', 'datetime');
        $table->addColumn('created_at', 'datetime', ['notnull' => false]);
        $table->addColumn('updated_at', 'datetime', ['notnull' => false]);
        $table->setPrimaryKey(['driver_id']);

        $table->addForeignKeyConstraint('Car', ['car_id'], ['car_id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('driver');
    }
}
