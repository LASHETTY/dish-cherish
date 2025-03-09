import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDetail from '@/components/RecipeDetail';
import { Button } from "@/components/ui/button";

// Mock detailed recipe data
const mockRecipeDetails = {
  "1": {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    description: "A rich and creamy pasta dish that's perfect for a quick weeknight dinner. It's loaded with garlic, Parmesan cheese, and finished with fresh herbs.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882a",
    cookTime: 25,
    servings: 4,
    difficulty: 'easy' as const,
    ingredients: [
      { name: "Fettuccine pasta", quantity: "8 oz" },
      { name: "Unsalted butter", quantity: "3 tbsp" },
      { name: "Garlic, minced", quantity: "4 cloves" },
      { name: "Heavy cream", quantity: "1 cup" },
      { name: "Parmesan cheese, grated", quantity: "1 cup" },
      { name: "Salt", quantity: "to taste" },
      { name: "Black pepper", quantity: "to taste" },
      { name: "Fresh parsley, chopped", quantity: "2 tbsp" }
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Cook the fettuccine according to package instructions until al dente. Reserve 1/2 cup of pasta water before draining.",
      "While the pasta is cooking, melt the butter in a large skillet over medium heat. Add the minced garlic and cook until fragrant, about 1-2 minutes.",
      "Pour in the heavy cream and bring to a simmer. Cook for about 5 minutes or until it starts to thicken.",
      "Reduce heat to low and whisk in the grated Parmesan cheese until smooth. If the sauce is too thick, add a splash of the reserved pasta water.",
      "Add the drained pasta to the sauce and toss to coat evenly. Season with salt and black pepper to taste.",
      "Garnish with freshly chopped parsley before serving."
    ],
    isFavorite: false
  },
  "2": {
    id: "2",
    title: "Spicy Thai Basil Chicken",
    description: "A vibrant and aromatic Thai stir-fry that brings together the flavors of basil, chili, and garlic for a quick and delicious weeknight meal.",
    image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6",
    cookTime: 35,
    servings: 4,
    difficulty: 'medium' as const,
    ingredients: [
      { name: "Boneless chicken thighs, diced", quantity: "1 lb" },
      { name: "Thai bird's eye chilies, minced", quantity: "3-5" },
      { name: "Garlic, minced", quantity: "5 cloves" },
      { name: "Shallots, sliced", quantity: "3" },
      { name: "Thai fish sauce", quantity: "2 tbsp" },
      { name: "Oyster sauce", quantity: "1 tbsp" },
      { name: "Soy sauce", quantity: "1 tbsp" },
      { name: "Brown sugar", quantity: "1 tsp" },
      { name: "Thai basil leaves", quantity: "1 cup" },
      { name: "Vegetable oil", quantity: "2 tbsp" },
      { name: "Jasmine rice, cooked", quantity: "for serving" }
    ],
    instructions: [
      "In a small bowl, mix together the fish sauce, oyster sauce, soy sauce, and brown sugar until the sugar dissolves. Set aside.",
      "Heat the vegetable oil in a wok or large skillet over high heat. When the oil is hot, add the minced chilies, garlic, and shallots. Stir-fry for about 30 seconds until fragrant.",
      "Add the diced chicken to the wok and continue stir-frying until the chicken is cooked through, about 5-7 minutes.",
      "Pour the sauce mixture over the chicken and stir to coat. Cook for another minute.",
      "Turn off the heat and stir in the Thai basil leaves, allowing them to wilt from the residual heat.",
      "Serve immediately over jasmine rice."
    ],
    isFavorite: false
  },
  "3": {
    id: "3",
    title: "Classic Margherita Pizza",
    description: "A timeless Italian favorite featuring the colors of the Italian flag - red tomatoes, white mozzarella, and green basil on a perfect thin crust.",
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396",
    cookTime: 40,
    servings: 2,
    difficulty: 'easy' as const,
    ingredients: [
      { name: "Pizza dough", quantity: "1 ball (about 250g)" },
      { name: "San Marzano tomatoes, crushed", quantity: "1 cup" },
      { name: "Fresh mozzarella cheese, torn into pieces", quantity: "8 oz" },
      { name: "Fresh basil leaves", quantity: "1 handful" },
      { name: "Extra virgin olive oil", quantity: "2 tbsp" },
      { name: "Sea salt", quantity: "to taste" },
      { name: "Semolina flour for dusting", quantity: "as needed" }
    ],
    instructions: [
      "Preheat your oven to the highest temperature, usually 500°F (260°C), with a pizza stone or baking sheet inside for at least 30 minutes.",
      "On a floured surface, stretch or roll the pizza dough into a 12-inch circle.",
      "Dust a pizza peel or another inverted baking sheet with semolina flour and transfer the dough onto it.",
      "Spread the crushed tomatoes in a thin layer over the dough, leaving a small border around the edges for the crust.",
      "Arrange the torn mozzarella pieces evenly over the tomato sauce.",
      "Slide the pizza onto the preheated stone or baking sheet in the oven and bake for 8-10 minutes, or until the crust is golden and the cheese is bubbling and slightly browned.",
      "Remove from the oven and immediately top with fresh basil leaves and a drizzle of olive oil. Season with sea salt to taste.",
      "Let cool for a minute before slicing and serving."
    ],
    isFavorite: false
  },
  "4": {
    id: "4",
    title: "Beef Wellington",
    description: "A showstopping dish featuring a tender beef fillet wrapped in mushroom duxelles, prosciutto, and flaky puff pastry. Perfect for special occasions.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    cookTime: 120,
    servings: 6,
    difficulty: 'hard' as const,
    ingredients: [
      { name: "Beef tenderloin center cut", quantity: "2-3 lb" },
      { name: "Salt and black pepper", quantity: "to taste" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Dijon mustard", quantity: "2 tbsp" },
      { name: "Cremini mushrooms, finely chopped", quantity: "1 lb" },
      { name: "Shallots, finely chopped", quantity: "2" },
      { name: "Garlic, minced", quantity: "2 cloves" },
      { name: "Fresh thyme leaves", quantity: "1 tbsp" },
      { name: "Prosciutto slices", quantity: "8-10 slices" },
      { name: "Puff pastry", quantity: "1 sheet" },
      { name: "Egg, beaten", quantity: "1" }
    ],
    instructions: [
      "Season the beef tenderloin generously with salt and pepper. Heat olive oil in a large pan over high heat and sear the beef on all sides until browned, about 2-3 minutes per side. Remove from pan and let cool completely.",
      "In the same pan, add mushrooms, shallots, and garlic. Cook over medium heat until all moisture has evaporated, about 10 minutes. Add thyme, season with salt and pepper, and let cool completely.",
      "Once the beef is cool, brush it all over with Dijon mustard.",
      "Lay out a large piece of plastic wrap. Arrange the prosciutto slices in an overlapping pattern to form a rectangle large enough to fully wrap around the beef.",
      "Spread the mushroom mixture evenly over the prosciutto, then place the beef in the center. Use the plastic wrap to help roll the prosciutto and mushroom mixture tightly around the beef. Twist the ends of the plastic wrap to secure and refrigerate for 30 minutes.",
      "Preheat oven to 400°F (200°C). Roll out the puff pastry on a floured surface to a size that will fully wrap around the beef.",
      "Unwrap the beef from the plastic wrap and place it in the center of the puff pastry. Fold the pastry around the beef, sealing the edges with egg wash. Trim any excess pastry.",
      "Place the Wellington seam-side down on a baking sheet lined with parchment paper. Brush the entire pastry with egg wash and score the top with a knife for decoration.",
      "Bake for 35-40 minutes for medium-rare, or until the pastry is golden brown and a meat thermometer inserted into the center reads 125°F (52°C).",
      "Let rest for 10 minutes before slicing and serving."
    ],
    isFavorite: false
  },
  "5": {
    id: "5",
    title: "Lemon Herb Roasted Chicken",
    description: "A flavorful and juicy whole roasted chicken infused with bright lemon and aromatic herbs. This classic dish is perfect for Sunday dinner.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
    cookTime: 90,
    servings: 4,
    difficulty: 'medium' as const,
    ingredients: [
      { name: "Whole chicken", quantity: "4-5 lbs" },
      { name: "Lemons", quantity: "2" },
      { name: "Fresh rosemary", quantity: "4 sprigs" },
      { name: "Fresh thyme", quantity: "6 sprigs" },
      { name: "Garlic", quantity: "1 head" },
      { name: "Butter, softened", quantity: "4 tbsp" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Salt", quantity: "1 tbsp" },
      { name: "Black pepper", quantity: "1 tsp" },
      { name: "Onion, quartered", quantity: "1" },
      { name: "Carrots, chunked", quantity: "2" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Remove giblets from chicken cavity and pat the chicken dry with paper towels inside and out.",
      "Zest and juice one lemon. Cut the second lemon into quarters.",
      "In a small bowl, mix the softened butter with lemon zest, 1 tablespoon of lemon juice, 1 tablespoon of chopped rosemary, and 1 tablespoon of chopped thyme. Season with salt and pepper.",
      "Gently loosen the chicken skin over the breast and spread half of the herb butter underneath, directly on the meat. Spread the remaining butter all over the outside of the chicken.",
      "Cut the head of garlic in half crosswise and place inside the cavity along with the quartered lemon, remaining rosemary and thyme sprigs.",
      "Tie the legs together with kitchen twine and tuck the wing tips under the body.",
      "Place the onion and carrots in a roasting pan and put the chicken on top, breast side up. Drizzle olive oil over the vegetables.",
      "Roast for 1 hour and 20 minutes, or until the juices run clear when you cut between a leg and thigh, and the internal temperature of the thickest part of the thigh reaches 165°F (74°C).",
      "Let the chicken rest for 15 minutes before carving and serving."
    ],
    isFavorite: false
  },
  "6": {
    id: "6",
    title: "Chocolate Lava Cake",
    description: "A decadent dessert featuring a rich chocolate cake with a gooey, molten chocolate center. This impressive treat is surprisingly easy to make.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    cookTime: 30,
    servings: 4,
    difficulty: 'medium' as const,
    ingredients: [
      { name: "Bittersweet chocolate, chopped", quantity: "6 oz" },
      { name: "Unsalted butter", quantity: "1/2 cup" },
      { name: "Eggs", quantity: "2" },
      { name: "Egg yolks", quantity: "2" },
      { name: "Granulated sugar", quantity: "1/4 cup" },
      { name: "All-purpose flour", quantity: "2 tbsp" },
      { name: "Salt", quantity: "1/4 tsp" },
      { name: "Vanilla extract", quantity: "1 tsp" },
      { name: "Powdered sugar for dusting", quantity: "as needed" },
      { name: "Vanilla ice cream", quantity: "for serving (optional)" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter and lightly flour four 6-ounce ramekins. Tap out excess flour.",
      "Place the ramekins on a baking sheet.",
      "In a medium heat-proof bowl, combine the chocolate and butter. Set the bowl over a pan of simmering water and stir occasionally until melted and smooth.",
      "In a separate bowl, whisk together the eggs, egg yolks, sugar, and vanilla until light and thick.",
      "Pour the melted chocolate mixture into the egg mixture and whisk to combine.",
      "Fold in the flour and salt until just combined.",
      "Divide the batter evenly among the prepared ramekins.",
      "Bake for 12-14 minutes, or until the sides of the cakes are firm but the centers are still soft.",
      "Let the cakes cool in the ramekins for 1 minute, then carefully run a knife around the edges and invert onto dessert plates.",
      "Dust with powdered sugar and serve immediately, with a scoop of vanilla ice cream if desired."
    ],
    isFavorite: false
  }
};

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (id && mockRecipeDetails[id as keyof typeof mockRecipeDetails]) {
      setRecipe(mockRecipeDetails[id as keyof typeof mockRecipeDetails]);
    }
  }, [id]);
  
  const handleFavoriteToggle = (id: string) => {
    setIsFavorite(prev => !prev);
  };
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Recipe not found</h1>
          <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Back to Recipes</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4">
        <RecipeDetail 
          recipe={{
            ...recipe,
            isFavorite,
            onFavoriteToggle: handleFavoriteToggle
          }} 
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

export default RecipeDetailsPage;
