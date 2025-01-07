import model from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("in post request")
    const { restaurantData } = await req.json();  // Extract the restaurantData from the request body
    const { query, restaurant_name, description, reviews } = restaurantData;  // Destructure the relevant data
    const restaurant_info = description + " " + reviews.join("")
    const prompt = `You are a creative writer. Your task is to write a one sentence exciting and 
    appealing description of a restaurant based on the given information, and 
    how it matches what the user asked for (${query}).
    
    Restaurant Name: ${restaurant_name}
    Restaurant Info: ${restaurant_info}
    
    Match Description:"""`;

    try {
        const result = await model.generateContent(prompt)
        const response = result.response;
        const output = response.text();
        console.log("output from post", output)
        return NextResponse.json({ restaurant_name, output })
    } catch (error) {
        console.error(error)
    }
}

