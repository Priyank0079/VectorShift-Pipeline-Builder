import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

export const ApiNode = createNodeComponent({
  type: 'api',
  title: 'HTTP Request',
  category: 'Integration',
  subtitle: 'Call an external API endpoint',
  badge: 'New',
  defaults: {
    method: 'GET',
    url: 'https://api.example.com',
    auth: '',
  },
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    {
      name: 'url',
      label: 'URL',
      placeholder: 'https://api.example.com/resource',
    },
    {
      name: 'auth',
      label: 'Auth Token (optional)',
      placeholder: 'Bearer ...',
    },
  ],
  handles: ({ id }) => [
    {
      id: `${id}-body`,
      type: 'target',
      position: Position.Left,
      top: '45%',
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
      top: '55%',
    },
  ],
});







