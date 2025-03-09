
import React from 'react';
import Header from '@/components/Header';
import RecipeForm from '@/components/RecipeForm';

const CreateRecipe = () => {
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
