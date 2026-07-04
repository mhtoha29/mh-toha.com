import { TOHA_PROFILE, matchKB } from '@/lib/toha-knowledge';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUser?.content?.trim()) {
      return Response.json({ error: 'Empty message' }, { status: 400 });
    }

    // Claude API when key is configured
    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: TOHA_PROFILE,
          messages: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.content?.[0]?.text;
        if (text) return Response.json({ reply: text, source: 'ai' });
      }
      // fall through to KB on API failure
    }

    // Local knowledge-base fallback — instant, free, works without any key
    return Response.json({ reply: matchKB(lastUser.content), source: 'kb' });
  } catch {
    return Response.json(
      { reply: 'Something went wrong on my end — please try again, or reach Toha directly on WhatsApp: +880 1716-102136.', source: 'error' },
      { status: 200 },
    );
  }
}
