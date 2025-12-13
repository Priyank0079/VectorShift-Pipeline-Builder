import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const LoggerNode = createNodeComponent({
  type: 'logger',
  title: 'Logger',
  category: 'Utility',
  subtitle: 'Inspect data flowing through the graph',
  defaults: {
    label: 'debug_log',
    level: 'info',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      placeholder: 'debug_log',
    },
    {
      name: 'level',
      label: 'Level',
      type: 'select',
      options: ['debug', 'info', 'warn', 'error'],
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
      top: '50%',
    },
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});







