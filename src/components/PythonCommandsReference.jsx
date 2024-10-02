import React, { useState, useCallback, memo } from 'react';
import { Code } from 'lucide-react';

const pythonCommands = [
  {
    category: "Data Manipulation (Pandas)",
    commands: [
      {
        name: "pd.read_csv()",
        description: "Read a CSV file into a DataFrame",
        example: "df = pd.read_csv('data.csv')"
      },
      {
        name: "df.head()",
        description: "Display the first few rows of the DataFrame",
        example: "df.head(5)"
      },
      {
        name: "df.describe()",
        description: "Generate descriptive statistics of DataFrame columns",
        example: "df.describe()"
      },
      {
        name: "df.groupby()",
        description: "Group DataFrame using a mapper or by a Series of columns",
        example: "df.groupby('category').mean()"
      },
      {
        name: "df.merge()",
        description: "Merge DataFrame objects by performing a database-style join operation",
        example: "pd.merge(df1, df2, on='key')"
      }
    ]
  },
  {
    category: "Data Visualization (Matplotlib)",
    commands: [
      {
        name: "plt.plot()",
        description: "Plot y versus x as lines and/or markers",
        example: "plt.plot(x, y)"
      },
      {
        name: "plt.scatter()",
        description: "Make a scatter plot of x vs y",
        example: "plt.scatter(x, y)"
      },
      {
        name: "plt.hist()",
        description: "Plot a histogram",
        example: "plt.hist(data, bins=10)"
      },
      {
        name: "plt.bar()",
        description: "Make a bar plot",
        example: "plt.bar(x, height)"
      },
      {
        name: "plt.subplot()",
        description: "Add a subplot to the current figure",
        example: "plt.subplot(2, 2, 1)"
      }
    ]
  },
  {
    category: "Statistical Analysis (NumPy)",
    commands: [
      {
        name: "np.mean()",
        description: "Compute the arithmetic mean along the specified axis",
        example: "np.mean(data)"
      },
      {
        name: "np.median()",
        description: "Compute the median along the specified axis",
        example: "np.median(data)"
      },
      {
        name: "np.std()",
        description: "Compute the standard deviation along the specified axis",
        example: "np.std(data)"
      },
      {
        name: "np.corrcoef()",
        description: "Return correlation coefficient matrix or correlation coefficient",
        example: "np.corrcoef(x, y)"
      },
      {
        name: "np.random.normal()",
        description: "Draw random samples from a normal (Gaussian) distribution",
        example: "np.random.normal(0, 1, 1000)"
      }
    ]
  }
];

const CommandItem = memo(({ command, isExpanded, onToggle }) => (
  <div className="border rounded-lg overflow-hidden">
    <button
      className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-medium">{command.name}</span>
      <Code size={20} />
    </button>
    {isExpanded && (
      <div className="p-2 bg-white">
        <p className="mb-2">{command.description}</p>
        <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
          <code>{command.example}</code>
        </pre>
      </div>
    )}
  </div>
));

const CategoryItem = memo(({ category, index, isExpanded, onToggle, expandedCommand, setExpandedCommand }) => (
  <div className="border rounded-lg overflow-hidden">
    <button
      className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-semibold">{category.category}</span>
      <span>{isExpanded ? '▲' : '▼'}</span>
    </button>
    {isExpanded && (
      <div className="p-4 bg-white space-y-2">
        {category.commands.map((command, commandIndex) => (
          <CommandItem
            key={commandIndex}
            command={command}
            isExpanded={expandedCommand === `${index}-${commandIndex}`}
            onToggle={() => setExpandedCommand(expandedCommand === `${index}-${commandIndex}` ? null : `${index}-${commandIndex}`)}
          />
        ))}
      </div>
    )}
  </div>
));

const PythonCommandsReference = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedCommand, setExpandedCommand] = useState(null);

  const handleCategoryToggle = useCallback((index) => {
    setExpandedCategory(prevIndex => prevIndex === index ? null : index);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Python Commands for Data Analysis</h2>
      <div className="space-y-4">
        {pythonCommands.map((category, index) => (
          <CategoryItem
            key={index}
            category={category}
            index={index}
            isExpanded={expandedCategory === index}
            onToggle={() => handleCategoryToggle(index)}
            expandedCommand={expandedCommand}
            setExpandedCommand={setExpandedCommand}
          />
        ))}
      </div>
    </div>
  );
};

export default PythonCommandsReference;