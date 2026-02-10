import React from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from "react-router-dom"
import type { LoginFormProps } from "@/types/components.types"
import { loginUser } from "@/api/user/user.service"
import { useUser } from "@/hooks/useUser"
import useLocalStorage from "@/hooks/useLocalStorage"
import { useAuth } from "@/hooks/useAuth"

export default function LoginForm(props: LoginFormProps) {
  const { setAuthenticated } = useAuth();
  const { setLocalStorageItem } = useLocalStorage();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    props.setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    props.setError('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Placeholder for authentication logic
      if (!props.formData.email || !props.formData.password) {
        props.setError('Please fill in all fields');
        return
      }

      // API call
      loginUser({
        email: props.formData.email,
        password: props.formData.password,
        navigate: props.navigate,
        isLoading: props.isLoading,
        setIsLoading: props.setIsLoading,
        setAuthenticated: setAuthenticated,
        setLocalStorageItem: setLocalStorageItem,
        setUser: setUser,
      });

    } catch (err) {
      props.setError('Failed to sign in. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={props.formData.email}
          onChange={handleChange}
          className="w-full transition-all bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
          disabled={props.isLoading}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground">
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
            className="w-full pr-10 transition-all bg-white border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
            disabled={props.isLoading}
          />
          <button
            type="button"
            onClick={() => props.setShowPassword(!props.showPassword)}
            className="absolute transition-colors transform -translate-y-1/2 top-1/2 right-3 text-muted-foreground hover:text-foreground"
            disabled={props.isLoading}
          >
            {props.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error message */}
      {props.error && <div className="p-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">{props.error}</div>}

      {/* Remember me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-border" disabled={props.isLoading} />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-sm font-medium transition-opacity hover:opacity-80 gradient-red-purple-text">
          Forgot password?
        </Link>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={props.isLoading}
        className="w-full h-10 mt-6 font-medium text-white transition-all rounded-lg hover:opacity-90 disabled:opacity-50 gradient-red-purple"
      >
        {props.isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
