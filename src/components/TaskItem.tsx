
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ id, text, completed, category, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card mb-2 transition-all group hover:shadow-sm">
      <div className="flex items-center gap-3 flex-1">
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
            <span className="text-xs text-muted-foreground">{category}</span>
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

export default TaskItem;
