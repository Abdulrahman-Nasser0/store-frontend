'use client'
import { logout } from "../lib/actions"

const Dashboard = () => {
  return (
    <div><button onClick={() => logout()}>Logout</button></div>
  )
}

export default Dashboard