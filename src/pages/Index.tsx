
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/components/TaskList';

const generateId = () => Math.random().toString(36).substring(2, 9);

// Categorias padrão
const defaultCategories = ['Trabalho', 'Pessoal', 'Recados', 'Saúde'];

// Tarefas de exemplo para novos usuários
const sampleTasks: Task[] = [
  { id: generateId(), text: 'Completar proposta de projeto', completed: false, category: 'Trabalho' },
  { id: generateId(), text: 'Fazer compras no mercado', completed: true, category: 'Recados' },
  { id: generateId(), text: 'Exercícios matinais', completed: false, category: 'Saúde' },
];

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Carrega tarefas do localStorage na inicialização
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Se não encontrar tarefas, define as tarefas de exemplo para novos usuários
      setTasks(sampleTasks);
    }
  }, []);
  
  // Salva tarefas no localStorage sempre que elas mudam
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
      title: "Tarefa adicionada",
      description: `"${text}" foi adicionada à sua lista.`,
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
      title: "Tarefa excluída",
      description: taskToDelete ? `"${taskToDelete.text}" foi removida.` : "Tarefa foi removida.",
      variant: "destructive",
    });
  };
  
  // Obtém categorias únicas das tarefas mais as padrão
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
