<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Car;
use App\Pagination\Paginator;
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
     * @return Car|null
     */
    public function findCarById(int $carId): ?Car
    {
        $qb = $this->createQueryBuilder('c')->where('c.carId = :car_id');

        return $qb
            ->setParameter('car_id', $carId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param int $page
     * @param int $perPage
     * @return Paginator
     * @throws \Exception
     */
    public function pagerForCarsListWith(int $page, int $perPage): Paginator
    {
        $qb = $this->createQueryBuilder('c')
            ->orderBy('c.createdAt', 'DESC');

        return (new Paginator($qb))->paginate($page, $perPage);
    }
}
