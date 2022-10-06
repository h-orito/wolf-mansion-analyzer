import Cookies from 'universal-cookie'

const cookieKey = 'player'

const options = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24
}

export const getPlayer = (): Player | null => {
  const cookies = new Cookies()
  const txt = cookies.get(cookieKey)
  if (!txt) return null
  const id = txt.split(':')[0]
  const name = txt.split(':')[1]
  return {
    id: parseInt(id),
    name
  }
}

export const setPlayer = (id: number, name: string) => {
  const txt = `${id.toString()}:${name}`
  const cookies = new Cookies()
  cookies.set(cookieKey, txt, options)
}

export const logoutPlayer = () => {
  const cookies = new Cookies()
  cookies.set(cookieKey, '', options)
}

export const getBan = (): string | null => {
  const cookies = new Cookies()
  return cookies.get('ban')
}

export const setBan = () => {
  const cookies = new Cookies()
  cookies.set('ban', 'true', options)
}
