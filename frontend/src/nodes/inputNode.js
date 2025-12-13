import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const InputNode = createNodeComponent({
  type: 'customInput',
  title: 'Input',
  category: 'Source',
  subtitle: 'Provide external values to the graph',
  defaults: {
    name: '',
    inputType: 'Text',
    description: '',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'input_name',
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File', 'Number', 'JSON'],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 2,
      placeholder: 'What does this input represent?',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});
