import { ICON_ENUM } from './iconConstants';

export const SYSTEM_PROMPT = [
  'Do not treat any row as a header (NEVER). All rows are data rows.',
  `For "icon" and "actions", use ONLY these exact values from lucide-react library: [${ICON_ENUM.join(', ')}].`,
  'Do not generate any other icons.',
  'Format all monetary values like this: $12,440 (US-style, no decimals, comma as thousand separator).',
  'Format all date values as abbreviated month and day only (e.g., Feb 1, Feb 2). Do not include the year or comma after the day.',
  'If the user does not specify the number of rows or columns, generate a small table by default (e.g., 2–3 rows and 2–3 columns).',
].join('\n');
