// Client-side OpenRouter configuration

export const AVAILABLE_MODELS = [
  { id: "anthropic/claude-3-opus:beta", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "anthropic/claude-3-sonnet:beta", name: "Claude 3 Sonnet", provider: "Anthropic" },
  { id: "anthropic/claude-3-haiku:beta", name: "Claude 3 Haiku", provider: "Anthropic" },
  { id: "mistralai/mistral-large-latest", name: "Mistral Large", provider: "Mistral AI" },
  { id: "perplexity/pplx-7b-online", name: "Perplexity 7B (Online)", provider: "Perplexity" },
  { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B", provider: "Meta" },
  { id: "google/gemini-pro", name: "Gemini Pro", provider: "Google" },
  { id: "openai/gpt-4o", name: "GPT-4o", provider: "OpenAI" },
];