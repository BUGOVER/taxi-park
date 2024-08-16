<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240816071421 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE cars_car_id_seq CASCADE');
        $this->addSql('ALTER TABLE car ALTER car_id DROP DEFAULT');
        $this->addSql('ALTER TABLE driver DROP created_at');
        $this->addSql('ALTER TABLE driver ALTER fullname TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE driver ALTER datebirth TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE driver ALTER datebirth SET NOT NULL');
        $this->addSql('ALTER TABLE driver ALTER car_id SET NOT NULL');
        $this->addSql('COMMENT ON COLUMN driver.dateBirth IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE driver ADD CONSTRAINT FK_11667CD9C3C6F69F FOREIGN KEY (car_id) REFERENCES car (car_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_11667CD9C3C6F69F ON driver (car_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE cars_car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_car_id_seq');
        $this->addSql('SELECT setval(\'car_car_id_seq\', (SELECT MAX(car_id) FROM car))');
        $this->addSql('ALTER TABLE car ALTER car_id SET DEFAULT nextval(\'car_car_id_seq\')');
        $this->addSql('ALTER TABLE driver DROP CONSTRAINT FK_11667CD9C3C6F69F');
        $this->addSql('DROP INDEX UNIQ_11667CD9C3C6F69F');
        $this->addSql('ALTER TABLE driver ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE driver ALTER car_id DROP NOT NULL');
        $this->addSql('ALTER TABLE driver ALTER fullName TYPE VARCHAR(200)');
        $this->addSql('ALTER TABLE driver ALTER dateBirth TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE driver ALTER dateBirth DROP NOT NULL');
        $this->addSql('COMMENT ON COLUMN driver.datebirth IS NULL');
    }
}
