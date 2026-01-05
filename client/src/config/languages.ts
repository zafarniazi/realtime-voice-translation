
export const LANGUAGES = ['English', 'Frensh', 'German'] as const;

export type Language = typeof LANGUAGES[number];
