/* // test-models.js
const apiKey = "AIzaSyA7kVGZ5rH4ubtv9uMvtdsHcF_B5rTBKaI";

const modelsToTest = [
    // 🟢 GEMINI 2.0 - 1500 RPD
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash-lite-001",
    
    // 🟡 GEMINI 1.5 - 1500 RPD
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    
    // 🔵 GEMINI 1.0 - 1500 RPD
    "gemini-1.0-pro",
    "gemini-1.0-pro-latest",
    "gemini-pro",
    "gemini-pro-latest",
    
    // 🟣 GEMINI 2.5 - 20 RPD (testa försiktigt!)
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.5-flash-lite",
    
    // 🟠 LATEST - 1500 RPD
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-pro-latest"
];

async function testModel(model) {
    console.log(`\n🔄 Testar: ${model}...`);
    
    try {
        const start = Date.now();
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Svara med bara ordet 'HEJ' på svenska"
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        maxOutputTokens: 10
                    }
                })
            }
        );
        
        const time = Date.now() - start;
        
        if (response.ok) {
            const data = await response.json();
            const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Inget svar';
            console.log(`✅ FUNGERAR! (${time}ms)`);
            console.log(`   Svar: ${answer.trim()}`);
            console.log(`   Model: ${model}`);
            return { model, status: 'OK', time, answer: answer.trim() };
        } else {
            const error = await response.json();
            console.log(`❌ FUNGERAR INTE - Status: ${response.status}`);
            
            // Visa specifikt felmeddelande
            if (error.error?.message) {
                console.log(`   Fel: ${error.error.message}`);
            }
            
            // Om 429 - kvota slut
            if (response.status === 429) {
                console.log(`   ⚠️ KVOTA SLUT för ${model}`);
            }
            
            return { model, status: 'FAIL', code: response.status, error: error.error?.message };
        }
    } catch (error) {
        console.log(`❌ FEL: ${error.message}`);
        return { model, status: 'ERROR', error: error.message };
    }
}

async function testAllModels() {
    console.log('🧪 TESTAR ALLA GEMINI MODELLER');
    console.log('='.repeat(60));
    console.log(`API-nyckel: ${apiKey.substring(0, 8)}...`);
    console.log('='.repeat(60));
    
    const results = {
        working: [],
        failed: [],
        quota: []
    };
    
    for (const model of modelsToTest) {
        const result = await testModel(model);
        
        if (result.status === 'OK') {
            results.working.push(result);
        } else if (result.code === 429) {
            results.quota.push(result);
        } else {
            results.failed.push(result);
        }
        
        // Vänta 1 sekund mellan anrop för att undvika rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Visa SAMMANSTÄLLNING
    console.log('\n' + '='.repeat(60));
    console.log('📊 SAMMANSTÄLLNING');
    console.log('='.repeat(60));
    
    console.log('\n✅ FUNGERANDE MODELLER:');
    if (results.working.length === 0) {
        console.log('   Ingen fungerande modell hittades - alla har slut på kvota!');
    } else {
        results.working.sort((a, b) => a.time - b.time);
        results.working.forEach(r => {
            console.log(`   • ${r.model} - ${r.time}ms`);
            console.log(`     Svar: "${r.answer}"`);
        });
    }
    
    console.log('\n⚠️ KVOTA SLUT (429):');
    results.quota.forEach(r => {
        console.log(`   • ${r.model}`);
    });
    
    console.log('\n❌ FUNGERAR INTE:');
    results.failed.forEach(r => {
        console.log(`   • ${r.model} - ${r.error || r.code}`);
    });
    
    // REKOMMENDATION
    console.log('\n' + '='.repeat(60));
    console.log('🎯 REKOMMENDATION:');
    console.log('='.repeat(60));
    
    if (results.working.length > 0) {
        const fastest = results.working.sort((a, b) => a.time - b.time)[0];
        console.log(`\n✅ Använd denna modell i din chat.ts:`);
        console.log(`   const model = '${fastest.model}';  // ${fastest.time}ms svarstid`);
        console.log(`   Svarade: "${fastest.answer}"`);
    } else {
        console.log('\n⚠️ ALLA modeller har slut på kvota!');
        console.log('\n   🔸 Vänta till midnatt (09:00 svensk tid)');
        console.log('   🔸 Använd Ollama istället (helt gratis, ingen kvota)');
        console.log('   🔸 Skaffa betald kvota på Google Cloud');
    }
    
    console.log('\n' + '='.repeat(60));
}

// KÖR TESTET!
testAllModels().catch(console.error); */