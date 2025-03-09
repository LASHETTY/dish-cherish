
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, ChefHat, Users, Heart, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeDetailProps {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  instructions: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const RecipeDetail: React.FC<{ recipe: RecipeDetailProps }> = ({ recipe }) => {
  const navigate = useNavigate();
  
  const difficultyColor = {
    easy: 'text-green-500',
    medium: 'text-amber-500',
    hard: 'text-red-500'
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Back to recipes
      </Button>
      
      <div className="relative mb-6">
        <img 
          src={recipe.image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352"} 
          alt={recipe.title}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white bg-opacity-90 rounded-full hover:bg-white"
            onClick={() => recipe.onFavoriteToggle && recipe.onFavoriteToggle(recipe.id)}
          >
            <Heart 
              size={18} 
              className={recipe.isFavorite ? 'fill-recipe-primary text-recipe-primary' : 'text-gray-600'} 
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white bg-opacity-90 rounded-full hover:bg-white"
            onClick={() => navigate(`/edit/${recipe.id}`)}
          >
            <Pencil size={18} className="text-gray-600" />
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-recipe-dark mb-3">
          {recipe.title}
        </h1>
        <p className="text-gray-600 mb-6">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-6 text-sm mb-6">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-recipe-primary" />
            <span>{recipe.cookTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat size={18} className={difficultyColor[recipe.difficulty]} />
            <span className={`capitalize ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-600" />
            <span>Serves {recipe.servings}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="font-heading text-xl font-medium text-recipe-dark mb-4">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-baseline text-gray-700">
                <span className="inline-block w-1 h-1 rounded-full bg-recipe-primary mr-2"></span>
                <span className="font-medium">{ingredient.quantity}</span>
                <span className="mx-2">—</span>
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="font-heading text-xl font-medium text-recipe-dark mb-4">
            Instructions
          </h2>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-recipe-primary text-white rounded-full flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <p className="text-gray-700 mt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
