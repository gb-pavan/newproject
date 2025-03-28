'use client';
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

interface ErrorBoundaryProviderProps {
  children: ReactNode;
}

const ErrorBoundaryProvider = ({ children }: ErrorBoundaryProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryProvider;
