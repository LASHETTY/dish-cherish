
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusCircle, ChefHat, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat size={28} className="text-recipe-primary" />
            <span className="font-heading text-2xl font-semibold text-recipe-dark">
              DishCherish
            </span>
          </Link>
          
          <div className="relative w-full md:w-1/3">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search recipes..." 
              className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-recipe-primary"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/create">
              <Button className="bg-recipe-primary hover:bg-recipe-primary/90 text-white flex items-center gap-2">
                <PlusCircle size={18} />
                Add Recipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
