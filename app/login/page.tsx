import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <form className="space-y-6 p-8 bg-white rounded-lg max-w-sm w-full shadow-xl">
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-sm text-gray-800 font-semibold mb-1">
            Name:
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm text-gray-800 font-semibold mb-1">
            Email:
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm text-gray-800 font-semibold mb-1">
            Password:
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col space-y-4">
          {/* Log in Button */}
          <Button
            formAction={login}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Log in
          </Button>
          
          {/* Sign up Button */}
          <Button
            formAction={signup}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  )
}
