import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { ApiNode } from './apiNode';
import { ConditionNode } from './conditionNode';
import { EmbeddingNode } from './embeddingNode';
import { DelayNode } from './delayNode';
import { LoggerNode } from './loggerNode';

export const nodeList = [
  { type: 'customInput', label: 'Input', component: InputNode },
  { type: 'llm', label: 'LLM', component: LLMNode },
  { type: 'text', label: 'Text', component: TextNode },
  { type: 'api', label: 'HTTP', component: ApiNode },
  { type: 'condition', label: 'Branch', component: ConditionNode },
  { type: 'embedding', label: 'Embeddings', component: EmbeddingNode },
  { type: 'delay', label: 'Delay', component: DelayNode },
  { type: 'logger', label: 'Logger', component: LoggerNode },
  { type: 'customOutput', label: 'Output', component: OutputNode },
];

export const nodeTypes = nodeList.reduce(
  (acc, node) => ({ ...acc, [node.type]: node.component }),
  {}
);








