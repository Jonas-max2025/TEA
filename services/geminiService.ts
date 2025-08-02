import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { VisualStory } from '../types';

// ============================================================================
// CONFIGURACIÓN DE LA API DE GOOGLE GEMINI
// ============================================================================
// Verifica que la API key esté configurada antes de inicializar
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

// Inicializa la instancia de Gemini con la API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// ============================================================================
// FUNCIÓN PARA EXPLICAR CONCEPTOS MÉDICOS
// ============================================================================
/**
 * Explica conceptos médicos complejos en lenguaje simple y empático para padres
 * @param concept - El concepto médico a explicar (ej: "ecolalia", "estímulos sensoriales")
 * @returns Una explicación simplificada y accesible
 */
export const explainConcept = async (concept: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo rápido y eficiente
      contents: `Explica el siguiente concepto para un padre o madre de un niño con autismo. Usa un lenguaje sencillo, claro y empático. Evita la jerga técnica. Usa párrafos cortos y listas si es apropiado. El concepto es: "${concept}"`,
      config: {
        systemInstruction: "Eres un asistente virtual de apoyo para padres de niños en el espectro autista. Tu tono es comprensivo, paciente y muy claro. Tu objetivo es empoderar a los padres con información accesible.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for concept explanation:", error);
    throw new Error("Failed to get explanation from AI service.");
  }
};

// ============================================================================
// FUNCIÓN PARA GENERAR HISTORIAS SOCIALES VISUALES
// ============================================================================
/**
 * Genera historias sociales paso a paso para preparar a niños con TEA
 * @param topic - El tema de la historia (ej: "ir al dentista", "visitar el supermercado")
 * @returns Una historia estructurada con pasos e ideas de pictogramas
 */
export const generateVisualStory = async (topic: string): Promise<VisualStory> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Crea una historia social visual paso a paso para un niño con autismo sobre el tema: "${topic}". La historia debe ser simple, predecible y tranquilizadora.`,
            config: {
                responseMimeType: "application/json", // Respuesta estructurada en JSON
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: "Un título corto y claro para la historia."
                        },
                        steps: {
                            type: Type.ARRAY,
                            description: "La secuencia de pasos en la historia.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    step_number: { type: Type.INTEGER }, // Número del paso
                                    description: { 
                                        type: Type.STRING,
                                        description: "Una descripción simple y en primera persona de lo que sucede en este paso."
                                    },
                                    pictogram_idea: {
                                        type: Type.STRING,
                                        description: "Una descripción simple de una imagen o pictograma que podría representar este paso."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        // ============================================================================
        // PROCESAMIENTO DE LA RESPUESTA JSON
        // ============================================================================
        // La respuesta viene como string JSON, necesitamos parsearla
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Validación: asegura que el objeto parseado cumple con la interfaz VisualStory
        if (parsedJson && parsedJson.title && Array.isArray(parsedJson.steps)) {
            return parsedJson as VisualStory;
        } else {
            throw new Error("Received malformed JSON from AI service.");
        }

    } catch (error) {
        console.error("Error calling Gemini API for visual story generation:", error);
        throw new Error("Failed to generate visual story from AI service.");
    }
};

// ============================================================================
// FUNCIÓN PRINCIPAL DEL CHAT IA
// ============================================================================
/**
 * Procesa mensajes del usuario y genera respuestas del asistente IA
 * @param message - El mensaje del usuario
 * @returns La respuesta del asistente IA
 */
export const getAIChatResponse = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: "Eres un asistente virtual de apoyo para padres de niños en el espectro autista. Tu tono es comprensivo, paciente y muy claro. Tu objetivo es empoderar a los padres con información accesible, estrategias prácticas y apoyo emocional. No debes proporcionar diagnósticos médicos ni reemplazar el consejo de un profesional cualificado. Siempre debes animar a los usuarios a consultar con su equipo de cuidado profesional para decisiones médicas. Evita la jerga técnica.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for AI chat:", error);
    throw new Error("Failed to get response from AI assistant.");
  }
};
