import { ICON_ENUM } from './iconConstants';

export const tableFunction = [
  {
    type: 'function' as const,
    function: {
      name: 'tableFunction',
      description: `
        Function to generate a table for UI.
        Example: {title: 'Company Expenses', cells: [[{"name": "Cloud Hosting", "icon": "Tag"}, 
        {"name": "$1,200", "icon": "Tag"}, 
        {"name": "2023-10-01", "icon": "Calendar"}]], actions: ['Save']}
      `,
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title of the table, e.g., "Monthly Expenses"',
          },
          cells: {
            type: 'array',
            description:
              '2D array of table cells, where each cell has a name and an optionally icon.',
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description:
                      'Label or content of the cell, e.g., "Cloud Hosting", "$1,200"',
                  },
                  icon: {
                    type: 'string',
                    enum: ICON_ENUM as unknown as string[],
                    description: `Name of icon from lucide-react. Must be one of: ${ICON_ENUM.join(', ')}`,
                  },
                },
                required: ['name'],
                additionalProperties: false,
              },
            },
          },
          actions: {
            type: 'array',
            description:
              'List of actions (buttons) associated with the table. Must use predefined icon names.',
            items: {
              type: 'string',
              enum: ICON_ENUM as unknown as string[],
              description: `Action icon name from lucide-react. Must be one of: ${ICON_ENUM.join(', ')}`,
            },
          },
        },
        required: ['title', 'cells', 'actions'],
        additionalProperties: false,
      },
    },
  },
];
