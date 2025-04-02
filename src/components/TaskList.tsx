
import { useState } from 'react';
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCheck, Filter } from 'lucide-react';
import EmptyState from './EmptyState';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  categories: string[];
}

const TaskList = ({ tasks, onToggleTask, onDeleteTask, categories }: TaskListProps) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    // First filter by completion status
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    
    // Then filter by category if one is selected
    if (categoryFilter && task.category !== categoryFilter) return false;
    
    return true;
  });

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'active' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={filter === 'completed' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('completed')}
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Completed
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select 
            className="text-sm border rounded-md px-2 py-1"
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <Separator />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tasks match your filters
        </div>
      ) : (
        <div className="space-y-2 mt-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              category={task.category}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
      
      <div className="text-sm text-muted-foreground text-center py-2">
        {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
      </div>
    </div>
  );
};

export default TaskList;
