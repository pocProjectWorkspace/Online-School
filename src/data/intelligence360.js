// CAT4 data
export const cat4Data = {
  studentName: "Rayan Sharma",
  overallSAS: 130,
  percentileRank: 95,
  globalSAS: 108,
  globalDelta: -14,
  regionalSAS: 114,
  regionalDelta: -20,
  domains: [
    { name: "Verbal", score: 3.5, sas: 121, percentile: 92, color: "#2D7DD2" },
    { name: "Quant", score: 4.3, sas: 140, percentile: 99, color: "#7B5CF0" },
    { name: "Non verbal", score: 2.5, sas: 137, percentile: 99, color: "#B06AF0" },
    { name: "Spatial", score: 3.6, sas: 120, percentile: 91, color: "#00E5A0" },
  ],
  insights: [
    { icon: "\uD83E\uDDE0", title: "Thinking skills", desc: "Balanced reasoning with strong visual patterns." },
    { icon: "\u2699\uFE0F", title: "Classroom support", desc: "Guided literacy and structured multi-step tasks." },
    { icon: "\uD83D\uDCC8", title: "Growth outlook", desc: "Path to 50th percentile through verbal practice." },
  ]
}

// NGRT data
export const ngrtData = {
  studentName: "Rayan Sharma",
  firstSAS: 74,
  recentSAS: 75,
  testsTaken: 2,
  lastTestDate: "12 Jun 2026",
  movement: "improved",
  globalSAS: 108,
  globalDelta: -32,
  regionalSAS: 114,
  regionalDelta: -38,
  bandRank: 2,
  globalAvgBand: 3.5,
  domains: [
    { name: "Verbal", score: 3.5, color: "#2D7DD2" },
    { name: "Quant", score: 4.3, color: "#7B5CF0" },
    { name: "Non verbal", score: 2.5, color: "#B06AF0" },
    { name: "Spatial", score: 3.6, color: "#00E5A0" },
  ],
  recommendedFocus: [
    "Daily 15-minute reading aloud",
    "Sentence completion exercises",
    "Analysing story meaning together",
    "Using visual cues for new vocabulary",
  ],
  parentSummary: {
    overall: {
      stanine: null,
      label: "Average",
      advice: "Offer a mix of storybooks and more challenging non-fiction on topics they enjoy. Ask questions beginning with 'why' or 'how' to encourage deeper thinking, and let them make simple notes or drawings about what they've read."
    },
    sentenceCompletion: {
      stanine: "6-7",
      advice: "Talk about more interesting words (synonyms) and how different word choices change the meaning or feeling of a sentence. Encourage them to improve simple sentences from books or homework by adding detail."
    },
    passageComprehension: {
      stanine: "6-7",
      advice: "Choose slightly more complex passages and ask questions that require reading between the lines, such as 'Why do you think they did that?' or 'What is the problem in this story?' Encourage them to give reasons using the text."
    },
  }
}

