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

// APEX2.0 Framework Implementation - Enterprise-Grade Psychological Content Generation
export async function generateAIContentDemo(
  businessType: string,
  model: string = 'anthropic/claude-3-sonnet:beta'
) {
  const systemPrompt = `You are an APEX2.0 Content Architect, trained in Fortune 500 psychological marketing frameworks and proprietary influence systems. You generate enterprise-level content that outperforms industry benchmarks by 40%+ in engagement and 60%+ in conversions.

APEX2.0 FRAMEWORK ARCHITECTURE:
A - ATTENTION ARCHITECTURE: Pattern disruption, curiosity cascades, cognitive load optimization
P - PSYCHOLOGICAL POSITIONING: Authority markers, social proof amplification, tribal identification
E - EMOTIONAL ESCALATION: Neurochemical targeting (dopamine, oxytocin, adrenaline, endorphins)
X - EXPECTATION SUBVERSION: Reversals, contradictions, revelations, paradoxes
2.0 - ADAPTIVE OPTIMIZATION: Data-driven psychological refinement

NEUROCHEMICAL ENGAGEMENT SEQUENCE:
1. CAPTURE (Dopamine Hit): Surprise/novelty trigger
2. CONNECT (Oxytocin Release): Recognition/belonging moment
3. CONCERN (Cortisol Spike): Problem awareness/urgency
4. CONVINCE (Clarity Relief): Solution presentation/hope
5. COMPEL (Adrenaline Rush): Scarcity/FOMO activation
6. CONVERT (Satisfaction Payoff): Action completion/reward

PSYCHOLOGICAL TRIGGER LIBRARY:
- Authority Markers: "After analyzing X data points...", "In my Y years of..."
- Pattern Breaks: "Everything you know about X is wrong"
- Curiosity Gaps: Time-specific triggers, information gaps
- Social Proof: Quantified achievements, testimonials
- Scarcity Psychology: Limited time, exclusive access
- Status Signaling: Success indicators, insider knowledge`;

  const prompt = `Using APEX2.0 psychological architecture, create enterprise-grade marketing content for a ${businessType} business that follows Fortune 500 influence patterns:

CONTENT REQUIREMENTS:
1. SOCIAL MEDIA POST (LinkedIn Authority Style): Use credibility markers + industry insight + authority CTA. Include psychological triggers and engagement hooks.

2. EMAIL SUBJECT: Pattern break + curiosity gap psychology. Must disrupt expectations and create information hunger (under 50 characters).

3. EMAIL CONTENT: Authority pyramid + emotional escalation sequence (CAPTURE→CONNECT→CONCERN→CONVINCE→COMPEL→CONVERT). Include social proof and clear conversion psychology.

4. BLOG TITLE: Expectation subversion + SEO optimization. Use "The Reversal" or "The Contradiction" technique with attention architecture.

5. AD COPY: Rapid dopamine triggers + scarcity psychology + clear value proposition. Target specific neurochemicals for instant engagement.

6. WEBSITE COPY: Trust building through authority markers + social proof amplification + conversion optimization. Follow psychological flow from credibility to action.

INDUSTRY-SPECIFIC REQUIREMENTS for ${businessType}:
- Incorporate relevant authority markers and expertise signals
- Address specific professional pain points and aspirations  
- Use appropriate psychological triggers for target demographic
- Include industry-specific social proof and success indicators

Each piece must demonstrate clear psychological intention and follow APEX2.0 principles. Focus on authentic influence, not manipulation.

Format as JSON with these exact keys:
{
  "socialPost": "content here",
  "emailSubject": "content here", 
  "emailContent": "content here",
  "blogTitle": "content here",
  "adCopy": "content here",
  "websiteCopy": "content here"
}`;

  try {
    const content = await generateContent(prompt, model, {
      temperature: 0.8,
      max_tokens: 1500,
      system_prompt: systemPrompt
    });

    // Parse the JSON response
    try {
      const parsedContent = JSON.parse(content);
      return parsedContent;
    } catch (parseError) {
      console.error('Error parsing AI response as JSON:', parseError);
      // Fallback: return the raw content in a structured format
      return {
        socialPost: content.substring(0, 200),
        emailSubject: "AI-Generated Content Ready",
        emailContent: content,
        blogTitle: `${businessType} Marketing Insights`,
        adCopy: content.substring(0, 100),
        websiteCopy: content.substring(0, 200)
      };
    }
  } catch (error) {
    console.error('Error generating AI content demo:', error);
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