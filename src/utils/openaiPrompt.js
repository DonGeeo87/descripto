
// Lógica para generar prompts y consumir la API de Gemini
const GEMINI_API_KEY = "AIzaSyDgfTjUDl98FaqJASMmJSRpluwdeGYhOb4";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export function generarPromptProducto({ nombre, imagen, tecnica, material }) {
  // Prompt más específico y directo
  let prompt = `Genera contenido para el producto "${nombre}" con EXACTAMENTE esta estructura (no cambies los títulos):

**DESCRIPCIÓN DEL PRODUCTO:**
[Escribe una descripción comercial de 2-3 párrafos cortos, máximo 150 palabras]

**CAPTION PARA INSTAGRAM:**
[Escribe un caption atractivo para Instagram de 1-2 párrafos, con emojis y hashtags, máximo 120 palabras]

**CAPTION PARA FACEBOOK:**
[Escribe un caption para Facebook de 2-3 párrafos, máximo 180 palabras]

Información del producto:
- Técnica: ${tecnica}
- Material: ${material}
- Incluye imagen: ${imagen ? "sí" : "no"}

IMPORTANTE: Debes incluir las 3 secciones con los títulos exactos.`;

  if (imagen) {
    prompt += `\n\nAnaliza la imagen y menciona 1-2 detalles visuales en la descripción.`;
  }

  return prompt;
}

export function generarPromptServicio({ nombre, descripcion }) {
  // Aquí irá la lógica para servicios
  return `Genera una descripción para el servicio: ${nombre}. Descripción: ${descripcion}`;
}

// Función para llamar a Gemini API y formatear la respuesta
export async function generarConGemini(prompt, imageBase64 = null) {
  let parts = [{ text: prompt }];
  
  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.replace(/^data:image\/(jpeg|png);base64,/, "")
      }
    });
  }

  const body = {
    contents: [
      {
        parts
      }
    ],
    generationConfig: {
      maxOutputTokens: 1200, // Aumentado para asegurar respuestas completas
      temperature: 0.5, // Reducido para mayor consistencia
      topP: 0.95, // Aumentado para mejor calidad
      topK: 60, // Aumentado para más opciones
    }
  };

  try {
    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error API: ${errorData.error?.message || res.statusText}`);
    }

    const data = await res.json();
    let texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar contenido.";
    
    // Limpia y formatea el texto
    texto = limpiarYFormatearTexto(texto);
    
    // Verifica que tenga las 3 secciones y las agrega si faltan
    texto = verificarYCompletarSecciones(texto);
    
    return texto.trim();
  } catch (error) {
    console.error('Error en generarConGemini:', error);
    throw new Error(`Error al generar contenido: ${error.message}`);
  }
}

// Función para limpiar y formatear el texto
function limpiarYFormatearTexto(texto) {
  return texto
    // Limpia caracteres extraños
    .replace(/[🔲🔳⬜⬛]/g, '')
    .replace(/[□■▢▣▤▥▦▧▨▩]/g, '')
    .replace(/[▪▫]/g, '')
    
    // Formatea los títulos
    .replace(/\*\*DESCRIPCIÓN DEL PRODUCTO:\*\*/g, '\n\n## 📝 DESCRIPCIÓN DEL PRODUCTO\n')
    .replace(/\*\*CAPTION PARA INSTAGRAM:\*\*/g, '\n\n## 📱 CAPTION PARA INSTAGRAM\n')
    .replace(/\*\*CAPTION PARA FACEBOOK:\*\*/g, '\n\n## 👥 CAPTION PARA FACEBOOK\n')
    
    // Limpia formato de markdown extra
    .replace(/\*\*/g, '**')
    .replace(/\n{3,}/g, '\n\n')
    
    // Asegura que no haya texto cortado
    .replace(/([a-zA-Z])\s*\.\.\.$/, '$1.')
    .replace(/([a-zA-Z])\s*\.\.\.\s*$/, '$1.');
}

// Función para verificar y completar secciones faltantes
function verificarYCompletarSecciones(texto) {
  const tieneDescripcion = texto.includes('DESCRIPCIÓN DEL PRODUCTO');
  const tieneInstagram = texto.includes('CAPTION PARA INSTAGRAM');
  const tieneFacebook = texto.includes('CAPTION PARA FACEBOOK');
  
  let textoCompleto = texto;
  
  // Si falta alguna sección, la agrega con contenido por defecto
  if (!tieneDescripcion) {
    textoCompleto += '\n\n## 📝 DESCRIPCIÓN DEL PRODUCTO\n\nDescripción del producto generada automáticamente.';
  }
  
  if (!tieneInstagram) {
    textoCompleto += '\n\n## 📱 CAPTION PARA INSTAGRAM\n\nCaption para Instagram generado automáticamente.';
  }
  
  if (!tieneFacebook) {
    textoCompleto += '\n\n## 👥 CAPTION PARA FACEBOOK\n\nCaption para Facebook generado automáticamente.';
  }
  
  return textoCompleto;
}
