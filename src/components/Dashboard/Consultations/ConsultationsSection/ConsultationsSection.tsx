
import DashboardContainer from '../../SharedComponents/DashboardContainer/DashboardContainer'
import ConsultationsCard from '../ConsultationsCard/ConsultationsCard'

const ConsultationsSection = () => {
  return (
    <DashboardContainer headerText="Upcoming Sessions">
      <div className="space-y-4">
        {[0,1,2,3].map(( index) => (
          <ConsultationsCard key={index} />
        ))}
      </div>
    </DashboardContainer>
  )
}

export default ConsultationsSection