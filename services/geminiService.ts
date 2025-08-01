import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { VisualStory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Explains a given concept in simple, empathetic language for parents.
 * @param concept The complex concept to explain.
 * @returns A simplified explanation as a string.
 */
export const explainConcept = async (concept: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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

/**
 * Generates a step-by-step visual story for a given topic.
 * @param topic The topic for the visual story (e.g., "going to the dentist").
 * @returns A structured VisualStory object.
 */
export const generateVisualStory = async (topic: string): Promise<VisualStory> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Crea una historia social visual paso a paso para un niño con autismo sobre el tema: "${topic}". La historia debe ser simple, predecible y tranquilizadora.`,
            config: {
                responseMimeType: "application/json",
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
                                    step_number: { type: Type.INTEGER },
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

        // The response text is a JSON string, it needs to be parsed.
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Ensure the parsed object conforms to the VisualStory interface
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

/**
 * Gets a response from the AI assistant for the chat feature.
 * @param message The user's message.
 * @returns The AI's response as a string.
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
