

export async function explainExpression(expression, result) {


  // The file talks to an Ai model using fetch

  if (!expression || !result) {
    return "Type some Expression like (3 + 5), press =, then ask Ai"
  }

  const key = "Enter your Key";

  if (!key) {
    return "Missing API key"
  }

  //promopt

  const systemPrompt =
    "You are a kind math tutor for absolute beginners. Explain like to a 10-year-old. " +
    "Use 3-7 short bullet steps. Write each step on a new line (line by line, not in one paragraph) Prefer everyday words. Do not invent new numbers." +
    "Explain the order of operations if relevant. End with a one-line recap.";

  // user msg we send

  const userPrompt =
    `Expression: ${expression}\n` +
    `Result: ${result}\n` +
    `Explain simply, in steps, without extra symbols`;

  // request for body

  const body = {
    model: "google/gemini-flash-1.5",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },

      {
        role: "user",
        content: userPrompt,
      }
    ]
  }

  try {

    // HTTP post

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if(!res){
      return "AI request failed. Check your key, model name or networl."
    }

    const data = await res.json();

    const text = data.choices?.[0]?.message?.content?.trim();

    return text || "AI didn't response"
    

  } catch(err){
    return "Couldn't reach AI service right noe, Please try again."
  }
  

}