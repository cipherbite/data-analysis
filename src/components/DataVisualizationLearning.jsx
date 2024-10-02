import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const initialData = [
  { name: 'A', value: 10 },
  { name: 'B', value: 15 },
  { name: 'C', value: 8 },
  { name: 'D', value: 12 },
];

// Memoized components for better performance
const ExplanationBox = React.memo(({ title, content, isOpen, onToggle }) => (
  <div className="mb-4 border rounded p-4 bg-primary-50">
    <button 
      className="font-bold text-left w-full flex justify-between items-center text-primary-700"
      onClick={onToggle}
    >
      {title}
      <span>{isOpen ? '▼' : '▶'}</span>
    </button>
    {isOpen && <p className="mt-2 text-primary-800">{content}</p>}
  </div>
));

const DataVisualizationLearning = () => {
  const [data, setData] = useState(initialData);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [showExplanation, setShowExplanation] = useState({});
  const [stats, setStats] = useState({ mean: 0, median: 0, mode: 0 });
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Memoized calculation of statistics
  const calculateStats = useCallback(() => {
    const values = data.map(item => item.value);
    if (values.length === 0) {
      return { mean: 0, median: 0, mode: 0 };
    }
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues[Math.floor(sortedValues.length / 2)];
    
    const frequency = {};
    let maxFrequency = 0;
    let mode = values[0];
    for (const value of values) {
      frequency[value] = (frequency[value] || 0) + 1;
      if (frequency[value] > maxFrequency) {
        maxFrequency = frequency[value];
        mode = value;
      }
    }
    
    return { mean, median, mode };
  }, [data]);

  // Update stats when data changes
  useEffect(() => {
    setStats(calculateStats());
  }, [calculateStats]);

  // Memoized functions for better performance
  const addDataPoint = useCallback(() => {
    if (newName && newValue) {
      setData(prevData => [...prevData, { name: newName, value: parseInt(newValue, 10) }]);
      setNewName('');
      setNewValue('');
    }
  }, [newName, newValue]);

  const removeDataPoint = useCallback((index) => {
    setData(prevData => prevData.filter((_, i) => i !== index));
  }, []);

  const toggleExplanation = useCallback((key) => {
    setShowExplanation(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleQuizSubmit = useCallback(() => {
    const meanValue = stats.mean.toFixed(2);
    if (quizAnswer === meanValue) {
      setQuizFeedback('Correct! Great job calculating the mean.');
    } else {
      setQuizFeedback(`Not quite. The correct answer is ${meanValue}. Try again!`);
    }
  }, [quizAnswer, stats.mean]);

  // Memoized chart component
  const ChartComponent = useMemo(() => (
    <div className="h-64 border p-4 rounded">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  ), [data, chartType]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary-800">Data Visualization Learning Lab</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Step 1: Understand Your Data</h2>
        <ExplanationBox
          title="What is data?"
          content="Data are individual facts or pieces of information. In this lab, each data point consists of a name (category) and a value (number)."
          isOpen={showExplanation.data}
          onToggle={() => toggleExplanation('data')}
        />
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Your Data Points:</h3>
          <ul className="list-disc pl-5">
            {data.map((item, index) => (
              <li key={index} className="mb-1">
                {item.name}: {item.value}
                <button 
                  onClick={() => removeDataPoint(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Step 2: Add New Data</h2>
        <ExplanationBox
          title="Why add data?"
          content="Adding more data points helps us see patterns and trends more clearly. It also affects our statistical calculations."
          isOpen={showExplanation.addData}
          onToggle={() => toggleExplanation('addData')}
        />
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-1/3 rounded"
          />
          <input
            type="number"
            placeholder="Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="border p-2 w-1/3 rounded"
          />
          <button 
            onClick={addDataPoint}
            className="bg-primary-500 text-white p-2 rounded hover:bg-primary-600 transition-colors"
          >
            Add Data Point
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Step 3: Visualize Your Data</h2>
        <ExplanationBox
          title="Why visualize data?"
          content="Data visualization helps us understand patterns and trends that might be hard to see in raw numbers. Different chart types can reveal different aspects of your data."
          isOpen={showExplanation.visualization}
          onToggle={() => toggleExplanation('visualization')}
        />
        <div className="mb-4">
          <label className="mr-2">Choose a Chart Type:</label>
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
        {ChartComponent}
        <ExplanationBox
          title="Understanding the Chart"
          content={`This ${chartType} chart visualizes your data. The X-axis shows categories (names), while the Y-axis represents values. ${chartType === 'bar' ? 'Each bar\'s height corresponds to its value.' : 'The line connects data points to show trends.'} Hover over elements to see exact values.`}
          isOpen={showExplanation.chart}
          onToggle={() => toggleExplanation('chart')}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Step 4: Analyze Your Data</h2>
        <ExplanationBox
          title="What are these statistics?"
          content="These basic statistics help us understand the central tendencies and patterns in our data. They give us a quick summary of what our data looks like."
          isOpen={showExplanation.stats}
          onToggle={() => toggleExplanation('stats')}
        />
        <div className="mt-4 bg-primary-50 p-4 rounded">
          <p><strong>Mean:</strong> {stats.mean.toFixed(2)} (average of all values)</p>
          <p><strong>Median:</strong> {stats.median} (middle value when data is ordered)</p>
          <p><strong>Mode:</strong> {stats.mode} (most frequent value)</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Step 5: Test Your Understanding</h2>
        <p className="mb-2">Calculate the mean of the data points and enter your answer:</p>
        <input
          type="number"
          value={quizAnswer}
          onChange={(e) => setQuizAnswer(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleQuizSubmit}
          className="bg-secondary-500 text-white p-2 rounded hover:bg-secondary-600 transition-colors"
        >
          Check Answer
        </button>
        {quizFeedback && (
          <p className={`mt-2 ${quizFeedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {quizFeedback}
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Key Learning Points</h2>
        <ul className="list-disc pl-5 space-y-2 text-primary-800">
          <li>Data visualization transforms numbers into visual representations, making patterns easier to spot.</li>
          <li>Different chart types (like bar and line charts) can highlight different aspects of your data.</li>
          <li>Basic statistics (mean, median, mode) provide a summary of your data's central tendencies.</li>
          <li>Adding or removing data points affects both the visualization and the statistical calculations.</li>
          <li>Practice calculating statistics manually to deepen your understanding of what they represent.</li>
        </ul>
      </div>
    </div>
  );
};

export default DataVisualizationLearning;