
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlusCircle, Minus, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const recipeSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  cookTime: z.coerce.number().min(1, { message: "Cook time must be at least 1 minute" }).max(1440),
  servings: z.coerce.number().min(1, { message: "Must serve at least 1 person" }).max(50),
  difficulty: z.enum(["easy", "medium", "hard"]),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: "Ingredient name is required" }),
      quantity: z.string().min(1, { message: "Quantity is required" }),
    })
  ).min(1, { message: "Add at least one ingredient" }),
  instructions: z.array(
    z.string().min(3, { message: "Instruction step must be at least 3 characters" })
  ).min(1, { message: "Add at least one instruction" }),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

const RecipeForm: React.FC = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState([""]);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      cookTime: 30,
      servings: 4,
      difficulty: "medium",
      imageUrl: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [""],
    },
  });

  const onSubmit = async (values: RecipeFormValues) => {
    try {
      // In a real app, this would be an API call
      console.log("Form submitted:", values);
      
      // For demo purposes, we'll simulate success
      toast.success("Recipe added successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Failed to add recipe. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
    form.setValue("ingredients", [...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
      form.setValue("ingredients", newIngredients);
    }
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
    form.setValue("instructions", [...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(newInstructions);
      form.setValue("instructions", newInstructions);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <h1 className="font-heading text-3xl font-semibold text-recipe-dark">Add New Recipe</h1>
        <p className="text-gray-600 mt-2">Share your culinary masterpiece with the world</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Details */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-heading text-xl font-medium text-recipe-dark">Basic Details</h2>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Creamy Garlic Parmesan Pasta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your recipe in a few sentences..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cookTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-heading text-xl font-medium text-recipe-dark">Ingredients</h2>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                          {index === 0 && 'Ingredient'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g., Olive oil" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              const newIngredients = [...ingredients];
                              newIngredients[index].name = e.target.value;
                              setIngredients(newIngredients);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                          {index === 0 && 'Quantity'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g., 2 tablespoons" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              const newIngredients = [...ingredients];
                              newIngredients[index].quantity = e.target.value;
                              setIngredients(newIngredients);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-8 md:mt-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-500"
                    onClick={() => removeIngredient(index)}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 border-dashed flex items-center justify-center gap-1"
              onClick={addIngredient}
            >
              <Plus size={16} />
              Add Ingredient
            </Button>
          </div>
          
          {/* Instructions */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-heading text-xl font-medium text-recipe-dark">Instructions</h2>
            
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-3 text-recipe-primary font-medium">
                  {index + 1}.
                </div>
                
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`instructions.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Step {index + 1}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={`Step ${index + 1}: Describe what to do...`}
                            className="min-h-[80px]"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              const newInstructions = [...instructions];
                              newInstructions[index] = e.target.value;
                              setInstructions(newInstructions);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-500"
                    onClick={() => removeInstruction(index)}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 border-dashed flex items-center justify-center gap-1"
              onClick={addInstruction}
            >
              <Plus size={16} />
              Add Step
            </Button>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-recipe-primary hover:bg-recipe-primary/90"
            >
              Save Recipe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipeForm;
