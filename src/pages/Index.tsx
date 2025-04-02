
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/components/TaskList';

const generateId = () => Math.random().toString(36).substring(2, 9);

// Default categories
const defaultCategories = ['Work', 'Personal', 'Errands', 'Health'];

// Sample tasks for first-time users
const sampleTasks: Task[] = [
  { id: generateId(), text: 'Complete project proposal', completed: false, category: 'Work' },
  { id: generateId(), text: 'Go grocery shopping', completed: true, category: 'Errands' },
  { id: generateId(), text: 'Morning workout', completed: false, category: 'Health' },
];

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Load tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // If no tasks found, set sample tasks for new users
      setTasks(sampleTasks);
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAddTask = (text: string, category: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      completed: false,
      category,
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    
    toast({
      title: "Task added",
      description: `"${text}" has been added to your list.`,
    });
  };
  
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: taskToDelete ? `"${taskToDelete.text}" has been removed.` : "Task has been removed.",
      variant: "destructive",
    });
  };
  
  // Get unique categories from tasks plus the default ones
  const categories = Array.from(
    new Set([
      ...defaultCategories,
      ...tasks.map((task) => task.category).filter(Boolean)
    ])
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 pb-12">
      <Header />
      
      <main>
        <TaskForm onAddTask={handleAddTask} categories={categories} />
        <TaskList 
          tasks={tasks} 
          onToggleTask={handleToggleTask} 
          onDeleteTask={handleDeleteTask}
          categories={categories}
        />
      </main>
    </div>
  );
};

export default Index;
