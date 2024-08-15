<?php

declare(strict_types=1);

namespace App\Resolver\Details;

class ErrorValidationDetailsItem
{
    /**
     * @param string $field
     * @param string $message
     */
    public function __construct(private readonly string $field, private readonly string $message)
    {
    }

    public function getField(): string
    {
        return $this->field;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}
