import React from 'react';
import { Sparkles } from 'lucide-react';

export const InsightPanel = ({ text, type = 'info' }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={48} />
            </div>
            <div className="flex items-start gap-4 z-10 relative">
                <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
                    <Sparkles className="text-indigo-400" size={20} />
                </div>
                <div>
                    <h4 className="text-indigo-200 font-semibold mb-1">AI Insight</h4>
                    <p className="text-indigo-100/90 leading-relaxed text-sm">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};
