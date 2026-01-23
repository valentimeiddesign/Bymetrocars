# Required Dependencies for Excel Import/Export

To enable Excel import/export functionality, you need to install the XLSX library.

## Installation

Run this command in your terminal:

```bash
npm install xlsx
```

Or if you're using yarn:

```bash
yarn add xlsx
```

## TypeScript Types (Optional but Recommended)

```bash
npm install --save-dev @types/xlsx
```

## What is XLSX?

XLSX (SheetJS) is a popular library for parsing and writing Excel files in JavaScript/TypeScript.

### Features:
- ✅ Read .xlsx and .xls files
- ✅ Parse data to JSON
- ✅ Create Excel files from data
- ✅ Works in browser and Node.js
- ✅ Supports formulas, styling, and more

## Usage in Project

The library is used in:
- `/utils/excelImport.ts` - For parsing Excel files
- `/components/CarImportExport.tsx` - For handling file uploads

## Alternative: Manual Installation

If you can't install packages, you can use the CDN version:

```html
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
```

However, this is not recommended for production.

## File Size

- Package size: ~500KB
- Gzipped: ~150KB

This is acceptable for admin functionality that won't be used on every page load.

## Verification

After installation, verify it works:

```typescript
import * as XLSX from 'xlsx';
console.log('XLSX version:', XLSX.version);
```

## Alternative Libraries

If XLSX doesn't work, consider:
- `exceljs` - More features but larger
- `papaparse` - For CSV only (smaller, simpler)
- `xlsx-populate` - Focused on creating Excel files

## CSV Fallback

If Excel import doesn't work, you can use CSV format instead:
- Smaller file size
- Easier to parse
- Universal support
- Works without external libraries

See the `exportCarsToCSV` function in `/utils/excelImport.ts` for CSV export implementation.
