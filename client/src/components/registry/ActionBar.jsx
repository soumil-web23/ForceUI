import React from 'react';
import { Download, Share2, MoreHorizontal } from 'lucide-react';

export const ActionBar = ({ actions = ['export', 'share'] }) => {
    return (
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-b-xl">
            {actions.includes('export') && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                    <Download size={16} />
                    Export
                </button>
            )}
            {actions.includes('share') && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                    <Share2 size={16} />
                    Share
                </button>
            )}
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
                <MoreHorizontal size={16} />
            </button>
        </div>
    );
};
