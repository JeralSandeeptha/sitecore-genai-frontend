import React from "react"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#F5F0FF] via-white to-[#F5F0FF] p-4 w-full h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <div className="space-y-6 bg-card mx-auto p-8 border border-border rounded-lg">
        {/* Email field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block font-medium text-foreground text-sm"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="top-3 left-3 absolute w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary pl-10 border-border focus:border-primary focus:ring-primary h-11 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 p-3 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-50 py-2.5 rounded-full w-full font-medium text-white hover:scale-105 disabled:hover:scale-100 transition-transform gradient-red-purple"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>

      {/* Back to login link */}
      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-medium text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </form>
    </div>
  );
}
