export function isHomeBrokerClosed() {
  const currentDate = new Date()

  const openDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDay(),
    10,
    0,
    0
  )

  const closeDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDay(),
    18,
    0,
    0
  )
  
  return currentDate < openDate || currentDate > closeDate
}