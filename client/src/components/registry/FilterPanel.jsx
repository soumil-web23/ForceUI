import React from 'react';
import { X } from 'lucide-react';

export const FilterPanel = ({ filters = [], onRemove, onClear }) => {
    if (!filters || filters.length === 0) return null;

    return (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-gray-400 mr-2">Active Filters:</span>
            {filters.map((filter, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm">
                    <span>{filter.label || filter}</span>
                </div>
            ))}
            <button
                onClick={onClear}
                className="text-xs text-gray-500 hover:text-white ml-auto underline cursor-pointer"
            >
                Clear all
            </button>
        </div>
    );
};
