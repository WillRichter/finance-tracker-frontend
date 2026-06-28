export function formatCurrency(amount: number) {
    return "£" + amount.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}