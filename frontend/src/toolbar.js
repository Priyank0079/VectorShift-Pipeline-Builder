import { DraggableNode } from './draggableNode';
import { nodeList } from './nodes';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <h2>Node Library</h2>
        <p>Drag nodes onto the canvas to build your pipeline.</p>
      </div>
      <div className="toolbar-grid">
        {nodeList.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  );
};
