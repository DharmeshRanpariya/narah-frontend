// Format a number as Indian Rupees, e.g. 125000 -> "₹1,25,000".
export function formatINR(value: number | undefined | null): string {
  const amount = typeof value === 'number' && !isNaN(value) ? value : 0
  return `₹${amount.toLocaleString('en-IN')}`
}
