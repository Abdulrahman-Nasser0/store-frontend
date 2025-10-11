'use client'
import { logout } from "../login/actions"

const Dashboard = () => {
  return (
    <div><button onClick={() => logout()}>Logout</button></div>
  )
}

export default Dashboard