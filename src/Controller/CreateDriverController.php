<?php

declare(strict_types=1);

namespace App\Controller;

use App\Requests\CreateDriverDTO;
use App\Service\QueryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/driver/create', name: 'create_drivers', methods: ['POST'])]
final class CreateDriverController extends AbstractController
{
    /**
     * @throws \Exception
     */
    public function __invoke(#[MapRequestPayload] CreateDriverDTO $query, QueryService $queryService)
    {
        $result = $queryService->createDriver($query);

        return $this->json(['driver' => $result]);
    }
}
