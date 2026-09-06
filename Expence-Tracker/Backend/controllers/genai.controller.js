const {GoogleGenAI} = require("@google/genai");

const askToGenAI = async (req, res) => {
    try{
        const {prompt} = req.body;

        console.log("Received prompt:", prompt);

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const response = await ai.models.generateContent({
            model:"gemini-3.8-flash",
            contents:prompt
        })

        res.status(200).json({message:response.text});

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ message: "Failed to generate content" });
    }
}

module.exports = {askToGenAI};