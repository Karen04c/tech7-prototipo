export function getInitials(nome: string, max = 2) {
  return nome
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, max)
    .join("")
    .toUpperCase();
}
