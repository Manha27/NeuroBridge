// Initial Seed Data for NeuroBridge Platform

export const INITIAL_DATA = {
  // Demo accounts
  users: {
    "patient@demo.com": { email: "patient@demo.com", password: "demo123", role: "patient", name: "Ramesh Sharma", id: "patient-1" },
    "caregiver@demo.com": { email: "caregiver@demo.com", password: "demo123", role: "caregiver", name: "Priya Sharma", id: "caregiver-1" },
    "doctor@demo.com": { email: "doctor@demo.com", password: "demo123", role: "doctor", name: "Dr. Ananya Mehta", id: "doctor-1" }
  },

  patients: [
    {
      id: "patient-1",
      name: "Ramesh Sharma",
      age: 68,
      gender: "Male",
      stage: "Early-stage Alzheimer's",
      sinceDate: "Oct 2025",
      photo: "/ramesh_avatar.png", // Circular senior avatar
      caregiver: {
        id: "caregiver-1",
        name: "Priya Sharma",
        relationship: "Daughter",
        phone: "+91 98765 43210"
      },
      doctor: {
        id: "doctor-1",
        name: "Dr. Ananya Mehta",
        specialty: "Neurologist",
        hospital: "AIIMS Delhi",
        phone: "+91 11234 5678"
      },
      vitals: {
        heartRate: 74,
        bloodPressure: "128/82",
        weight: "71 kg",
        oxygenSaturation: "98%"
      },
      moodHistory: [
        { date: "2026-05-14", mood: "Great" },
        { date: "2026-05-15", mood: "Good" },
        { date: "2026-05-16", mood: "Okay" },
        { date: "2026-05-17", mood: "Good" },
        { date: "2026-05-18", mood: "Great" },
        { date: "2026-05-19", mood: "Great" },
        { date: "2026-05-20", mood: "Confused" }
      ],
      mmseScores: [
        { month: "Nov", score: 28 },
        { month: "Dec", score: 27 },
        { month: "Jan", score: 27 },
        { month: "Feb", score: 26 },
        { month: "Mar", score: 25 },
        { month: "Apr", score: 26 },
        { month: "May", score: 25 }
      ]
    }
  ],

  medicines: [
    {
      id: "med-1",
      name: "Donepezil",
      dosage: "10mg",
      time: "Morning (8:00 AM)",
      frequency: "Once daily",
      period: "morning",
      takenToday: true,
      takenTime: "08:15 AM",
      color: "amber"
    },
    {
      id: "med-2",
      name: "Vitamin B12",
      dosage: "1 tablet",
      time: "Afternoon (1:00 PM)",
      frequency: "Once daily",
      period: "afternoon",
      takenToday: false,
      takenTime: null,
      color: "blue"
    },
    {
      id: "med-3",
      name: "Memantine",
      dosage: "5mg",
      time: "Night (9:00 PM)",
      frequency: "Twice daily",
      period: "night",
      takenToday: false,
      takenTime: null,
      color: "purple"
    }
  ],

  // 7-day medicine compliance log
  medComplianceHistory: {
    "Donepezil": [true, true, true, false, true, true, true],
    "Vitamin B12": [true, false, true, true, true, true, false],
    "Memantine": [true, true, true, true, false, true, true]
  },

  journalEntries: [
    {
      id: "j-1",
      date: "2026-05-19",
      text: "Priya took me to the garden center today. The scent of marigolds was so familiar, it made me think of my childhood home in Jaipur. We picked up three new shrubs to plant.",
      mood: "Great",
      photo: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=400",
      voiceRecorded: false
    },
    {
      id: "j-2",
      date: "2026-05-18",
      text: "Felt a bit confused about the day of the week this morning. Priya helped me check my tablet and calendar. Did the word matching puzzle, got 8/8 matching!",
      mood: "Good",
      photo: null,
      voiceRecorded: true
    },
    {
      id: "j-3",
      date: "2026-05-17",
      text: "Had a call with Suresh. He spoke from Seattle. It was nice hearing his voice, though I forgot his newborn's name for a second. Priya reminded me gently. All is well.",
      mood: "Okay",
      photo: null,
      voiceRecorded: false
    },
    {
      id: "j-4",
      date: "2026-05-16",
      text: "Walked around the block. Met Mr. Rajiv. We talked about cricket. Glad to find my way back without checking the app location page.",
      mood: "Great",
      photo: null,
      voiceRecorded: false
    },
    {
      id: "j-5",
      date: "2026-05-15",
      text: "A rainy day today. Drank masala chai and watched the rain fall on the plants. Felt slightly lonely but calm.",
      mood: "Good",
      photo: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=400",
      voiceRecorded: false
    }
  ],

  people: [
    {
      id: "p-1",
      name: "Priya Sharma",
      relationship: "Daughter",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
      audioText: "Hi Papa, I'm Priya, your daughter. I'm right in the next room if you need me! Remember to check your timeline and let's go for a walk at 5 PM.",
      voiceGender: "female",
      voiceCharacteristic: "calm"
    },
    {
      id: "p-2",
      name: "Dr. Ananya Mehta",
      relationship: "Doctor",
      phone: "+91 11234 5678",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
      audioText: "Hello Mr. Sharma, this is Dr. Ananya. You are doing fantastic! Keep up with your daily memory puzzles and light walking routines.",
      voiceGender: "female",
      voiceCharacteristic: "professional"
    },
    {
      id: "p-3",
      name: "Suresh Sharma",
      relationship: "Son",
      phone: "+1 555-0199",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      audioText: "Hi Dad! It's Suresh. Sending you lots of love from Seattle. I will call you this Sunday evening. Say hello to Priya!",
      voiceGender: "male",
      voiceCharacteristic: "warm"
    },
    {
      id: "p-4",
      name: "Kavitha Sharma",
      relationship: "Wife",
      phone: "+91 98765 44432",
      avatar: "/kavitha_sharma.png",
      audioText: "Hello my dear, I am Kavitha. We've been married for 42 wonderful years. I'm sitting right beside you. Would you like a hot cup of tea?",
      voiceGender: "female",
      voiceCharacteristic: "warm"
    },
    {
      id: "p-5",
      name: "Rajiv Malhotra",
      relationship: "Friend",
      phone: "+91 98721 00987",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      audioText: "Hey Ramesh! Rajiv here, your old college buddy. Let's catch up for our evening stroll in the park next Tuesday.",
      voiceGender: "male",
      voiceCharacteristic: "friendly"
    }
  ],

  appointments: [
    {
      id: "ap-1",
      patientId: "patient-1",
      doctorName: "Dr. Ananya Mehta",
      specialty: "Neurology Clinic",
      date: "2026-05-25",
      time: "10:30 AM",
      type: "In-Person",
      location: "AIIMS Delhi Clinic Room 4",
      notes: "Follow up review of Donepezil dosage, MMSE cognitive evaluation, and check sleep compliance logs."
    },
    {
      id: "ap-2",
      patientId: "patient-1",
      doctorName: "Dr. Ananya Mehta",
      specialty: "Telehealth Check-in",
      date: "2026-06-05",
      time: "04:00 PM",
      type: "Video",
      location: "NeuroBridge Video Call Lobby",
      notes: "Quick check-in on patient's emotional well-being and medication adjustments."
    },
    {
      id: "ap-3",
      patientId: "patient-1",
      doctorName: "Dr. Ananya Mehta",
      specialty: "Physical Therapy Assessment",
      date: "2026-06-12",
      time: "11:00 AM",
      type: "In-Person",
      location: "AIIMS Wellness Center Rehab Block",
      notes: "Evaluate gait, posture, balance, and recommend home physical exercise drills."
    }
  ],

  carePlan: {
    lastUpdated: "2026-05-18",
    updatedBy: "Dr. Ananya Mehta",
    sections: {
      "Morning Routine": [
        { id: "cp-1", task: "Drink a warm glass of water and stretch for 5 minutes", done: true },
        { id: "cp-2", task: "Look at the main family photo wall and state all names aloud", done: true },
        { id: "cp-3", task: "Take Donepezil with light breakfast", done: true }
      ],
      "Physical Activity": [
        { id: "cp-4", task: "20-minute gentle backyard walk with Priya", done: false },
        { id: "cp-5", task: "Gently stretch shoulder joints and ankles", done: false }
      ],
      "Diet": [
        { id: "cp-6", task: "Eat handful of walnuts & seeds in the morning", done: true },
        { id: "cp-7", task: "Keep sugar intake low; substitute with fruits", done: true }
      ],
      "Social Engagement": [
        { id: "cp-8", task: "Complete the daily emoji Memory Game together", done: true },
        { id: "cp-9", task: "Call one relative or old friend for a brief chat", done: false }
      ],
      "Sleep": [
        { id: "cp-10", task: "Wind down by 9:30 PM with soft classic sitar music", done: false },
        { id: "cp-11", task: "Ensure room temperature is moderately cool", done: false }
      ]
    }
  },

  messages: [
    {
      id: "m-1",
      sender: "doctor",
      receiver: "caregiver",
      text: "Hello Priya, I've checked Ramesh's MMSE scores and the compliance heatmap you loaded last week. He is doing remarkably stable. Let's stick with Donepezil 10mg.",
      timestamp: "May 19, 04:15 PM"
    },
    {
      id: "m-2",
      sender: "caregiver",
      receiver: "doctor",
      text: "Thank you so much, Dr. Ananya! Yes, his daily mood checks have been positive, and he managed to solve his memory cards game in just 18 flips this morning.",
      timestamp: "May 19, 05:30 PM"
    },
    {
      id: "m-3",
      sender: "doctor",
      receiver: "caregiver",
      text: "That is excellent. Please monitor his water intake. In high summers, dehydration can cause mild transient confusion which resembles progression.",
      timestamp: "May 20, 09:12 AM"
    },
    {
      id: "m-4",
      sender: "caregiver",
      receiver: "doctor",
      text: "Understood. I will make sure we track 8 glasses a day and record it under his Care Plan. See you on the 25th at AIIMS!",
      timestamp: "May 20, 10:02 AM"
    }
  ],

  notifications: [
    {
      id: "n-1",
      type: "pill",
      message: "Time for Ramesh's Vitamin B12 afternoon dose",
      time: "1:00 PM",
      read: false
    },
    {
      id: "n-2",
      type: "location",
      message: "Ramesh moved out of Home Safe Zone (Returning)",
      time: "Yesterday, 3:30 PM",
      read: true
    },
    {
      id: "n-3",
      type: "message",
      message: "New message from Dr. Ananya Mehta",
      time: "Today, 9:12 AM",
      read: false
    },
    {
      id: "n-4",
      type: "appointment",
      message: "Appointment reminder: AIIMS Delhi clinic in 5 days",
      time: "Today, 8:00 AM",
      read: false
    }
  ],

  // Game High Scores
  gameScores: [
    { id: "score-1", date: "2026-05-19", game: "Memory Match", score: 18, timer: "48s", rating: 3 },
    { id: "score-2", date: "2026-05-18", game: "Memory Match", score: 24, timer: "1m 05s", rating: 2 },
    { id: "score-3", date: "2026-05-17", game: "Memory Match", score: 20, timer: "55s", rating: 3 }
  ],

  // Caregiver burnout self assessment
  caregiverBurnout: [
    { date: "2026-05-18", level: "Healthy", score: 3 },
    { date: "2026-05-19", level: "Moderate", score: 5 },
    { date: "2026-05-20", level: "Healthy", score: 2 }
  ],

  // Geofence safe zone configurations
  geofence: {
    safeZoneName: "Home & Garden Safe Zone",
    radius: 300, // in meters
    sharingEnabled: true,
    currentAddress: "12A Block-C, Vasant Vihar, New Delhi - 110057",
    status: "Home (Safe Zone)",
    history: [
      { id: "l-1", time: "11:00 AM", address: "Vasant Vihar Central Park (Stroll Zone)", status: "Outside Safe Zone" },
      { id: "l-2", time: "10:15 AM", address: "Market Lane, Block C", status: "Outside Safe Zone" },
      { id: "l-3", time: "08:30 AM", address: "12A Block-C, Vasant Vihar (Home)", status: "Home (Safe Zone)" }
    ]
  }
};
