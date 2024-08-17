<?php

declare(strict_types=1);

namespace App\Controller\Driver;

use App\Repository\DriverRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/drivers', name: 'get_drivers', defaults: ['page' => '1', 'perPage' => '15'], methods: ['GET'])]
final class DriverController extends AbstractController
{
    /**
     * @param int $page
     * @param int $perPage
     * @param DriverRepository $driverRepository
     * @return JsonResponse
     * @throws \Exception
     */
    public function __invoke(
        int $page,
        int $perPage,
        DriverRepository $driverRepository
    ): JsonResponse
    {
        $drivers = $driverRepository->pagerForDriversListWithCars($page, $perPage);

        return $this->json([
            'result' => $drivers->getResults(),
            'meta' => [
                'currentPage' => $drivers->getCurrentPage(),
                'lastPage' => $drivers->getLastPage(),
                'nextPage' => $drivers->getNextPage(),
                'previousPage' => $drivers->getPreviousPage(),
            ],
        ]);
    }
}
