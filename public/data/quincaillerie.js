// 1. Get the AI response text
const aiText = $('Message a model').first().json.message.content[0].text;

// 2. Extract the JSON block from the AI's markdown response
const jsonMatch = aiText.match(/```json\s*([\s\S]*?)```/) || aiText.match(/(\{[\s\S]*\})/);
const newTool = jsonMatch ? jsonMatch[1].trim() : null;

if (!newTool) throw new Error('No JSON found in AI output');

// 3. Parse it to extract the tool name (for debugging)
const parsed = JSON.parse(newTool);

return [{
  json: {
    newToolBlock: newTool,
    toolName: parsed.name || 'unknown-tool'
  }
}];