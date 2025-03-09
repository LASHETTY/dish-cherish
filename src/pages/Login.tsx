
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from '@/components/Header';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      if (user) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="font-heading text-2xl font-semibold text-recipe-dark mb-6">Log In</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-recipe-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-recipe-primary hover:bg-recipe-primary/90"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-recipe-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <footer className="bg-recipe-dark text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 DishCherish. All recipes are loved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
