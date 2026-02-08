import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BarChart = ({ data, categoryKey, valueKey }) => {
    if (!data || data.length === 0) return <div className="text-gray-500 text-sm">No data available</div>;

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                    <XAxis type="number" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey={categoryKey} stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} width={100} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                        itemStyle={{ color: '#F3F4F6' }}
                        cursor={{ fill: '#374151', opacity: 0.4 }}
                    />
                    <Bar dataKey={valueKey} fill="#34D399" radius={[0, 4, 4, 0]} barSize={20} />
                </ReBarChart>
            </ResponsiveContainer>
        </div>
    );
};
