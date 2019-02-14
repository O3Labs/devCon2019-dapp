export function shorten(input) {
  return input.slice(0, 6) + '...' + input.slice(-6);
}
