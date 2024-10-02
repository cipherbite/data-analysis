import React from 'react';

const cheatsheetData = [
  ['Data Analysis', 'Python', 'Excel/Sheets', 'Description'],
  ['Technique', 'Function', 'Function', ''],
  ['Mean (Average)', 'np.mean(data)', '=AVERAGE(range)', 'Sum of values / count'],
  ['Median', 'np.median(data)', '=MEDIAN(range)', 'Middle value in sorted set'],
  ['Mode', 'stats.mode(data)', '=MODE(range)', 'Most frequent value'],
  ['Standard Dev', 'np.std(data)', '=STDEV(range)', 'Measure of spread'],
  ['Variance', 'np.var(data)', '=VAR(range)', 'Squared standard deviation'],
  ['Correlation', 'np.corrcoef(x, y)', '=CORREL(range1, range2)', 'Measure of relationship'],
  ['Sum', 'np.sum(data)', '=SUM(range)', 'Total of all values'],
  ['Count', 'len(data)', '=COUNT(range)', 'Number of values'],
  ['Minimum', 'np.min(data)', '=MIN(range)', 'Smallest value'],
  ['Maximum', 'np.max(data)', '=MAX(range)', 'Largest value'],
  ['Percentile', 'np.percentile(data, q)', '=PERCENTILE(range, k)', 'kth percentile of data'],
  ['Frequency', 'pd.value_counts(data)', '=COUNTIF(range, criteria)', 'Count of specific values'],
  ['Data Visualization', 'Matplotlib/Seaborn', 'Charts', 'Purpose'],
  ['Line Plot', 'plt.plot(x, y)', 'Line Chart', 'Show trends over time'],
  ['Bar Plot', 'plt.bar(x, height)', 'Bar Chart', 'Compare categories'],
  ['Scatter Plot', 'plt.scatter(x, y)', 'Scatter Chart', 'Show relationship'],
  ['Histogram', 'plt.hist(data)', 'Histogram', 'Show distribution'],
  ['Box Plot', 'sns.boxplot(data)', 'Box and Whisker', 'Show data distribution'],
];

const quickTips = [
  'Always start with data exploration: check for missing values, outliers, and basic statistics.',
  'Use appropriate visualizations based on your data type and what you want to communicate.',
  'Consider the scale of your data when choosing between mean (sensitive to outliers) and median.',
  'Use correlation to identify relationships, but remember: correlation doesn\'t imply causation.',
  'When working with large datasets, consider using sampling techniques for faster analysis.',
];

const DataAnalysisCheatsheet = () => {
  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Data Analysis Cheatsheet</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {cheatsheetData[0].map((header, index) => (
                <th key={index} className="border p-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cheatsheetData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2 font-mono text-sm">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Quick Tips:</h3>
        <ol className="list-decimal list-inside">
          {quickTips.map((tip, index) => (
            <li key={index} className="mb-1">{tip}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DataAnalysisCheatsheet;