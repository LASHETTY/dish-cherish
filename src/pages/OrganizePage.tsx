
import React from 'react';
import Header from '@/components/Header';
import RecipeOrganizer from '@/components/RecipeOrganizer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

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

// Mock initial categories
const mockCategories = [
  {
    id: "1",
    name: "Main Dishes",
    recipes: ["1", "2", "4", "5"]
  },
  {
    id: "2",
    name: "Quick & Easy",
    recipes: ["1", "3"]
  },
  {
    id: "3",
    name: "Desserts",
    recipes: ["6"]
  }
];

const OrganizePage = () => {
  const handleSaveOrganization = (categories: any) => {
    // In a real app, this would make an API call to save the organization
    console.log("Saving organization:", categories);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-6"
          asChild
        >
          <Link to="/">
            <ArrowLeft size={16} />
            Back to recipes
          </Link>
        </Button>
        
        <RecipeOrganizer 
          recipes={mockRecipes} 
          initialCategories={mockCategories}
          onSave={handleSaveOrganization}
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

export default OrganizePage;
