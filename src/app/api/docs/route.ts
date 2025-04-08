import { NextResponse } from 'next/server';
import swaggerSpec from '../../../../swagger.json';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
