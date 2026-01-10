export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export type AgentPersona = 'patient' | 'doctor';

const PATIENT_PROMPTS = {
    greeting: "Hello! I am your Health Guardian. I can help you understand your medical records, check symptoms, or remind you about medications. How can I assist you today?",
    records: "I see your record includes a history of hypertension. Your last BP was stable. Would you like to know more about managing it?",
};

const DOCTOR_PROMPTS = {
    greeting: "Welcome, Clinical Co-pilot active. I can summarize patient records, check for drug interactions, or help with note drafting. Which patient should we focus on?",
    summary: (patientName: string) => `Summary for ${patientName}: 45-year-old male with chronic hypertension. Recent lab results show improved kidney function but persistent elevated LDL. Currently on Metformin.`,
};

export class AIService {
    private persona: AgentPersona;

    constructor(persona: AgentPersona) {
        this.persona = persona;
    }

    async getInitialMessage(): Promise<string> {
        return this.persona === 'patient' ? PATIENT_PROMPTS.greeting : DOCTOR_PROMPTS.greeting;
    }

    async processMessage(content: string, context?: any): Promise<string> {
        const lowerContent = content.toLowerCase();

        if (this.persona === 'patient') {
            if (lowerContent.includes('record') || lowerContent.includes('history')) {
                return PATIENT_PROMPTS.records;
            }
            if (lowerContent.includes('symptom')) {
                return "Based on your history, these symptoms should be monitored. If you experience severe chest pain or shortness of breath, please contact your doctor immediately.";
            }
            return "I'm here to help. Could you tell me more about what you're looking for regarding your health?";
        } else {
            if (lowerContent.includes('summary') && context?.patientName) {
                return DOCTOR_PROMPTS.summary(context.patientName);
            }
            if (lowerContent.includes('interaction') || lowerContent.includes('conflict')) {
                return "Checking conflicts... No immediate drug-drug interactions found between current medications. However, patient has a penicillin allergy noted.";
            }
            return "I'm ready to assist with clinical workflows. You can ask for patient summaries or interaction checks.";
        }
    }
}
