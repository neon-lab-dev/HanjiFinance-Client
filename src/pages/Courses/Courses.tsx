import React from 'react'
import Faq from '../../components/Shared/Faq/Faq'
import CoursesHero from '../../components/Courses/CoursesHero/CoursesHero'
import CousesSection from './CousesSection/CousesSection'
import WhyUs from '../../components/Courses/WhyUs/WhyUs'

const Courses = () => {
  return (
    <div>
        <CoursesHero/>
        <CousesSection/>
        <WhyUs/>
        <Faq/>
    </div>
  )
}

export default Courses