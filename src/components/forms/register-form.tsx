import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Check } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to chat on success
      navigate('/')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = formData.password.length >= 8 ? 'good' : formData.password.length >= 4 ? 'fair' : 'weak'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block mb-2 font-medium text-foreground text-sm">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          className="bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
          disabled={isLoading}
        />
      </div>

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

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-foreground text-sm">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-white pr-10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="top-1/2 right-3 absolute text-muted-foreground hover:text-foreground transition-colors -translate-y-1/2 transform"
            disabled={isLoading}
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Password match indicator */}
      {formData.password && formData.confirmPassword && (
        <div
          className={`flex items-center gap-2 text-sm p-2 rounded-md ${
            formData.password === formData.confirmPassword
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <Check className="w-4 h-4" />
          {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
        </div>
      )}

      {/* Error message */}
      {error && <div className="bg-red-50 p-3 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>}

      {/* Terms checkbox */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="mt-1 border-border rounded w-4 h-4" disabled={isLoading} required />
        <span className="text-muted-foreground text-sm">
          I agree to the{' '}
          <a href="#" className="hover:opacity-80 font-medium transition-opacity gradient-red-purple-text">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="hover:opacity-80 font-medium transition-opacity gradient-red-purple-text">
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="hover:opacity-90 disabled:opacity-50 mt-6 rounded-lg w-full h-10 font-medium text-white transition-all gradient-red-purple"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
