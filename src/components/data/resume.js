const initialFormData = {
  basics: {
    name: "",
    label: "",
    picture: "",
    email: "",
    phone: "",
    website: "",
    summary: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: "",
    },
    profiles: [],
  },
  work: [],
  volunteer: [],
  education: [],
  awards: [],
  skills: [],
  languages: [],
  publications: [],
  references: [],
  meta: {
    theme: "eloquent",
  },
};

// const initialFormData = {
//   basics: {
//     name: "Soham Parekh",
//     label: "Software Developer",
//     picture: "",
//     email: "alqaholic10@gmail.com",
//     phone: "986-779-1816",
//     website: "https://sohamp.dev",
//     summary:
//       "I am a software developer creating open source projects and writing about software development, competitive coding, machine learning, cybersecurity and information security awareness. I am also the founder of and lead maintainer at Devstation, a not-for-profit organisation with an aim to encourage startups and organisations to adopt open source tech.",
//     location: {
//       address: "1234, Main St.",
//       postalCode: "11005",
//       city: "San Francisco",
//       countryCode: "US",
//       region: "California",
//     },
//     profiles: [],
//   },
//   work: [
//     {
//       company: "Falkonry Software Pvt. Ltd.",
//       position: "Software Development Intern",
//       website: "https://falkonry.com",
//       startDate: "2019-12-02",
//       endDate: "2020-03-12",
//       summary:
//         "Worked primarily on Node.js, Kubernetes, Docker, Azure, AWS Lambda and ELK Stack",
//       highlights: [
//         "Redesigned and programmed their CI/CD bot",
//         "Devised a mechanism to efficiently parse and query environmental logs",
//       ],
//     },
//     {
//       company: "Betterbank.app",
//       position: "Software Development Intern",
//       website: "https://betterbank.app",
//       startDate: "2020-09-05",
//       endDate: "",
//       summary:
//         "Worked with GraphQL, Bullmq, Redis, Node.js Typescript, Next.js and React",
//       highlights: [
//         "Designed a performant backend graphql server",
//         "Implemented a queuing system using publisher-subscriber model",
//       ],
//     },
//   ],
//   volunteer: [
//     {
//       organization: "Wikimedia Foundation",
//       position: "Outreachy Mentor",
//       website: "https://wikimediafoundation.org",
//       startDate: "2020-12-01",
//       endDate: "",
//       summary: "Mentored an international student as a part of Outreachy",
//       highlights: [
//         "Investigated replacements for WebdriverIO for end-to-end tests",
//         "Completely replicated Wikimedia's CI/CD pipeline on Github actions",
//       ],
//     },
//   ],
//   education: [
//     {
//       institution: "Dwarkadas J. Sanghvi College of Engineering",
//       area: "Computer Engineering",
//       studyType: "Bachelor of Engineering",
//       startDate: "2017-08-01",
//       endDate: "2021-06-01",
//       gpa: "9.82",
//       courses: ["Operating Systems", "Computer Network"],
//     },
//   ],
//   awards: [
//     {
//       title: "Winner of JP Morgan Chase Code for Good",
//       date: "2020-06-26",
//       awarder: "JP Morgan Chase",
//       summary:
//         "Winner of JP Morgan Chase Code for Good hackathon where we built a project for an NGO named Nudge Foundation",
//     },
//   ],
//   skills: [
//     {
//       name: "Web Development",
//       level: "Master",
//       keywords: [
//         "Javascript",
//         "React",
//         "Next.js",
//         "GraphQL",
//         "Express",
//         "REST",
//         "Nest.js",
//         "Typescript",
//         "gRPC",
//       ],
//     },
//     {
//       name: "Automated Testing",
//       level: "Master",
//       keywords: [
//         "Puppeteer",
//         "WebdriverIO",
//         "Cypress.io",
//         "Jest",
//         "Mocha",
//         "Enzyme",
//       ],
//     },
//   ],
//   languages: [
//     {
//       language: "English",
//       fluency: "Fluent",
//     },
//     {
//       language: "Hindi",
//       fluency: "Fluent",
//     },
//   ],
//   publications: [],
//   references: [],
//   meta: {
//     theme: "paper",
//   },
// };

export default initialFormData;