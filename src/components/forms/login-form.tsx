import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"

export default function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Placeholder for authentication logic
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields')
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to chat on success
      navigate('/')
    } catch (err) {
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-foreground text-sm">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
          disabled={isLoading}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 font-medium text-foreground text-sm">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="bg-white pr-10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="top-1/2 right-3 absolute text-muted-foreground hover:text-foreground transition-colors -translate-y-1/2 transform"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="bg-red-50 p-3 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>}

      {/* Remember me */}
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="border-border rounded w-4 h-4" disabled={isLoading} />
          <span className="text-muted-foreground text-sm">Remember me</span>
        </label>
        <Link to="/forgot-password" className="hover:opacity-80 font-medium text-sm transition-opacity gradient-red-purple-text">
          Forgot password?
        </Link>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="hover:opacity-90 disabled:opacity-50 mt-6 rounded-lg w-full h-10 font-medium text-white transition-all gradient-red-purple"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
