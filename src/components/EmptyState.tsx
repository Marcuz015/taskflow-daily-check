
import { ClipboardList } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <ClipboardList className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">Nenhuma tarefa ainda</h3>
      <p className="text-muted-foreground max-w-sm">
        Adicione sua primeira tarefa usando o formulário acima para começar sua lista.
      </p>
    </div>
  );
};

export default EmptyState;
