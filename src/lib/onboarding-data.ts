import type { Category } from './types';

export interface OnboardingQuestion {
  id: string;
  title: string;
  subtitle: string;
  multiSelect: boolean;
  options: { value: string; label: string }[];
}

export const ONBOARDING_QUESTIONS: readonly OnboardingQuestion[] = [
  {
    id: 'business_type',
    title: 'What kind of business are you in?',
    subtitle: 'Startups, agencies, and enterprises each have their own rhythm. Let\u2019s match yours.',
    multiSelect: false,
    options: [
      { value: 'creator', label: 'Creator' },
      { value: 'enterprise', label: 'Enterprise' },
      { value: 'government', label: 'Government' },
      { value: 'nonprofit', label: 'Non-profit' },
      { value: 'entrepreneur', label: 'Entrepreneur' },
      { value: 'startup', label: 'Startup' },
      { value: 'small_business', label: 'Small Business' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'role',
    title: 'What\u2019s your role?',
    subtitle: 'Your answer helps surface tools and workflows built for how you work.',
    multiSelect: false,
    options: [
      { value: 'executive', label: 'Executive' },
      { value: 'customer_service', label: 'Customer Service' },
      { value: 'creative', label: 'Creative' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'founder', label: 'Founder' },
      { value: 'finance', label: 'Finance' },
      { value: 'hr', label: 'HR' },
      { value: 'it', label: 'Information Technology' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
      { value: 'product', label: 'Product' },
      { value: 'pr', label: 'PR' },
      { value: 'research', label: 'Research' },
      { value: 'sales', label: 'Sales' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'industry',
    title: 'What industry are you in?',
    subtitle: 'AI plays a different role in every field \u2014 we\u2019ll focus on what fits.',
    multiSelect: false,
    options: [
      { value: 'arts_entertainment', label: 'Arts & Entertainment' },
      { value: 'business_marketing', label: 'Business & Marketing' },
      { value: 'government', label: 'Government' },
      { value: 'communication_media', label: 'Communication & Media' },
      { value: 'education_academia', label: 'Education & Academia' },
      { value: 'finance_economics', label: 'Finance & Economics' },
      { value: 'healthcare_medicine', label: 'Healthcare & Medicine' },
      { value: 'legal_law', label: 'Legal & Law Enforcement' },
      { value: 'science_research', label: 'Science & Research' },
      { value: 'social_nonprofit', label: 'Social Services & Non-profit' },
      { value: 'technology_engineering', label: 'Technology & Engineering' },
    ],
  },
  {
    id: 'interests',
    title: 'What are you most curious about?',
    subtitle: 'Your interests shape the tools and content tailored just for you. Select all that apply.',
    multiSelect: true,
    options: [
      { value: 'marketing', label: 'Marketing' },
      { value: 'audio', label: 'Audio' },
      { value: 'coding', label: 'Coding' },
      { value: 'image', label: 'Image' },
      { value: 'music', label: 'Music' },
      { value: 'productivity', label: 'Productivity' },
      { value: 'text', label: 'Text' },
      { value: 'video', label: 'Video' },
      { value: 'automation', label: 'Automation' },
    ],
  },
  {
    id: 'goals',
    title: 'What are you hoping to get out of this?',
    subtitle: 'We\u2019ll help you get there faster. Select all that apply.',
    multiSelect: true,
    options: [
      { value: 'upskill', label: 'Upskill' },
      { value: 'reskill', label: 'Reskill' },
      { value: 'save_time', label: 'Save Time' },
      { value: 'build_business', label: 'Build a Business' },
      { value: 'new_hobby', label: 'New Hobby' },
    ],
  },
];

/** Maps user interests to relevant tool categories for recommendations */
export const INTEREST_CATEGORY_MAP: Record<string, Category[]> = {
  marketing: ['ai-writing-tools', 'ai-seo-tools'],
  audio: ['ai-design-tools'],
  coding: ['ai-coding-tools'],
  image: ['ai-design-tools'],
  music: ['ai-design-tools'],
  productivity: ['ai-productivity', 'ai-automation'],
  text: ['ai-writing-tools'],
  video: ['ai-design-tools'],
  automation: ['ai-automation'],
};
