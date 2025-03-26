'use client';

import React from 'react';

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="api-docs-wrapper">
      <style jsx global>{`
        /* Dark theme for Swagger UI */
        .swagger-ui {
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
        }
        
        /* Fix for the white header */
        .swagger-ui .topbar {
          background-color: #1a202c;
          border-bottom: 1px solid #4a5568;
        }
        .swagger-ui .topbar .download-url-wrapper .select-label {
          color: #e2e8f0;
        }
        .swagger-ui .topbar .download-url-wrapper input[type=text] {
          background: #2d3748;
          color: #e2e8f0;
          border: 1px solid #4a5568;
        }
        .swagger-ui .topbar .download-url-wrapper .download-url-button {
          background: #4299e1;
          color: white;
          border-color: #2b6cb0;
        }
        .swagger-ui .scheme-container {
          background-color: #1a202c;
          color: #e2e8f0;
          box-shadow: none;
          border-bottom: 1px solid #4a5568;
        }
        .swagger-ui .btn.select-label {
          background-color: #2d3748;
          color: #e2e8f0;
          border-color: #4a5568;
        }
        .swagger-ui .servers-title {
          color: #e2e8f0;
        }
        .swagger-ui .servers > label {
          color: #e2e8f0;
        }
        .swagger-ui select {
          background-color: #2d3748;
          color: #e2e8f0;
          border-color: #4a5568;
        }
        .swagger-ui option {
          background-color: #2d3748;
          color: #e2e8f0;
        }
        
        /* Top header and info section */
        .swagger-ui .info {
          margin: 20px 0;
          background-color: #1a202c; /* Dark background for info section */
          padding: 15px;
          border-radius: 6px;
        }
        .swagger-ui .info .title {
          color: #f0f0f0;
        }
        .swagger-ui .info .title small {
          background-color: #4299e1; /* Blue badge background */
          color: white;
        }
        .swagger-ui .info .title small.version-stamp {
          background-color: #38a169; /* Green badge for version */
        }
        .swagger-ui .info .title small pre {
          background-color: transparent;
          color: white;
          font-family: 'Inter', sans-serif;
        }
        .swagger-ui .info li, .swagger-ui .info p, .swagger-ui .info table {
          color: #e2e8f0;
        }
        .swagger-ui .info a {
          color: #4299e1; /* Blue links */
        }
        .swagger-ui .info a:hover {
          color: #63b3ed;
        }
        
        /* Main sections and tags */
        .swagger-ui .opblock-tag {
          color: #f0f0f0;
          border-bottom: 1px solid #4a5568;
          margin-top: 24px;
        }
        .swagger-ui .opblock-tag:hover {
          background-color: #2d3748;
          transition: all 0.3s;
        }
        
        /* Endpoint blocks */
        .swagger-ui .opblock {
          background: #2d3748;
          border-radius: 6px;
          border: 1px solid #4a5568;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 16px;
        }
        .swagger-ui .opblock .opblock-summary {
          border-color: #4a5568;
          padding: 8px;
        }
        .swagger-ui .opblock .opblock-summary-method {
          border-radius: 4px;
          font-weight: bold;
        }
        .swagger-ui .opblock-description-wrapper p {
          color: #e2e8f0;
        }
        .swagger-ui .opblock .opblock-section-header {
          background: #374151;
          border-color: #4a5568;
        }
        .swagger-ui .opblock .opblock-section-header h4 {
          color: #e2e8f0;
        }
        .swagger-ui .opblock-body pre {
          background-color: #1a202c;
          border-radius: 4px;
        }
        .swagger-ui .opblock .opblock-summary-description {
          color: #a0aec0;
        }
        
        /* Tables */
        .swagger-ui table {
          background-color: #2d3748;
        }
        .swagger-ui table tbody tr td {
          border-color: #4a5568;
          color: #e2e8f0;
        }
        .swagger-ui .response-col_status {
          color: #e2e8f0;
        }
        .swagger-ui table thead tr td,
        .swagger-ui table thead tr th {
          color: #e2e8f0;
          border-color: #4a5568;
        }
        
        /* Models */
        .swagger-ui section.models {
          border-color: #4a5568;
        }
        .swagger-ui section.models.is-open h4 {
          border-color: #4a5568;
        }
        .swagger-ui section.models .model-container,
        .swagger-ui section.models {
          background: #2d3748;
        }
        .swagger-ui .model-title {
          color: #e2e8f0;
        }
        .swagger-ui .model {
          color: #e2e8f0;
        }
        .swagger-ui .model-toggle:after {
          background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23e2e8f0' d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E") 50% no-repeat;
        }
        
        /* Parameters */
        .swagger-ui .parameter__name {
          color: #e2e8f0;
          font-weight: 500;
        }
        .swagger-ui .parameter__type {
          color: #a0aec0;
        }
        .swagger-ui .parameter__in {
          color: #a0aec0;
        }
        .swagger-ui .parameter__deprecated {
          color: #e53e3e;
        }
        
        /* Schema */
        .swagger-ui .prop-format {
          color: #a0aec0;
        }
        .swagger-ui .prop-type {
          color: #38b2ac;
        }
        
        /* Inputs and buttons */
        .swagger-ui input[type=text],
        .swagger-ui input[type=password],
        .swagger-ui input[type=search],
        .swagger-ui input[type=email],
        .swagger-ui textarea {
          background-color: #1a202c;
          color: #e2e8f0;
          border-color: #4a5568;
          padding: 8px;
          border-radius: 4px;
        }
        .swagger-ui input[type=text]:focus,
        .swagger-ui input[type=password]:focus,
        .swagger-ui input[type=search]:focus,
        .swagger-ui input[type=email]:focus,
        .swagger-ui textarea:focus {
          border-color: #4299e1;
        }
        .swagger-ui .btn {
          border-radius: 4px;
          font-weight: 500;
        }
        .swagger-ui .btn.execute {
          background-color: #4299e1;
          color: white;
          border-color: #2b6cb0;
        }
        .swagger-ui .btn.try-out__btn {
          background-color: #2d3748;
          color: #e2e8f0;
          border-color: #4a5568;
        }
        .swagger-ui .btn.authorize {
          background-color: #38a169;
          color: white;
          border-color: #2f855a;
        }
        
        /* Schema properties */
        .swagger-ui .json-schema-form-item {
          background-color: #2d3748;
          color: #e2e8f0;
        }
        
        /* Response section */
        .swagger-ui .responses-table .response {
          color: #e2e8f0;
        }
        .swagger-ui .responses-inner {
          padding: 12px;
        }
        .swagger-ui .response-col_description__inner div {
          margin-bottom: 8px;
        }
        
        /* Fix for hydration */
        body {
          overflow-y: auto;
        }
        
        /* Fix code block coloring */
        .swagger-ui .microlight {
          color: #e2e8f0;
          background-color: #1a202c;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          padding: 8px;
          border-radius: 4px;
        }
        
        /* Fix for OpenAPI badges */
        .swagger-ui .info .title small.version-stamp,
        .swagger-ui .info .title small:not(.version-stamp) {
          background-color: #4299e1 !important;
          color: white !important;
        }
        .swagger-ui .info .title small.version-stamp {
          background-color: #38a169 !important;
        }
      `}</style>
      {children}
    </div>
  );
} 