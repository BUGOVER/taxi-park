<?php

declare(strict_types=1);

namespace App\Resolver\Response;

use App\Resolver\Details\ErrorDebugDetails;
use App\Resolver\Details\ErrorValidationDetails;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes\Property;
use OpenApi\Attributes\Schema;

class ErrorResponse
{
    /**
     * @param string $message
     * @param ErrorDebugDetails $details
     */
    public function __construct(private readonly string $message, private readonly ErrorDebugDetails|array $details)
    {
    }

    #[
        Property(type: 'object', nullable: true, oneOf: [
            new Schema(ref: new Model(type: ErrorDebugDetails::class)),
            new Schema(ref: new Model(type: ErrorValidationDetails::class)),
        ])
    ]
    public function getDetails(): ErrorDebugDetails|array
    {
        return $this->details;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }
}
