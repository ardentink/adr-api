/**
 * Use to name your template literal strings. Import this method with a name
 * like `sql` or `html`. This is primarily to get syntax highlighting for sql
 * strings in db migrations. This method should return the same thing as a
 * plain template string without the tag.
 * @param s
 * @param args
 */

export const tag = (s: TemplateStringsArray, ...args: any[]) =>
  s.map((ss, i) => `${ss}${args[i] || ''}`).join('')
