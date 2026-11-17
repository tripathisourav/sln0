import express from 'express'
import agent from '../agents/code.agent.js';

const agentRouter = express.Router();

agentRouter.post("/invoke", async (req, res) => {
    try {
        const { message, projectId } = req.body;

        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        const response = await agent.stream(
            {
                messages: [{
                    role: "user",
                    content: message
                }]
            },
            {
                context: { projectId },
                streamMode: "custom"
            }
        );

        for await (const chunk of response) {
            console.log(chunk);

            res.write(
                `data: ${JSON.stringify(chunk)}\n\n`
            );
        }

        // SSE stream ko properly close karo
        res.end();



        

    } catch (error) {
        console.error("Agent invocation failed:", error);

        if (res.headersSent) {
            if (!res.destroyed && !res.writableEnded) {
                res.write(
                    `event: error\ndata: ${JSON.stringify({
                        error: error.message || "Agent invocation failed"
                    })}\n\n`
                );

                res.end();
            }
        } else {
            res.status(500).json({
                error: error.message || "Agent invocation failed"
            });
        }
    }
});




export default agentRouter