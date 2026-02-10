import React from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Check } from 'lucide-react'
import type { RegisterFormProps } from "@/types/components.types"
import { registerUser } from "@/api/user/user.service"

export default function RegisterForm(props: RegisterFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    props.setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    props.setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validation
      if (props.formData.password !== props.formData.confirmPassword) {
        props.setError('Passwords do not match')
        return
      }

      if (props.formData.password.length < 4) {
        props.setError('Password must be at least 8 characters')
        return
      }

      // API call
      registerUser({
        email: props.formData.email,
        password: props.formData.password,
        navigate: props.navigate,
        isLoading: props.isLoading,
        setIsLoading: props.setIsLoading,
      });

    } catch (err) {
      props.setError('Failed to create account. Please try again.')
    }
  }

  // const passwordStrength = formData.password.length >= 8 ? 'good' : formData.password.length >= 4 ? 'fair' : 'weak'

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
          value={props.formData.email}
          onChange={handleChange}
          className="bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
          disabled={props.isLoading}
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
            type={props.showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={props.formData.password}
            onChange={handleChange}
            className="bg-white pr-10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
            disabled={props.isLoading}
          />
          <button
            type="button"
            onClick={() => props.setShowPassword(!props.showPassword)}
            className="top-1/2 right-3 absolute text-muted-foreground hover:text-foreground transition-colors -translate-y-1/2 transform"
            disabled={props.isLoading}
          >
            {props.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
            type={props.showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            value={props.formData.confirmPassword}
            onChange={handleChange}
            className="bg-white pr-10 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full transition-all"
            disabled={props.isLoading}
          />
          <button
            type="button"
            onClick={() => props.setShowConfirm(!props.showConfirm)}
            className="top-1/2 right-3 absolute text-muted-foreground hover:text-foreground transition-colors -translate-y-1/2 transform"
            disabled={props.isLoading}
          >
            {props.showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Password match indicator */}
      {props.formData.password && props.formData.confirmPassword && (
        <div
          className={`flex items-center gap-2 text-sm p-2 rounded-md ${
            props.formData.password === props.formData.confirmPassword
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <Check className="w-4 h-4" />
          {props.formData.password === props.formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
        </div>
      )}

      {/* Error message */}
      {props.error && <div className="bg-red-50 p-3 border border-red-200 rounded-md text-red-700 text-sm">{props.error}</div>}

      {/* Terms checkbox */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="mt-1 border-border rounded w-4 h-4" disabled={props.isLoading} required />
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
        disabled={props.isLoading}
        className="hover:opacity-90 disabled:opacity-50 mt-6 rounded-lg w-full h-10 font-medium text-white transition-all gradient-red-purple"
      >
        {props.isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
