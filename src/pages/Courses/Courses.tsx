import React from 'react'
import Faq from '../../components/Shared/Faq/Faq'
import CoursesHero from '../../components/Courses/CoursesHero/CoursesHero'
import CousesSection from './CousesSection/CousesSection'

const Courses = () => {
  return (
    <div>
        <CoursesHero/>
        <CousesSection/>
        <Faq/>
    </div>
  )
}

export default Courses