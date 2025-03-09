
import React from 'react';
import RecipeCard, { RecipeCardProps } from './RecipeCard';
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

interface RecipeListProps {
  recipes: Omit<RecipeCardProps, 'onFavoriteToggle'>[];
  onFavoriteToggle?: (id: string) => void;
  favorites: string[];
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  onFavoriteToggle,
  favorites 
}) => {
  const { toast } = useToast();
  
  const handleSurpriseMe = () => {
    if (recipes.length === 0) {
      toast({
        title: "No recipes available",
        description: "Add some recipes first to use this feature.",
        variant: "destructive",
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
    
    toast({
      title: "Surprise Recipe!",
      description: `We selected "${randomRecipe.title}" for you. Enjoy!`,
      variant: "default",
    });
    
    // Scroll to the random recipe with smooth animation
    const recipeElement = document.getElementById(`recipe-${randomRecipe.id}`);
    if (recipeElement) {
      recipeElement.scrollIntoView({ behavior: 'smooth' });
      recipeElement.classList.add('ring-2', 'ring-recipe-primary', 'ring-offset-2');
      setTimeout(() => {
        recipeElement.classList.remove('ring-2', 'ring-recipe-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-2xl font-semibold text-recipe-dark">
          {recipes.length > 0 ? 'All Recipes' : 'No recipes yet'}
        </h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-recipe-accent text-recipe-accent hover:bg-recipe-accent hover:text-white"
          onClick={handleSurpriseMe}
        >
          <Shuffle size={16} />
          Surprise Me
        </Button>
      </div>
      
      {recipes.length === 0 ? (
        <div className="text-center py-12 bg-recipe-secondary rounded-lg">
          <p className="text-gray-600 mb-4">You haven't added any recipes yet.</p>
          <Button asChild className="bg-recipe-primary hover:bg-recipe-primary/90">
            <Link to="/create">Add Your First Recipe</Link>
          </Button>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} id={`recipe-${recipe.id}`}>
              <RecipeCard 
                {...recipe} 
                isFavorite={favorites.includes(recipe.id)}
                onFavoriteToggle={onFavoriteToggle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
