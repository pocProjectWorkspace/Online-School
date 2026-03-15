// Parent Dashboard mock data matching Intelligence360 mobile screenshot

export const studentProfile = {
  name: "Rayan Sharma",
  grade: "Year 9 / Grade 9",
  section: "Section B",
  school: "GEMS Wellington International School",
  admissionNo: "GW-2023-4891",
  transcriptAvailable: true,
}

export const attendanceData = {
  overall: 80,
  breakdown: [
    { label: "Sessions Present", value: 58, color: "#2D7DD2" },
    { label: "Sessions Tardy", value: 10, color: "#FFB800" },
    { label: "Authorised Leave", value: 16, color: "#7B5CF0" },
    { label: "Unauthorised Leave", value: 16, color: "#FF4757" },
  ],
}

export const recentCommunication = {
  sender: "GEMS Wellington Admin",
  date: "March 14, 2026",
  subject: "Term 2 Report Cards Available",
  preview: "Dear Parents, Term 2 report cards are now available on the parent portal. Please review your child's progress and reach out to your class teacher if you have any questions.",
}

export const todayTimetable = [
  { time: "08:00 - 08:45", subject: "Mathematics", teacher: "Mr. James Okafor", room: "Room 9B" },
  { time: "09:00 - 09:45", subject: "English Language", teacher: "Ms. Rachel Green", room: "Room 7A" },
  { time: "10:00 - 10:45", subject: "Science — Biology", teacher: "Dr. Ahmed Khalil", room: "Lab 2" },
  { time: "11:00 - 11:45", subject: "History", teacher: "Ms. Laura Bennett", room: "Room 12C" },
  { time: "12:30 - 13:15", subject: "Physical Education", teacher: "Mr. Chris Taylor", room: "Sports Hall" },
  { time: "13:30 - 14:15", subject: "Arabic", teacher: "Ms. Fatima Al Hashimi", room: "Room 5D" },
]

export const interimReport = [
  { subject: "Mathematics", teacher: "Mr. James Okafor", assessment1: "Secure", assessment2: "Excelling" },
  { subject: "English", teacher: "Ms. Rachel Green", assessment1: "Developing", assessment2: "Secure" },
  { subject: "Science", teacher: "Dr. Ahmed Khalil", assessment1: "Secure", assessment2: "Secure" },
  { subject: "History", teacher: "Ms. Laura Bennett", assessment1: "Developing", assessment2: "Developing" },
  { subject: "Arabic", teacher: "Ms. Fatima Al Hashimi", assessment1: "Emerging", assessment2: "Developing" },
  { subject: "PE", teacher: "Mr. Chris Taylor", assessment1: "Excelling", assessment2: "Excelling" },
]

export const feePayments = [
  { id: 1, description: "Term 2 Tuition Fee", amount: "AED 28,500", dueDate: "Feb 15, 2026", status: "paid" },
  { id: 2, description: "Bus Transportation — Term 2", amount: "AED 3,200", dueDate: "Feb 15, 2026", status: "paid" },
  { id: 3, description: "Term 3 Tuition Fee", amount: "AED 28,500", dueDate: "May 1, 2026", status: "pending" },
]

export const reflectionData = {
  moodScore: 3.5,
  maxScore: 5,
  label: "Overall Mood",
}

export const cateringData = {
  walletBalance: "AED 245.00",
  recentTransactions: [
    { date: "Mar 14", item: "Lunch — Chicken Rice Bowl", amount: "-AED 25.00" },
    { date: "Mar 13", item: "Snack — Juice & Muffin", amount: "-AED 12.00" },
  ]
}

export const activityData = [
  { title: "Science Fair 2026", date: "March 22, 2026", description: "Annual science exhibition — Rayan presenting on renewable energy" },
  { title: "Desert Safari Trip", date: "April 5, 2026", description: "Year 9 educational field trip to Al Marmoom Conservation Reserve" },
]

export const gemsRewards = {
  meritPoints: 2050,
  bonusPoints: 1240,
  recentAwards: [
    { title: "Science Excellence", points: 150, date: "Mar 10" },
    { title: "Perfect Attendance — Week 8", points: 50, date: "Mar 7" },
    { title: "Maths Competition Winner", points: 200, date: "Feb 28" },
  ]
}
