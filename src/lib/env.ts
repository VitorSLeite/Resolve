import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation. Import only from server code.
 * Optional keys are activated in later phases (AI, auth).
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatório"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  AI_PROVIDER: z.enum(["openai", "anthropic"]).optional(),
  AI_MODEL_FAST: z.string().optional(),
  AI_MODEL_SMART: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  AUTH_SECRET: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Configuração de ambiente inválida: ${issues}`);
  }
  cached = parsed.data;
  return cached;
}
