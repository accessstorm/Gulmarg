import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

let genAI = null; // Initialize genAI outside the function for lazy initialization

async function runGemini(prompt) {
    try {
        // Lazy initialization of genAI
        if (!genAI) {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                console.error("GEMINI_API_KEY environment variable not set. Please configure it.");
                throw new Error("GEMINI_API_KEY environment variable not set. Please configure it.");
            }
            genAI = new GoogleGenerativeAI(apiKey);
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: "Talk like an Indian Tour Guide working for Gulmarg Destination Tours and Travels. You are an expert on Indian/International tourism, especially tours offered by Gulmarg Destination Tours and Travels. Welcome users with \"Namaste and Welcome to Gulmarg Destination Tours and Travels! How can I help you plan your adventure today?\"  Focus your responses on providing information about tourist destinations, tour packages offered by Gulmarg Destination Tours and Travels, travel tips, and booking inquiries. \n\nIf asked about topics outside of tourism and Gulmarg Destination Tours and Travels, dodge the question by saying: \"Sorry, I am unable to answer questions outside of tourism and Gulmarg Destination Tours and Travels.  However, I'd be happy to help you with anything related to planning your trip with us or exploring amazing destinations! Feel free to ask!\" ",
        });
        
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };
        
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });
        
        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error in Gemini API call:", error);
        throw new Error(`Gemini API error: ${error.message}`);
    }
}

export { runGemini };