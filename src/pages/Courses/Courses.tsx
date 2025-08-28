
import Faq from '../../components/Shared/Faq/Faq'
import CoursesHero from '../../components/Courses/CoursesHero/CoursesHero'
import CousesSection from '../../components/Courses/CousesSection/CousesSection'
import WhyUs from '../../components/Courses/WhyUs/WhyUs'
import CourseCompleteEdge from '../../components/Courses/CourseCompleteEdge/CourseCompleteEdge'

const Courses = () => {
  return (
    <div>
        <CoursesHero/>
        <CousesSection/>
        <CourseCompleteEdge/>
        <WhyUs/>
        <Faq/>
    </div>
  )
}

export default Courses