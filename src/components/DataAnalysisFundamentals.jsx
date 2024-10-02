import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Initial dataset
const initialData = [
  { id: 1, name: 'Alice', age: 25, city: 'New York', salary: 50000 },
  { id: 2, name: 'Bob', age: 30, city: 'Los Angeles', salary: 60000 },
  { id: 3, name: 'Charlie', age: 35, city: 'Chicago', salary: 70000 },
  { id: 4, name: 'David', age: 28, city: 'New York', salary: 55000 },
  { id: 5, name: 'Eva', age: 22, city: 'Los Angeles', salary: 48000 },
  { id: 6, name: 'Frank', age: 40, city: 'Chicago', salary: 80000 },
  { id: 7, name: 'Grace', age: 32, city: 'New York', salary: 65000 },
  { id: 8, name: 'Henry', age: 27, city: 'Los Angeles', salary: 52000 },
  { id: 9, name: 'Ivy', age: 38, city: 'Chicago', salary: 75000 },
  { id: 10, name: 'Jack', age: 29, city: 'New York', salary: 58000 },
];

// Reusable components
const CodeBlock = React.memo(({ code }) => (
  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
    <code>{code}</code>
  </pre>
));

const TableHeader = React.memo(({ headers }) => (
  <thead>
    <tr className="bg-gray-100">
      {headers.map((header, index) => (
        <th key={index} className="border border-gray-300 p-2">{header}</th>
      ))}
    </tr>
  </thead>
));

const DataTable = React.memo(({ data, headers, rowRenderer }) => (
  <table className="w-full border-collapse border border-gray-300">
    <TableHeader headers={headers} />
    <tbody>
      {data.map(rowRenderer)}
    </tbody>
  </table>
));

