import { getLevel, checkSecret } from "@/lib/levels";

export async function POST(request) {
  try {
    const { levelId, messages } = await request.json();

    const level = getLevel(levelId);
    if (!level) {
      return Response.json({ error: "Invalid level" }, { status: 400 });
    }

    // Build the messages array for OpenRouter
    const apiMessages = [
      { role: "system", content: level.systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/empowerment-ai/prompt-injection-playground",
          "X-Title": "Prompt Injection Playground",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return Response.json(
        { error: "AI model request failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.choices?.[0]?.message?.content || "No response generated.";

    // Check if the secret was leaked in the response
    const secretLeaked = checkSecret(levelId, assistantMessage);

    return Response.json({
      message: assistantMessage,
      secretLeaked,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
