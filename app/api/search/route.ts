import { NextResponse } from 'next/server';
import { getEmbedding } from '@/lib/openai';
import { restaurantIndex } from '@/lib/pinecone';
import { SearchResult } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const queryEmbedding = await getEmbedding(query);
    
    const results = await restaurantIndex.query({
      vector: queryEmbedding,
      topK: 10,
      includeMetadata: true,
    });

    const searchResults: SearchResult[] = results.matches.map((match) => ({
      restaurant: match.metadata as any,
      score: match.score,
    }));

    return NextResponse.json({ results: searchResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}