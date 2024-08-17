<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Car;
use App\Entity\Driver;
use App\Exceptions\InvalidArgumentsException;
use App\Exceptions\ServerException;
use App\Repository\CarRepository;
use App\Requests\CreateCarDTO;
use App\Requests\CreateDriverDTO;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Illuminate\Validation\ValidationException;
use Throwable;

class QueryService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly CarRepository $carRepository
    )
    {
    }

    /**
     * @param CreateDriverDTO $dto
     * @return Driver
     * @throws Exception
     */
    public function createDriver(CreateDriverDTO $dto): Driver
    {
        $car = $this->carRepository->findCarById($dto->currentCarId);

        if (!$car) {
            throw new InvalidArgumentsException();
        }

        $driver = new Driver();
        $driver->setCar($car);
        $driver->setFullName($dto->fullName);
        $driver->setDateBirth($dto->dateBirth);

        try {
            $this->entityManager->persist($driver);
            $this->entityManager->flush();
        } catch (Throwable $throwable) {
            throw new ServerException($throwable);
        }

        return $driver;
    }

    /**
     * @param CreateDriverDTO $dto
     * @param int $driverId
     * @return Driver
     */
    public function editDriver(CreateDriverDTO $dto, int $driverId): Driver
    {
        /* @var Driver $driver */
        $driver = $this->entityManager->getRepository(Driver::class)->find($driverId);
        $car = $this->carRepository->findCarById($dto->currentCarId);

        if (!$driver || !$car) {
            throw new ValidationException('Драйвер не найден');
        }

        $driver->setFullName($dto->fullName);
        $driver->setDateBirth($dto->dateBirth);
        $driver->setCar($car);
        $this->entityManager->flush();

        return $driver;
    }

    /**
     * @param CreateCarDTO $query
     * @return Car
     */
    public function createCar(CreateCarDTO $query): Car
    {
        $car = new Car();
        $car->setCarMark($query->carMark);
        $car->setCarModel($query->carModel);
        $car->setCarNumber($query->carNumber);
        $this->entityManager->persist($car);
        $this->entityManager->flush();

        return $car;
    }

    /**
     * @param CreateCarDTO $query
     * @param int $carId
     * @return Car
     */
    public function editCar(CreateCarDTO $query, int $carId): Car
    {
        $car = $this->carRepository->findCarById($carId);

        if (!$car) {
            throw new ValidationException('Car not found');
        }

        $car->setCarNumber($query->carNumber);
        $car->setCarMark($query->carMark);
        $car->setCarModel($query->carModel);
        $this->entityManager->flush();

        return $car;
    }
}
