import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	dialect: 'sqlite',
	driver: "turso",
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	}
} satisfies Config;
