<?php

declare(strict_types=1);

namespace App\Listener\Sub;

use App\Entity\Driver;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Psr\Log\LoggerInterface;

use function React\Promise\resolve;

class DriverListenSubscriber implements EventSubscriber
{
    public function __construct()
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

    /**
     * @param LifecycleEventArgs $args
     * @return void
     */
    public function index(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        if ($entity instanceof Driver) {
            $entityManager = $args->getObjectManager();
            $uow = $entityManager->getUnitOfWork();
            $changes = $uow->getEntityChangeSet($entity);

            if ($changes['car'] ?? false) {
                // LOG this
            }
        }
    }
}
