export const lessons = {
  "water-cycle": {
    id: "water-cycle",
    title: "The Water Cycle",
    subject: "Science",
    grade: "Year 3",
    emoji: "\uD83C\uDF0A",
    color: "#2D7DD2",
    duration: "45 minutes",
    didIntroScript: "Hi Aisha! I'm Luna, your learning buddy today. We're going to explore the water cycle together \u2014 it's really cool! Water travels all around our planet in a big loop. Ready? Let's go!",
    steps: [
      {
        id: 1,
        title: "What is the Water Cycle?",
        content: "Water is always moving around our planet in a big loop called the water cycle. It never stops \u2014 the same water has been going round and round for millions of years!",
        icon: "\uD83D\uDD04",
        keyWord: "Water Cycle"
      },
      {
        id: 2,
        title: "Evaporation",
        content: "When the sun heats up water in rivers, lakes and oceans, the water turns into tiny invisible drops called water vapour and floats up into the sky. This is called evaporation.",
        icon: "\u2600\uFE0F",
        keyWord: "Evaporation"
      },
      {
        id: 3,
        title: "Condensation",
        content: "The water vapour rises high into the sky where it gets cold. It turns back into tiny water droplets and joins together to make clouds. This is called condensation.",
        icon: "\u2601\uFE0F",
        keyWord: "Condensation"
      },
      {
        id: 4,
        title: "Precipitation",
        content: "When clouds collect too many water droplets and get very heavy, the water falls back down to Earth. It can fall as rain, snow, or hail. This is called precipitation.",
        icon: "\uD83C\uDF27\uFE0F",
        keyWord: "Precipitation"
      },
    ],
    quiz: [
      {
        q: "What do we call it when water turns into vapour and rises up?",
        options: ["\u2744\uFE0F Freezing", "\u2600\uFE0F Evaporation", "\u2601\uFE0F Condensation", "\uD83C\uDF27\uFE0F Precipitation"],
        answer: 1
      },
      {
        q: "What turns water vapour back into water droplets to make clouds?",
        options: ["Heat", "Wind", "Cold", "Rain"],
        answer: 2
      },
      {
        q: "What is it called when water falls from clouds as rain or snow?",
        options: ["Condensation", "Evaporation", "Collection", "Precipitation"],
        answer: 3
      },
    ]
  },
  "quadratic-equations": {
    id: "quadratic-equations",
    title: "Quadratic Equations",
    subject: "Mathematics",
    grade: "Year 9",
    emoji: "\uD83D\uDCD0",
    color: "#7B5CF0",
    duration: "60 minutes",
    didIntroScript: "Hi Rayan. Today we're working through quadratic equations. By the end of this session you'll know what they are, how to spot them, and three different methods to solve them. Let's get into it.",
    steps: [
      {
        id: 1,
        title: "What is a Quadratic Equation?",
        content: "A quadratic equation is any equation of the form ax\u00B2 + bx + c = 0, where a \u2260 0. The key feature is the squared term (x\u00B2). Quadratics appear in physics, engineering, finance, and many real-world problems.",
        formula: "ax\u00B2 + bx + c = 0",
        example: "x\u00B2 + 5x + 6 = 0 \u2192 here a=1, b=5, c=6"
      },
      {
        id: 2,
        title: "Factorisation Method",
        content: "To factorise, find two numbers that multiply to give c and add to give b. Then rewrite the equation as (x + p)(x + q) = 0. Each bracket gives you one solution.",
        formula: "x\u00B2 + 5x + 6 = (x + 2)(x + 3) = 0",
        example: "Therefore x = -2 or x = -3"
      },
      {
        id: 3,
        title: "The Quadratic Formula",
        content: "The quadratic formula works for any quadratic equation \u2014 even ones that can't be factorised. Substitute the values of a, b and c and calculate x.",
        formula: "x = (-b \u00B1 \u221A(b\u00B2-4ac)) / 2a",
        example: "For x\u00B2+5x+6: x = (-5 \u00B1 \u221A(25-24)) / 2 = (-5 \u00B1 1) / 2"
      },
      {
        id: 4,
        title: "Completing the Square",
        content: "Completing the square is a third method. Rewrite the equation so one side is a perfect square. This method also helps you find the vertex of a parabola.",
        formula: "x\u00B2 + bx = (x + b/2)\u00B2 - (b/2)\u00B2",
        example: "x\u00B2+5x+6 = (x+2.5)\u00B2 - 0.25 = 0 \u2192 x = -2.5 \u00B1 0.5"
      },
    ],
    quiz: [
      { q: "In the equation 3x\u00B2 - 7x + 2 = 0, what are the values of a, b, and c?", type: "short", answer: "a=3, b=-7, c=2" },
      { q: "Solve x\u00B2 - 9 = 0 by factorisation.", type: "short", answer: "x = 3 or x = -3" },
      { q: "Using the quadratic formula, solve 2x\u00B2 + 3x - 2 = 0", type: "short", answer: "x = 0.5 or x = -2" },
    ]
  },
  "cell-biology": {
    id: "cell-biology",
    title: "Cell Biology",
    subject: "Science",
    grade: "Year 9",
    emoji: "\uD83E\uDDEC",
    color: "#00E5A0",
    duration: "60 minutes",
    didIntroScript: "Hi Rayan. Today we're looking at cells \u2014 the fundamental building blocks of all living things. We'll cover animal cells, plant cells, and specialised cells. Let's begin.",
    steps: [
      {
        id: 1,
        title: "The Cell: Unit of Life",
        content: "All living organisms are made of cells. Some organisms are unicellular (one cell), like bacteria. Others are multicellular, like humans, which have trillions of cells. The cell theory states: all living things are made of cells, cells are the basic unit of life, and all cells come from existing cells."
      },
      {
        id: 2,
        title: "Animal Cell Structure",
        content: "Animal cells contain: nucleus (controls cell activity, contains DNA), cytoplasm (jelly-like substance where chemical reactions occur), cell membrane (controls what enters/exits), mitochondria (produce energy via respiration), ribosomes (make proteins)."
      },
      {
        id: 3,
        title: "Plant Cell Structure",
        content: "Plant cells have all animal cell components PLUS: cell wall (made of cellulose, gives rigid structure), chloroplasts (contain chlorophyll for photosynthesis, give green colour), large permanent vacuole (stores cell sap, maintains turgor pressure)."
      },
      {
        id: 4,
        title: "Specialised Cells",
        content: "Cells are specialised for specific functions. Red blood cells: no nucleus, biconcave shape, packed with haemoglobin \u2014 maximise oxygen transport. Nerve cells: very long with branched endings \u2014 carry electrical signals. Root hair cells: long projection increases surface area \u2014 maximise water absorption."
      },
    ],
    quiz: [
      { q: "Name three organelles found in plant cells but NOT in animal cells.", type: "short", answer: "Cell wall, chloroplasts, large permanent vacuole" },
      { q: "Why do red blood cells have no nucleus?", type: "short", answer: "To make more room for haemoglobin to carry more oxygen" },
      { q: "What is the function of mitochondria?", type: "short", answer: "Produce energy (ATP) through cellular respiration" },
    ]
  }
}
