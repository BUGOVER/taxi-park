<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240815135637 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('car');
        $this->addSql('CREATE SEQUENCE car_car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $table->addColumn('car_id', 'integer', ['unsigned' => true]);
        $table->addColumn('car_number', 'string', ['unsigned' => true]);
        $table->addColumn('car_model', 'string')->setNotnull(false);
        $table->addColumn('car_mark', 'string')->setNotnull(false);
        $table->addColumn('created_at', 'datetime', ['notnull' => false]);
        $table->addColumn('updated_at', 'datetime', ['notnull' => false]);
        $table->setPrimaryKey(['car_id'], 'car_primary_key');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('car');
    }
}
