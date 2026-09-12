import { en } from "./en";
import { hi } from "./hi";
import type { Translations } from "./types";

export const translations = { en, hi } satisfies Record<string, Translations>;
export type Locale = keyof typeof translations;
export type { Translations };
