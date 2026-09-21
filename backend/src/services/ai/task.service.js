const { generateAIResponse } = require('./ai.service');

async function parseNaturalLanguageTask(userInput) {
  const prompt = `
  You are an AI task parser for LIFEOS.
  Extract the task details from the user's natural language input: "${userInput}"
  
  Return ONLY a valid JSON object with these exact keys:
  - title (string): The name of the task.
  - date (string, optional): Format YYYY-MM-DD. Assume current year if not specified. If "tomorrow", calculate the date based on today's date (assume today is the date of execution).
  - time (string, optional): Format HH:MM (24-hour).
  - durationMinutes (number, optional): Best estimate for this task if not specified. Default 30.
  - priority (string): "low", "normal", "high", or "critical". Default "normal".
  - category (string): e.g., "study", "work", "routine", "general".
  `;

  try {
    const responseText = await generateAIResponse([
      { role: 'system', content: 'You are a precise data extractor. Output only valid JSON without markdown wrapping.' },
      { role: 'user', content: prompt }
    ]);
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error('NLP Parse Error:', error);
    throw new Error('Failed to parse task from natural language.');
  }
}

module.exports = { parseNaturalLanguageTask };
