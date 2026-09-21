let notify = null;

export function registerErrorNotifier(handler) {
  notify = handler;
}

export function notifyError(message) {
  notify?.(message);
}
