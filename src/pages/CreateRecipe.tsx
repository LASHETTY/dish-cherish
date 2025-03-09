
import React from 'react';
import Header from '@/components/Header';
import RecipeForm from '@/components/RecipeForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const CreateRecipe = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-recipe-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4">
        <RecipeForm />
      </main>
      
      <footer className="bg-recipe-dark text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 DishCherish. All recipes are loved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateRecipe;
