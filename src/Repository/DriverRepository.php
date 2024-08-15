<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Driver;
use App\Pagination\Paginator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DriverRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Driver::class);
    }

    /**
     * @param int $page
     * @param int $perPage
     * @return Paginator
     * @throws \Exception
     */
    public function pagerForDriversListWithCars(int $page, int $perPage): Paginator
    {
        $qb = $this->createQueryBuilder('d')->leftJoin('d.car', 'c');

        return (new Paginator($qb))->paginate($page, $perPage);
    }
}
