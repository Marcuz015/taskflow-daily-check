
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all",
            selectedCategory === category 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-primary/10"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default CategorySelector;
