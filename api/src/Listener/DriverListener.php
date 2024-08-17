<?php

declare(strict_types=1);

namespace App\Listener;

use App\Entity\Driver;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class DriverListener
{
    public function postUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        // only act on some "Product" entity
        if (!$entity instanceof Driver) {
            return;
        }

        $entityManager = $args->getObjectManager();
        // ... do something with the Product
    }
}
