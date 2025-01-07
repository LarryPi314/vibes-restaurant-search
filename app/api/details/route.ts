import model from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');
    const prompt = `${query}
    You are a creative writer. 
    Your task is to write a two-sentence exciting 
    description of what the user asked for, 
    describing the theme of restaurants that are returned.`;

    try {
        const result = await model.generateContent(prompt)
        const response = result.response;
        const output = response.text();
        return NextResponse.json({ output })
    } catch (error) {
        console.error(error)
    }
}