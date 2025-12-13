import { useCallback, useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      alert(
        `Pipeline stats:\n- Nodes: ${result.num_nodes}\n- Edges: ${result.num_edges}\n- Is DAG: ${
          result.is_dag ? 'Yes' : 'No'
        }`
      );
    } catch (error) {
      alert(`Unable to submit pipeline: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges]);

  return (
    <div className="actions-bar">
      <button className="primary-btn" type="button" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit to Backend'}
      </button>
    </div>
  );
};
