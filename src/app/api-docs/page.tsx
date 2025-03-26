'use client';

import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  // Fix for hydration issues with Swagger UI in Next.js
  useEffect(() => {
    // This forces a client-side only render
    const style = document.createElement('style');
    style.innerHTML = '.swagger-ui { visibility: visible }';
    document.head.appendChild(style);
  }, []);

  // Fetch the swagger spec dynamically from our API endpoint
  return (
    <div className="api-docs-container p-4 max-w-6xl mx-auto pb-20">
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-lg border border-blue-800 mb-8">
        <h1 className="text-3xl font-bold mb-3">Minecraft Bingo API Documentation</h1>
        <p className="text-gray-300 mb-3">
          Complete API reference for integrating with the Minecraft Bingo game system.
          Supports both team-based and free-for-all (solo) game modes.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-blue-900/40 px-4 py-2 rounded-md border border-blue-700">
            <span className="font-mono text-sm text-blue-200">Base URL: </span>
            <span className="font-mono text-white">https://minecraft-bingo-webapp.vercel.app/api</span>
          </div>
          <div className="bg-green-900/40 px-4 py-2 rounded-md border border-green-700">
            <span className="font-mono text-sm text-green-200">Version: </span>
            <span className="font-mono text-white">1.0.0</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-blue-300">Team Mode</h3>
          <p className="text-gray-300 mb-2">
            Create games with two competing teams (Red vs Blue) where players work together to complete quests.
          </p>
          <div className="text-gray-400 text-sm">
            <code className="bg-gray-900 text-blue-300 p-1 rounded">gameType: &quot;Teams&quot;</code>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Solo Mode</h3>
          <p className="text-gray-300 mb-2">
            Create free-for-all games where individual players compete against each other.
          </p>
          <div className="text-gray-400 text-sm">
            <code className="bg-gray-900 text-purple-300 p-1 rounded">gameType: &quot;Solo&quot;</code>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-green-300">Raw Spec</h3>
          <p className="text-gray-300 mb-2">
            Access the raw OpenAPI specification for use in other tools.
          </p>
          <a 
            href="/api/docs" 
            target="_blank" 
            className="inline-block mt-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
          >
            JSON Spec
          </a>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">How to Use This Documentation</h2>
        <div className="space-y-2 text-gray-300">
          <p>This interactive documentation provides details about all available API endpoints:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Expand any endpoint to see details about request parameters and response formats</li>
            <li>Use the &quot;Try it out&quot; button to test API calls directly from the browser</li>
            <li>Copy example JSON for use in your own applications</li>
          </ul>
        </div>
      </div>
      
      <div className="swagger-ui-container relative border border-gray-700 rounded-lg overflow-hidden">
        <SwaggerUI 
          url="/api/docs" 
          docExpansion="list" 
          defaultModelsExpandDepth={-1}
          deepLinking={true}
          filter={true}
          syntaxHighlight={{ 
            theme: 'agate' 
          }}
          supportedSubmitMethods={['get', 'post', 'put', 'delete']}
        />
        <style jsx global>{`
          .swagger-ui {
            visibility: hidden;
          }
        `}</style>
      </div>
    </div>
  );
} 