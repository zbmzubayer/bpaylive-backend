import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.number().min(0),
  DATABASE_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});

type EnvConfig = z.infer<typeof envSchema>;

const envConfig: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) ?? 'development',
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL!,
  CLIENT_URL: process.env.CLIENT_URL!,
  AUTH_SECRET: process.env.AUTH_SECRET ?? 'auth-secret',
};

export const ENV: Readonly<EnvConfig> = envSchema.parse(envConfig);
