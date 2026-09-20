export function unwrapData(data) {
  return Array.isArray(data) ? data[0] : data;
}
