
// Lógica para generar prompts y consumir la API de Gemini
const GEMINI_API_KEY = "AIzaSyDgfTjUDl98FaqJASMmJSRpluwdeGYhOb4";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export function generarPromptProducto({ nombre, imagen, tecnica, material }) {
  // Prompt acotado: solo una descripción detallada
  let prompt = `Actúa como un redactor profesional de Amazon especializado en productos artesanales. Escribe una descripción genial y detallada para un producto llamado "${nombre}". El texto debe tener:\n\n- Un párrafo introductorio que destaque el valor, origen o historia del producto.\n- Un listado de características o beneficios principales, usando viñetas o puntos destacados con **negritas**.\n- Un párrafo de cierre con un llamado a la acción sutil y persuasivo.\n\nInformación del producto:\n- Técnica de fabricación: ${tecnica}\n- Material: ${material}\n- Imagen incluida: ${imagen ? "sí" : "no"}`;
  if (imagen) {
    prompt += `\nAnaliza la siguiente imagen del producto y complementa la descripción con detalles visuales relevantes, como colores, formas, estilo, o cualquier característica que puedas observar. Si la imagen no es clara, ignora este paso.`;
  }
  prompt += `\nNo agregues captions ni textos para redes sociales. No uses guiones ni numeración. Usa un estilo profesional, humano y auténtico.`;
  return prompt;
}

export function generarPromptServicio({ nombre, descripcion }) {
  // Aquí irá la lógica para servicios
  return `Genera una descripción para el servicio: ${nombre}. Descripción: ${descripcion}`;
}

// Función para llamar a Gemini API y formatear la respuesta
// Ahora acepta un segundo parámetro opcional: imageBase64
export async function generarConGemini(prompt, imageBase64 = null) {
  let parts = [{ text: prompt }];
  if (imageBase64) {
    // Gemini espera imágenes como objetos { inlineData: { mimeType, data } }
    parts.push({
      inlineData: {
        mimeType: "image/jpeg", // O image/png según el origen
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
      maxOutputTokens: 400 // Limita la respuesta para no exceder tokens
    }
  };
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Error al llamar a Gemini API");
  const data = await res.json();
  let texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar contenido.";
  // Limita la longitud de la respuesta (por si acaso)
  if (texto.length > 1500) texto = texto.slice(0, 1500) + "...";
  // Formatea: separa en renglones por opciones y saltos de línea
  texto = texto
    .replace(/\*\*Opción/g, '\n\n**Opción')
    .replace(/\*\*\[/g, '\n\n**[')
    .replace(/\*\*Al adaptar/g, '\n\n**Al adaptar')
    .replace(/\*\*/g, '\n**')
    .replace(/>/g, '\n>')
    .replace(/\n{2,}/g, '\n\n');
  return texto.trim();
}
