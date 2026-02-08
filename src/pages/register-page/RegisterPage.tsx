import { UserPlus } from 'lucide-react'
import RegisterForm from '@/components/forms/register-form';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#F5F0FF] via-white to-[#F5F0FF] p-4 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="top-20 right-10 absolute bg-gradient-to-br from-purple-200 to-red-200 opacity-20 blur-3xl rounded-full w-72 h-72 mix-blend-multiply filter"></div>
        <div className="bottom-20 left-10 absolute bg-gradient-to-br from-red-200 to-purple-200 opacity-20 blur-3xl rounded-full w-72 h-72 mix-blend-multiply filter"></div>
      </div>

      {/* Main content */}
      <div className="z-10 relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center mx-auto mb-4 rounded-full w-12 h-12 gradient-red-purple">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="mb-2 font-bold text-foreground text-3xl">Create Account</h1>
          <p className="text-muted-foreground">Join us and get started today</p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="mb-4 text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link to="/login" className="hover:opacity-80 font-semibold transition-opacity gradient-red-purple-text">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
