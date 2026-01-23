import React, { useState } from 'react';
import { Upload, Download, AlertCircle, CheckCircle, X, FileSpreadsheet } from 'lucide-react';
import { importCarsFromExcel, exportCarsToCSV, downloadCSV } from '../utils/excelImport';
import { fetchAllCars } from '../utils/carApi';
import * as XLSX from 'xlsx';

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

interface CarImportExportProps {
  onImportComplete?: () => void;
}

export function CarImportExport({ onImportComplete }: CarImportExportProps = {}) {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setResult(null);
    setShowResult(false);

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          if (!data) throw new Error('No data read from file');

          let excelData: any[] = [];

          // Парсинг CSV файлу
          if (fileExtension === 'csv') {
            const text = data as string;
            excelData = parseCSV(text);
            console.log('Parsed CSV data:', excelData);
          } 
          // Парсинг Excel файлу
          else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            excelData = XLSX.utils.sheet_to_json(worksheet);
            console.log('Parsed Excel data:', excelData);
          } else {
            throw new Error('Unsupported file format. Please upload .csv, .xlsx, or .xls file.');
          }

          // Імпорт в Supabase
          const importResult = await importCarsFromExcel(excelData as any[]);
          
          setResult(importResult);
          setShowResult(true);
          if (onImportComplete) onImportComplete();
        } catch (error) {
          console.error('Error processing file:', error);
          setResult({
            success: 0,
            failed: 1,
            errors: [error instanceof Error ? error.message : 'Failed to process file'],
          });
          setShowResult(true);
        } finally {
          setImporting(false);
        }
      };
      
      reader.onerror = () => {
        setResult({
          success: 0,
          failed: 1,
          errors: ['Failed to read file'],
        });
        setShowResult(true);
        setImporting(false);
      };
      
      // Читаємо CSV як текст, Excel як binary
      if (fileExtension === 'csv') {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      console.error('Error handling file:', error);
      setResult({
        success: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      });
      setShowResult(true);
      setImporting(false);
    }

    // Очистити input
    event.target.value = '';
  };

  // Парсинг CSV в JSON
  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('CSV file is empty or invalid');

    // Парсинг заголовків
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    // Парсинг рядків
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === 0) continue;
      
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim().replace(/"/g, '') || '';
      });
      data.push(row);
    }

    return data;
  };

  // Парсинг CSV рядка (враховує коми в лапках)
  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // Завантажити всі автомобілі
      const cars = await fetchAllCars();
      
      if (cars.length === 0) {
        alert('No cars to export');
        return;
      }

      // Конвертувати в CSV
      const csvContent = exportCarsToCSV(cars);
      
      // Завантажити файл
      const filename = `cars_export_${new Date().toISOString().split('T')[0]}.csv`;
      downloadCSV(csvContent, filename);
      
      alert(`Successfully exported ${cars.length} cars!`);
    } catch (error) {
      console.error('Error exporting cars:', error);
      alert('Failed to export cars. Check console for details.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[rgb(5,15,35)] mb-6">Import / Export Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="w-12 h-12 text-[rgb(139,130,246)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-2">
              Import from CSV / Excel
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload a CSV or Excel file (.csv, .xlsx, .xls)
            </p>
            
            <label className="block">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                disabled={importing}
                className="hidden"
              />
              <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                importing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[rgb(139,130,246)] text-white hover:bg-[rgb(129,120,236)]'
              }`}>
                {importing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Choose File
                  </>
                )}
              </span>
            </label>

            <div className="mt-4 text-xs text-gray-400">
              <p>Required columns: Make, Model, Year, Price, Mileage</p>
              <a 
                href="/SUPABASE_SETUP.md" 
                target="_blank"
                className="text-[rgb(139,130,246)] hover:underline mt-1 inline-block"
              >
                View format guide →
              </a>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Download className="w-12 h-12 text-[rgb(139,130,246)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[rgb(5,15,35)] mb-2">
              Export to CSV
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Download all cars as a CSV file
            </p>
            
            <button
              onClick={handleExport}
              disabled={exporting}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                exporting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[rgb(139,130,246)] text-white hover:bg-[rgb(129,120,236)]'
              }`}
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export CSV
                </>
              )}
            </button>

            <div className="mt-4 text-xs text-gray-400">
              <p>Exports all cars from database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                {result.success > 0 && result.failed === 0 ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : result.success > 0 ? (
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                )}
                <h3 className="text-xl font-semibold text-[rgb(5,15,35)]">
                  Import Results
                </h3>
              </div>
              <button
                onClick={() => setShowResult(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stats */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium mb-1">Successful</p>
                  <p className="text-3xl font-bold text-green-700">{result.success}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium mb-1">Failed</p>
                  <p className="text-3xl font-bold text-red-700">{result.failed}</p>
                </div>
              </div>
            </div>

            {/* Errors */}
            {result.errors.length > 0 && (
              <div className="flex-1 overflow-y-auto p-6">
                <h4 className="font-semibold text-[rgb(5,15,35)] mb-3">Errors:</h4>
                <div className="space-y-2">
                  {result.errors.map((error, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-6 border-t">
              <button
                onClick={() => setShowResult(false)}
                className="w-full bg-[rgb(139,130,246)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[rgb(129,120,236)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}