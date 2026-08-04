/**
 * The free browser file tools cluster.
 *
 * These are not AI tools and none of them pay us anything — they are free,
 * account-less utilities that handle a file the browser cannot open on its own.
 * They live in their own data module rather than in the AI category taxonomy so
 * the hub page and the guides that cover them stay in sync from one list.
 *
 * Three of the four never upload; DumpReader does, and `localOnly` keeps that
 * distinction in the data so no surface can accidentally claim otherwise.
 */

export interface FileTool {
  /** Tool name as it should appear in copy. */
  name: string;
  /** Homepage. Never an affiliate link — there is no program for any of these. */
  url: string;
  /** Hostname shown under the tool name. */
  displayUrl: string;
  /** What the tool does, in one line. */
  summary: string;
  /** File types it handles, for the tag row. */
  formats: string[];
  /**
   * True when the file never leaves the machine. False means the file is sent to
   * a server, and the surface rendering this tool must say so.
   */
  localOnly: boolean;
  /** Slug of the guide covering it, under /guides/. */
  guideSlug: string;
  /** Link text for the guide. */
  guideTitle: string;
}

export const FILE_TOOLS: readonly FileTool[] = [
  {
    name: 'CADverter',
    url: 'https://cadverter.net',
    displayUrl: 'cadverter.net',
    summary:
      'Opens and converts CAD and 3D files in the browser, running the OpenCASCADE geometry kernel as WebAssembly. 34 formats in, 16 out, 544 conversion pairs.',
    formats: ['STEP', 'IGES', 'STL', 'OBJ', 'glTF', '3MF', 'DXF'],
    localOnly: true,
    guideSlug: 'open-step-file-without-cad-software',
    guideTitle: 'How to open a STEP file without CAD software',
  },
  {
    name: 'Pairchute',
    url: 'https://pairchute.com',
    displayUrl: 'pairchute.com',
    summary:
      'Sends a file straight from one browser to another over WebRTC. There is no cloud copy in the middle, so there is no size cap and nothing to expire.',
    formats: ['Any file', 'Multi-GB', 'Folders'],
    localOnly: true,
    guideSlug: 'send-large-files-without-uploading',
    guideTitle: 'How to send large files without uploading them',
  },
  {
    name: 'Parquetbay',
    url: 'https://parquetbay.com',
    displayUrl: 'parquetbay.com',
    summary:
      'Opens, edits and queries columnar data files in the tab, with DuckDB compiled to WebAssembly for real SQL against a local file.',
    formats: ['Parquet', 'CSV', 'JSON', 'Arrow', 'Excel'],
    localOnly: true,
    guideSlug: 'open-parquet-file-online',
    guideTitle: 'How to open a Parquet file online',
  },
  {
    name: 'DumpReader',
    url: 'https://dumpreader.com',
    displayUrl: 'dumpreader.com',
    summary:
      'Decodes a Windows crash dump and names the faulting driver without a WinDbg install or a symbol server round trip. The only one here that uploads: the dump is parsed server-side and the bytes are discarded with the response, which is why it caps at 32 MB.',
    formats: ['.dmp', 'Minidump', 'Kernel dump'],
    localOnly: false,
    guideSlug: 'read-dmp-file-fix-blue-screen',
    guideTitle: 'How to read a .dmp file without WinDbg',
  },
] as const;

/** Guide slugs in the cluster — used to cross-link them to each other and to the hub. */
export const FILE_TOOL_GUIDE_SLUGS: readonly string[] = FILE_TOOLS.map((t) => t.guideSlug);
