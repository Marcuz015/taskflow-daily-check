
import { CheckCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 mb-8">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">TaskFlow</h1>
      </div>
      <div className="text-sm text-muted-foreground">
        Organize suas tarefas diárias
      </div>
    </header>
  );
};

export default Header;
