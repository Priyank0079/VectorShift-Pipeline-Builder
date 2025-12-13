import { useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodeStyles.css';

const renderFieldControl = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={onChange}>
        {field.options.map((opt) => {
          const optionValue = typeof opt === 'string' ? opt : opt.value;
          const optionLabel = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        rows={field.rows || 3}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <input
      type={field.inputType || 'text'}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
    />
  );
};

export const createNodeComponent = (config) => {
  const NodeComponent = ({ id, data }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [values, setValues] = useState({ ...(config.defaults || {}), ...(data || {}) });

    useEffect(() => {
      if (!data) return;
      // Only update if data actually changed to avoid unnecessary re-renders
      setValues((prev) => {
        const hasChanges = Object.keys(data).some(
          (key) => prev[key] !== data[key]
        );
        if (!hasChanges) return prev;
        return { ...prev, ...data };
      });
    }, [data]);

    const handleChange = (fieldName) => (event) => {
      const value = event.target.value;
      setValues((prev) => {
        const newValues = { ...prev, [fieldName]: value };
        // Update store immediately when field changes
        updateNodeField(id, fieldName, value);
        return newValues;
      });
    };

    const resolvedHandles = useMemo(() => {
      const baseHandles =
        typeof config.handles === 'function'
          ? config.handles({ id, values })
          : config.handles || [];
      const dynamicHandles = config.getDynamicHandles
        ? config.getDynamicHandles({ id, values })
        : [];
      return [...baseHandles, ...dynamicHandles];
    }, [config.handles, config.getDynamicHandles, id, values]);

    const sizeStyle = config.getSize ? config.getSize({ values }) : {};

    return (
      <div
        className={`node-card node-${config.type || 'generic'}`}
        style={sizeStyle}
      >
        <div className="node-header">
          <div>
            <p className="node-eyebrow">{config.category || 'Node'}</p>
            <h4 className="node-title">{config.title}</h4>
            {config.subtitle && <p className="node-subtitle">{config.subtitle}</p>}
          </div>
          {config.badge && <span className="node-badge">{config.badge}</span>}
        </div>

        <div className="node-body">
          {(config.fields || []).map((field) => (
            <label className="node-field" key={field.name}>
              <span>{field.label}</span>
              {renderFieldControl({
                field,
                value: values[field.name],
                onChange: handleChange(field.name),
              })}
            </label>
          ))}
          {config.renderBody && config.renderBody({ id, values, onChange: handleChange })}
        </div>

        {resolvedHandles.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type={handle.type}
            position={handle.position || Position.Right}
            style={{
              top: handle.top,
              bottom: handle.bottom,
              left: handle.left,
              right: handle.right,
              ...handle.style,
            }}
            isConnectable={handle.isConnectable !== false}
          />
        ))}
      </div>
    );
  };

  NodeComponent.displayName = `${config.title || 'Node'}Component`;
  return NodeComponent;
};



