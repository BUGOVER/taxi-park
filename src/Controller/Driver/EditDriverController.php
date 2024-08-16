<?php

declare(strict_types=1);

namespace App\Controller\Driver;

use App\Requests\CreateDriverDTO;
use App\Service\QueryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route(
    path: '/driver/edit/{driverId}',
    name: 'create_drivers',
    requirements: ['driverId' => '^\d+$'],
    methods: ['PUT']
)]
final class EditDriverController extends AbstractController
{
    /**
     * @param CreateDriverDTO $query
     * @param int $driverId
     * @param QueryService $queryService
     * @return JsonResponse
     */
    public function __invoke(
        #[MapRequestPayload] CreateDriverDTO $query,
        int $driverId,
        QueryService $queryService
    ): JsonResponse
    {
        $result = $queryService->editDriver($query, $driverId);

        return $this->json(['driver' => $result]);
    }
}
