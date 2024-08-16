<?php

declare(strict_types=1);

namespace App\Listener\Sub;

use App\Entity\Driver;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Psr\Log\LoggerInterface;

class DriverListenSubscriber implements EventSubscriber
{
    public function __construct(private readonly LoggerInterface $logger)
    {
    }

    public function getSubscribedEvents()
    {
        return [
            Events::postUpdate,
        ];
    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $this->index($args);
    }

    public function index(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();
        if ($entity instanceof Driver) {
            $entityManager = $args->getObjectManager();
            $uow = $entityManager->getUnitOfWork();
            $changes = $uow->getEntityChangeSet($entity);

            if ($changes['car'] ?? false) {
                $this->logger->info('Driver car is updated');
            }
        }
    }
}
