import { Position } from 'reactflow';
import { createNodeComponent } from './baseNode';

const variablePattern = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const extractVariables = (text = '') => {
  const names = new Set();
  let match;
  while ((match = variablePattern.exec(text)) !== null) {
    names.add(match[1]);
  }
  return Array.from(names);
};

export const TextNode = createNodeComponent({
  type: 'text',
  title: 'Text',
  category: 'Transform',
  subtitle: 'Template text with variables',
  defaults: {
    text: '{{ input }}',
    label: 'text_output',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      placeholder: 'text_output',
    },
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      rows: 3,
      placeholder: 'Write text with {{ variables }}',
    },
  ],
  getDynamicHandles: ({ id, values }) => {
    const vars = extractVariables(values.text);
    return vars.map((name, index) => ({
      id: `${id}-var-${name}`,
      type: 'target',
      position: Position.Left,
      top: 50 + index * 22,
      style: { background: '#f4c15d' },
    }));
  },
  getSize: ({ values }) => {
    const lines = (values.text || '').split('\n');
    const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const width = Math.min(560, Math.max(240, longest * 8 + 80));
    const height = Math.min(420, Math.max(140, lines.length * 28 + 90));
    return { width, minHeight: height };
  },
  renderBody: ({ values }) => {
    const vars = extractVariables(values.text);
    if (!vars.length) return null;
    return (
      <div className="chip-row">
        {vars.map((v) => (
          <span className="chip" key={v}>
            {`{{ ${v} }}`}
          </span>
        ))}
      </div>
    );
  },
  handles: ({ id }) => [
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right,
      top: '50%',
    },
  ],
});
