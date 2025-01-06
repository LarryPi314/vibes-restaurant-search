import { NextResponse } from 'next/server';
import { getEmbedding } from '@/lib/openai';
import { restaurantIndex } from '@/lib/pinecone';
import { SearchResult } from '@/lib/types';

import pc from '@/lib/pinecone';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const model = 'multilingual-e5-large';

    const queryEmbedding = await pc.inference.embed(
      model,
      [query],
      { inputType: 'query' }
    );

    if (!queryEmbedding[0].values) {
      throw new Error('Query embedding values are undefined');
    }
    
    const results = await restaurantIndex.namespace("example-namespace").query({
      topK: 5,
      vector: queryEmbedding[0].values,
      includeValues: false,
      includeMetadata: true
    });

    const searchResults: SearchResult[] = results.matches.map((match) => ({
      restaurant: match.metadata as any,
      score: match.score as number // TODO add score function info: match.score,
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