// Psychometric data
export const psychometricData = {
  summary: [
    "Extroverted & adaptable personality with strong social engagement skills.",
    "Excellent numerical and verbal abilities, suited for analytical and communication roles.",
    "Career interests: Investigative, Conventional, and Enterprising fields.",
    "Thrives in structured, fast-paced environments with independence and learning opportunities.",
  ],
  personality: {
    introvertExtrovert: { left: "Introvert", right: "Extrovert", leftValue: 43, rightValue: 57 },
    sensingIntuitive: { left: "Sensing", right: "Intuitive", leftValue: 100, rightValue: 0 },
    thinkingFeeling: { left: "Thinking", right: "Feeling", leftValue: 100, rightValue: 0 },
    judgingPerceiving: { left: "Judging", right: "Perceiving", leftValue: 43, rightValue: 57 },
  },
  careerInterests: [
    { name: "Investigative", score: 55 },
    { name: "Conventional", score: 55 },
    { name: "Enterprising", score: 55 },
    { name: "Realistic", score: 55 },
    { name: "Social", score: 55 },
    { name: "Artistic", score: 55 },
  ],
  careerMotivators: [
    { name: "Structured work environment", value: 98 },
    { name: "Logical High-Paced Environment", value: 92 },
    { name: "Independence", value: 88 },
    { name: "Continuous Learning", value: 74 },
    { name: "Adventure", value: 72 },
    { name: "Creativity", value: 68 },
    { name: "Social Service", value: 64 },
  ],
  learningStyles: [
    { name: "Read & Write", value: 38, color: "#2D7DD2" },
    { name: "Visual", value: 25, color: "#00E5A0" },
    { name: "Kinaesthetic", value: 25, color: "#FFB800" },
    { name: "Auditory", value: 14, color: "#7B5CF0" },
  ],
  skillsAbilities: [
    { name: "Numerical Ability", value: 98 },
    { name: "Logical Ability", value: 92 },
    { name: "Verbal Ability", value: 88 },
    { name: "Clerical & Organising", value: 74 },
    { name: "Spatial & Visualisation", value: 72 },
    { name: "Leadership & Decision", value: 68 },
    { name: "Social & Co-operation", value: 64 },
  ],
  topCareerClusters: [
    { name: "Marketing & Visual Works", value: 98 },
    { name: "Information Technology", value: 88 },
    { name: "Business & Administration", value: 75 },
    { name: "Data Science", value: 68 },
    { name: "Legal Services", value: 62 },
  ],
  selectedCareerClusters: [
    "Accounts and Finance",
    "Logistics and Transportation",
    "Information Technology",
    "Business Management",
  ]
}

// Academic trajectory data (for Overview dashboard)
export const academicTrajectoryData = [
  { week: "W1", maths: 78, science: 72, english: 68, history: 65, arabic: 70, pe: 85 },
  { week: "W2", maths: 80, science: 74, english: 70, history: 64, arabic: 71, pe: 87 },
  { week: "W3", maths: 79, science: 73, english: 69, history: 66, arabic: 72, pe: 86 },
  { week: "W4", maths: 81, science: 75, english: 71, history: 63, arabic: 70, pe: 88 },
  { week: "W5", maths: 82, science: 76, english: 72, history: 65, arabic: 73, pe: 87 },
  { week: "W6", maths: 83, science: 74, english: 70, history: 66, arabic: 72, pe: 89 },
  { week: "W7", maths: 82, science: 77, english: 73, history: 64, arabic: 74, pe: 88 },
  { week: "W8", maths: 84, science: 76, english: 72, history: 67, arabic: 73, pe: 90 },
  { week: "W9*", maths: 84, science: 77, english: 73, history: 67, arabic: 73, pe: 88, projected: true },
  { week: "W10*", maths: 85, science: 78, english: 74, history: 68, arabic: 74, pe: 89, projected: true },
  { week: "W11*", maths: 86, science: 79, english: 75, history: 68, arabic: 75, pe: 90, projected: true },
  { week: "W12*", maths: 87, science: 80, english: 76, history: 69, arabic: 76, pe: 91, projected: true },
]

export const subjectColors = {
  maths: "#2D7DD2",
  science: "#00E5A0",
  english: "#7B5CF0",
  history: "#FFB800",
  arabic: "#FF4757",
  pe: "#00D4FF",
}

// Radar data for Intelligence360
export const radarData = [
  { domain: "Verbal", rayan: 72, classAvg: 55, global: 50 },
  { domain: "Quant", rayan: 99, classAvg: 58, global: 50 },
  { domain: "Non-Verbal", rayan: 99, classAvg: 52, global: 50 },
  { domain: "Spatial", rayan: 91, classAvg: 54, global: 50 },
]

