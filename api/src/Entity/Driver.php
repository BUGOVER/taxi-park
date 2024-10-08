<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\DriverRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: DriverRepository::class)]
#[ORM\Table(name: 'driver')]
#[ORM\HasLifecycleCallbacks]
class Driver
{
    use Timed;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'full_name', type: Types::STRING)]
    private ?string $fullName = null;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'date_birth', type: Types::DATETIME_IMMUTABLE)]
    private ?DateTimeInterface $dateBirth = null;

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column(name: 'driver_id', type: Types::INTEGER, nullable: false)]
    private ?int $driverId = null;

    #[ORM\OneToOne(targetEntity: Car::class/*, inversedBy: 'driver'*/)]
    #[ORM\JoinColumn(name: 'car_id', referencedColumnName: 'car_id', nullable: false)]
    private ?Car $car = null;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'created_at', type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $createdAt = null;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'updated_at', type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getDriverId(): ?int
    {
        return $this->driverId;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(?string $fullName): void
    {
        $this->fullName = $fullName;
    }

    public function getDateBirth(): ?DateTimeInterface
    {
        return $this->dateBirth;
    }

    public function setDateBirth(DateTimeInterface $dateBirth): void
    {
        $this->dateBirth = $dateBirth;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(Car $car): void
    {
        $this->car = $car;
    }
}
