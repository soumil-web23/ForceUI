export const generateAnalyticsData = () => {
    return {
        kpis: [
            { id: 'total-revenue', label: 'Total Revenue', value: '$2,450,000', trend: '+12%' },
            { id: 'active-users', label: 'Active Users', value: '14,230', trend: '+5%' },
            { id: 'growth-rate', label: 'YoY Growth', value: '24%', trend: '+2%' },
        ],
        revenueByRegion: [
            { name: 'North America', value: 1200000 },
            { name: 'Europe', value: 800000 },
            { name: 'Asia', value: 450000 },
        ],
        monthlyRevenue: [
            { month: 'Jan', value: 150000 },
            { month: 'Feb', value: 180000 },
            { month: 'Mar', value: 200000 },
            { month: 'Apr', value: 220000 },
            { month: 'May', value: 250000 },
            { month: 'Jun', value: 280000 },
        ],
        detailedTable: [
             { id: 1, region: 'North America', sales: 1200000, growth: '15%', status: 'Exceeded' },
             { id: 2, region: 'Europe', sales: 800000, growth: '8%', status: 'On Track' },
             { id: 3, region: 'Asia', sales: 450000, growth: '20%', status: 'Exceeded' },
        ]
    };
};
