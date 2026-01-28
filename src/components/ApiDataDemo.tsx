import React, { useState, useEffect } from 'react';
import { fetchApiData, API_ENDPOINTS } from '../utils/api';

/**
 * Component that demonstrates the /api/data endpoint
 * This shows how to fetch and display JSON data from the API
 */
export function ApiDataDemo() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchApiData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Data Demo</h1>
        
        {/* API Endpoint Information */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3">API Endpoint:</h2>
          <code className="bg-white px-4 py-2 rounded block text-sm break-all">
            {API_ENDPOINTS.apiData}
          </code>
          <p className="text-sm text-gray-600 mt-3">
            This endpoint returns all data from the "data" table in JSON format
          </p>
        </div>

        {/* Data Display */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Data Records {!loading && `(${data.length})`}
            </h2>
            <button
              onClick={loadData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No data available
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <div className="overflow-x-auto">
              {/* JSON View */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">JSON Response:</h3>
                <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96 text-xs">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>

              {/* Table View */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Table View:</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {data[0] && Object.keys(data[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((value, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {typeof value === 'object'
                              ? JSON.stringify(value)
                              : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Usage Example */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Usage Example:</h2>
          <pre className="bg-white p-4 rounded text-sm overflow-auto">
{`// Import the API utility
import { fetchApiData } from './utils/api';

// Fetch data
const data = await fetchApiData();
console.log(data);

// Or use fetch directly
const response = await fetch('${API_ENDPOINTS.apiData}');
const data = await response.json();`}
          </pre>
        </div>
      </div>
    </div>
  );
}
