import React from 'react';
import { MetricCard } from './registry/MetricCard';
import { LineChart } from './registry/LineChart';
import { BarChart } from './registry/BarChart';
import { DataTable } from './registry/DataTable';
import { FilterPanel } from './registry/FilterPanel';
import { InsightPanel } from './registry/InsightPanel';
import { ActionBar } from './registry/ActionBar';

const COMPONENT_MAP = {
    'MetricCard': MetricCard,
    'LineChart': LineChart,
    'BarChart': BarChart,
    'DataTable': DataTable,
    'FilterPanel': FilterPanel,
    'InsightPanel': InsightPanel,
    'ActionBar': ActionBar
};

export const TamboCanvas = ({ layout, onReset, onUpdateLayout }) => {
    if (!layout || layout.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center flex-col gap-6 relative overflow-hidden">
                {/* Abstract background blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700 shadow-2xl shadow-indigo-900/20">
                        <svg className="w-10 h-10 text-indigo-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-gray-200">Ready to Analyze</h3>
                        <p className="text-gray-500 max-w-sm">Use the suggested queries or ask a question to generate your dashboard.</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleFilterRemove = (componentIndex, filterIndex) => {
        if (!onUpdateLayout) return;
        const newLayout = [...layout];
        const component = { ...newLayout[componentIndex] };

        // Deep copy filters array to modify it
        if (component.props && component.props.filters) {
            const newFilters = [...component.props.filters];
            newFilters.splice(filterIndex, 1);
            component.props = { ...component.props, filters: newFilters };

            // If no filters left, maybe remove the component? For now just update it.
            if (newFilters.length === 0) {
                newLayout.splice(componentIndex, 1);
            } else {
                newLayout[componentIndex] = component;
            }
            onUpdateLayout(newLayout);
        }
    };


    return (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#0B0F19] scrollbar-thin scrollbar-thumb-gray-800">
            <div className="grid grid-cols-12 gap-6 w-full">
                {layout.map((item, index) => {
                    const Component = COMPONENT_MAP[item.component];
                    if (!Component) return null;

                    // Simple grid logic based on component type or hypothetical 'span' prop
                    const colSpan = item.span || (item.component === 'MetricCard' ? 3 : item.component === 'InsightPanel' ? 12 : 6);
                    const className = `col-span-12 md:col-span-${colSpan} animate-fade-in-up`;
                    const style = { animationDelay: `${index * 100}ms` };

                    // Inject handlers for FilterPanel
                    const extraProps = {};
                    if (item.component === 'FilterPanel') {
                        extraProps.onClear = onReset;
                        extraProps.onRemove = (filterIdx) => handleFilterRemove(index, filterIdx);
                    }

                    return (
                        <div key={index} className={className} style={style}>
                            <Component {...item.props} {...extraProps} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
