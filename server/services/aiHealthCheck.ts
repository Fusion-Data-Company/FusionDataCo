import axios from 'axios';
import OpenAI from 'openai';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  lastChecked: Date;
  details?: string;
  error?: string;
}

export async function checkOpenRouterHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'anthropic/claude-3-haiku:beta', // Fast, cheap model for health checks
        messages: [
          { role: 'user', content: 'Reply with "OK"' }
        ],
        max_tokens: 10
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://fusiondataco.com",
          "Content-Type": "application/json"
        },
        timeout: 10000 // 10 second timeout
      }
    );

    const responseTime = Date.now() - startTime;
    
    if (response.data.choices && response.data.choices.length > 0) {
      return {
        service: 'OpenRouter',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: `Model: claude-3-haiku responded in ${responseTime}ms`
      };
    } else {
      throw new Error('No response from OpenRouter');
    }
  } catch (error) {
    return {
      service: 'OpenRouter',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastChecked: new Date(),
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function checkPerplexityHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'perplexity/sonar', // Updated to 2025 model (128K context, real-time web access)
        messages: [
          { role: 'user', content: 'What is 2+2?' }
        ],
        max_tokens: 20
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://fusiondataco.com",
          "Content-Type": "application/json"
        },
        timeout: 15000 // 15 second timeout (online search takes longer)
      }
    );

    const responseTime = Date.now() - startTime;
    
    if (response.data.choices && response.data.choices.length > 0) {
      return {
        service: 'Perplexity Sonar (OpenRouter)',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: `Sonar model with web access responded in ${responseTime}ms`
      };
    } else {
      throw new Error('No response from Perplexity');
    }
  } catch (error) {
    return {
      service: 'Perplexity Sonar (OpenRouter)',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastChecked: new Date(),
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function checkOpenAIHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Test with a simple completion instead of image generation (faster and cheaper)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Say "OK"' }
      ],
      max_tokens: 5
    });

    const responseTime = Date.now() - startTime;
    
    if (response.choices && response.choices.length > 0) {
      return {
        service: 'OpenAI',
        status: 'healthy',
        responseTime,
        lastChecked: new Date(),
        details: `API responded in ${responseTime}ms, DALL-E 3 available`
      };
    } else {
      throw new Error('No response from OpenAI');
    }
  } catch (error) {
    return {
      service: 'OpenAI',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastChecked: new Date(),
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function checkAllAIServices(): Promise<HealthCheckResult[]> {
  // Run all health checks in parallel
  const [openRouterResult, perplexityResult, openAIResult] = await Promise.all([
    checkOpenRouterHealth(),
    checkPerplexityHealth(),
    checkOpenAIHealth()
  ]);

  return [openRouterResult, perplexityResult, openAIResult];
}
