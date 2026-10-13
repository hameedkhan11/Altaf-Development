// app/api/cloudinary/resources/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// This administrative endpoint is not called by the public site.
// Do not expose Cloudinary asset inventories or incur API costs anonymously.
function authorized(request: NextRequest): boolean {
  const token = process.env.CLOUDINARY_RESOURCES_API_TOKEN;
  return Boolean(token && request.headers.get('authorization') === `Bearer ${token}`);
}

const safeFolder = (folder: unknown): string =>
  typeof folder === 'string' && /^[a-zA-Z0-9/_-]{1,100}$/.test(folder) ? folder : 'photos';

const safeMax = (count: unknown): number => {
  const n = Number(count);
  return Number.isFinite(n) ? Math.max(1, Math.min(100, Math.floor(n))) : 50;
};

// Configure Cloudinary (make sure to set these environment variables)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const folder = safeFolder(body?.folder);
    const maxResults = safeMax(body?.maxResults);
    const sortBy = ['created_at', 'public_id', 'bytes'].includes(body?.sortBy) ? body.sortBy : 'created_at';
    const sortOrder = body?.sortOrder === 'asc' ? 'asc' : 'desc';

    // Search for resources in the specified folder
    const searchExpression = folder ? `folder:${folder}` : '';
    
    const result = await cloudinary.search
      .expression(searchExpression)
      .sort_by(sortBy, sortOrder)
      .max_results(maxResults)
      .with_field('context')
      .with_field('tags')
      .execute();

    return NextResponse.json({
      resources: result.resources,
      total_count: result.total_count,
      next_cursor: result.next_cursor,
    });

  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary' },
      { status: 500 }
    );
  }
}

// Alternative method if you prefer using resource listing
export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const folder = safeFolder(searchParams.get('folder'));
    const maxResults = safeMax(searchParams.get('maxResults'));

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: maxResults,
      context: true,
      tags: true,
    });

    return NextResponse.json({
      resources: result.resources,
      total_count: result.total_count,
      next_cursor: result.next_cursor,
    });

  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary' },
      { status: 500 }
    );
  }
}