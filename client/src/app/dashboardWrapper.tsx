import Navbar from '@/components/Navbar/page'
import React from 'react'
export const DashboardWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        {/* sidebar */}
        side bar
        <main className='flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64'>
            {/* navbar */}
            <Navbar/>
            {children}
        </main>
    </div>
  )
}

export default DashboardWrapper