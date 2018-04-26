declare interface Transliterate {
  (source: string): string;
}

declare function translititEngine(table: { [index: string]: string }): Transliterate;
declare namespace translititEngine {}
export = translititEngine;
