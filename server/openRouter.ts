import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Sandler-style sales assistant using Perplexity Sonar
export async function generateSalesResponse(
  userMessage: string,
  conversationHistory: Array<{role: string, content: string}> = []
) {
  const systemPrompt = `You are an enterprise sales assistant for Fusion Data Co., a cutting-edge marketing automation platform. Use the Sandler Sales methodology:

1. COLLECT PAIN POINTS: Ask probing questions to uncover business challenges
2. QUALIFY: Understand their current situation, decision-making process, and budget
3. OFFER SOLUTIONS: Present specific Fusion Data Co. solutions that address their pain
4. CONNECT WITH TEAM: If issues aren't resolved, connect them with Robert Yeager (CEO) or Mat Mercado (Operations)

COMPANY OVERVIEW:
- Fusion Data Co. provides enterprise-level marketing automation tools for small businesses
- White-label CRM platform with lead generation, automated social media, newsletters, e-commerce ready
- Proprietary spider web deployment that captures all leads into native PostgreSQL database
- Led by Robert Yeager (CEO) - expert in lead generation with $100M+ in real estate results
- Mat Mercado (Operations Administrator) - logistics expert, cornerstone of daily operations

RESPONSE STYLE:
- Engaging and empathetic 
- High-impact questions that uncover pain
- Professional but conversational
- Focus on business outcomes and ROI
- Always be solution-oriented

When someone needs to speak with the team, provide:
- Robert Yeager (CEO): rob@fusiondataco.com, +1(615)788-2808
- Mat Mercado (Operations): mat@fusiondataco.com`;

  try {
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "perplexity/llama-3.1-sonar-large-128k-online",
        messages: messages,
        temperature: 0.8,
        max_tokens: 800,
        response_format: { type: "text" }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://fusiondataco.com",
          "X-Title": "Fusion Data Co Enterprise Assistant",
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error('No response from sales assistant');
    }
  } catch (error) {
    console.error('Error generating sales response:', error);
    throw error;
  }
}

export async function generateContent(
  prompt: string, 
  model: string = 'anthropic/claude-3-opus:beta',
  options: {
    temperature?: number;
    max_tokens?: number;
    system_prompt?: string;
  } = {}
) {
  try {
    const { temperature = 0.7, max_tokens = 1000, system_prompt = "You are an expert marketing copywriter with years of experience in writing engaging social media content." } = options;
    
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: model,
        messages: [
          {
            role: "system",
            content: system_prompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: max_tokens,
        response_format: { type: "text" }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://fusiondataco.com",
          "X-Title": "Fusion Data Co Marketing Platform",
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error('No content returned from OpenRouter');
    }
  } catch (error) {
    console.error('Error generating content with OpenRouter:', error);
    throw error;
  }
}

export async function generateSocialCaptions(
  goal: string,
  businessType: string,
  tone: string,
  platforms: string[],
  additionalContext: string = "",
  model: string = 'anthropic/claude-3-opus:beta'
) {
  const systemPrompt = `You are an expert social media copywriter who specializes in creating engaging content for businesses. 
Your task is to create compelling, concise, and platform-appropriate posts.`;

  const prompt = `Create ${platforms.length} social media posts for a ${businessType} business.
Goal of the campaign: ${goal}
Tone to use: ${tone}
Platforms: ${platforms.join(', ')}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

For each platform, generate a caption that:
1. Is appropriate for the character limits and style of that platform
2. Has the right tone (${tone})
3. Includes hashtags where appropriate
4. Is engaging and likely to generate interaction
5. Accomplishes the stated goal (${goal})

Format your response as plain text with clear headings for each platform.`;

  try {
    const content = await generateContent(prompt, model, { 
      temperature: 0.8, 
      system_prompt: systemPrompt 
    });
    
    // Process the response to structure it into separate captions by platform
    const platformCaptions: Record<string, string> = {};
    
    // Basic parsing - this is a simplified version. 
    // In a real implementation, you might want more robust parsing
    platforms.forEach(platform => {
      const regex = new RegExp(`(?:${platform}:|For ${platform}:)([\\s\\S]*?)(?=(?:For [A-Za-z]+:|${platforms.find(p => p !== platform)}:|$))`, 'i');
      const match = content.match(regex);
      if (match && match[1]) {
        platformCaptions[platform] = match[1].trim();
      } else {
        platformCaptions[platform] = ""; // No specific content found for this platform
      }
    });
    
    return platformCaptions;
  } catch (error) {
    console.error('Error generating social captions:', error);
    throw error;
  }
}

export async function generateEmailContent(
  emailType: string,
  businessType: string,
  subject: string,
  contentBrief: string,
  model: string = 'anthropic/claude-3-opus:beta'
) {
  const systemPrompt = `You are an expert email copywriter specializing in marketing automation. 
Your task is to create engaging email content that drives conversions and provides value to recipients.`;

  const prompt = `Create a marketing email for a ${businessType} business.
Email type: ${emailType}
Subject line: ${subject}
Content brief: ${contentBrief}

Please structure your response with:
1. A compelling subject line (if different than provided)
2. The main email body with proper formatting
3. A clear call-to-action

Format your response as HTML that can be used directly in an email sending system. Use appropriate styling.`;

  try {
    return await generateContent(prompt, model, { 
      temperature: 0.7, 
      system_prompt: systemPrompt 
    });
  } catch (error) {
    console.error('Error generating email content:', error);
    throw error;
  }
}

export const AVAILABLE_MODELS = [
  { id: "anthropic/claude-3-opus:beta", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "anthropic/claude-3-sonnet:beta", name: "Claude 3 Sonnet", provider: "Anthropic" },
  { id: "anthropic/claude-3-haiku:beta", name: "Claude 3 Haiku", provider: "Anthropic" },
  { id: "mistralai/mistral-large-latest", name: "Mistral Large", provider: "Mistral AI" },
  { id: "perplexity/llama-3.1-sonar-large-128k-online", name: "Perplexity Sonar Large 128K (Online)", provider: "Perplexity" },
  { id: "perplexity/llama-3.1-sonar-small-128k-online", name: "Perplexity Sonar Small 128K (Online)", provider: "Perplexity" },
  { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B", provider: "Meta" },
  { id: "google/gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
];