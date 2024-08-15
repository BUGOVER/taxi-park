<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Car;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CarRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Car::class);
    }

    /**
     * @param int $carId
     * @return mixed
     */
    public function findCarById(int $carId): mixed
    {
        $qb = $this->createQueryBuilder('c')->where('c.carId = :car_id');

        return $qb
            ->setParameter('car_id', $carId)
            ->getQuery()
            ->getSingleResult();
    }
}
