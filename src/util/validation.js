export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function isEmail(value) {
    return value.includes('@');
}