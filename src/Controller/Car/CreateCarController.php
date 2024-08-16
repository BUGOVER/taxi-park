<?php

declare(strict_types=1);

namespace App\Controller\Car;

use App\Requests\CreateCarDTO;
use App\Service\QueryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/car/create', name: 'create_car', methods: ['POST'])]
final class CreateCarController extends AbstractController
{
    public function __invoke(#[MapRequestPayload] CreateCarDTO $query, QueryService $queryService)
    {
        $result = $queryService->createCar($query);

        return $this->json([
            'car' => $result,
        ]);
    }
}
