import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Ininitalise a generative model
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export default model