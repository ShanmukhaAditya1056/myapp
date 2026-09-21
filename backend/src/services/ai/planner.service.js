const { generateAIResponse } = require('./ai.service');

async function createDailyPlan(user, tasks, routines) {
  const prompt = `
  You are LIFEOS AI, an intelligent daily planner.
  User wake time: ${user.wakeTime}
  User sleep time: ${user.sleepTime}
  
  Please schedule the following tasks and routines:
  Tasks: ${JSON.stringify(tasks)}
  Routines: ${JSON.stringify(routines)}
  
  Provide a JSON schedule output with an array of activities.
  Format: { "plan": [{ "time": "06:15", "activity": "Wake up", "type": "routine" }] }
  `;

  try {
    const responseText = await generateAIResponse([
      { role: 'system', content: 'You output only valid JSON.' },
      { role: 'user', content: prompt }
    ]);
    
    // Parse the JSON (safely extracting it if markdown formatting is present)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Planner Error:', error);
    throw new Error('Failed to generate daily plan.');
  }
}

module.exports = { createDailyPlan };
