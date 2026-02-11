import { getLevel, checkSecret, availableModels, DEFAULT_MODEL } from "@/lib/levels";

export async function POST(request) {
  try {
    const { levelId, messages, apiKey, model } = await request.json();

    if (!apiKey || !apiKey.startsWith("sk-or-")) {
      return Response.json(
        { error: "Valid OpenRouter API key required. Get one free at openrouter.ai" },
        { status: 401 }
      );
    }

    const level = getLevel(levelId);
    if (!level) {
      return Response.json({ error: "Invalid level" }, { status: 400 });
    }

    // Validate model against allowed list
    const allowedIds = availableModels.map((m) => m.id);
    const selectedModel = allowedIds.includes(model) ? model : DEFAULT_MODEL;

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
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/empowerment-ai/prompt-injection-playground",
          "X-Title": "Prompt Injection Playground",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      if (response.status === 401) {
        return Response.json(
          { error: "Invalid API key. Check your OpenRouter key and try again." },
          { status: 401 }
        );
      }
      if (response.status === 402) {
        return Response.json(
          { error: "Insufficient credits on your OpenRouter account." },
          { status: 402 }
        );
      }
      return Response.json(
        { error: "AI model request failed. The selected model may be unavailable — try a different one." },
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
      modelUsed: selectedModel,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
