<?php

declare(strict_types=1);

namespace App\Listener;

use App\Exceptions\ValidationException;
use App\Resolver\Details\ErrorValidationDetails;
use App\Resolver\Response\ErrorResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidationExceptionListener
{
    /**
     * @param SerializerInterface $serializer
     */
    public function __construct(private readonly SerializerInterface $serializer)
    {
    }

    /**
     * @param ExceptionEvent $event
     * @return void
     */
    public function __invoke(ExceptionEvent $event): void
    {
        $throwable = $event->getThrowable();

        if (!($throwable instanceof ValidationException)) {
            return;
        }

        $data = $this->serializer->serialize(
            new ErrorResponse(
                $throwable->getMessage(),
                $this->formatViolation($throwable->getViolations())
            ),
            JsonEncoder::FORMAT
        );

        $event->setResponse(new JsonResponse($data, Response::HTTP_BAD_REQUEST, [], true));
    }

    /**
     * @param ConstraintViolationListInterface $constraintViolationList
     * @return ErrorValidationDetails
     */
    private function formatViolation(ConstraintViolationListInterface $constraintViolationList): ErrorValidationDetails
    {
        $details = new ErrorValidationDetails();

        foreach ($constraintViolationList as $violation) {
            $details->addViolation($violation->getPropertyPath(), $violation->getMessage());
        }

        return $details;
    }
}
