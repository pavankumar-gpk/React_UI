import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const apacNames = [
  'Tan Wei Ming', 'Wong Mei Ling', 'Lim Jian Wei', 'Chen Hui', 'Ng Seng Huat',
  'Lee Hui Min', 'Goh Peng Huat', 'Lim Su Ling', 'Khoo Boon Seng', 'Chua Li Na',
  'Tay Cheng Huat', 'Ong Seng Koon', 'Sim Hui Fang', 'Teo Boon Seng', 'Chew Hui Ming',
  'Yamamoto Takeshi', 'Suzuki Yuki', 'Tanaka Hiroshi', 'Nakamura Kenji', 'Yoshida Sakura',
  'Honda Arjun', 'Kumari Priya', 'Singh Rajesh', 'Patel Ananya', 'Sharma Amit',
  'Nguyen Minh', 'Tran Linh', 'Pham Duc', 'Ho Anh', 'Dang Thu',
  'Somchai Korat', 'Chonticha Phuket', 'Suwit Bangkok', 'Niran Chiang Mai', 'Pranee Isaan',
  'Santoso Jakarta', 'Siti Surabaya', 'Budi Bandung', 'Eka Medan', 'Putri Bali',
  'Santos Manila', 'Cruz Cebu', 'Garcia Davao', 'Lopez Quezon', 'Torres Mindanao',
  'Kim Min-joon', 'Park Ji-woo', 'Lee Sung-ho', 'Choi Ji-hwan', 'Jung Min-jun'
];

const lineOfBusiness = ['Property', 'Casualty', 'A&H', 'Marine'];
const statuses = ['Active', 'Expired', 'Pending', 'Cancelled'];
const regions = ['Singapore', 'Hong Kong', 'Australia', 'Japan', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines'];
const currencies = ['USD', 'SGD', 'HKD', 'AUD', 'JPY', 'THB'];

function generateRandomDate(daysOffset = 365) {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * daysOffset) - (daysOffset / 2);
  const date = new Date(today.getTime() + randomDays * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
}

function generateMockPolicies(count = 200) {
  const policies = [];
  
  for (let i = 0; i < count; i++) {
    const effectiveDate = generateRandomDate();
    const expiryDate = new Date(new Date(effectiveDate).getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    policies.push({
      id: uuidv4(),
      policyNumber: `POL-${String(100000 + i).slice(-6)}`,
      policyholderName: apacNames[Math.floor(Math.random() * apacNames.length)],
      lineOfBusiness: lineOfBusiness[Math.floor(Math.random() * lineOfBusiness.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      premiumAmount: Math.floor(Math.random() * (5000000 - 1000) + 1000),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      effectiveDate,
      expiryDate,
      region: regions[Math.floor(Math.random() * regions.length)],
      underwriter: `UW-${Math.floor(Math.random() * 100)}`,
      flaggedForReview: Math.random() > 0.8
    });
  }
  
  return policies;
}

function seedDatabase() {
  const policies = generateMockPolicies(200);
  const db = {
    policies
  };
  
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  console.log(`✅ Seeded ${policies.length} mock policies to db.json`);
}

seedDatabase();
