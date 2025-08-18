import React from 'react'
import WelcomeSection from '../../components/Dashboard/DashboardPage/WelcomeSectoin/WelcomeSection'
import StatusSectoin from '../../components/Dashboard/SharedComponents/StatusSectoin/StatusSectoin'

const Dashboard = () => {
  return (
    <div className='space-y-6'>
        <WelcomeSection/>
        <StatusSectoin/>
    </div>
  )
}

export default Dashboard