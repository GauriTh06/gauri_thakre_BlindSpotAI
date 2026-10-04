import { DecisionTemplate } from '@/types';

export const DECISION_TEMPLATES: DecisionTemplate[] = [
  {
    id: 'career-change',
    title: 'Career Transition or Job Offer',
    category: 'Career & Life',
    description: 'Evaluate a major career change, job offer, or industry shift.',
    starterTitle: 'Should I accept the VP of Engineering role at AI Startup X?',
    starterContext: 'I have been at BigTech for 6 years with high salary and stability. A Series B startup offered me a VP role with higher equity but lower base pay and higher work hours. My spouse is supportive, but we are expecting our first child next year.',
    starterGoals: [
      'Accelerate career leadership path',
      'Potential high upside equity payout',
      'Work on cutting-edge generative AI technology'
    ],
    starterConstraints: [
      'Must maintain family health insurance coverage',
      'Cannot work more than 60 hours/week after baby arrives',
      'Need financial runway for 12 months minimum'
    ],
    starterConfidence: 7,
  },
  {
    id: 'startup-pivot',
    title: 'Startup Product Pivot',
    category: 'Business & Product',
    description: 'Assess pivoting your product strategy, target market, or business model.',
    starterTitle: 'Pivot our B2C Productivity App to B2B Enterprise SaaS',
    starterContext: 'B2C user retention is flat at 18% month-3. However, 15 small team managers are paying \$50/mo out of pocket and asking for team collaboration features and SSO. We have 9 months of runway left.',
    starterGoals: [
      'Reach positive unit economics and net revenue expansion',
      'Secure Series A funding within 8 months',
      'Capitalize on pull from team leads and enterprise users'
    ],
    starterConstraints: [
      'Engineering team of only 4 developers',
      'Cannot extend runway without raising or monetization',
      'Must preserve current tech stack stability'
    ],
    starterConfidence: 8,
  },
  {
    id: 'tech-stack-migration',
    title: 'Architecture & Tech Migration',
    category: 'Engineering & Tech',
    description: 'Explore migrating core backend/frontend architecture or cloud provider.',
    starterTitle: 'Migrate monolith Node.js API to Next.js App Router & Serverless',
    starterContext: 'Our legacy monolith API has high maintenance debt and slow cold deploy times. Developers complain about slow DX. Management wants faster feature velocity, but customer usage is spiking by 30% MoM.',
    starterGoals: [
      'Improve developer velocity by 40%',
      'Reduce server maintenance overhead',
      'Achieve under 100ms global latency'
    ],
    starterConstraints: [
      'Zero downtime migration required',
      'No budget for additional cloud infrastructure during migration',
      'Must complete within Q4 sprint cycle'
    ],
    starterConfidence: 6,
  },
  {
    id: 'capital-allocation',
    title: 'Major Capital Investment',
    category: 'Finance & Strategy',
    description: 'Evaluate purchasing assets, expanding offices, or acquiring a vendor.',
    starterTitle: 'Acquire competitor product line for \$1.2M',
    starterContext: 'A smaller competitor in our niche is looking to sell their asset IP and customer base of 2,000 active buyers. Buying them eliminates a key rival and doubles our email list, but requires taking on debt.',
    starterGoals: [
      'Acquire 2,000 active customer accounts',
      'Expand market dominance in North America',
      'Increase ARR by \$400k in 12 months'
    ],
    starterConstraints: [
      'Debt leverage ratio cannot exceed 2.5x',
      'Integration must not distract core team for over 90 days',
      'Requires unanimous board approval'
    ],
    starterConfidence: 5,
  }
];

export const STARTER_EXAMPLES = [
  {
    title: "Launching a Paid Community Subscription",
    context: "I have 25,000 newsletter subscribers with a 42% open rate. I am considering launching a \$29/month inner circle membership.",
    confidence: 8
  },
  {
    title: "Relocating Company HQ to Austin",
    context: "Our current lease in SF ends in 5 months. 60% of the team works remotely, while 40% are local. Moving to Austin reduces tax overhead.",
    confidence: 6
  },
  {
    title: "Delaying Product Launch by 2 Months for Code Refactoring",
    context: "The MVP is feature-complete but has test coverage of only 35% and occasional memory spikes under high load.",
    confidence: 5
  }
];
