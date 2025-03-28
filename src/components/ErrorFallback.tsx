"use client"; 
import React from "react";

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Something went wrong 😢</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorFallback;
