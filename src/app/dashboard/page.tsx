import { logout } from "../lib/actions"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        <p className="text-gray-600 text-center mb-6">Welcome to your dashboard!</p>
        
        <form action={logout} className="text-center">
          <button 
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard