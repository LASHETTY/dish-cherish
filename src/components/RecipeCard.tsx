
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Heart } from "lucide-react";
import { Link } from 'react-router-dom';

export interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  cookTime,
  difficulty,
  isFavorite = false,
  onFavoriteToggle
}) => {
  const difficultyColor = {
    easy: 'text-green-500',
    medium: 'text-amber-500',
    hard: 'text-red-500'
  };

  return (
    <Card className="recipe-card overflow-hidden">
      <div className="relative overflow-hidden h-48">
        <img 
          src={image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352"} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full hover:bg-white"
          onClick={() => onFavoriteToggle && onFavoriteToggle(id)}
        >
          <Heart 
            size={18} 
            className={isFavorite ? 'fill-recipe-primary text-recipe-primary' : 'text-gray-500'} 
          />
        </Button>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-heading text-lg font-semibold line-clamp-1">{title}</h3>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock size={16} />
            <span>{cookTime} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={16} className={difficultyColor[difficulty]} />
            <span className={`capitalize ${difficultyColor[difficulty]}`}>{difficulty}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/recipe/${id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-recipe-primary text-recipe-primary hover:bg-recipe-primary hover:text-white"
          >
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
