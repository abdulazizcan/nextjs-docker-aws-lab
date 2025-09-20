export function formatGreeting(name: string): string {
  if (!name) {
    return "Merhaba, misafir!";
  }
  return `Merhaba, ${name}!`;
}
