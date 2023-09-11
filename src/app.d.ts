// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { User } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Omit<User, 'password'>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
