<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\CarRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ORM\Table(name: 'car')]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
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
}
