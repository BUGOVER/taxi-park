<?php

declare(strict_types=1);

namespace App\Pagination;

use Doctrine\ORM\QueryBuilder as DoctrineQueryBuilder;
use Doctrine\ORM\Tools\Pagination\CountWalker;
use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;

/**
 * @author Javier Eguiluz <javier.eguiluz@gmail.com>
 */
final class Paginator
{
    public const PAGE_SIZE = 10;

    private int $currentPage;

    private int $numResults;

    /**
     * @var \Traversable<array-key, object>
     */
    private \Traversable $results;

    /**
     * @param DoctrineQueryBuilder $queryBuilder
     * @param int $pageSize
     */
    public function __construct(
        private readonly DoctrineQueryBuilder $queryBuilder,
        private int $pageSize = self::PAGE_SIZE
    )
    {
    }

    /**
     * @param int $page
     * @param int $perPage
     * @return $this
     * @throws \Exception
     */
    public function paginate(int $page = 1, int $perPage = self::PAGE_SIZE): self
    {
        $this->pageSize = $perPage;
        $this->currentPage = max(1, $page);
        $firstResult = ($this->currentPage - 1) * $this->pageSize;

        $query = $this->queryBuilder
            ->setFirstResult($firstResult)
            ->setMaxResults($this->pageSize)
            ->getQuery();

        /* @var array<string, mixed> $joinDqlParts */
        $joinDqlParts = $this->queryBuilder->getDQLPart('join');

        if (0 === \count($joinDqlParts)) {
            $query->setHint(CountWalker::HINT_DISTINCT, false);
        }

        /* @var DoctrinePaginator<object> $paginator */
        $paginator = new DoctrinePaginator($query, true);

        /* @var array<string, mixed> $havingDqlParts */
        $havingDqlParts = $this->queryBuilder->getDQLPart('having');

        $useOutputWalkers = \count($havingDqlParts ?: []) > 0;
        $paginator->setUseOutputWalkers($useOutputWalkers);

        $this->results = $paginator->getIterator();
        $this->numResults = $paginator->count();

        return $this;
    }

    /**
     * @return int
     */
    public function getCurrentPage(): int
    {
        return $this->currentPage;
    }

    /**
     * @return int
     */
    public function getPageSize(): int
    {
        return $this->pageSize;
    }

    /**
     * @return bool
     */
    public function hasPreviousPage(): bool
    {
        return $this->currentPage > 1;
    }

    /**
     * @return int
     */
    public function getPreviousPage(): int
    {
        return max(1, $this->currentPage - 1);
    }

    /**
     * @return bool
     */
    public function hasNextPage(): bool
    {
        return $this->currentPage < $this->getLastPage();
    }

    /**
     * @return int
     */
    public function getLastPage(): int
    {
        return (int) ceil($this->numResults / $this->pageSize);
    }

    /**
     * @return int
     */
    public function getNextPage(): int
    {
        return min($this->getLastPage(), $this->currentPage + 1);
    }

    /**
     * @return bool
     */
    public function hasToPaginate(): bool
    {
        return $this->numResults > $this->pageSize;
    }

    /**
     * @return int
     */
    public function getNumResults(): int
    {
        return $this->numResults;
    }

    /**
     * @return \Traversable<int, object>
     */
    public function getResults(): \Traversable
    {
        return $this->results;
    }
}
