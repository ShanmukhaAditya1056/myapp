const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'placeholder_key_to_prevent_crash',
});

async function generateAIResponse(messages, model = 'gpt-4') {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('AI is temporarily unavailable.');
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || model,
      messages: messages,
      temperature: 0.7,
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('AI processing failed.');
  }
}

module.exports = { generateAIResponse };
