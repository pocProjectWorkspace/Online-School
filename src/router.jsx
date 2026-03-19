import { createBrowserRouter } from 'react-router-dom'
import MarketingLanding from './pages/MarketingLanding'
import Login from './pages/Login'
import Landing from './pages/Landing'
import StudentShell from './components/student/StudentShell'
import Y3Dashboard from './pages/student/Y3Dashboard'
import Y3Lesson from './pages/student/Y3Lesson'
import Y9Dashboard from './pages/student/Y9Dashboard'
import Y9Intelligence from './pages/student/Y9Intelligence'
import Y9Microsoft365 from './pages/student/Y9Microsoft365'
import Y9ReadingCoach from './pages/student/Y9ReadingCoach'
import Y9SpeakerCoach from './pages/student/Y9SpeakerCoach'
import Y9Reflect from './pages/student/Y9Reflect'
import Y9Assignments from './pages/student/Y9Assignments'
import Y9Lesson from './pages/student/Y9Lesson'
import TeacherShell from './components/teacher/TeacherShell'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import ClassRoster from './pages/teacher/ClassRoster'
import ClassIntelligence from './pages/teacher/ClassIntelligence'
import LessonCreator from './pages/teacher/LessonCreator'
import ParentShell from './components/parent/ParentShell'
import ParentDashboard from './pages/parent/ParentDashboard'
import CAT4Report from './pages/parent/CAT4Report'
import NGRTReport from './pages/parent/NGRTReport'
import PsychometricReport from './pages/parent/PsychometricReport'
import WellbeingReport from './pages/parent/WellbeingReport'
import Intelligence360Page from './pages/parent/Intelligence360Page'
import HolisticProfile from './pages/parent/HolisticProfile'
import Parent360Survey from './pages/parent/Parent360Survey'
import Parent360Results from './pages/parent/Parent360Results'

export const router = createBrowserRouter([
  { path: '/', element: <MarketingLanding /> },
  { path: '/login', element: <Login /> },
  { path: '/select-persona', element: <Landing /> },
  {
    element: <StudentShell variant="y3" />,
    children: [
      { path: '/student/y3', element: <Y3Dashboard /> },
    ],
  },
  // Y3 Lesson stays standalone (full-screen immersive experience)
  { path: '/student/y3/lesson/:id', element: <Y3Lesson /> },
  {
    element: <StudentShell variant="y9" />,
    children: [
      { path: '/student/y9', element: <Y9Dashboard /> },
      { path: '/student/y9/intelligence', element: <Y9Intelligence /> },
      { path: '/student/y9/microsoft365', element: <Y9Microsoft365 /> },
      { path: '/student/y9/reading-coach', element: <Y9ReadingCoach /> },
      { path: '/student/y9/speaker-coach', element: <Y9SpeakerCoach /> },
      { path: '/student/y9/reflect', element: <Y9Reflect /> },
      { path: '/student/y9/assignments', element: <Y9Assignments /> },
    ],
  },
  // Y9 Lesson stays standalone (full-screen with its own key terms sidebar)
  { path: '/student/y9/lesson/:id', element: <Y9Lesson /> },
  {
    element: <TeacherShell />,
    children: [
      { path: '/teacher', element: <TeacherDashboard /> },
      { path: '/teacher/roster/:classId', element: <ClassRoster /> },
      { path: '/teacher/intelligence', element: <ClassIntelligence /> },
      { path: '/teacher/lesson/new', element: <LessonCreator /> },
    ],
  },
  {
    element: <ParentShell />,
    children: [
      { path: '/parent', element: <ParentDashboard /> },
      { path: '/parent/cat4', element: <CAT4Report /> },
      { path: '/parent/ngrt', element: <NGRTReport /> },
      { path: '/parent/psychometric', element: <PsychometricReport /> },
      { path: '/parent/wellbeing', element: <WellbeingReport /> },
      { path: '/parent/intelligence360', element: <Intelligence360Page /> },
      { path: '/parent/holistic-profile', element: <HolisticProfile /> },
      { path: '/parent/parent360-survey', element: <Parent360Survey /> },
      { path: '/parent/parent360-results', element: <Parent360Results /> },
    ],
  },
])
