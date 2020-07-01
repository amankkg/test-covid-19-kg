async function write(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

async function read(key: string) {
  const data: any = localStorage.getItem(key)

  return JSON.parse(data)
}

export const storage = {read, write}
