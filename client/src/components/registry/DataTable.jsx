import React from 'react';

export const DataTable = ({ columns = [], rows = [] }) => {
    if (!rows || rows.length === 0) return null;

    // Auto-generate columns if not provided
    const cols = columns.length > 0 ? columns : Object.keys(rows[0]).map(key => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }));

    return (
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-sm ring-1 ring-white/5">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                        <tr>
                            {cols.map((col) => (
                                <th key={col.key} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 bg-gray-900/50">
                        {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-800/50 transition-colors group">
                                {cols.map((col) => (
                                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-white">
                                        {col.key === 'status' ? (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ring-1 ring-inset ${row[col.key] === 'Exceeded' ? 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/20' :
                                                row[col.key] === 'On Track' ? 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20' :
                                                    'bg-gray-400/10 text-gray-400 ring-gray-400/20'
                                                }`}>
                                                {row[col.key]}
                                            </span>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
