import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const DelayNode = createNodeComponent({
  type: 'delay',
  title: 'Delay',
  category: 'Utility',
  subtitle: 'Pause the pipeline for a duration',
  defaults: {
    durationMs: 1000,
    reason: 'Rate limit buffer',
  },
  fields: [
    {
      name: 'durationMs',
      label: 'Duration (ms)',
      inputType: 'number',
      placeholder: '1000',
    },
    {
      name: 'reason',
      label: 'Reason',
      placeholder: 'Why are we pausing?',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-in`,
      type: 'target',
      position: Position.Left,
      top: '50%',
    },
    {
      id: `${id}-out`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});







