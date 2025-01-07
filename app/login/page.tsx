import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="space-y-6 p-8 bg-white rounded-lg max-w-sm w-full shadow-lg">
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-sm text-gray-800 font-semibold mb-1">
            Name:
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
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
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
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
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            formAction={login}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Log in
          </Button>
          <Button
            formAction={signup}
            className="w-full py-3 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  )
}
