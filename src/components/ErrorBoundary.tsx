import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur non gérée:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Oups !</h1>
            <p className="text-xl text-gray-600 mb-8">
              Une erreur inattendue s'est produite.
            </p>
            <div className="space-y-4">
              <Button onClick={this.handleReload} size="lg">
                Recharger la page
              </Button>
              <p className="text-sm text-gray-500">
                Si le problème persiste, veuillez nous contacter.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 