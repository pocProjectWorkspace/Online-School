// Simulates Microsoft Graph API responses

export const mockGraphMe = {
  id: "teacher-sarah-001",
  displayName: "Ms. Sarah Mitchell",
  mail: "sarah.mitchell@gemswestminster.ae",
  jobTitle: "Primary Science Teacher",
  department: "Primary School",
  officeLocation: "GEMS Westminster School — Dubai"
}

export const mockGraphMeJames = {
  id: "teacher-james-001",
  displayName: "Mr. James Okafor",
  mail: "james.okafor@gemswellington.ae",
  jobTitle: "Mathematics Teacher",
  department: "Secondary School",
  officeLocation: "GEMS Wellington International School"
}

export const mockGraphCalendarEvents = {
  value: [
    {
      id: "evt-001",
      subject: "Year 3J Science — The Water Cycle",
      start: { dateTime: "2026-03-15T08:00:00", timeZone: "Asia/Dubai" },
      end: { dateTime: "2026-03-15T09:00:00", timeZone: "Asia/Dubai" },
      location: { displayName: "Microsoft Teams" },
      onlineMeetingUrl: "#mock-teams-link",
      attendees: [{ count: 24 }],
      bodyPreview: "Lesson: The Water Cycle — evaporation, condensation, precipitation"
    },
    {
      id: "evt-002",
      subject: "Year 4B Science — Ecosystems",
      start: { dateTime: "2026-03-15T10:00:00", timeZone: "Asia/Dubai" },
      end: { dateTime: "2026-03-15T11:00:00", timeZone: "Asia/Dubai" },
      location: { displayName: "Microsoft Teams" },
      onlineMeetingUrl: "#mock-teams-link",
      attendees: [{ count: 26 }],
      bodyPreview: "Lesson: Food chains and ecosystems"
    },
    {
      id: "evt-003",
      subject: "Year 5A Science — Forces & Motion",
      start: { dateTime: "2026-03-15T13:00:00", timeZone: "Asia/Dubai" },
      end: { dateTime: "2026-03-15T14:00:00", timeZone: "Asia/Dubai" },
      location: { displayName: "Microsoft Teams" },
      onlineMeetingUrl: "#mock-teams-link",
      attendees: [{ count: 22 }],
      bodyPreview: "Lesson: Newton's laws of motion"
    }
  ]
}

export const mockGraphClasses = {
  value: [
    { id: "class-y3j", displayName: "Year 3J — Primary Science", memberCount: 24, courseNumber: "SCI-Y3J-2026" },
    { id: "class-y4b", displayName: "Year 4B — Primary Science", memberCount: 26, courseNumber: "SCI-Y4B-2026" },
    { id: "class-y5a", displayName: "Year 5A — Primary Science", memberCount: 22, courseNumber: "SCI-Y5A-2026" },
    { id: "class-y3k", displayName: "Year 3K — Primary Science", memberCount: 23, courseNumber: "SCI-Y3K-2026" },
  ]
}

