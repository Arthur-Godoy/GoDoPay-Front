import useHttp from "~/hooks/useHttp";

export const solicitationService = {
  list(accountId, params) {
    return useHttp.get(`/${accountId}/solicitations`, { params });
  },

  create(transactionId) {
    return useHttp.post(`/transactions/${transactionId}/solicitate`);
  },

  approve(solicitationId) {
    return useHttp.put(`/approve/${solicitationId}`);
  },

  reject(solicitationId) {
    return useHttp.put(`/reject/${solicitationId}`);
  },

  remove(solicitationId) {
    return useHttp.delete(`/delete/${solicitationId}`);
  },
};
