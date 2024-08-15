<?php

declare(strict_types=1);

namespace App\Resolver;

use App\Service\ExceptionMapping;
use InvalidArgumentException;

class ExceptionMappingResolver
{
    private array $mappings = [];

    /**
     * @param array $mappings
     */
    public function __construct(array $mappings)
    {
        foreach ($mappings as $class => $mapping) {
            if (empty($mapping['code'])) {
                throw new InvalidArgumentException('code is mandatory for class ' . $class);
            }

            $this->addMapping(
                $class,
                $mapping['code'],
                $mapping['hidden'] ?? true,
                $mapping['loggable'] ?? false
            );
        }
    }

    /**
     * @param string $class
     * @param int $code
     * @param bool $hidden
     * @param bool $loggable
     * @return void
     */
    private function addMapping(string $class, int $code, bool $hidden, bool $loggable): void
    {
        $this->mappings[$class] = new ExceptionMapping($code, $hidden, $loggable);
    }

    /**
     * @param string $throwable_class
     * @return ExceptionMapping|null
     */
    public function resolve(string $throwable_class): ?ExceptionMapping
    {
        $found_mapping = null;

        foreach ($this->mappings as $class => $mapping) {
            if ($throwable_class === $class || is_subclass_of($throwable_class, $class)) {
                $found_mapping = $mapping;
                break;
            }
        }

        return $found_mapping;
    }
}
