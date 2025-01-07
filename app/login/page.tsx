import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form className="space-y-6 p-6 bg-white shadow-md rounded-lg max-w-md w-full">
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-1 font-medium">
            Name:
          </Label>
          <Input id="name" name="name" type="text" required className="border p-2 rounded-md" />
        </div>
        
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1 font-medium">
            Email:
          </Label>
          <Input id="email" name="email" type="email" required className="border p-2 rounded-md" />
        </div>
        
        <div className="flex flex-col">
          <Label htmlFor="password" className="mb-1 font-medium">
            Password:
          </Label>
          <Input id="password" name="password" type="password" required className="border p-2 rounded-md" />
        </div>
        
        <div className="flex space-x-4">
          <Button formAction={login} className="w-full sm:w-auto">
            Log in
          </Button>
          <Button formAction={signup} className="w-full sm:w-auto">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  )
}
