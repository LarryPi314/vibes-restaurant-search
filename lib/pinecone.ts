import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable');
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export const restaurantIndex = pinecone.index('defaultindex');

export default pinecone;