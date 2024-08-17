<?php

declare(strict_types=1);

namespace App\Controller\Car;

use App\Repository\CarRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/cars', name: 'get_cars', defaults: ['page' => '1', 'perPage' => '15'], methods: ['GET'])]
final class GetCarsController extends AbstractController
{
    public function __invoke(
        int $page,
        int $perPage,
        CarRepository $carRepository
    )
    {
        $cars = $carRepository->pagerForCarsListWith($page, $perPage);

        return $this->json([
            'result' => $cars->getResults(),
            'meta' => [
                'currentPage' => $cars->getCurrentPage(),
                'lastPage' => $cars->getLastPage(),
                'nextPage' => $cars->getNextPage(),
                'previousPage' => $cars->getPreviousPage(),
            ],
        ]);
    }
}
