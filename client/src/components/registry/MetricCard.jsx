import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrendingUp, TrendingDown } from 'lucide-react';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const MetricCard = ({ label, value, trend, className }) => {
    const isPositive = trend && trend.startsWith('+');
    return (
        <div className={cn("bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group", className)}>
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</h3>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                {trend && (
                    <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg border",
                        isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {trend}
                    </div>
                )}
            </div>
        </div>
    );
};