// Parent360 trend data
export const parent360TrendData = [
  { survey: "Jan 15", emotional: 2.5, home: 2.5, physical: 2.5, growth: 2.5, academic: 2.5 },
  { survey: "Jan 29", emotional: 3.0, home: 3.0, physical: 3.0, growth: 2.8, academic: 3.0 },
  { survey: "Feb 12", emotional: 3.2, home: 3.5, physical: 3.3, growth: 2.8, academic: 2.8 },
  { survey: "Feb 26", emotional: 3.5, home: 3.8, physical: 3.8, growth: 2.7, academic: 2.5 },
  { survey: "Mar 1", emotional: 3.8, home: 4.0, physical: 4.0, growth: 2.5, academic: 2.2 },
  { survey: "Mar 12", emotional: 4.0, home: 4.0, physical: 4.0, growth: 2.5, academic: 2.0 },
]

// Connection layer insights for Intelligence360
export const connectionInsights = [
  {
    sources: [
      { label: "CAT4: Spatial 99th %ile", color: "#00E5A0" },
      { label: "Psycho: Visual Learner 25%", color: "#7B5CF0" },
      { label: "NGRT: Strong Comprehension", color: "#2D7DD2" },
    ],
    insight: "Rayan processes information visually and structurally. Diagram-based teaching will accelerate his retention significantly.",
  },
  {
    sources: [
      { label: "CAT4: Quant 99th %ile", color: "#7B5CF0" },
      { label: "Psycho: IT + Data Sci", color: "#00D4FF" },
      { label: "Psycho: Logical ability 92%", color: "#00E5A0" },
    ],
    insight: "Rayan's cognitive profile aligns strongly with STEM careers. His quantitative edge is in the top 1% globally.",
  },
  {
    sources: [
      { label: "Parent360: Focus \u2193 2.0/5", color: "#FF4757" },
      { label: "Attendance: Tardy 10%", color: "#FFB800" },
      { label: "Academics: History gap", color: "#FF4757" },
    ],
    insight: "The dip in academic focus correlates with attendance patterns and a specific subject gap. Early intervention recommended.",
  },
]

// Career constellation nodes for Holistic Profile
export const careerNodes = [
  { name: "Information Technology", x: 55, y: 30, match: 98, color: "#00D4FF", size: 48 },
  { name: "Data Science", x: 70, y: 45, match: 95, color: "#7B5CF0", size: 44 },
  { name: "Engineering", x: 40, y: 50, match: 90, color: "#2D7DD2", size: 40 },
  { name: "Finance & Analytics", x: 60, y: 65, match: 88, color: "#00E5A0", size: 38 },
  { name: "Business Management", x: 25, y: 35, match: 75, color: "#FFB800", size: 30 },
  { name: "Architecture", x: 80, y: 30, match: 72, color: "#2D7DD2", size: 28 },
  { name: "Medicine", x: 20, y: 65, match: 65, color: "#FF4757", size: 25 },
  { name: "Arts & Design", x: 85, y: 70, match: 40, color: "#5A7399", size: 16 },
  { name: "Law", x: 35, y: 80, match: 38, color: "#5A7399", size: 15 },
  { name: "Education", x: 75, y: 80, match: 35, color: "#5A7399", size: 14 },
]

// Academic heatmap data for Holistic Profile
export const academicHeatmap = [
  { subject: "Mathematics", current: "A-", trend: "up2", cat4Match: 5, teacherObs: "Strong", overall: 85, predicted: "A", reason: "Cognitive profile strongly supports further improvement" },
  { subject: "Science", current: "B+", trend: "up", cat4Match: 4, teacherObs: "Good", overall: 78, predicted: "A-", reason: "Pattern recognition advantage will compound" },
  { subject: "English", current: "B", trend: "stable", cat4Match: 3, teacherObs: "Developing", overall: 72, predicted: "B+", reason: "Verbal development is the lever \u2014 targeted reading will close gap" },
  { subject: "History", current: "C+", trend: "down", cat4Match: 2, teacherObs: "Needs Focus", overall: 58, predicted: "B-", reason: "Needs intervention \u2014 attendance-correlated dip requires support" },
  { subject: "Arabic", current: "B-", trend: "up", cat4Match: 3, teacherObs: "Progressing", overall: 70, predicted: "B", reason: "Steady progress \u2014 maintain current approach" },
  { subject: "PE", current: "A", trend: "stable", cat4Match: 3, teacherObs: "Excellent", overall: 92, predicted: "A", reason: "Kinaesthetic strength evident \u2014 potential leadership opportunity" },
]