const FilterInput = React.memo(({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded"
  />
));

const FilterSelect = React.memo(({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
));

// Main component
const DataAnalysisFundamentals = () => {
  // State management
  const [data] = useState(initialData);
  const [filteredData, setFilteredData] = useState(data);
  const [ageFilter, setAgeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [groupBy, setGroupBy] = useState('');

  // Data filtering logic
  const filterData = useCallback(() => {
    let result = data;
    if (ageFilter) {
      result = result.filter(item => item.age >= parseInt(ageFilter));
    }
    if (cityFilter) {
      result = result.filter(item => item.city === cityFilter);
    }
    if (salaryFilter) {
      result = result.filter(item => item.salary >= parseInt(salaryFilter));
    }
    setFilteredData(result);
  }, [ageFilter, cityFilter, salaryFilter, data]);

  // Apply filters when they change
  useEffect(() => {
    filterData();
  }, [filterData]);

  // Data grouping logic
  const groupedData = useMemo(() => {
    if (!groupBy) return filteredData;
    const groups = {};
    filteredData.forEach(item => {
      const key = item[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return Object.entries(groups).map(([key, value]) => ({
      [groupBy]: key,
      count: value.length,
      avgAge: value.reduce((sum, item) => sum + item.age, 0) / value.length,
      avgSalary: value.reduce((sum, item) => sum + item.salary, 0) / value.length
    }));
  }, [groupBy, filteredData]);

  // Calculate statistics
  const stats = useMemo(() => {
    const ages = filteredData.map(item => item.age);
    const salaries = filteredData.map(item => item.salary);
    return {
      count: filteredData.length,
      avgAge: ages.length ? ages.reduce((sum, age) => sum + age, 0) / ages.length : 0,
      minAge: ages.length ? Math.min(...ages) : 0,
      maxAge: ages.length ? Math.max(...ages) : 0,
      avgSalary: salaries.length ? salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length : 0,
      minSalary: salaries.length ? Math.min(...salaries) : 0,
      maxSalary: salaries.length ? Math.max(...salaries) : 0
    };
  }, [filteredData]);

  // Row renderers for tables
  const renderDataRow = useCallback((item) => (
    <tr key={item.id}>
      <td className="border border-gray-300 p-2">{item.name}</td>
      <td className="border border-gray-300 p-2">{item.age}</td>
      <td className="border border-gray-300 p-2">{item.city}</td>
      <td className="border border-gray-300 p-2">${item.salary}</td>
    </tr>
  ), []);

  const renderGroupedDataRow = useCallback((item, index) => (
    <tr key={index}>
      <td className="border border-gray-300 p-2">{item[groupBy] || 'Total'}</td>
      <td className="border border-gray-300 p-2">{item.count}</td>
      <td className="border border-gray-300 p-2">{item.avgAge ? item.avgAge.toFixed(2) : 'N/A'}</td>
      <td className="border border-gray-300 p-2">${item.avgSalary ? item.avgSalary.toFixed(2) : 'N/A'}</td>
    </tr>
  ), [groupBy]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Data Analysis Fundamentals with Python</h1>

      {/* Data Loading and Basic Analysis */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Data Loading and Basic Analysis</h2>
        <p className="mb-4">In Python, you would typically use pandas to load and analyze data. Here's how you might load a CSV file:</p>
        <CodeBlock code={`
import pandas as pd

# Load data from CSV file
data = pd.read_csv('employee_data.csv')

# Display basic information about the dataset
print(data.info())

# Show the first few rows
print(data.head())
        `}/>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Sample Data:</h3>
          <DataTable
            data={data.slice(0, 5)}
            headers={["Name", "Age", "City", "Salary"]}
            rowRenderer={renderDataRow}
          />
        </div>
      </section>

      {/* Data Cleaning */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Data Cleaning</h2>
        <p className="mb-4">Data cleaning involves handling missing values, removing duplicates, and correcting data types:</p>
        <CodeBlock code={`
# Handle missing values
data = data.dropna()

# Remove duplicates
data = data.drop_duplicates()

# Convert salary to numeric type
data['salary'] = pd.to_numeric(data['salary'], errors='coerce')
        `}/>
      </section>

      {/* Filtering Data */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Filtering Data</h2>
        <p className="mb-4">Filtering allows you to focus on specific subsets of your data. In pandas, you can use boolean indexing:</p>
        <CodeBlock code={`
# Filter data for age > 30 and city == 'New York'
filtered_data = data[(data['age'] > 30) & (data['city'] == 'New York')]
print(filtered_data)
        `}/>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Filter Data:</h3>
          <div className="flex space-x-4 mb-4">
            <FilterInput
              type="number"
              placeholder="Min Age"
              value={ageFilter}
              onChange={setAgeFilter}
            />
            <FilterSelect
              value={cityFilter}
              onChange={setCityFilter}
              options={[
                { value: "", label: "All Cities" },
                { value: "New York", label: "New York" },
                { value: "Los Angeles", label: "Los Angeles" },
                { value: "Chicago", label: "Chicago" }
              ]}
            />
            <FilterInput
              type="number"
              placeholder="Min Salary"
              value={salaryFilter}
              onChange={setSalaryFilter}
            />
          </div>
          <DataTable
            data={filteredData}
            headers={["Name", "Age", "City", "Salary"]}
            rowRenderer={renderDataRow}
          />
        </div>
      </section>

      {/* Grouping and Aggregating Data */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Grouping and Aggregating Data</h2>
        <p className="mb-4">Grouping allows you to analyze data by categories. In pandas, you can use the `groupby()` function:</p>
        <CodeBlock code={`
# Group by city and calculate average age and salary
grouped_data = data.groupby('city').agg({
    'age': 'mean',
    'salary': 'mean',
    'id': 'count'
}).reset_index()
print(grouped_data)
        `}/>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Group Data:</h3>
          <FilterSelect
            value={groupBy}
            onChange={setGroupBy}
            options={[
              { value: "", label: "No Grouping" },
              { value: "city", label: "Group by City" }
            ]}
          />
          <DataTable
            data={groupedData}
            headers={[groupBy || 'All Data', "Count", "Average Age", "Average Salary"]}
            rowRenderer={renderGroupedDataRow}
          />
        </div>
      </section>

      {/* Data Visualization */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Visualization</h2>
        <p className="mb-4">Visualizing data helps in understanding patterns and trends. Here's a simple bar chart using the recharts library:</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupedData}>
            <XAxis dataKey={groupBy || 'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgAge" fill="#8884d8" name="Average Age" />
            <Bar dataKey="avgSalary" fill="#82ca9d" name="Average Salary" />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-4">In Python, you would typically use libraries like matplotlib or seaborn for data visualization:</p>
        <CodeBlock code={`
import matplotlib.pyplot as plt

# Create a bar plot
grouped_data.plot(x='city', y=['avgAge', 'avgSalary'], kind='bar')
plt.title('Average Age and Salary by City')
plt.xlabel('City')
plt.ylabel('Value')
plt.show()
        `}/>
      </section>

      {/* Statistical Analysis */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Statistical Analysis</h2>
        <p className="mb-4">Performing statistical analysis helps in understanding the distribution and relationships in your data:</p>
        <CodeBlock code={`
# Calculate basic statistics
print(data.describe())

# Calculate correlation between age and salary
correlation = data['age'].corr(data['salary'])
print(f"Correlation between age and salary: {correlation}")
        `}/>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Basic Statistics:</h3>
          <ul className="list-disc pl-5">
            <li>Count: {stats.count}</li>
            <li>Average Age: {stats.avgAge.toFixed(2)}</li>
            <li>Min Age: {stats.minAge}</li>
            <li>Max Age: {stats.maxAge}</li>
            <li>Average Salary: ${stats.avgSalary.toFixed(2)}</li>
            <li>Min Salary: ${stats.minSalary}</li>
            <li>Max Salary: ${stats.maxSalary}</li>
          </ul>
        </div>
      </section>

      {/* Further Learning */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Further Learning</h2>
        <p className="mb-4">To deepen your understanding of data analysis with Python, consider exploring these topics:</p>
        <ul className="list-disc pl-5">
          <li>Advanced pandas operations (e.g., merging dataframes, time series analysis)</li>
          <li>Machine learning with scikit-learn</li>
          <li>Advanced data visualization with Plotly or Bokeh</li>
          <li>Big data processing with PySpark</li>
          <li>Statistical analysis with SciPy</li>
        </ul>
      </section>
    </div>
  );
};

export default DataAnalysisFundamentals;