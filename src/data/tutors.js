// Tutor directory. `id: 'you'` is meant to be your own profile — update the
// fields below with your real details. The other entries are placeholders
// for additional tutors; duplicate the shape to add more, or remove them
// if you're the only tutor for now.
//
// A note on `reviews`: this app has no backend or database, so learners
// can't submit reviews live through the site — there's nowhere to store
// them, and no way to moderate fake or spam entries. Reviews here are
// curated content: collect real testimonials off-platform (a WhatsApp
// message, a screenshot, written feedback) and add them below yourself,
// the same way you'd update a bio. A live review-submission system is a
// real feature, but it needs a backend + moderation — worth building once
// the directory has real traffic, not before.

export const tutors = [
  {
    id: 'you',
    name: 'Your Name',
    role: 'Founder & Lead Tutor',
    initials: 'YN',
    rating: 4.9,
    reviewCount: 0,
    studentsTaught: 0,
    yearsTeaching: 0,
    specialties: ['IELTS/TOEFL prep', 'Business English', 'Pronunciation'],
    bio: "Replace this with a short bio: your teaching background, what you focus on, and what makes lessons with you different. Two to three sentences works well.",
    whatsappNumber: '233000000000', // configure: your WhatsApp number, digits only
    reviews: [
      // { author: 'Student name', rating: 5, comment: 'Real review text goes here.' },
    ],
  },
  {
    id: 'tutor-2',
    name: 'Placeholder Tutor',
    role: 'English Tutor',
    initials: 'PT',
    rating: 4.8,
    reviewCount: 0,
    studentsTaught: 0,
    yearsTeaching: 0,
    specialties: ['Conversational English', 'Grammar fundamentals'],
    bio: "Placeholder profile — replace with a real tutor's name, bio, and specialties, or remove this entry if you're the only tutor.",
    whatsappNumber: '233000000000',
    reviews: [],
  },
]

export function getTutorById(id) {
  return tutors.find((t) => t.id === id) ?? null
}
