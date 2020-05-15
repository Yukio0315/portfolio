export type Profile = {
  name: string
  description: string
  professional: Professional[]
  skills?: string[]
  accounts: Account[]
}
export type Professional = {
  id: number
  start: string
  end: string
  company: string
}

export type Account = {
  id: number
  url: string
  name: string
}
