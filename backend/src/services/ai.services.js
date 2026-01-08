const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(code) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: `Act as an expert code reviewer who specializes in multiple programming languages (Python, Java, C, C++, JavaScript).
                    
Your task is to:
1. Analyze the provided code for bugs, inefficiencies, and bad practices
2. Suggest specific improvements with explanations
3. Provide improved code version in the original language
4. Convert the improved code to other languages (if applicable)
5. Calculate time and space complexity
6. Provide learning resources

Format your response as:
## Code Analysis
[Your analysis here]

## Suggestions
[Specific improvements]

## Improved Code
[Code in original language]

## Alternative Languages
[Conversions if requested]

## Complexity Analysis
- Time Complexity: O(?)
- Space Complexity: O(?)

## Learning Resources
[Relevant links]`
                },
                {
                    role: "user",
                    content: `Please review this code:\n\n${code}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        return chatCompletion.choices[0].message.content;

    } catch (error) {
        console.error("Error in AI service:", error);
        throw new Error("Failed to get AI response: " + error.message);
    }
}

module.exports = getResponse;


