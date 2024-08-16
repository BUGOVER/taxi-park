<?php

declare(strict_types=1);

namespace App\Controller\Car;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

#[Route(
    path: '/car/edit/{carId}',
    name: 'create_car',
    requirements: ['carId' => '^\d+$'],
    methods: ['PUT']
)]
final class EditCarController extends AbstractController
{
    public function __invoke()
    {
    }
}
