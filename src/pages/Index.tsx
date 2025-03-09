
import React, { useState } from 'react';
import Header from '@/components/Header';
import RecipeList from '@/components/RecipeList';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BookOpen } from "lucide-react";

// Mock data for initial recipes
const mockRecipes = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882a",
    cookTime: 25,
    difficulty: "easy" as const,
  },
  {
    id: "2",
    title: "Spicy Thai Basil Chicken",
    image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6",
    cookTime: 35,
    difficulty: "medium" as const,
  },
  {
    id: "3",
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396",
    cookTime: 40,
    difficulty: "easy" as const,
  },
  {
    id: "4",
    title: "Beef Wellington",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    cookTime: 120,
    difficulty: "hard" as const,
  },
  {
    id: "5",
    title: "Lemon Herb Roasted Chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
    cookTime: 90,
    difficulty: "medium" as const,
  },
  {
    id: "6",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    cookTime: 30,
    difficulty: "medium" as const,
  },
];

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(recipeId => recipeId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="bg-gradient-to-r from-recipe-secondary to-white p-8 rounded-lg shadow-sm mb-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold text-recipe-dark mb-4">
              Your Culinary Journey Starts Here
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              Discover, create, and organize your favorite recipes in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                className="bg-recipe-primary hover:bg-recipe-primary/90 text-white"
              >
                <Link to="/create">Create Recipe</Link>
              </Button>
              <Button 
                asChild 
                className="bg-transparent hover:bg-recipe-primary/10 text-recipe-primary border border-recipe-primary"
              >
                <Link to="/organize">Organize</Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 hidden md:block opacity-20">
            <BookOpen size={200} className="text-recipe-primary animate-float" />
          </div>
        </section>
        
        <RecipeList 
          recipes={mockRecipes} 
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
        />
      </main>
      
      <footer className="bg-recipe-dark text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 DishCherish. All recipes are loved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
