export const processIntent = async (input) => {
    // Fetch mock data
    const response = await fetch('http://localhost:3001/analytics');
    const data = await response.json();

    const lowerInput = input.toLowerCase();

    let components = [];

    // Logic Rules based on requirements
    if (lowerInput.includes('simple') || lowerInput.includes('new') || lowerInput.includes('explain')) {
        // Beginner Intent
        components.push({
            component: 'MetricCard',
            props: { label: data.kpis[0].label, value: data.kpis[0].value, trend: data.kpis[0].trend },
            span: 4
        });
        components.push({
            component: 'InsightPanel',
            props: { text: "Revenue is performing well with a 12% increase compared to last month. Growth is steady across all regions." },
            span: 8
        });
    } else if (lowerInput.includes('everything') || lowerInput.includes('detailed') || lowerInput.includes('deep')) {
        // Power User Intent (Show All)
        components = [
            { component: 'MetricCard', props: data.kpis[0], span: 4 },
            { component: 'MetricCard', props: data.kpis[1], span: 4 },
            { component: 'MetricCard', props: data.kpis[2], span: 4 },
            { component: 'FilterPanel', props: { filters: ['Region: All', 'Date: Last Quarter'] }, span: 12 },
            {
                component: 'LineChart',
                props: { data: data.monthlyRevenue, xKey: 'month', yKey: 'value' },
                span: 8
            },
            {
                component: 'BarChart',
                props: { data: data.revenueByRegion, categoryKey: 'name', valueKey: 'value' },
                span: 4
            },
            {
                component: 'DataTable',
                props: { rows: data.detailedTable },
                span: 12
            },
            { component: 'ActionBar', props: { actions: ['export', 'share'] }, span: 12 }
        ];
    } else if (lowerInput.includes('group') || lowerInput.includes('break') || lowerInput.includes('compare')) {
        // Breakdown Intent
        components.push({ component: 'FilterPanel', props: { filters: ['GroupBy: Region'] }, span: 12 });
        components.push({
            component: 'BarChart',
            props: { data: data.revenueByRegion, categoryKey: 'name', valueKey: 'value' },
            span: 6
        });
        components.push({
            component: 'DataTable',
            props: { rows: data.detailedTable },
            span: 6
        });
    } else {
        // Default / "Show sales performance"
        components.push({ component: 'MetricCard', props: data.kpis[0], span: 4 });
        components.push({
            component: 'LineChart',
            props: { data: data.monthlyRevenue, xKey: 'month', yKey: 'value' },
            span: 8
        });
        components.push({
            component: 'InsightPanel',
            props: { text: "Sales performance is strong. Check the monthly trend for details." },
            span: 12
        });
    }

    return { layout: components };
};
