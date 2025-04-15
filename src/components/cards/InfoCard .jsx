import React from 'react'

const InfoCard  = ({icon, label, value, color, bgColor}) => {
  return (
    <div className={`flex gap-6 ${bgColor} p-6 rounded-2xl shadow-md shadow-gray-100 broder border-gray-200/50`}>
        <div className={`w-14 h14 flex items-center justify-center text-[26px] text-gray-900 ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
            <span className='text-[22px]'>MMK {value}</span>
        </div>
    </div>
    
  )
}

export default InfoCard 
