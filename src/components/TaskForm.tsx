
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import CategorySelector from './CategorySelector';

interface TaskFormProps {
  onAddTask: (text: string, category: string) => void;
  categories: string[];
}

const TaskForm = ({ onAddTask, categories }: TaskFormProps) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim(), category);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={!text.trim()}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      <CategorySelector 
        categories={categories} 
        selectedCategory={category} 
        onSelectCategory={setCategory} 
      />
    </form>
  );
};

export default TaskForm;
