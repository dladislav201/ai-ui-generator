import { ICON_ENUM } from './iconConstants';

export const SYSTEM_PROMPT = [
  'Do not treat any row as a header(NEVER). All rows are data rows.',
  `For "icon" and "actions", use ONLY these exact values from lucide-react library: [${ICON_ENUM.join(', ')}].`,
  'Do not generate any other icons.',
].join('\n');
