import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["yellow", "green", "orange"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name:"Total Balance", amount: totalBalance},
        {name:"Total Expense", amount: totalExpense},
        {name:"Total Income", amount: totalIncome},
    ];

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Your Financial Overview</h5>
        </div>

        <CustomPieChart 
            data={balanceData}
            label="Total Balance"
            totalAmount={`MMK${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview