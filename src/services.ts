const API_BASE = 'https://api.covid19api.com'

export const fetchApi = (pathname: string, options?: RequestInit) =>
  fetch(API_BASE + pathname, options)

export const storage = {
  write: async (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
  },
  read: async (key: string) => {
    const data: any = localStorage.getItem(key)

    return JSON.parse(data)
  },
}
