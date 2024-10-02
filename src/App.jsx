import React, { useState, lazy, Suspense } from 'react';
import './index.css';

const DataVisualizationLearning = lazy(() => import('./components/DataVisualizationLearning'));
const DataAnalysisFundamentals = lazy(() => import('./components/DataAnalysisFundamentals'));
const InteractiveQuiz = lazy(() => import('./components/InteractiveQuiz'));
const DataAnalysisCheatsheet = lazy(() => import('./components/DataAnalysisCheatsheet'));
const KeyConceptsSummary = lazy(() => import('./components/KeyConceptsSummary'));
const PythonCommandsReference = lazy(() => import('./components/PythonCommandsReference'));

const visualizationConcepts = [
  {
    title: "Data Visualization",
    description: "The graphical representation of information and data using visual elements like charts, graphs, and maps.",
    example: "A bar chart showing sales performance across different regions."
  },
  {
    title: "Chart Types",
    description: "Different forms of visual representation suited for various types of data and analysis goals.",
    example: "Bar charts, line graphs, scatter plots, pie charts, etc."
  },
];

const analysisConcepts = [
  {
    title: "Data Analysis",
    description: "The process of inspecting, cleansing, transforming, and modeling data to discover useful information and support decision-making.",
    example: "Analyzing customer purchase data to identify buying patterns."
  },
  {
    title: "Statistical Measures",
    description: "Numerical values that summarize and describe a set of data.",
    example: "Mean, median, mode, standard deviation, etc."
  },
];

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`py-2 px-4 font-medium ${
      isActive
        ? 'text-primary-600 border-b-2 border-primary-500'
        : 'text-primary-400 hover:text-primary-500'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

function App() {
  const [activeTab, setActiveTab] = useState('visualization');

  const handleQuizComplete = (score) => {
    console.log(`Quiz completed with score: ${score}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'visualization':
        return (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <DataVisualizationLearning />
              <KeyConceptsSummary concepts={visualizationConcepts} />
            </Suspense>
          </>
        );
      case 'fundamentals':
        return (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <DataAnalysisFundamentals />
              <KeyConceptsSummary concepts={analysisConcepts} />
            </Suspense>
          </>
        );
      case 'python-commands':
        return <Suspense fallback={<div>Loading...</div>}><PythonCommandsReference /></Suspense>;
      case 'cheatsheet':
        return <Suspense fallback={<div>Loading...</div>}><DataAnalysisCheatsheet /></Suspense>;
      case 'quiz':
        return <Suspense fallback={<div>Loading...</div>}><InteractiveQuiz onQuizComplete={handleQuizComplete} /></Suspense>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary-800 text-shadow">
            Data Analysis Learning Platform
          </h1>
        </header>

        <main>
          <nav className="flex flex-wrap border-b border-primary-200 mb-6">
            {['visualization', 'fundamentals', 'python-commands', 'cheatsheet', 'quiz'].map((tab) => (
              <TabButton
                key={tab}
                label={tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </nav>

          <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-up">
            {renderContent()}
          </section>
        </main>

        <footer className="mt-12 text-center text-primary-600">
          <p>&copy; {new Date().getFullYear()} Data Analysis Learning Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;