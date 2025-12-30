
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateUserBio(userData: { firstName: string; lastName: string; role: string; department: string }) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional 2-sentence corporate bio for a ${userData.role} in the ${userData.department} department named ${userData.firstName} ${userData.lastName}. Make it sound modern and impressive.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text?.trim() || "No bio generated.";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Professional profile details to be updated.";
  }
}

export async function analyzeUserData(users: any[]) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this list of users and provide a one-sentence summary of the team's composition: ${JSON.stringify(users)}`,
      });
      return response.text?.trim() || "Team data analysis pending.";
    } catch (error) {
        return "Unable to analyze team data at this time.";
    }
}
