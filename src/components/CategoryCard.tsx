
import React from 'react';
import { Link } from 'react-router-dom';

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm card-hover border border-gray-100">
        <div className="aspect-video relative">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <h3 className="text-white font-medium p-3 text-center w-full">
              {category.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
