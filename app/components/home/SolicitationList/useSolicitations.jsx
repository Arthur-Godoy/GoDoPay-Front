import { useCallback, useEffect, useState } from "react";
import { solicitationService } from "~/services/http/solicitationService";
import { useAccount } from "~/hooks/useAccount";
import { useSnackbar } from "~/hooks/useSnackbar";
import { unwrapData } from "~/utils/apiResponse";

const DEFAULT_STATUS = "pending";
const FIRST_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

export function useSolicitations({ active, direction }) {
  const { currentAccount, accountVersion, loadUser } = useAccount();
  const { showSuccess } = useSnackbar();

  const [solicitations, setSolicitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [page, setPage] = useState(FIRST_PAGE);
  const [paginator, setPaginator] = useState({
    total: 0,
    perPage: DEFAULT_PER_PAGE,
  });
  const [pendingId, setPendingId] = useState(null);

  const accountId = currentAccount?.id;

  const loadSolicitations = useCallback(async () => {
    if (!accountId || !active) return;

    setIsLoading(true);

    try {
      const { data } = await solicitationService.list(accountId, {
        status,
        direction,
        page,
      });
      const result = unwrapData(data);

      setSolicitations(result?.data ?? []);
      setPaginator({
        total: result?.total ?? 0,
        perPage: result?.per_page ?? DEFAULT_PER_PAGE,
      });
    } catch {
      setSolicitations([]);
    } finally {
      setIsLoading(false);
    }
  }, [accountId, active, status, direction, page]);

  useEffect(() => {
    setPage(FIRST_PAGE);
  }, [direction]);

  useEffect(() => {
    loadSolicitations();
  }, [loadSolicitations, accountVersion]);

  const runAction = useCallback(
    async (solicitation, action, message) => {
      setPendingId(solicitation.id);

      try {
        await action(solicitation.id);

        showSuccess(message);

        await Promise.all([loadSolicitations(), loadUser()]);
      } catch {
        setPendingId(null);
      } finally {
        setPendingId(null);
      }
    },
    [loadSolicitations, loadUser, showSuccess],
  );

  const approve = useCallback(
    (solicitation) =>
      runAction(
        solicitation,
        solicitationService.approve,
        "Devolução aprovada com sucesso.",
      ),
    [runAction],
  );

  const reject = useCallback(
    (solicitation) =>
      runAction(
        solicitation,
        solicitationService.reject,
        "Solicitação reprovada.",
      ),
    [runAction],
  );

  const remove = useCallback(
    (solicitation) =>
      runAction(
        solicitation,
        solicitationService.remove,
        "Solicitação excluída.",
      ),
    [runAction],
  );

  return {
    solicitations,
    isLoading,
    status,
    changeStatus: (next) => {
      setPage(FIRST_PAGE);
      setStatus(next);
    },
    page,
    total: paginator.total,
    perPage: paginator.perPage,
    changePage: setPage,
    pendingId,
    approve,
    reject,
    remove,
  };
}
