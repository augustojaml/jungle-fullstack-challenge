const consoleLog = {
  info(value: unknown, isFull = false) {
    console.info(isFull ? JSON.stringify(value, null, 2) : value)
  },
  error(value: unknown, isFull = false) {
    console.error(isFull ? JSON.stringify(value, null, 2) : value)
  },
  log(value: unknown, isFull = false) {
    console.log(isFull ? JSON.stringify(value, null, 2) : value)
  },
  warn(value: unknown, isFull = false) {
    console.warn(isFull ? JSON.stringify(value, null, 2) : value)
  },
}

export { consoleLog }
