import { LogIn } from 'lucide-react';
import LoginForm from '@/components/forms/login-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingComponent from '@/components/loading-component/LoadingComponent';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#F5F0FF] via-white to-[#F5F0FF] p-4 min-h-screen">
      {isLoading && <LoadingComponent />}
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="top-20 right-10 absolute bg-gradient-to-br from-red-200 to-purple-200 opacity-20 blur-3xl rounded-full w-72 h-72 mix-blend-multiply filter"></div>
        <div className="bottom-20 left-10 absolute bg-gradient-to-br from-purple-200 to-red-200 opacity-20 blur-3xl rounded-full w-72 h-72 mix-blend-multiply filter"></div>
      </div>

      {/* Main content */}
      <div className="z-10 relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center mx-auto mb-4 rounded-full w-12 h-12 gradient-red-purple">
            <Link to="/">
              <LogIn className="w-6 h-6 text-white" />
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-foreground text-3xl">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <LoginForm 
          formData={formData}
          setFormData={setFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          navigate={navigate}
          setError={setError}
        />

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="mb-4 text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="hover:opacity-80 font-semibold transition-opacity gradient-red-purple-text"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
