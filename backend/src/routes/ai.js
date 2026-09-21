const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/ai/ai.service');

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Prepend system prompt
    const systemPrompt = { role: 'system', content: 'You are LIFEOS AI, a helpful, strict, and highly organized productivity assistant.' };
    const fullMessages = [systemPrompt, ...messages];

    const aiText = await generateAIResponse(fullMessages);
    res.json({ reply: aiText });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

module.exports = router;
