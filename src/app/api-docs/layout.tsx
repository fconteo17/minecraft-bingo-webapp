'use client';

import React from 'react';

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
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
          display: none;
        }

        .swagger-ui .scheme-container {
          background: linear-gradient(to right, rgba(30, 58, 138, 0.3), rgba(49, 46, 129, 0.3));
          color: #e2e8f0;
          box-shadow: none;
          border: 1px solid #1e40af;
          border-radius: 0.5rem;
          margin: 0 0 1rem 0;
          padding: 1rem;
        }

        .swagger-ui .btn {
          background: rgba(30, 58, 138, 0.5);
          color: #93c5fd;
          border: 1px solid #1e40af;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }

        .swagger-ui .btn:hover {
          background: rgba(30, 58, 138, 0.7);
          border-color: #2563eb;
        }

        .swagger-ui .opblock {
          background: rgba(30, 58, 138, 0.2);
          border: 1px solid #1e40af;
          border-radius: 0.5rem;
          margin: 0 0 0.5rem 0;
        }

        .swagger-ui .opblock .opblock-summary {
          border-color: #1e40af;
        }

        .swagger-ui .opblock .opblock-summary-method {
          background: rgba(30, 58, 138, 0.5);
          color: #93c5fd;
          border-radius: 0.375rem;
        }

        .swagger-ui .opblock .opblock-summary-description {
          color: #93c5fd;
        }

        .swagger-ui .opblock-tag {
          border: none;
          color: #93c5fd;
        }

        .swagger-ui .opblock-tag:hover {
          background: rgba(30, 58, 138, 0.3);
          border-radius: 0.5rem;
        }

        .swagger-ui input[type="text"] {
          background: rgba(30, 58, 138, 0.2);
          border: 1px solid #1e40af;
          color: #e2e8f0;
        }

        .swagger-ui select {
          background: rgba(30, 58, 138, 0.2);
          border: 1px solid #1e40af;
          color: #e2e8f0;
        }

        .swagger-ui textarea {
          background: rgba(30, 58, 138, 0.2);
          border: 1px solid #1e40af;
          color: #e2e8f0;
        }

        .swagger-ui .markdown p, 
        .swagger-ui .markdown pre,
        .swagger-ui .renderedMarkdown p {
          color: #93c5fd;
        }

        .swagger-ui table thead tr td, 
        .swagger-ui table thead tr th {
          color: #93c5fd;
          border-bottom: 1px solid #1e40af;
        }

        .swagger-ui .response-col_status {
          color: #93c5fd;
        }

        .swagger-ui .response-col_description {
          color: #93c5fd;
        }

        .swagger-ui .responses-inner h4,
        .swagger-ui .responses-inner h5 {
          color: #93c5fd;
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
        .swagger-ui .info li,
        .swagger-ui .info p,
        .swagger-ui .info table {
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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
          color: #cbd5e0;
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
          background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23e2e8f0' d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E")
            50% no-repeat;
        }

        /* Parameters */
        .swagger-ui .parameter__name {
          color: #e2e8f0;
          font-weight: 500;
        }
        .swagger-ui .parameter__type {
          color: #cbd5e0;
        }
        .swagger-ui .parameter__in {
          color: #cbd5e0;
        }
        .swagger-ui .parameter__deprecated {
          color: #e53e3e;
        }

        /* Schema */
        .swagger-ui .prop-format {
          color: #cbd5e0;
        }
        .swagger-ui .prop-type {
          color: #4fd1c5;
        }

        /* Inputs and buttons */
        .swagger-ui input[type='text'],
        .swagger-ui input[type='password'],
        .swagger-ui input[type='search'],
        .swagger-ui input[type='email'],
        .swagger-ui textarea {
          background-color: #1a202c;
          color: #e2e8f0;
          border-color: #4a5568;
          padding: 8px;
          border-radius: 4px;
        }
        .swagger-ui input[type='text']:focus,
        .swagger-ui input[type='password']:focus,
        .swagger-ui input[type='search']:focus,
        .swagger-ui input[type='email']:focus,
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

        /* Request body and schema text */
        .swagger-ui .opblock-section-header > label {
          color: #f7fafc;
        }
        .swagger-ui .opblock-section-header h4 {
          color: #f7fafc;
        }
        .swagger-ui .table-container .opblock-description-wrapper p,
        .swagger-ui .opblock-description-wrapper p,
        .swagger-ui .opblock-external-docs-wrapper p,
        .swagger-ui .opblock-title_normal p {
          color: #e2e8f0;
        }
        .swagger-ui .model-box {
          background-color: #2d3748;
        }
        .swagger-ui section.models .model-container {
          background-color: #2d3748;
        }
        .swagger-ui .model-box-control:focus,
        .swagger-ui .models-control:focus {
          outline: none;
        }
        .swagger-ui section.models h4 {
          color: #f7fafc;
        }
        .swagger-ui .renderedMarkdown p {
          color: #e2e8f0;
        }
        .swagger-ui select {
          color: #f7fafc;
        }
        .swagger-ui div,
        .swagger-ui span {
          color: #e2e8f0;
        }
        .swagger-ui .markdown p,
        .swagger-ui .markdown pre,
        .swagger-ui .renderedMarkdown p,
        .swagger-ui .renderedMarkdown pre {
          color: #e2e8f0;
          margin: 0;
        }
        .swagger-ui .btn {
          color: #f7fafc;
        }
        .swagger-ui .example {
          color: #e2e8f0;
        }
        .swagger-ui textarea {
          color: #e2e8f0;
        }
      `}</style>
      {children}
    </div>
  );
}
