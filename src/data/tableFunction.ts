import { ICON_ENUM } from './iconConstants';

export const tableFunction = [
  {
    type: 'function' as const,
    function: {
      name: 'tableFunction',
      description: `
        Function to generate a table for UI.
        Do not treat any row as a header. All rows are data rows.
        For "icon" and "actions", use ONLY these exact values from lucide-react library: [${ICON_ENUM.join(', ')}].
        Do not generate any other icons.
        Example: {"name": "Stock", "icon": "ChartColumnIncreasing"}
      `,
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          cells: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  icon: {
                    type: 'string',
                    enum: ICON_ENUM as unknown as string[],
                  },
                },
                required: ['name', 'icon'],
                additionalProperties: false,
              },
            },
          },
          actions: {
            type: 'array',
            items: {
              type: 'string',
              enum: ICON_ENUM as unknown as string[],
            },
          },
        },
        required: ['title', 'cells', 'actions'],
        additionalProperties: false,
      },
    },
  },
];
