const aiService = require("../services/ai.services")

module.exports.getResponse = async (req, res) => {
    try {
        const code = req.body.code;

        // Validation
        if (!code || code.trim() === "") {
            return res.status(400).json({ error: "Code is required" });
        }

        if (code.length > 10000) {
            return res.status(400).json({ error: "Code is too large (max 10000 characters)" });
        }

        // Get AI response
        const response = await aiService(code);

        // Send structured response
        res.status(200).json({ 
            success: true,
            review: response 
        });

    } catch (error) {
        console.error("Error in getResponse controller:", error);
        res.status(500).json({ 
            error: "Failed to analyze code. Please try again.",
            details: error.message 
        });
    }
}