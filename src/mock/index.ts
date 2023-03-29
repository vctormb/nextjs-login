import jwt from 'jsonwebtoken'

type User = {
  id: string
  email: string
  name: string
  role?: string
  expiresAt: number
}

export async function getSignInUserService({
  username,
  password,
}: Record<string, string> | undefined = {}): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newToken = jwt.sign({ fakeId: 1 }, 'secret', {
        expiresIn: '2h',
      })
      const decodeToken = jwt.decode(newToken) as { exp: number }
      const expiresAt = decodeToken.exp // just to simulate an external token from another BE with an expirity time

      if (username === 'admin@email.com' && password === '123123') {
        resolve({
          id: '1',
          name: 'Victor Admin',
          email: username,
          role: 'admin',
          expiresAt,
        })
      } else if (username === 'user@email.com' && password === '123123') {
        resolve({
          id: '2',
          name: 'Victor Bezerra',
          email: username,
          expiresAt,
        })
      } else {
        resolve(null)
      }
    }, 1000)
  })
}
