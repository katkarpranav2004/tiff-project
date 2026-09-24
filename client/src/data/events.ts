export interface EventStoryData {
  slug: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  image: string;
  tags: string[];
  description: string[];
  agenda?: string[];
  logo?: boolean;
}

export const EVENT_STORIES: EventStoryData[] = [
  {
    slug: 'annual-general-meeting-2025',
    title: 'Annual General Meeting 2025',
    date: 'Friday, 26 September 2025',
    time: '11:00 AM',
    location:
      'Room No 304, Academic Building 2, Malti & AD Jal Naoroji Campus, Tata Institute of Social Sciences, Deonar Farm Road, Deonar, Mumbai 400 088',
    image: 'https://tissincubefoundation.com/wp-content/uploads/2025/09/Slide-16_9-47.png',
    tags: ['Governance', 'AGM'],
    description: [
      'TISS Incube Foundation, an independent not-for-profit company, will hold its Annual General Meeting on the date and time noted above.',
      'The notice was issued by Satyajit Majumdar, Managing Director, on 9 September 2025 from Mumbai. An official PDF notice is available for reference.',
    ],
    agenda: [
      'Review and adopt the audited financial statements for the year ending 31 March 2025, along with the Board and Auditor reports.',
      'Reappoint the statutory auditors and determine their compensation, if necessary.',
      "Address any additional matters at the Chair's discretion.",
    ],
  },
  {
    slug: 'tiss-incube-foundation-conference-2023',
    title: 'TISS Incube Foundation – Conference 2023',
    date: '22 February – 24 June 2023',
    location: 'Online Event',
    image: 'https://tissincubefoundation.com/wp-content/uploads/2023/06/Conference-2023-Flyer-726x1024.jpg',
    tags: ['Conference'],
    description: [
      'TISS Incube Foundation Conference 2023 — an online gathering of the incubation ecosystem, held across February to June 2023.',
    ],
  },
  {
    slug: 'digital-conference-on-social-enterprise-values-and-processes',
    title: 'Digital Conference on Social Enterprise: Values and Processes',
    date: '5 January 2022',
    time: '03:00 PM – 04:30 PM',
    location: 'Online Event',
    image: 'https://tissincubefoundation.com/wp-content/uploads/2023/02/unnamed.jpg',
    tags: ['Conference', 'Social Entrepreneurship'],
    description: [
      'The Centre for Social Entrepreneurship organised this conference to broaden research in social entrepreneurship.',
      'On the first day, incubatees including Dilip S, Steward Gracian, Veera Bahu, Bethun Bhowmik and Pramod Bhurji presented their enterprise work.',
      'On the following day, MASE second-year students took part in an interactive session; those who had run pilots pitched their venture ideas, followed by a Q&A session.',
    ],
  },
  {
    slug: 'forschmedx-trachease',
    title: 'ForschMedX — TrachEase',
    date: 'Founded 2023',
    location: 'Punjab / Mumbai',
    image: '/ventures/forschmedx.jpg',
    tags: ['Incubatee', 'MedTech'],
    description: [
      'ForschMedX, founded by Abhishek Gaikar, tackles a problem at the heart of intensive care: safely managing airway secretions in patients on mechanical ventilation. What began as a clinically observed problem evolved into TrachEase — a system combining a modified endotracheal tube with automated, sensor-enabled suctioning.',
      'The ambition is significant: reduce secretion build-up, lower the risk of ventilator-associated pneumonia, ease the burden of manual suctioning for ICU staff, and provide more consistent airway care. Gaikar, a pharmaceutical sciences professional and NIPER alumnus, was part of the BIRAC SPARSH/SIIP ecosystem, receiving an Award of Excellence in 2023.',
      'TrachEase won India’s Best Design Project Award 2025 and ForschMedX was selected under the BIRAC BIG-24 programme, with a Startup Punjab Seed Fund grant and an international patent application in progress.',
    ],
  },
  {
    slug: 'sahayatha-healthcare',
    title: 'Sahayatha Healthcare',
    date: '2023 · Shark Tank India',
    location: 'Coimbatore',
    image: '/ventures/sahayatha.jpg',
    tags: ['Incubatee', 'HealthTech'],
    description: [
      'Sahayatha Healthcare, founded by TISS Incube Foundation SPARSH fellow Sruthi Babu, began with a human question: why should a person who cannot walk also surrender their privacy and dignity? The Coimbatore venture developed a wheelchair with an integrated commode and defecation-cleansing system for people with severe mobility limitations.',
      'The journey from idea to product took 118 iterations and five prototypes, shaped by feedback from doctors and users. In 2023, Sahayatha appeared on Shark Tank India, where Sruthi Babu secured ₹1 crore in investment and mentorship from four leading entrepreneurs.',
      'The venture now supplies wheelchairs to hospitals, NGOs and individual users, and has won the CavinKare ChinniKrishnan Innovation Award 2025 and the Buimerc Nava DISHA Puraskaram 2025.',
    ],
  },
  {
    slug: 'xen-farms',
    title: 'XEN Farms',
    date: 'Founded 2019',
    location: 'Rural India',
    image: '/ventures/xen-logo.png',
    logo: true,
    tags: ['Incubatee', 'AgriTech'],
    description: [
      'XEN Farms was born from an unlikely journey — from advanced technology labs to the fields of rural India. Diptesh Mukherjee, an IIT Bombay alumnus with 20+ granted US patents and work connected to NASA, returned to make farming profitable, productive and climate-resilient for small farmers, with co-founders Prantik Sinha and Sourav Patra.',
      'XEN combines natural farming, carbon-based inputs, technology and market access to raise productivity while rebuilding soil health. Its platform integrates crop advisory, farm monitoring, soil nutrition, finance and a marketplace.',
      'Incubated and supported by TISS, IRMA iSEED, Villgro, MANAGE-CIA and Stanford Seed Spark, XEN won Stanford Seed Spark South East Asia 2022 and the Janhit Jagran Social Impact Award 2025, reaching 5,000+ farmers across 80 crops.',
    ],
  },
  {
    slug: 'unexplored-bastar',
    title: 'Unexplored Bastar',
    date: 'Founded 2016',
    location: 'Bastar, Chhattisgarh',
    image: '/ventures/bastar.jpg',
    tags: ['Incubatee', 'Sustainable Tourism'],
    description: [
      'Unexplored Bastar began with a Facebook page and a conviction: Bastar deserved to be known for its forests, waterfalls, culture and people — not only for conflict. Jeet Singh Arya, a Bastar native, left a decade in the corporate world to build a social enterprise around community-based, sustainable tourism in 2016.',
      'The model makes local communities participants and beneficiaries of tourism, working with tribal and rural youth, guides, homestays, artisans and Self-Help Groups. Its work now impacts 1,800+ tribal and rural youth, with 1,000+ trained in tourism and hospitality.',
      'Unexplored Bastar was named Best Startup in the Tourism Sector at the National Entrepreneurship Awards 2019, and Jeet received the Indian Responsible Tourism Award 2023. Chitrakote and Dudmaras were recognised among the Best Tourism Villages of India.',
    ],
  },
  {
    slug: 'even-cargo',
    title: 'Even Cargo',
    date: 'Founded 2015',
    location: 'Delhi',
    image: '/ventures/evencargo.jpg',
    tags: ['Incubatee', 'Women & Logistics'],
    description: [
      'Even Cargo, founded by TISS alumnus Yogesh Kumar, began with a radical idea: women should have equal access to economic opportunity, including in male-dominated sectors. Incubated at TISS, it trained women from marginalised communities as delivery professionals, creating dignified livelihoods while challenging gender stereotypes.',
      'Earlier known as WEcab, Even Cargo won the Young Social Entrepreneur Award in 2015 in Singapore, and became India’s first women-only e-commerce logistics company, partnering with Amazon and Flipkart.',
      'By 2021, Even Cargo had trained over 600 women and directly employed more than 350 — creating a new category of work, the “delivery girl”, in an industry where such a role was virtually unheard of.',
    ],
  },
  {
    slug: 'sampurnearth',
    title: 'Sampurn(e)arth Environment Solutions',
    date: 'Founded 2012',
    location: 'Mumbai',
    image: '/ventures/sampurnearth-logo.png',
    logo: true,
    tags: ['Incubatee', 'Waste & Environment'],
    description: [
      'Sampurn(e)arth Environment Solutions, founded in 2012 by TISS Social Entrepreneurship graduates Debartha Banerjee, Ritvik Rao and Jayanth N., emerged from a simple idea: transform waste from a problem into an economic and social resource. Incubated through the TISS ecosystem, it built a decentralised, end-to-end waste management model combining sustainability with the dignity and livelihoods of informal waste workers.',
      'It became the first Indian social enterprise to win the Global Social Venture Competition (GSVC) at UC Berkeley in 2014, and was recognised as Best Social Enterprise at the National Entrepreneurship Awards in 2017. Its founders earned Forbes 30 Under 30 Asia and the Mumbai Heroes award.',
      'From early clients to major organisations including Tata Group companies, EY, Coca-Cola, Unilever and BARC, Sampurn(e)arth showed how a socially driven idea can become a credible, market-based enterprise with national relevance.',
    ],
  },
  {
    slug: 'zahida-boutique',
    title: 'Zahida’s Boutique',
    date: 'Anantnag',
    location: 'Anantnag, Jammu & Kashmir',
    image: '/ventures/zahida.jpg',
    tags: ['Incubatee', 'Livelihood'],
    description: [
      'For Zahida of Anantnag, tailoring began as a skill and slowly became a pathway to independence. She learned the craft at ITI Anantnag and strengthened it as a trainer at the Skill Development Center — but she wanted to build something of her own.',
      'Starting from her home, she offered tailoring services to women in her community. With determination, the home-based initiative grew into a boutique offering tailoring, cosmetics and accessories, providing a steady income and supporting her family.',
      'Her ambition extends beyond her own livelihood: she sees the enterprise as a platform for other women to find opportunity, confidence and economic independence, with plans to mentor young women and expand.',
    ],
  },
];

export const getEventStory = (slug?: string) => EVENT_STORIES.find((e) => e.slug === slug);
