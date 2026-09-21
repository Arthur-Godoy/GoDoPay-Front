import { useCallback, useEffect, useState } from "react";
import { transactionService } from "~/services/http/transactionService";
import { useAccount } from "~/hooks/useAccount";
import { unwrapData } from "~/utils/apiResponse";

const FIRST_PAGE = 1;

/** Espelha o paginate(15) do TransactionController::list. */
const DEFAULT_PER_PAGE = 15;

const EMPTY_FILTERS = {
  type: "",
  start_date: "",
  end_date: "",
};

const DEFAULT_SORT = {
  order_by: "created_at",
  order: "desc",
};

function toQueryParams(filters, sort, page) {
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== ""),
  );

  return { ...activeFilters, ...sort, page };
}

export function useTransactions() {
  const { currentAccount, accountVersion } = useAccount();
  const [transactions, setTransactions] = useState([]);
  const [paginator, setPaginator] = useState({
    total: 0,
    perPage: DEFAULT_PER_PAGE,
  });
  const [page, setPage] = useState(FIRST_PAGE);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [isLoading, setIsLoading] = useState(true);

  const accountId = currentAccount?.id;

  const loadTransactions = useCallback(async () => {
    if (!accountId) return;

    setIsLoading(true);

    try {
      const { data } = await transactionService.list(
        toQueryParams(filters, sort, page),
      );
      const result = unwrapData(data);

      setTransactions(result?.data ?? []);
      setPaginator({
        total: result?.total ?? 0,
        perPage: result?.per_page ?? DEFAULT_PER_PAGE,
      });
    } catch {
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [accountId, accountVersion, filters, sort, page]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const changeFilter = useCallback((name, value) => {
    setPage(FIRST_PAGE);
    setFilters((previous) => ({ ...previous, [name]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setPage(FIRST_PAGE);
    setFilters(EMPTY_FILTERS);
  }, []);

  const changeSort = useCallback((field) => {
    setPage(FIRST_PAGE);
    setSort((previous) => ({
      order_by: field,
      order:
        previous.order_by === field && previous.order === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  return {
    transactions,
    accountId,
    isLoading,
    page,
    total: paginator.total,
    perPage: paginator.perPage,
    changePage: setPage,
    filters,
    changeFilter,
    clearFilters,
    sort,
    changeSort,
  };
}
