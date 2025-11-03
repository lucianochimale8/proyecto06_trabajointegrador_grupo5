export function iniciarIntervalo(callback, intervaloMs) {
  const intervalo = setInterval(callback, intervaloMs);
  return intervalo;
}
