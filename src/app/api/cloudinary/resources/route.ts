// app/api/cloudinary/resources/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (make sure to set these environment variables)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { folder = 'photos', maxResults = 100, sortBy = 'created_at', sortOrder = 'desc' } = body;

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
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'photos';
    const maxResults = parseInt(searchParams.get('maxResults') || '100');

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