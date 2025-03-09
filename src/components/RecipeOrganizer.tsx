
import React, { useState } from 'react';
import { RecipeCardProps } from './RecipeCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash, Move } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  recipes: string[];
}

interface RecipeOrganizerProps {
  recipes: RecipeCardProps[];
  initialCategories?: Category[];
  onSave?: (categories: Category[]) => void;
}

const RecipeOrganizer: React.FC<RecipeOrganizerProps> = ({ 
  recipes, 
  initialCategories = [],
  onSave 
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories.length > 0 
    ? initialCategories 
    : [{ id: "1", name: "Uncategorized", recipes: recipes.map(r => r.id) }]
  );
  const [newCategoryName, setNewCategoryName] = useState('');
  const [draggedRecipe, setDraggedRecipe] = useState<string | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null);

  const findRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const addCategory = () => {
    if (newCategoryName.trim() === '') {
      toast.error("Please enter a category name");
      return;
    }
    
    const categoryExists = categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase());
    if (categoryExists) {
      toast.error("A category with this name already exists");
      return;
    }
    
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      recipes: []
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    toast.success(`Category "${newCategoryName}" added`);
  };

  const deleteCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    // If we're deleting a category, move its recipes to Uncategorized
    const uncategorized = categories.find(cat => cat.name === "Uncategorized");
    
    if (uncategorized) {
      // Update Uncategorized with the recipes from the deleted category
      const updatedCategories = categories.map(cat => {
        if (cat.id === uncategorized.id) {
          return {
            ...cat,
            recipes: [...cat.recipes, ...category.recipes]
          };
        }
        return cat;
      }).filter(cat => cat.id !== categoryId);
      
      setCategories(updatedCategories);
    } else {
      // If Uncategorized doesn't exist, create it
      const newUncategorized: Category = {
        id: "uncategorized",
        name: "Uncategorized",
        recipes: category.recipes
      };
      
      setCategories([
        newUncategorized,
        ...categories.filter(cat => cat.id !== categoryId)
      ]);
    }
    
    toast.success(`Category "${category.name}" deleted`);
  };

  const handleDragStart = (recipeId: string, categoryId: string) => {
    setDraggedRecipe(recipeId);
    setDraggedCategory(categoryId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, categoryId: string) => {
    e.preventDefault();
    setDragOverCategory(categoryId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCategoryId: string) => {
    e.preventDefault();
    
    if (!draggedRecipe || !draggedCategory) return;
    
    // Don't do anything if dropping in the same category
    if (draggedCategory === targetCategoryId) {
      setDraggedRecipe(null);
      setDraggedCategory(null);
      setDragOverCategory(null);
      return;
    }
    
    // Remove recipe from source category
    const updatedCategories = categories.map(cat => {
      if (cat.id === draggedCategory) {
        return {
          ...cat,
          recipes: cat.recipes.filter(id => id !== draggedRecipe)
        };
      } else if (cat.id === targetCategoryId) {
        // Add recipe to target category
        return {
          ...cat,
          recipes: [...cat.recipes, draggedRecipe]
        };
      }
      return cat;
    });
    
    setCategories(updatedCategories);
    setDraggedRecipe(null);
    setDraggedCategory(null);
    setDragOverCategory(null);
    
    const recipe = findRecipeById(draggedRecipe);
    const targetCategory = categories.find(cat => cat.id === targetCategoryId);
    
    if (recipe && targetCategory) {
      toast.success(`Moved "${recipe.title}" to "${targetCategory.name}"`);
    }
  };

  const handleDragEnd = () => {
    setDraggedRecipe(null);
    setDraggedCategory(null);
    setDragOverCategory(null);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(categories);
      toast.success("Recipe organization saved successfully");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-recipe-dark">
            Organize Your Recipes
          </h2>
          <p className="text-gray-600 mt-1">Drag and drop recipes between categories</p>
        </div>
        
        <Button 
          className="bg-recipe-primary hover:bg-recipe-primary/90 text-white"
          onClick={handleSave}
        >
          Save Organization
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="max-w-xs"
        />
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-recipe-primary text-recipe-primary hover:bg-recipe-primary/10"
          onClick={addCategory}
        >
          <PlusCircle size={16} />
          Add Category
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map(category => (
          <div 
            key={category.id}
            className={`bg-white rounded-lg shadow p-4 border-2 transition-all
              ${dragOverCategory === category.id ? 'border-dashed border-recipe-accent bg-recipe-secondary/50' : 'border-transparent'}`}
            onDragOver={(e) => handleDragOver(e, category.id)}
            onDrop={(e) => handleDrop(e, category.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-lg text-recipe-dark">
                {category.name}
              </h3>
              
              {category.name !== "Uncategorized" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => deleteCategory(category.id)}
                >
                  <Trash size={16} />
                </Button>
              )}
            </div>
            
            <Separator className="mb-3" />
            
            <div className="min-h-[100px]">
              {category.recipes.length === 0 ? (
                <p className="text-gray-500 text-sm p-2 text-center italic">
                  Drag recipes here
                </p>
              ) : (
                <ul className="space-y-2">
                  {category.recipes.map(recipeId => {
                    const recipe = findRecipeById(recipeId);
                    if (!recipe) return null;
                    
                    return (
                      <li 
                        key={recipeId}
                        className={`p-2 rounded bg-gray-50 flex items-center justify-between drag-item
                          ${draggedRecipe === recipeId ? 'opacity-50' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(recipeId, category.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <span className="line-clamp-1 text-sm font-medium">
                          {recipe.title}
                        </span>
                        <Move size={14} className="text-gray-400" />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeOrganizer;
