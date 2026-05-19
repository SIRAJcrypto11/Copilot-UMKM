// src/components/ui/Table.tsx
import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  className?: string;
}

export const Table = <T,>({
  data,
  columns,
  keyExtractor,
  emptyState,
  onRowClick,
  className = '',
}: TableProps<T>) => {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={`w-full overflow-x-auto rounded-[12px] border border-slate-200 ${className}`}>
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest border-b border-slate-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr 
                key={keyExtractor(row, rowIdx)} 
                className={`transition-colors hover:bg-slate-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-6 py-4 ${col.className || ''}`}>
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-slate-400">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
