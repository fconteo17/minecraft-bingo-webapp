'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import Swagger UI CSS
import 'swagger-ui-react/swagger-ui.css';

// Create a custom wrapper component for Swagger UI
const SwaggerUIWrapper = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => <div className="text-center text-blue-200 p-4">Loading API documentation...</div>
});

// Custom component to handle Swagger UI initialization
function SwaggerUIContainer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Suppress React strict mode warnings for Swagger UI
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        args[0].includes('UNSAFE_componentWillReceiveProps') &&
        args[0].includes('OperationContainer')
      ) {
        return;
      }
      originalConsoleError(...args);
    };

    setMounted(true);
    
    // Add custom styles to fix Swagger UI rendering
    const style = document.createElement('style');
    style.innerHTML = `
      .swagger-ui { visibility: visible; }
      .swagger-ui .opblock { margin-bottom: 15px; }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Restore original console.error
      console.error = originalConsoleError;
      document.head.removeChild(style);
    };
  }, []);

  if (!mounted) {
    return <div className="text-center text-blue-200 p-4">Loading API documentation...</div>;
  }

  return (
    <SwaggerUIWrapper
      url="/api/docs"
      docExpansion="list"
      defaultModelsExpandDepth={-1}
      deepLinking={true}
      filter={true}
      syntaxHighlight={{
        theme: 'agate',
      }}
      supportedSubmitMethods={['get', 'post', 'put', 'delete']}
    />
  );
}

export default function ApiDocs() {
  return (
    <div className="api-docs-container p-4 max-w-6xl mx-auto pb-20">
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-lg border border-blue-800 mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          API Documentation
        </h1>
        <p className="text-center text-blue-200 mb-4">
          Welcome to the Minecraft Bingo API documentation. This API provides endpoints for managing
          game sessions, players, and game state.
        </p>
        <div className="text-center text-blue-200">
          <p className="mb-2">Base URL: <code className="bg-blue-900/50 px-2 py-1 rounded">https://api.minecraftbingo.com/v1</code></p>
          <p>API Version: <code className="bg-blue-900/50 px-2 py-1 rounded">1.0.0</code></p>
        </div>
      </div>
      
      <div id="swagger-ui" className="swagger-ui">
        <SwaggerUIContainer />
      </div>
    </div>
  );
}
