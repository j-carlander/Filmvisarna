export function ageLimitFormatter (ageLimit) {
    if (ageLimit === 0) return "alla"
    return `${ageLimit} +`
}