export const mockGraphStudents = [
  { id: "s001", displayName: "Aisha Al Mansoori", grade: "Year 3", attendance: 90, lastActive: "Today", assignmentCompletion: 92, photo: null },
  { id: "s002", displayName: "Omar Khalid", grade: "Year 3", attendance: 85, lastActive: "Yesterday", assignmentCompletion: 78, photo: null },
  { id: "s003", displayName: "Fatima Al Hashimi", grade: "Year 3", attendance: 95, lastActive: "Today", assignmentCompletion: 96, photo: null },
  { id: "s004", displayName: "Yusuf Rahman", grade: "Year 3", attendance: 88, lastActive: "Today", assignmentCompletion: 82, photo: null },
  { id: "s005", displayName: "Sara Al Mazrouei", grade: "Year 3", attendance: 92, lastActive: "Yesterday", assignmentCompletion: 88, photo: null },
  { id: "s006", displayName: "Hamdan Al Ketbi", grade: "Year 3", attendance: 78, lastActive: "2 days ago", assignmentCompletion: 65, photo: null },
  { id: "s007", displayName: "Maryam Noor", grade: "Year 3", attendance: 96, lastActive: "Today", assignmentCompletion: 98, photo: null },
  { id: "s008", displayName: "Ali Al Shamsi", grade: "Year 3", attendance: 89, lastActive: "Today", assignmentCompletion: 84, photo: null },
  { id: "s009", displayName: "Hessa Al Falasi", grade: "Year 3", attendance: 91, lastActive: "Today", assignmentCompletion: 90, photo: null },
  { id: "s010", displayName: "Rashid Ahmed", grade: "Year 3", attendance: 82, lastActive: "Yesterday", assignmentCompletion: 72, photo: null },
  { id: "s011", displayName: "Noura Al Dhaheri", grade: "Year 3", attendance: 94, lastActive: "Today", assignmentCompletion: 95, photo: null },
  { id: "s012", displayName: "Khalid Mahmoud", grade: "Year 3", attendance: 87, lastActive: "Today", assignmentCompletion: 80, photo: null },
  { id: "s013", displayName: "Layla Al Suwaidi", grade: "Year 3", attendance: 93, lastActive: "Today", assignmentCompletion: 91, photo: null },
  { id: "s014", displayName: "Saeed Al Mulla", grade: "Year 3", attendance: 80, lastActive: "3 days ago", assignmentCompletion: 68, photo: null },
  { id: "s015", displayName: "Dana Al Nuaimi", grade: "Year 3", attendance: 97, lastActive: "Today", assignmentCompletion: 99, photo: null },
  { id: "s016", displayName: "Mohammad Hassan", grade: "Year 3", attendance: 86, lastActive: "Yesterday", assignmentCompletion: 76, photo: null },
  { id: "s017", displayName: "Amira Patel", grade: "Year 3", attendance: 90, lastActive: "Today", assignmentCompletion: 87, photo: null },
  { id: "s018", displayName: "Ibrahim Al Zaabi", grade: "Year 3", attendance: 84, lastActive: "Today", assignmentCompletion: 74, photo: null },
  { id: "s019", displayName: "Zainab Al Hosani", grade: "Year 3", attendance: 95, lastActive: "Today", assignmentCompletion: 94, photo: null },
  { id: "s020", displayName: "Ahmed Al Blooshi", grade: "Year 3", attendance: 88, lastActive: "Yesterday", assignmentCompletion: 82, photo: null },
  { id: "s021", displayName: "Reem Al Kaabi", grade: "Year 3", attendance: 91, lastActive: "Today", assignmentCompletion: 88, photo: null },
  { id: "s022", displayName: "Tariq Siddiqui", grade: "Year 3", attendance: 83, lastActive: "Today", assignmentCompletion: 70, photo: null },
  { id: "s023", displayName: "Mariam Al Qasimi", grade: "Year 3", attendance: 96, lastActive: "Today", assignmentCompletion: 97, photo: null },
  { id: "s024", displayName: "Hassan Al Marzooqi", grade: "Year 3", attendance: 85, lastActive: "Yesterday", assignmentCompletion: 78, photo: null },
]

export const mockOneDriveFiles = {
  value: [
    { id: "f001", name: "Water Cycle Lesson Plan.docx", size: 245000, lastModifiedDateTime: "2026-03-10T10:00:00Z", webUrl: "#" },
    { id: "f002", name: "Ecosystems Worksheet.pdf", size: 180000, lastModifiedDateTime: "2026-03-08T14:00:00Z", webUrl: "#" },
    { id: "f003", name: "Forces Quiz — Year 5.docx", size: 120000, lastModifiedDateTime: "2026-03-12T09:00:00Z", webUrl: "#" },
  ]
}

export const mockAssignments = [
  { id: "a001", displayName: "Water Cycle Diagram", dueDateTime: "2026-03-17T23:59:00Z", class: "Year 3J", submitted: 18, total: 24, status: "active" },
  { id: "a002", displayName: "Ecosystems Mind Map", dueDateTime: "2026-03-14T23:59:00Z", class: "Year 4B", submitted: 26, total: 26, status: "closed" },
  { id: "a003", displayName: "Forces Experiment Report", dueDateTime: "2026-03-18T23:59:00Z", class: "Year 5A", submitted: 12, total: 22, status: "active" },
  { id: "a004", displayName: "Plant Growth Journal", dueDateTime: "2026-03-20T23:59:00Z", class: "Year 3K", submitted: 5, total: 23, status: "active" },
  { id: "a005", displayName: "Food Chain Poster", dueDateTime: "2026-03-13T23:59:00Z", class: "Year 4B", submitted: 26, total: 26, status: "closed" },
  { id: "a006", displayName: "States of Matter Quiz", dueDateTime: "2026-03-19T23:59:00Z", class: "Year 3J", submitted: 10, total: 24, status: "active" },
  { id: "a007", displayName: "Solar System Model", dueDateTime: "2026-03-16T23:59:00Z", class: "Year 5A", submitted: 20, total: 22, status: "active" },
  { id: "a008", displayName: "Animal Habitats Worksheet", dueDateTime: "2026-03-11T23:59:00Z", class: "Year 3K", submitted: 23, total: 23, status: "closed" },
]
