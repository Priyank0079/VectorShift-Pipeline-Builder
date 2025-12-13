import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const OutputNode = createNodeComponent({
  type: 'customOutput',
  title: 'Output',
  category: 'Destination',
  subtitle: 'Return values from the pipeline',
  defaults: {
    name: '',
    outputType: 'Text',
    notes: '',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'output_name',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image', 'JSON', 'Audio'],
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      rows: 2,
      placeholder: 'Optional summary of this output',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left,
      top: '50%',
    },
  ],
});
