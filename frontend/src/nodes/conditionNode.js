import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const ConditionNode = createNodeComponent({
  type: 'condition',
  title: 'Branch',
  category: 'Logic',
  subtitle: 'Route based on a condition',
  defaults: {
    expression: 'value > 0',
    name: 'condition',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'condition_check',
    },
    {
      name: 'expression',
      label: 'Expression',
      placeholder: 'value > 0',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left,
      top: '38%',
    },
    {
      id: `${id}-condition`,
      type: 'target',
      position: Position.Left,
      top: '62%',
    },
    {
      id: `${id}-true`,
      type: 'source',
      position: Position.Right,
      top: '40%',
      style: { background: '#6be59b' },
    },
    {
      id: `${id}-false`,
      type: 'source',
      position: Position.Right,
      top: '64%',
      style: { background: '#f77e7e' },
    },
  ],
});







