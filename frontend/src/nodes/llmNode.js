import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const LLMNode = createNodeComponent({
  type: 'llm',
  title: 'LLM',
  category: 'Model',
  subtitle: 'Generate a response from inputs',
  defaults: {
    model: 'gpt-3.5',
    temperature: 0.7,
    maxTokens: 256,
  },
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: ['gpt-3.5', 'gpt-4', 'claude-sonnet', 'llama3'],
    },
    {
      name: 'temperature',
      label: 'Temperature',
      inputType: 'number',
      placeholder: '0.0 - 1.0',
    },
    {
      name: 'maxTokens',
      label: 'Max Tokens',
      inputType: 'number',
      placeholder: '256',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
      top: '32%',
    },
    {
      id: `${id}-prompt`,
      type: 'target',
      position: Position.Left,
      top: '58%',
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});
