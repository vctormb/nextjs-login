import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({ content: 'This is protected but you can access it :)' })
  } else {
    res.send({ error: 'Sign in!!' })
  }
  res.end()
}

export default restricted
