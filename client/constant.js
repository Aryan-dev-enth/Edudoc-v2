// constant.js

export const navbarLinks = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Publish Note',
      url: '/publish-note'
    },
    {
      name: 'Notes & Question Papers',
      url: '/all-notes'
    }
  ];
  
  export const dataSection = [
    {
        name: "Views",
        number: "1K",
        tagLine: "INcreaing day by day",
    },
    {
        name: "Institutions",
        number: "100",
        tagLine: "Accross the Globe"
    },
    {
        name: "Users",
        number: "78",
        tagLine: "Growing !"
    }
  ]

  export const fewFileNav = [
    {
        name: "Notes",
        document_type: 1,
    },
    {
        name: "Question Paper",
        document_type: 2,
    }
  ]

  export const fileData = [
    {
      name: "Sample Document 1",
      description: "This is a sample document description.",
      imageUrl: "https://via.placeholder.com/150",
      iconUrl: "https://via.placeholder.com/30",
      document_type: 1 // 1 for notes
    },
    {
      name: "Sample Question Paper 1",
      description: "This is a sample question paper description.",
      imageUrl: "https://via.placeholder.com/160",
      iconUrl: "https://via.placeholder.com/40",
      document_type: 2 // 2 for question paper
    },
    {
      name: "Sample Document 2",
      description: "This is another sample document description.",
      imageUrl: "https://via.placeholder.com/170",
      iconUrl: "https://via.placeholder.com/50",
      document_type: 1 // 1 for notes
    },
    {
      name: "Sample Question Paper 2",
      description: "This is another sample question paper description.",
      imageUrl: "https://via.placeholder.com/180",
      iconUrl: "https://via.placeholder.com/60",
      document_type: 2 // 2 for question paper
    },
    {
      name: "Sample Document 3",
      description: "Yet another sample document description.",
      imageUrl: "https://via.placeholder.com/190",
      iconUrl: "https://via.placeholder.com/70",
      document_type: 1 // 1 for notes
    },
    {
      name: "Sample Question Paper 3",
      description: "Yet another sample question paper description.",
      imageUrl: "https://via.placeholder.com/200",
      iconUrl: "https://via.placeholder.com/80",
      document_type: 2 // 2 for question paper
    },
    {
      name: "Sample Document 4",
      description: "Another sample document description.",
      imageUrl: "https://via.placeholder.com/210",
      iconUrl: "https://via.placeholder.com/90",
      document_type: 1 // 1 for notes
    },
    {
      name: "Sample Question Paper 4",
      description: "Another sample question paper description.",
      imageUrl: "https://via.placeholder.com/220",
      iconUrl: "https://via.placeholder.com/100",
      document_type: 2 // 2 for question paper
    },
    {
      name: "Sample Document 5",
      description: "some description",
      imageUrl: "https://via.placeholder.com/230",
      iconUrl: "https://via.placeholder.com/110",
      document_type: 1 // 1 for notes
    },
    {
      name: "Sample Question Paper 5",
      description: "Last sample question paper description.",
      imageUrl: "https://via.placeholder.com/240",
      iconUrl: "https://via.placeholder.com/120",
      document_type: 2 // 2 for question paper
    },
    // Add more objects as needed
  ];


  export const contributeSubjectOptions = [
    {
      name: "Engineering Mathematics I",
      subjectCode: "21CS2001"
    },
    {
      name: "Engineering Mathematics II",
      subjectCode: "21CS2002"
    },
    {
      name: "Analysis & Design of Algorithms",
      subjectCode: "21CS2007"
    },
    {
      name: "Other",
      subjectCode: "0000000"
    }
  ]

export const documents = [
  {
    documentName: "Sample Document",
    authorName: "John Doe",
    publishedDate: "2024-05-19",
    viewUrl: "https://example.com/sample_document",
    downloadUrl: "https://example.com/download/sample_document",
    subject: "Science",
  },
  {
    documentName: "Another Document",
    authorName: "Jane Smith",
    publishedDate: "2024-05-20",
    viewUrl: "https://example.com/another_document",
    downloadUrl: "https://example.com/download/another_document",
    subject: "History",
  },
  {
    documentName: "Research Paper",
    authorName: "Alice Johnson",
    publishedDate: "2024-05-21",
    viewUrl: "https://example.com/research_paper",
    downloadUrl: "https://example.com/download/research_paper",
    subject: "Literature",
  },
  {
    documentName: "Case Study",
    authorName: "Michael Brown",
    publishedDate: "2024-05-22",
    viewUrl: "https://example.com/case_study",
    downloadUrl: "https://example.com/download/case_study",
    subject: "Business",
  },
  {
    documentName: "Essay",
    authorName: "Emily Wilson",
    publishedDate: "2024-05-23",
    viewUrl: "https://example.com/essay",
    downloadUrl: "https://example.com/download/essay",
    subject: "English",
  },
  {
    documentName: "Presentation Slides",
    authorName: "David Lee",
    publishedDate: "2024-05-24",
    viewUrl: "https://example.com/presentation_slides",
    downloadUrl: "https://example.com/download/presentation_slides",
    subject: "Computer Science",
  },
  {
    documentName: "Tutorial",
    authorName: "Sarah Adams",
    publishedDate: "2024-05-25",
    viewUrl: "https://example.com/tutorial",
    downloadUrl: "https://example.com/download/tutorial",
    subject: "Mathematics",
  },
  {
    documentName: "Guidebook",
    authorName: "Robert Clark",
    publishedDate: "2024-05-26",
    viewUrl: "https://example.com/guidebook",
    downloadUrl: "https://example.com/download/guidebook",
    subject: "Geography",
  },
];

// constants.js
export const SUBJECT_OPTIONS = [
  { value: "", label: "Select Subject" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Engineering Mechanics", label: "Engineering Mechanics" },
  { value: "Engineering Graphics", label: "Engineering Graphics" },
  { value: "Basics of Electrical Engineering", label: "Basics of Electrical Engineering" },
  { value: "Basics of Electronics Engineering", label: "Basics of Electronics Engineering" },
  { value: "Environmental Studies", label: "Environmental Studies" },
  { value: "Computer Programming and Utilization", label: "Computer Programming and Utilization" },
  { value: "Workshop Practice", label: "Workshop Practice" },
  { value: "Communication Skills", label: "Communication Skills" },
  { value: "Constitution of India and Professional Ethics", label: "Constitution of India and Professional Ethics" }
];

export const BRANCH_OPTIONS = [
  { value: "", label: "Select Branch" },
  { value: "B.Tech. CSE Core", label: "B.Tech. CSE Core" },
  { value: "B.Tech. CSE DSAI", label: "B.Tech. CSE DSAI" },
  { value: "B.Tech. CSE Others", label: "B.Tech. CSE Others" },
  { value: "B. Computer Application", label: "B. Computer Application" }
];

export const DOCUMENT_TYPES = [
  { value: "question_paper", label: "Question Paper" },
  { value: "notes", label: "Notes" }
];

