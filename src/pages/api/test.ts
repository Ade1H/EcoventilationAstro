// src/pages/api/test.ts
export const GET = async () => {
  return new Response(
    JSON.stringify({ message: 'API fungerar!' }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};

export const POST = async ({ request }) => {
  console.log('🔵 TEST-API ANROPAT!');
  
  try {
    const text = await request.text();
    console.log('📝 TEXT:', text);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        received: text,
        message: 'API fungerar!' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
};