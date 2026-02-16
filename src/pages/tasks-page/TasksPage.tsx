import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteTask, getTasksByUserId } from '@/api/tasks/tasks.service';
import LoadingComponent from '@/components/loading-component/LoadingComponent';

export interface TaskItem {
  _id: string;
  prompt: string;
  image?: string;
  status: 'pending' | 'in_progress' | 'completed';
  user: {
    fname: string;
    lname: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-black" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask({
      taskId: taskId,
      setIsLoading: setIsLoading,
      setTasks: setTasks,
    });
  };

  useEffect(() => {
    getTasksByUserId({
      setIsLoading: setIsLoading,
      setTasks: setTasks,
      userId: localStorage.getItem('user-id') || '',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingComponent />}

      {/* Header */}
      <header className="border-b bg-white/50 border-border">
        <div className="container flex items-center h-16 gap-4 px-4 mx-auto">
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="hover:bg-muted text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Task History</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Your Tasks</h2>
          <p className="text-foreground/70">View all your created tasks and their current status</p>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="overflow-hidden transition-all border rounded-xl border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 group"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                {task.image ? (
                  <img
                    src={task.image}
                    alt="Task image"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/80 ${task.image ? 'hidden' : ''}`}
                >
                  <ImageOff className="w-8 h-8 text-foreground/40" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={getStatusBadgeVariant(task.status) as any}
                    className={`flex items-center gap-1 capitalize ${task.status === 'pending' && `bg-white`}`}
                  >
                    {getStatusIcon(task.status)}
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-red-purple">
                    <span className="text-sm font-semibold text-white">
                      {task.user.fname[0]}
                      {task.user.lname[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {task.user.fname} {task.user.lname}
                    </p>
                    <div className='flex flex-col'>
                      <div className='flex gap-2'>
                        <p className='text-xs'>Created:</p>
                        <p className="text-xs text-foreground/60">{formatDate(task.createdAt)}</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-xs'>Updated:</p>
                        <p className="text-xs text-foreground/60">{formatDate(task.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prompt */}
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
                    {task.prompt}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    className="flex-1 text-sm text-white cursor-pointer gradient-red-purple"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this task?')) {
                        handleDeleteTask(task._id);
                      }
                    }}
                  >
                    Delete Task
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-4 text-lg text-foreground/60">No tasks created yet</p>
            <Link to="/chat">
              <Button className="text-white gradient-red-purple">Start Creating Tasks</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
