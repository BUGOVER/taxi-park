<?php

declare(strict_types=1);

namespace App\Service;

class ExceptionMapping
{
    /**
     * @param int $code
     * @param bool $hidden
     * @param bool $loggable
     */
    public function __construct(
        private readonly int $code,
        private readonly bool $hidden = true,
        private readonly bool $loggable = false
    )
    {
    }

    /**
     * @param int $code
     * @return self
     */
    public static function fromCode(int $code): self
    {
        return new self($code, true, false);
    }

    public function getCode(): int
    {
        return $this->code;
    }

    public function isHidden(): bool
    {
        return $this->hidden;
    }

    public function isLoggable(): bool
    {
        return $this->loggable;
    }
}
