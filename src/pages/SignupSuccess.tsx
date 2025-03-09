
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from '@/components/Header';

const SignupSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          
          <h1 className="font-heading text-2xl font-semibold text-recipe-dark mb-4">
            Email Verification Sent
          </h1>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address. 
            Please check your inbox and click the link to verify your account.
          </p>
          
          <div className="space-y-4">
            <Button
              className="w-full bg-recipe-primary hover:bg-recipe-primary/90"
              asChild
            >
              <Link to="/login">
                Continue to Login
              </Link>
            </Button>
            
            <p className="text-sm text-gray-500">
              Didn't receive an email? Check your spam folder or{' '}
              <Link to="/signup" className="text-recipe-primary hover:underline">
                try again
              </Link>
              .
            </p>
          </div>
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

export default SignupSuccess;
