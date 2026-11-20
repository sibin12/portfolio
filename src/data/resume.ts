/**
 * Resume download.
 *
 * Put the PDF in src/public/assets/resume/ (any file name ending in .pdf). Vite bundles it with a
 * hashed name that works under any GitHub Pages path, and every "Download Resume" button appears
 * automatically. With no PDF there, the buttons stay hidden instead of linking to a missing file.
 */
const files = import.meta.glob<string>('../public/assets/resume/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const resume = {
  url: Object.values(files)[0] as string | undefined,
  /** Name the browser saves the file as. */
  fileName: 'Sibin-Silu-Resume.pdf',
};
