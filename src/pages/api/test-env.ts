// src/pages/api/test-env.ts
export const prerender = false;

export const GET = async () => {
  return new Response(
    JSON.stringify({ 
      message: 'Test av miljövariabler',
      openai_key_exists: !!import.meta.env.OPENAI_API_KEY,
      openai_key_prefix: import.meta.env.OPENAI_API_KEY ? 
        import.meta.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'saknas',
      email_user_exists: !!import.meta.env.EMAIL_USER,
    }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};