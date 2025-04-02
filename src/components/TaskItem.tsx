
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Função para determinar a cor da categoria
const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'trabalho':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'pessoal':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'recados':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'saúde':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const TaskItem = ({ id, text, completed, category, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card mb-2 transition-all group hover:shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        <div className={cn(
          "w-1 self-stretch rounded-full",
          completed ? "bg-gray-300" : getCategoryColorBar(category)
        )} />
        <Checkbox
          id={`task-${id}`}
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className={cn(
            "transition-colors",
            completed ? "border-success bg-success" : ""
          )}
        />
        <div className="flex flex-col">
          <label
            htmlFor={`task-${id}`}
            className={cn(
              "text-sm font-medium cursor-pointer transition-all",
              completed && "line-through text-muted-foreground"
            )}
          >
            {text}
          </label>
          {category && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs mt-1 px-2 py-0",
                !completed && getCategoryColor(category)
              )}
            >
              {category}
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};

// Função para determinar a cor da barra lateral da categoria
const getCategoryColorBar = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'trabalho':
      return 'bg-purple-500';
    case 'pessoal':
      return 'bg-green-500';
    case 'recados':
      return 'bg-orange-500';
    case 'saúde':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

export default TaskItem;
