// src/components/shared/DataTable.tsx
// Wrapper for ui/Table that might include pagination/filtering later
import React from 'react';
import { Table, TableProps } from '../ui/Table';

export const DataTable = <T,>(props: TableProps<T>) => {
  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 overflow-hidden">
      <Table {...props} className="border-none" />
    </div>
  );
};

export default DataTable;
