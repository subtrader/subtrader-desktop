// import { styled } from 'styled-components'
import Link from 'next/link'

const Sidebar = () => (
  <div>
    <h1>Subtrader</h1>
    <div>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <br />
      <Link href="/setting">
        <a>Setting</a>
      </Link>
      <br />
      <Link href="/balance">
        <a>Balances</a>
      </Link>
    </div>
  </div>
)

export default Sidebar
