declare module 'swagger-ui-react' {
  import React from 'react';
  
  interface SwaggerUIProps {
    spec?: SwaggerSpec;
    url?: string;
    layout?: string;
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
    docExpansion?: 'list' | 'full' | 'none';
    filter?: boolean | string;
    validatorUrl?: string | null;
    onComplete?: () => void;
    requestInterceptor?: (req: Request) => Request | Promise<Request>;
    responseInterceptor?: (res: Response) => Response | Promise<Response>;
    showMutatedRequest?: boolean;
    supportedSubmitMethods?: string[];
    deepLinking?: boolean;
    presets?: Array<() => void>;
    plugins?: Array<() => void>;
    showExtensions?: boolean;
    syntaxHighlight?: object;
  }
  
  // OpenAPI/Swagger specification interface
  interface SwaggerSpec {
    $ref?: string;
    openapi?: string;
    info?: {
      title?: string;
      version?: string;
      description?: string;
      [key: string]: unknown;
    };
    servers?: Array<{
      url: string;
      description?: string;
      [key: string]: unknown;
    }>;
    paths?: Record<string, PathItem>;
    components?: {
      schemas?: Record<string, SchemaObject>;
      responses?: Record<string, ResponseObject>;
      parameters?: Record<string, ParameterObject>;
      requestBodies?: Record<string, RequestBodyObject>;
      [key: string]: unknown;
    };
    tags?: Array<{
      name: string;
      description?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown; // Allow other OpenAPI properties
  }
  
  interface PathItem {
    get?: OperationObject;
    put?: OperationObject;
    post?: OperationObject;
    delete?: OperationObject;
    options?: OperationObject;
    head?: OperationObject;
    patch?: OperationObject;
    parameters?: Array<ParameterObject>;
    [key: string]: unknown;
  }
  
  interface OperationObject {
    responses: Record<string, ResponseObject>;
    tags?: string[];
    summary?: string;
    description?: string;
    parameters?: Array<ParameterObject>;
    requestBody?: RequestBodyObject;
    [key: string]: unknown;
  }
  
  interface SchemaObject {
    type?: string;
    properties?: Record<string, SchemaObject>;
    items?: SchemaObject;
    required?: string[];
    $ref?: string;
    [key: string]: unknown;
  }
  
  interface ResponseObject {
    description: string;
    content?: Record<string, { schema: SchemaObject }>;
    $ref?: string;
    [key: string]: unknown;
  }
  
  interface ParameterObject {
    name: string;
    in: string;
    description?: string;
    required?: boolean;
    schema?: SchemaObject;
    $ref?: string;
    [key: string]: unknown;
  }
  
  interface RequestBodyObject {
    content: Record<string, { schema: SchemaObject }>;
    description?: string;
    required?: boolean;
    $ref?: string;
    [key: string]: unknown;
  }
  
  const SwaggerUI: React.FC<SwaggerUIProps>;
  
  export default SwaggerUI;
} 