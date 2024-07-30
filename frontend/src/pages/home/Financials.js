import React from 'react';
import { Table, Card, Row, Col } from 'antd';

const Financials = () => {

    const spendingData = [
        { key: '1', month: 'January', spending: 1200, income: 3000, savings: 1800 },
        { key: '2', month: 'February', spending: 1500, income: 3200, savings: 1700 },
        { key: '3', month: 'March', spending: 1300, income: 3100, savings: 1800 },
        { key: '4', month: 'April', spending: 1600, income: 3300, savings: 1700 },
        { key: '5', month: 'May', spending: 1400, income: 2900, savings: 1500 },
        { key: '6', month: 'June', spending: 1700, income: 3500, savings: 1800 },
        { key: '7', month: 'July', spending: 1800, income: 3600, savings: 1800 },
        { key: '8', month: 'August', spending: 2000, income: 3700, savings: 1700 },
        { key: '9', month: 'September', spending: 2200, income: 3800, savings: 1600 },
        { key: '10', month: 'October', spending: 2100, income: 3900, savings: 1800 },
        { key: '11', month: 'November', spending: 2300, income: 4000, savings: 1700 },
        { key: '12', month: 'December', spending: 2500, income: 4200, savings: 1700 }
    ];
    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month'
        },
        {
            title: 'Spending ($)',
            dataIndex: 'spending',
            key: 'spending'
        },
        {
            title: 'Income ($)',
            dataIndex: 'income',
            key: 'income'
        },
        {
            title: 'Savings ($)',
            dataIndex: 'savings',
            key: 'savings'
        }
    ];

    const summaryData = spendingData?.reduce(
        (acc, item) => {
            acc.totalSpending += item.spending;
            acc.totalIncome += item.income;
            acc.totalSavings += item.savings;
            return acc;
        },
        { totalSpending: 0, totalIncome: 0, totalSavings: 0 }
    );



    return (
        <div style={{ padding: '0px' }}>
            <Row gutter={16} style={{ marginBottom: '10px' }}>
                <Col span={8}>
                    <Card title="Average Monthly Spending" bordered={false}>
                        ${(summaryData.totalSpending / 12).toFixed(2)}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Average Monthly Income" bordered={false}>
                        ${(summaryData.totalIncome / 12).toFixed(2)}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Average Monthly Savings" bordered={false}>
                        ${(summaryData.totalSavings / 12).toFixed(2)}
                    </Card>
                </Col>
            </Row>
            <Table
                dataSource={spendingData} 
                columns={columns}
                pagination={false}
                title={() => 'Financial Summary 2024'}
                footer={() => (
                    <div>
                        <strong>Total Spending: </strong>${summaryData.totalSpending.toFixed(2)} <br />
                        <strong>Total Income: </strong>${summaryData.totalIncome.toFixed(2)} <br />
                        <strong>Total Savings: </strong>${summaryData.totalSavings.toFixed(2)}
                    </div>
                )} 
            />

        </div>
    );
};

export default Financials;
