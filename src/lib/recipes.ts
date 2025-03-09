
import { supabase, Recipe, Ingredient, Category } from './supabase';
import { toast } from 'sonner';
import { v4 as uuidv4 } from '@supabase/supabase-js';

// Fetch all recipes for current user
export async function fetchRecipes() {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { recipes: [], error: 'User not authenticated' };
    }
    
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error(`Error fetching recipes: ${error.message}`);
      return { recipes: [], error: error.message };
    }
    
    return { recipes: data as Recipe[], error: null };
  } catch (error) {
    console.error('Error in fetchRecipes:', error);
    toast.error('An unexpected error occurred while fetching recipes');
    return { recipes: [], error: 'Unexpected error' };
  }
}

// Fetch a specific recipe by ID
export async function fetchRecipeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      toast.error(`Error fetching recipe: ${error.message}`);
      return { recipe: null, error: error.message };
    }
    
    return { recipe: data as Recipe, error: null };
  } catch (error) {
    console.error('Error in fetchRecipeById:', error);
    toast.error('An unexpected error occurred while fetching the recipe');
    return { recipe: null, error: 'Unexpected error' };
  }
}

// Create a new recipe
export async function createRecipe(recipeData: Omit<Recipe, 'id' | 'user_id' | 'created_at'>) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { recipe: null, error: 'User not authenticated' };
    }
    
    const newRecipe = {
      ...recipeData,
      id: uuidv4(),
      user_id: user.id,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('recipes')
      .insert([newRecipe])
      .select()
      .single();
      
    if (error) {
      toast.error(`Error creating recipe: ${error.message}`);
      return { recipe: null, error: error.message };
    }
    
    toast.success('Recipe created successfully!');
    return { recipe: data as Recipe, error: null };
  } catch (error) {
    console.error('Error in createRecipe:', error);
    toast.error('An unexpected error occurred while creating the recipe');
    return { recipe: null, error: 'Unexpected error' };
  }
}

// Update an existing recipe
export async function updateRecipe(id: string, recipeData: Partial<Recipe>) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { recipe: null, error: 'User not authenticated' };
    }
    
    // First check if the recipe belongs to the current user
    const { data: existingRecipe } = await supabase
      .from('recipes')
      .select('user_id')
      .eq('id', id)
      .single();
      
    if (!existingRecipe || existingRecipe.user_id !== user.id) {
      toast.error('You do not have permission to update this recipe');
      return { recipe: null, error: 'Permission denied' };
    }
    
    const { data, error } = await supabase
      .from('recipes')
      .update(recipeData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      toast.error(`Error updating recipe: ${error.message}`);
      return { recipe: null, error: error.message };
    }
    
    toast.success('Recipe updated successfully!');
    return { recipe: data as Recipe, error: null };
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    toast.error('An unexpected error occurred while updating the recipe');
    return { recipe: null, error: 'Unexpected error' };
  }
}

// Delete a recipe
export async function deleteRecipe(id: string) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { error: 'User not authenticated' };
    }
    
    // First check if the recipe belongs to the current user
    const { data: existingRecipe } = await supabase
      .from('recipes')
      .select('user_id')
      .eq('id', id)
      .single();
      
    if (!existingRecipe || existingRecipe.user_id !== user.id) {
      toast.error('You do not have permission to delete this recipe');
      return { error: 'Permission denied' };
    }
    
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
      
    if (error) {
      toast.error(`Error deleting recipe: ${error.message}`);
      return { error: error.message };
    }
    
    toast.success('Recipe deleted successfully!');
    return { error: null };
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    toast.error('An unexpected error occurred while deleting the recipe');
    return { error: 'Unexpected error' };
  }
}

// Save recipe categories
export async function saveCategories(categories: Omit<Category, 'user_id'>[]) {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { error: 'User not authenticated' };
    }
    
    // First, delete all existing categories for this user
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('user_id', user.id);
      
    if (deleteError) {
      toast.error(`Error deleting existing categories: ${deleteError.message}`);
      return { error: deleteError.message };
    }
    
    // Then insert all new categories
    const categoriesWithUserId = categories.map(category => ({
      ...category,
      user_id: user.id
    }));
    
    const { error: insertError } = await supabase
      .from('categories')
      .insert(categoriesWithUserId);
      
    if (insertError) {
      toast.error(`Error saving categories: ${insertError.message}`);
      return { error: insertError.message };
    }
    
    toast.success('Categories saved successfully!');
    return { error: null };
  } catch (error) {
    console.error('Error in saveCategories:', error);
    toast.error('An unexpected error occurred while saving categories');
    return { error: 'Unexpected error' };
  }
}

// Fetch user's recipe categories
export async function fetchCategories() {
  try {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    
    if (!user) {
      return { categories: [], error: 'User not authenticated' };
    }
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      toast.error(`Error fetching categories: ${error.message}`);
      return { categories: [], error: error.message };
    }
    
    return { categories: data as Category[], error: null };
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    toast.error('An unexpected error occurred while fetching categories');
    return { categories: [], error: 'Unexpected error' };
  }
}