// Development recommendations for Holistic Profile
export const developmentRecommendations = [
  { num: "01", title: "VERBAL DEVELOPMENT", source: "CAT4 Verbal (92nd %ile)", priority: "Medium", priorityColor: "var(--accent-amber)", text: "Enrol Rayan in the school's structured discussion class. His analytical mind needs a verbal outlet to reach its full potential.", action: "Request from School" },
  { num: "02", title: "HISTORY INTERVENTION", source: "Academics + Attendance", priority: "High", priorityColor: "var(--accent-red)", text: "Schedule a conversation with Ms. Laura Bennett. The History dip correlates with 3 missed sessions. A catch-up plan would close the gap quickly.", action: "Message Teacher" },
  { num: "03", title: "STEM ENRICHMENT", source: "CAT4 + Psychometric", priority: "Opportunity", priorityColor: "var(--accent-cyan)", text: "Rayan's cognitive profile qualifies him for the GEMS STEM excellence programme. His quantitative ability is in the top 1% globally.", action: "Learn More" },
  { num: "04", title: "READING PROGRAMME", source: "NGRT + Learning Styles", priority: "Medium", priorityColor: "var(--accent-amber)", text: "15 minutes of daily structured reading aloud will leverage his visual-spatial strengths to build verbal fluency and comprehension.", action: "View Programme" },
  { num: "05", title: "WELLBEING CHECK-IN", source: "Parent360 + Pastoral", priority: "Monitor", priorityColor: "var(--accent-blue)", text: "Academic focus has dipped to 2.0/5. The school has flagged this to his Form Tutor and scheduled a support session for 18 March.", action: "View Timeline" },
]

// Parent 360 Wellbeing data
export const wellbeingData = {
  studentName: "Rayan Sharma",
  totalSurveys: 6,
  firstSurveyDate: "January 15, 2026",
  recentSurveyDate: "March 12, 2026",
  domains: [
    {
      title: "Emotional Wellbeing",
      subtitle: "Happiness, Stress, Emotional Expression",
      question: "How happy and emotionally positive has your child seemed this week?",
      first: 2.5, average: 3.0, latest: 4.0,
      trend: "improved", trendColor: "#00E5A0"
    },
    {
      title: "Home Environment",
      subtitle: "Safety, Support, Family Bonding",
      question: "How well is your child connecting and interacting with friends or family?",
      first: 2.5, average: 3.0, latest: 4.0,
      trend: "improved", trendColor: "#00E5A0"
    },
    {
      title: "Physical Health",
      subtitle: "Energy, Sleep, Activity",
      question: "How active and energetic has your child been recently?",
      first: 2.5, average: 3.0, latest: 4.0,
      trend: "improved", trendColor: "#00E5A0"
    },
    {
      title: "Personal Growth",
      subtitle: "Confidence, Curiosity, Independence",
      question: "How confident and motivated has your child been in trying new things or taking responsibility?",
      first: 2.5, average: 3.0, latest: 2.5,
      trend: "same", trendColor: "#A8BFDA"
    },
    {
      title: "Academic Performance",
      subtitle: "Focus, Engagement, Understanding",
      question: "How engaged and focused has your child been with schoolwork and learning activities?",
      first: 2.5, average: 3.0, latest: 2.0,
      trend: "attention", trendColor: "#FF4757"
    },
  ],
  aiSummary: "Rayan shows positive progress in Emotional Wellbeing, Social Connection, and Physical Health since the first survey. Home environment remains consistently strong, while personal growth maintains a steady baseline. However, Academic Performance has declined and needs attention. Consider additional support and intervention for schoolwork engagement and focus."
}
