type User = {
  id: string
  email: string
  name: string
  role?: string
}

export async function getSignInUserService({
  username,
  password,
}: Record<string, string> | undefined = {}): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin@email.com' && password === '123123') {
        resolve({
          id: '1',
          name: 'Admin',
          email: username,
          role: 'admin',
        })
      } else if (username === 'user@email.com' && password === '123123') {
        resolve({
          id: '2',
          name: 'Victor Bezerra',
          email: username,
        })
      } else {
        resolve(null)
      }
    }, 1000)
  })
}
