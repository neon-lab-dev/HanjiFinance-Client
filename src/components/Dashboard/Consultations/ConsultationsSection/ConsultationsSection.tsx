
import DashboardContainer from '../../SharedComponents/DashboardContainer/DashboardContainer'
import ConsultationsCard from '../ConsultationsCard/ConsultationsCard'
const consultationsData = [
  {
    title: "Chat & Chill",
    subtitle: "with Aman Juneja",
    date: "1 August, 2025",
    time: "07:00 PM",
    duration: "30 min",
    status: "complete",
  },
  {
    title: "Portfolio Review",
    subtitle: "with Rishi Sharma",
    date: "3 August, 2025",
    time: "05:00 PM",
    duration: "45 min",
    status: "upcoming",
  },
  {
    title: "Career Mentorship",
    subtitle: "with Priya Desai",
    date: "5 August, 2025",
    time: "06:30 PM",
    duration: "60 min",
    status: "cancelled",
  },
];
const ConsultationsSection = () => {
  return (
    <DashboardContainer headerText="Upcoming Sessions">
       <div className="flex flex-col gap-4">
      {consultationsData.map((item, index) => (
        <ConsultationsCard
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          date={item.date}
          time={item.time}
          duration={item.duration}
          // status={item.status}
          onJoin={() => console.log(`Joining: ${item.title}`)}
          onCancel={() => console.log(`Cancelled: ${item.title}`)}
        />
      ))}
    </div>
    </DashboardContainer>
  )
}

export default ConsultationsSection