// Microsoft 365 Education mock data for Year 9 student

export const myClasses = [
  { id: 'maths-9b', name: 'Mathematics 9B', teacher: 'Mr. James Okafor', members: 28, unread: 3, color: '#2D7DD2', recentActivity: 'New assignment: Quadratic Equations Practice' },
  { id: 'science-9b', name: 'Science — Biology 9B', teacher: 'Dr. Ahmed Khalil', members: 26, unread: 1, color: '#00E5A0', recentActivity: 'Shared: Cell Biology Revision Notes' },
  { id: 'english-9b', name: 'English Language 9B', teacher: 'Ms. Rachel Green', members: 30, unread: 0, color: '#7B5CF0', recentActivity: 'Discussion: Poetry Analysis due Friday' },
  { id: 'history-9b', name: 'History 9B', teacher: 'Ms. Laura Bennett', members: 27, unread: 2, color: '#FFB800', recentActivity: 'Catch-up materials posted for missed sessions' },
  { id: 'arabic-9b', name: 'Arabic 9B', teacher: 'Ms. Fatima Al Hashimi', members: 24, unread: 0, color: '#FF4757', recentActivity: 'Vocabulary quiz results published' },
  { id: 'pe-9b', name: 'Physical Education 9B', teacher: 'Mr. Chris Taylor', members: 30, unread: 0, color: '#00D4FF', recentActivity: 'Sports Day sign-up open' },
]

export const classmates = [
  { id: 1, name: 'Amir Hassan', status: 'online', avatar: 'AH' },
  { id: 2, name: 'Sara Al Mazrouei', status: 'online', avatar: 'SM' },
  { id: 3, name: 'Yusuf Rahman', status: 'online', avatar: 'YR' },
  { id: 4, name: 'Fatima Noor', status: 'away', avatar: 'FN' },
  { id: 5, name: 'Omar Khalid', status: 'away', avatar: 'OK' },
  { id: 6, name: 'Hessa Al Falasi', status: 'offline', avatar: 'HF' },
  { id: 7, name: 'Ibrahim Patel', status: 'online', avatar: 'IP' },
  { id: 8, name: 'Layla Al Suwaidi', status: 'offline', avatar: 'LS' },
  { id: 9, name: 'Tariq Siddiqui', status: 'online', avatar: 'TS' },
  { id: 10, name: 'Noura Al Dhaheri', status: 'away', avatar: 'ND' },
  { id: 11, name: 'Khalid Mahmoud', status: 'offline', avatar: 'KM' },
  { id: 12, name: 'Mariam Al Qasimi', status: 'online', avatar: 'MQ' },
]

export const assignments = [
  { id: 1, title: 'Quadratic Equations — Problem Set 4', subject: 'Mathematics', teacher: 'Mr. Okafor', due: 'Mar 17, 2026', status: 'pending', points: 20, rubric: true },
  { id: 2, title: 'Cell Biology Lab Report', subject: 'Science', teacher: 'Dr. Khalil', due: 'Mar 18, 2026', status: 'pending', points: 30, rubric: true },
  { id: 3, title: 'Poetry Analysis Essay', subject: 'English', teacher: 'Ms. Green', due: 'Mar 21, 2026', status: 'pending', points: 25, rubric: false },
  { id: 4, title: 'Forces Experiment Report', subject: 'Science', teacher: 'Dr. Khalil', due: 'Mar 18, 2026', status: 'submitted', points: 30, grade: '27/30', rubric: true },
  { id: 5, title: 'Algebra Revision Quiz', subject: 'Mathematics', teacher: 'Mr. Okafor', due: 'Mar 10, 2026', status: 'graded', points: 15, grade: '14/15', rubric: false },
  { id: 6, title: 'WW2 Causes Timeline', subject: 'History', teacher: 'Ms. Bennett', due: 'Mar 12, 2026', status: 'graded', points: 20, grade: '15/20', rubric: true },
  { id: 7, title: 'Arabic Vocabulary Test', subject: 'Arabic', teacher: 'Ms. Al Hashimi', due: 'Mar 14, 2026', status: 'graded', points: 10, grade: '8/10', rubric: false },
]

