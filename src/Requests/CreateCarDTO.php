<?php

declare(strict_types=1);

namespace App\Requests;

use Symfony\Component\Validator\Constraints as Assert;

final class CreateCarDTO
{
    public function __construct(
        #[Assert\Length(min: 3, max: 12)]
        public readonly string $carNumber,

        #[Assert\Length(min: 3, max: 100)]
        public readonly string $carMark,

        #[Assert\Length(min: 3, max: 100)]
        public readonly string $carModel,
    )
    {
    }
}
