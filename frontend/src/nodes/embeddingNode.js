import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const EmbeddingNode = createNodeComponent({
  type: 'embedding',
  title: 'Embeddings',
  category: 'Vector',
  subtitle: 'Convert text to embedding vectors',
  defaults: {
    model: 'text-embedding-3-small',
    dimension: 512,
  },
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: ['text-embedding-3-small', 'text-embedding-3-large', 'bge-base'],
    },
    {
      name: 'dimension',
      label: 'Dimensions',
      inputType: 'number',
      placeholder: '512',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-text`,
      type: 'target',
      position: Position.Left,
      top: '50%',
    },
    {
      id: `${id}-vector`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});








