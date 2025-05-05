import 'dotenv/config'; // automatically loads `.env`

import { z } from 'zod';


const EnvSchema = z.object({
  DEBUG: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().nonempty()
});
// Throws an exception if the environment variables don't match the schema
export function setup() {
    try {
        const env = EnvSchema.parse(process.env);
    } catch (error) {
        console.error("Environment variables failed validation:");
        console.error(error);
        throw error;
    }
}