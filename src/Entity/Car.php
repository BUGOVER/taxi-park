<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\CarRepository;
use DateTime;
use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ORM\Table(name: 'car')]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'SEQUENCE')]
    #[ORM\Column(name: 'car_id', type: Types::INTEGER)]
    private ?int $carId = null;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'car_number', type: Types::STRING)]
    private ?string $carNumber = '';

    #[Assert\NotBlank]
    #[ORM\Column(name: 'car_mark', type: Types::STRING)]
    private ?string $carMark = '';

    #[Assert\NotBlank]
    #[ORM\Column(name: 'car_model', type: Types::STRING)]
    private ?string $carModel = '';

    #[Assert\NotBlank]
    #[ORM\Column(name: 'created_at', type: Types::DATETIME_IMMUTABLE)]
    private ?DateTimeImmutable $createdAt = null;

    #[Assert\NotBlank]
    #[ORM\Column(name: 'updated_at', type: Types::DATETIME_IMMUTABLE)]
    private ?DateTimeImmutable $updatedAt = null;

//    #[ORM\OneToOne(targetEntity: Driver::class, mappedBy: 'car')]
//    private ?Driver $driver = null;

    public function getCarId(): ?int
    {
        return $this->carId;
    }

    public function getCarNumber(): ?string
    {
        return $this->carNumber;
    }

    public function setCarNumber(?string $carNumber): void
    {
        $this->carNumber = $carNumber;
    }

//    public function getDriver(): ?Driver
//    {
//        return $this->driver;
//    }

    public function getCarMark(): ?string
    {
        return $this->carMark;
    }

    public function setCarMark(?string $carMark): void
    {
        $this->carMark = $carMark;
    }

    public function getCarModel(): ?string
    {
        return $this->carModel;
    }

    public function setCarModel(?string $carModel): void
    {
        $this->carModel = $carModel;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }
    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtAutomatically()
    {
        if (null === $this->getCreatedAt()) {
            $this->setCreatedAt(new DateTime());
        }
    }

    public function setCreatedAt(?DateTimeInterface $timestamp): self
    {
        $this->createdAt = $timestamp;

        return $this;
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdatedAtAutomatically()
    {
        $this->setUpdatedAt(new DateTime());
    }

    public function setUpdatedAt(?DateTimeInterface $timestamp): self
    {
        $this->updatedAt = $timestamp;

        return $this;
    }
}
