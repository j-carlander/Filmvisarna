export function ageLimitFormatter (ageLimit) {
    if (ageLimit === 0) return "Barn"
    return `${ageLimit} +`
}