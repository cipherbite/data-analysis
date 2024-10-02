import React, { useState, useCallback, memo } from 'react';

const ConceptItem = memo(({ concept, index, isExpanded, onToggle }) => (
  <div className="border rounded-lg overflow-hidden">
    <button
      className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-semibold">{concept.title}</span>
      <span>{isExpanded ? '▲' : '▼'}</span>
    </button>
    {isExpanded && (
      <div className="p-4 bg-white">
        <p>{concept.description}</p>
        {concept.example && (
          <div className="mt-2">
            <strong>Example:</strong> {concept.example}
          </div>
        )}
      </div>
    )}
  </div>
));

const KeyConceptsSummary = ({ concepts }) => {
  const [expandedConcept, setExpandedConcept] = useState(null);

  const handleToggle = useCallback((index) => {
    setExpandedConcept(prevIndex => prevIndex === index ? null : index);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Key Concepts Summary</h2>
      <div className="space-y-4">
        {concepts.map((concept, index) => (
          <ConceptItem
            key={index}
            concept={concept}
            index={index}
            isExpanded={expandedConcept === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyConceptsSummary;