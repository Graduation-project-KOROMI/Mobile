import React, { type ErrorInfo, type ReactNode } from "react";

export type GlobalErrorBoundaryFallbackProps = {
  error: Error;
  reset: () => void;
};

type GlobalErrorBoundaryProps = {
  children: ReactNode;
  externalError?: Error | null;
  fallback: (props: GlobalErrorBoundaryFallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
};

type GlobalErrorBoundaryState = {
  caughtError: Error | null;
};

export class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  state: GlobalErrorBoundaryState = {
    caughtError: null,
  };

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return {
      caughtError: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  private reset = () => {
    if (this.props.onReset) {
      this.props.onReset();
      return;
    }

    this.setState({ caughtError: null });
  };

  render() {
    const activeError = this.props.externalError ?? this.state.caughtError;

    if (activeError) {
      return this.props.fallback({
        error: activeError,
        reset: this.reset,
      });
    }

    return this.props.children;
  }
}
