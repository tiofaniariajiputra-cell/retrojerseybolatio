export function getWaNumber(envValue?: string, defaultVal = '62xxx') {
  const raw = envValue ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? defaultVal
  return String(raw).replace(/\D/g, '')
}

export function buildWaLink(message?: string, envValue?: string) {
  const num = getWaNumber(envValue)
  if (!message) return `https://wa.me/${num}`
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}
