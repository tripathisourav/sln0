import express from 'express'
import agent from '../agents/code.agent.js';

const agentRouter = express.Router();

agentRouter.post("/invoke", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await agent.invoke({ messages: [{
            role: "user",
            content: message
        }] });
        res.json({ response });
    } catch (error) {
        console.error("Agent invocation failed:", error);
        res.status(500).json({
            error: error.message || "Failed to invoke agent"
        });
    }
});

export default agentRouter