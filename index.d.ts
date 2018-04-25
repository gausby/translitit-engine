declare interface Transliterate {
  (source: string): string;
}

declare interface TranslititEngine {
  (table: { [index: string]: string }): Transliterate;
}

declare namespace TranslititEngine {}
export = TranslititEngine;
