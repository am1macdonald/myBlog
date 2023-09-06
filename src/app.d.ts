// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { User } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Partial<User>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
