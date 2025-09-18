import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `You are an AI-powered customer support assistant for HeadStartAI, a platform that helps entrepreneurs and startups launch their businesses successfully. Your role is to provide helpful, accurate, and friendly support to users.

Key guidelines:
- Be professional yet approachable
- Provide clear, actionable advice
- If you don't know something, admit it and offer to help find the answer
- Focus on startup and business-related topics
- Keep responses concise but comprehensive
- Always be encouraging and supportive

You can help with:
- Business planning and strategy
- Product development guidance
- Marketing and growth advice
- Technical questions about the platform
- General startup and entrepreneurship topics`;

export async function POST(req) {
    const data = await req.json();

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
        // Mock response for testing when no API key is available
        const mockResponses = [
            "I'm a mock response! To get real AI responses, please add your OpenAI API key to the .env.local file.",
            "This is a test response. Your message was: '" + data.message + "'",
            "I'm working in mock mode. Add your OpenAI API key to enable real AI responses.",
            "Mock response: I understand you said '" + data.message + "'. Please configure your API key for real responses."
        ];
        
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        
        const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();
                // Simulate streaming by sending the response character by character
                let i = 0;
                const interval = setInterval(() => {
                    if (i < randomResponse.length) {
                        controller.enqueue(encoder.encode(randomResponse[i]));
                        i++;
                    } else {
                        clearInterval(interval);
                        controller.close();
                    }
                }, 50); // 50ms delay between characters
            }
        });

        return new NextResponse(stream);
    }

    // Real OpenAI API call when API key is available
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data.message }
            ],
            stream: true
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of completion) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            controller.enqueue(encoder.encode(content));
                        }
                    }
                } catch (error) {
                    console.error('Streaming error:', error);
                    controller.error(new Error('Streaming error'));
                } finally {
                    controller.close();
                }
            }
        });

        return new NextResponse(stream);

    } catch (error) {
        console.error('Completion error:', error);
        return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}
