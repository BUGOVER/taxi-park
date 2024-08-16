<?php

declare(strict_types=1);

namespace App\Controller\Car;

use App\Requests\CreateCarDTO;
use App\Service\QueryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route(
    path: '/car/edit/{carId}',
    name: 'create_car',
    requirements: ['carId' => '^\d+$'],
    methods: ['PUT']
)]
final class EditCarController extends AbstractController
{
    public function __invoke(
        #[MapRequestPayload] CreateCarDTO $query,
        int $carId,
        QueryService $queryService
    ): JsonResponse
    {
        $result = $queryService->editCar($query, $carId);

        return $this->json([
            'car' => $result,
        ]);
    }
}