export const readingCoachData = {
  totalSessions: 12,
  avgFluency: 142, // words per minute
  avgAccuracy: 94, // percent
  streak: 5,
  recentSessions: [
    { date: 'Mar 14', passage: 'The Great Barrier Reef', wpm: 148, accuracy: 96, mispronounced: ['ecosystem', 'biodiversity'], duration: '3:24' },
    { date: 'Mar 12', passage: 'The Industrial Revolution', wpm: 140, accuracy: 93, mispronounced: ['manufacturing', 'mechanisation'], duration: '4:10' },
    { date: 'Mar 10', passage: 'Climate Change Effects', wpm: 138, accuracy: 92, mispronounced: ['phenomenon', 'unprecedented'], duration: '3:55' },
  ],
  challengeWords: ['phenomenon', 'unprecedented', 'biodiversity', 'mechanisation', 'photosynthesis', 'equilibrium'],
  progress: [
    { week: 'W1', wpm: 125, accuracy: 88 },
    { week: 'W2', wpm: 130, accuracy: 89 },
    { week: 'W3', wpm: 132, accuracy: 90 },
    { week: 'W4', wpm: 136, accuracy: 91 },
    { week: 'W5', wpm: 138, accuracy: 92 },
    { week: 'W6', wpm: 142, accuracy: 94 },
  ],
}

export const speakerCoachData = {
  sessionsCompleted: 4,
  avgPace: 'Good',
  fillerWordReduction: 35, // percent improvement
  recentSession: {
    topic: 'Renewable Energy Presentation',
    duration: '4:32',
    pace: 128, // words per minute (target: 120-150)
    paceRating: 'Good',
    fillerWords: 6,
    monotone: 12, // percent of time
    feedback: [
      { type: 'positive', text: 'Good eye contact reminders at 1:20 and 3:45' },
      { type: 'positive', text: 'Pace was within the ideal range throughout' },
      { type: 'improve', text: 'Reduce filler words (um, like) — 6 detected' },
      { type: 'improve', text: 'Vary pitch more in the conclusion section' },
    ],
  },
}

export const reflectData = {
  currentMood: null, // not yet submitted today
  history: [
    { date: 'Mar 14', mood: 4, emoji: '😊', note: 'Good day — maths went well' },
    { date: 'Mar 13', mood: 3, emoji: '😐', note: 'Tired after PE' },
    { date: 'Mar 12', mood: 4, emoji: '😊', note: '' },
    { date: 'Mar 11', mood: 2, emoji: '😔', note: 'History test was hard' },
    { date: 'Mar 10', mood: 5, emoji: '🤩', note: 'Got top score in maths quiz!' },
    { date: 'Mar 7', mood: 3, emoji: '😐', note: '' },
    { date: 'Mar 6', mood: 4, emoji: '😊', note: 'Good group project in science' },
  ],
  weeklyAvg: 3.6,
  monthlyTrend: 'stable',
}

export const notebookSections = [
  { subject: 'Mathematics', pages: 14, lastEdited: 'Today', color: '#2D7DD2', handouts: 6, notes: 8 },
  { subject: 'Science', pages: 11, lastEdited: 'Yesterday', color: '#00E5A0', handouts: 5, notes: 6 },
  { subject: 'English', pages: 9, lastEdited: '2 days ago', color: '#7B5CF0', handouts: 4, notes: 5 },
  { subject: 'History', pages: 7, lastEdited: '3 days ago', color: '#FFB800', handouts: 3, notes: 4 },
  { subject: 'Arabic', pages: 6, lastEdited: 'Today', color: '#FF4757', handouts: 3, notes: 3 },
]

export const searchCoachData = {
  researchTopics: [
    { title: 'Renewable Energy Sources', subject: 'Science', status: 'in-progress', sources: 4, citations: 3 },
    { title: 'Causes of World War II', subject: 'History', status: 'completed', sources: 6, citations: 5 },
  ],
  skills: [
    { name: 'Source Evaluation', level: 72 },
    { name: 'Citation Formatting', level: 65 },
    { name: 'Keyword Selection', level: 80 },
    { name: 'Fact Checking', level: 58 },
  ],
}

export const insightsData = {
  weeklyTimeSpent: { total: '12h 45m', bySubject: [
    { name: 'Maths', hours: 3.5, color: '#2D7DD2' },
    { name: 'Science', hours: 2.8, color: '#00E5A0' },
    { name: 'English', hours: 2.2, color: '#7B5CF0' },
    { name: 'History', hours: 1.5, color: '#FFB800' },
    { name: 'Arabic', hours: 1.5, color: '#FF4757' },
    { name: 'PE', hours: 1.25, color: '#00D4FF' },
  ]},
  engagementStreak: 7,
  completionRate: 87,
  avgSessionLength: '28 min',
}
