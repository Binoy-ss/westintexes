import { Bundle, ContentType, Review } from './types';

export const EXAM_CATEGORIES = ["All", "UPSC", "SSC", "Banking", "State PSC", "Teaching"];

export const MOCK_BUNDLES: Bundle[] = [
  {
    id: '1',
    title: 'UPSC IAS Prelims 2025 Complete Bundle',
    examCategory: 'UPSC',
    description: 'Comprehensive coverage of General Studies Paper 1 & CSAT with expert video lectures and high-quality PDF notes.',
    price: 4999,
    originalPrice: 9999,
    thumbnail: 'https://picsum.photos/id/20/800/600',
    rating: 4.8,
    studentsEnrolled: 1240,
    features: ['200+ Video Lectures', '50+ Mock Tests', 'Current Affairs PDFs', 'Doubt Clearing Sessions'],
    content: [
      { id: 'c1', title: 'Introduction to Polity', type: ContentType.VIDEO, duration: '45 mins', locked: false },
      { id: 'c2', title: 'Modern History Notes - Part 1', type: ContentType.PDF, duration: '20 pages', locked: true },
      { id: 'c3', title: 'Economy Concept Booster', type: ContentType.VIDEO, duration: '60 mins', locked: true },
      { id: 'c4', title: 'CSAT Practice Test 1', type: ContentType.TEST, duration: '2 hours', locked: true },
    ]
  },
  {
    id: '2',
    title: 'SSC CGL Tier 1 & 2 Mastery',
    examCategory: 'SSC',
    description: 'Target SSC CGL with our specialized math tricks, reasoning shortcuts, and English grammar modules.',
    price: 2499,
    originalPrice: 4999,
    thumbnail: 'https://picsum.photos/id/24/800/600',
    rating: 4.6,
    studentsEnrolled: 3500,
    features: ['Shortcuts & Tricks', 'Previous Year Papers', 'vocab Booster', 'Live Classes'],
    content: [
      { id: 'c1', title: 'Maths: Profit & Loss', type: ContentType.VIDEO, duration: '30 mins', locked: false },
      { id: 'c2', title: 'English Grammar Rules', type: ContentType.PDF, duration: '15 pages', locked: true },
    ]
  },
  {
    id: '3',
    title: 'IBPS PO Ultimate Crash Course',
    examCategory: 'Banking',
    description: 'Ace your banking exams with speed and accuracy. Includes data interpretation and puzzle solving techniques.',
    price: 1999,
    originalPrice: 3499,
    thumbnail: 'https://picsum.photos/id/3/800/600',
    rating: 4.7,
    studentsEnrolled: 2100,
    features: ['High Level Puzzles', 'Data Interpretation', 'Banking Awareness', 'Speed Tests'],
    content: [
      { id: 'c1', title: 'Puzzle Solving Techniques', type: ContentType.VIDEO, duration: '50 mins', locked: false },
    ]
  },
  {
    id: '4',
    title: 'State PSC General Studies Foundation',
    examCategory: 'State PSC',
    description: 'Foundation course covering history, geography, and polity specific to state public service commissions.',
    price: 3999,
    originalPrice: 7999,
    thumbnail: 'https://picsum.photos/id/4/800/600',
    rating: 4.5,
    studentsEnrolled: 800,
    features: ['State Specific GK', 'Map Reading', 'Essay Writing', 'Answer Writing Practice'],
    content: [
      { id: 'c1', title: 'State Geography Overview', type: ContentType.VIDEO, duration: '40 mins', locked: true },
    ]
  },
  {
    id: '5',
    title: 'UGC NET Paper 1 Strategy',
    examCategory: 'Teaching',
    description: 'Complete guide for UGC NET Paper 1. Teaching aptitude, research aptitude, and more.',
    price: 1499,
    originalPrice: 2999,
    thumbnail: 'https://picsum.photos/id/60/800/600',
    rating: 4.9,
    studentsEnrolled: 500,
    features: ['Research Aptitude Notes', 'Teaching Methodology', 'Previous Papers Solved'],
    content: []
  },
  {
    id: '6',
    title: 'Railways RRB NTPC Power Pack',
    examCategory: 'SSC',
    description: 'Specifically designed for Railway recruitment exams. General Awareness and Science focus.',
    price: 999,
    originalPrice: 1999,
    thumbnail: 'https://picsum.photos/id/180/800/600',
    rating: 4.4,
    studentsEnrolled: 4200,
    features: ['General Science', 'Current Affairs', 'Mock Tests'],
    content: []
  }
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', user: 'Rahul Kumar', rating: 5, comment: 'The video quality is amazing. Concepts are very clear.', date: '2023-10-12' },
  { id: 'r2', user: 'Sneha Gupta', rating: 4, comment: 'PDF notes are very concise and helpful for revision.', date: '2023-11-05' },
  { id: 'r3', user: 'Amit Singh', rating: 5, comment: 'Best bundle for the price. Highly recommended!', date: '2023-12-01' },
];
