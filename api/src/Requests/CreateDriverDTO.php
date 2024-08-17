<?php

declare(strict_types=1);

namespace App\Requests;

use DateTimeInterface;
use Symfony\Component\Validator\Constraints as Assert;

final class CreateDriverDTO
{
    public function __construct(
        #[Assert\Length(min: 3, max: 100)]
        public readonly string $fullName,

        #[Assert\Date]
        public readonly string|DateTimeInterface $dateBirth,

        public readonly int $currentCarId,
    )
    {
    }
}
