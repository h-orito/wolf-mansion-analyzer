export const login = async (
  username: string,
  password: string
): Promise<Player | null> => {
  return await useApi<LoginRequest, Player>('api/login', {
    method: 'POST',
    body: {
      userId: username,
      password
    }
  })
}

type LoginRequest = {
  userId: string
  password: string
}
