import { withIronSessionSsr } from 'iron-session/next'

import { ironOptions } from '@/config'
import Login  from '../components/Login'
import Logout from '../components/Logout'
import Connect  from '../components/Connect'
import Link from 'next/link'

interface Props {
  loggedIn: boolean;
}

const LoginPage = ({ loggedIn }: Props) => (
  <main className="container">
    <h1>Login here</h1>
    <Connect />
    {loggedIn ? <Logout /> : <Login />}
    <Link href="/missions/">All missions</Link>
  </main>
)

export default LoginPage

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  return {
    props: {
      loggedIn: !!req.session.user
    }
  }
}, ironOptions)
