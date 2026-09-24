export type PinKind = 'venture' | 'partnership' | 'programme';

export interface PinItem {
  kind: PinKind;
  title: string;
  place?: string;
  year?: string;
  note: string;
  /** Optional short-story framing for ventures with a fuller founder narrative. */
  headline?: string;
  story?: string;
}

export interface RegionPin {
  id: string;
  name: string;
  coordinates: [number, number];
  items: PinItem[];
}

export const KIND_LABEL: Record<PinKind, string> = {
  venture: 'Venture',
  partnership: 'Partnership',
  programme: 'Programme',
};

// International presence — non-India country-level pins on the world map.
export const worldRegions: RegionPin[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    coordinates: [-4.25, 55.86],
    items: [
      {
        kind: 'partnership',
        title: 'University of Strathclyde',
        place: 'Glasgow',
        note: 'Institutional partner in TIF’s international academic network.',
      },
      {
        kind: 'programme',
        title: 'Certificate Programme: Social Entrepreneurship',
        place: 'with British Council',
        year: '2023',
        note: 'Programme partner for training tribal-district women entrepreneurs in India, building an international ecosystem of support.',
      },
    ],
  },
  {
    id: 'us',
    name: 'United States',
    coordinates: [-84.58, 34.03],
    items: [
      {
        kind: 'partnership',
        title: 'Kennesaw State University',
        place: 'Georgia',
        note: 'Institutional partner in TIF’s international academic network.',
      },
      {
        kind: 'venture',
        title: 'Sampurn(e)arth — Global Recognition',
        place: 'Berkeley, California',
        year: '2014',
        note: 'First Indian social enterprise to win the Global Social Venture Competition (GSVC) at UC Berkeley.',
      },
    ],
  },
  {
    id: 'nepal',
    name: 'Nepal',
    coordinates: [85.3, 27.7],
    items: [
      {
        kind: 'partnership',
        title: "King's College",
        place: 'Kathmandu',
        note: 'Institutional partner in TIF’s international academic network.',
      },
      {
        kind: 'programme',
        title: 'Small Business Support Programme',
        place: 'Kathmandu & Janakpur',
        year: '2014',
        note: 'Capacity building of NGO partners; training and mentoring young entrepreneurs running micro-enterprises.',
      },
    ],
  },
  {
    id: 'colombia',
    name: 'Colombia',
    coordinates: [-74.3, 4.6],
    items: [
      {
        kind: 'partnership',
        title: 'University of Colombia',
        note: 'Institutional partner in TIF’s international academic network.',
      },
    ],
  },
  {
    id: 'russia',
    name: 'Russian Federation',
    coordinates: [73.36, 54.99],
    items: [
      {
        kind: 'partnership',
        title: 'Omsk Incubation Center',
        place: 'Siberia Region',
        note: 'Institutional partner in TIF’s international academic network.',
      },
    ],
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    coordinates: [71.4, 51.2],
    items: [
      {
        kind: 'partnership',
        title: 'Association of Social Innovators of the Republic of Kazakhstan',
        place: 'Astana',
        note: 'Training and mentoring social entrepreneurs, and international exchanges.',
      },
    ],
  },
];

// India country-level summary shown before drilling into the state map.
export const indiaSummary: RegionPin = {
  id: 'india',
  name: 'India',
  coordinates: [79, 22.5],
  items: [
    {
      kind: 'venture',
      title: '400+ enterprises incubated',
      note: 'Across nano, micro and small enterprises, reaching an estimated 10 million+ lives nationwide.',
    },
  ],
};

// India state-level pins — approximate coordinates within each state, matching
// the NAME_1 properties used in the India states TopoJSON.
export const indiaStatePins: (RegionPin & { stateId: string })[] = [
  {
    id: 'maharashtra',
    stateId: 'Maharashtra',
    name: 'Maharashtra',
    coordinates: [73.4, 19.3],
    items: [
      {
        kind: 'venture',
        title: 'Sampurn(e)arth Environment Solutions',
        place: 'Mumbai',
        year: '2012',
        note: 'Decentralised, end-to-end waste management model turning waste into livelihoods for informal waste workers.',
        headline: 'From Mumbai to Berkeley',
        story:
          'Three TISS graduates set out to turn waste into an economic resource, not a problem. Sampurn(e)arth’s decentralised model gave dignity and livelihoods to informal waste workers — and in 2014 became the first Indian social enterprise to win the Global Social Venture Competition at UC Berkeley.',
      },
      {
        kind: 'partnership',
        title: 'Registered & Operating Offices',
        place: 'Rajgurunagar, Pune & TISS/BMCWS campuses, Mumbai',
        note: 'TISS Incube Foundation’s registered office and operating campuses.',
      },
      {
        kind: 'programme',
        title: 'Certificate Programme: Social Entrepreneurship',
        place: 'Pandharpur',
        year: '2023',
        note: 'With British Council — training and mentoring women in group enterprises using local resources.',
      },
    ],
  },
  {
    id: 'delhi',
    stateId: 'Delhi',
    name: 'Delhi',
    coordinates: [77.1, 28.65],
    items: [
      {
        kind: 'venture',
        title: 'Even Cargo',
        year: '2015',
        note: "India's first women-only e-commerce logistics company, training women from marginalised communities as delivery professionals.",
        headline: 'Delivering More Than Parcels',
        story:
          'Founder Yogesh Kumar started with a radical idea: women could do logistics work just as well as men. Even Cargo trained women from marginalised communities as delivery professionals, creating the country’s first women-only e-commerce logistics company — and a new job title, “the delivery girl.”',
      },
    ],
  },
  {
    id: 'tamilnadu',
    stateId: 'Tamil Nadu',
    name: 'Tamil Nadu',
    coordinates: [77.0, 11.1],
    items: [
      {
        kind: 'venture',
        title: 'Sahayatha Healthcare',
        place: 'Coimbatore',
        year: '2023',
        note: 'TIF-SPARSH fellow venture — wheelchair with integrated commode system; secured ₹1 crore on Shark Tank India.',
        headline: '118 Iterations, One Question of Dignity',
        story:
          'Sruthi Babu asked why losing mobility should also mean losing privacy. Her wheelchair with an integrated commode system took 118 iterations and five prototypes to perfect — and in 2023, secured ₹1 crore in investment on Shark Tank India.',
      },
    ],
  },
  {
    id: 'chhattisgarh',
    stateId: 'Chhattisgarh',
    name: 'Chhattisgarh',
    coordinates: [81.7, 19.2],
    items: [
      {
        kind: 'venture',
        title: 'Unexplored Bastar',
        place: 'Bastar',
        year: '2016',
        note: 'Community-based, sustainable tourism working with tribal and rural youth, guides, homestays and artisans.',
        headline: 'He Came Back to Bastar',
        story:
          'Jeet Singh Arya left a decade-long corporate career to show the world Bastar’s forests, waterfalls and culture — not just the conflict it was known for. His community-led tourism venture now involves 1,800+ tribal and rural youth, and helped two Bastar villages earn recognition as Best Tourism Villages of India.',
      },
      {
        kind: 'partnership',
        title: 'Knowledge Partner: THINK-B',
        place: 'Jagdalpur, Bastar',
        year: '2021',
        note: 'District Administration partnership supporting 20+ enterprises and Bastar’s first Entrepreneurship Conclave.',
      },
      {
        kind: 'partnership',
        title: 'District Incubation Hub',
        place: 'Durg',
        year: '2024',
        note: 'With the District Administration of Durg — 50+ enterprises incubated, anchoring the region’s entrepreneurship ecosystem.',
      },
    ],
  },
  {
    id: 'jammukashmir',
    stateId: 'Jammu & Kashmir',
    name: 'Jammu & Kashmir',
    coordinates: [74.9, 34.0],
    items: [
      {
        kind: 'programme',
        title: 'Small Business Support Programme',
        place: 'Kashmir Valley',
        year: '2016',
        note: 'Training and mentoring young, marginalised entrepreneurs — supporting 100+ micro-enterprises.',
      },
      {
        kind: 'venture',
        title: "Zahida's Boutique",
        place: 'Anantnag',
        note: 'A home-based tailoring initiative grown into a boutique creating livelihoods for local women.',
        headline: 'From a Skill to a Dream',
        story:
          'For Zahida of Anantnag, tailoring began as a skill learned at ITI — and slowly became a path to independence. Her home-based initiative has grown into a boutique offering tailoring, cosmetics and accessories, and she now hopes to mentor other women in her community toward the same independence.',
      },
    ],
  },
  {
    id: 'westbengal',
    stateId: 'West Bengal',
    name: 'West Bengal',
    coordinates: [87.4, 23.6],
    items: [
      {
        kind: 'partnership',
        title: 'SRREOSHI',
        place: 'Durgapur',
        year: '2012',
        note: 'Incubating the incubator — training and mentoring focused on marginalised tribal women entrepreneurs.',
      },
      {
        kind: 'programme',
        title: 'Certificate Programme: Social Entrepreneurship',
        place: 'Tribal districts of West Bengal',
        year: '2023',
        note: 'With British Council — training tribal-district women in group enterprises using local resources.',
      },
    ],
  },
  {
    id: 'madhyapradesh',
    stateId: 'Madhya Pradesh',
    name: 'Madhya Pradesh',
    coordinates: [77.3, 23.3],
    items: [
      {
        kind: 'partnership',
        title: 'Shivganga Samgra Grameen Vikas Parishad',
        place: 'Jhabua',
        year: '2014',
        note: 'Entrepreneurship as social reform — led to Jhabua Naturals (organic produce) and Jhabua Craft (bamboo artefacts).',
      },
      {
        kind: 'programme',
        title: 'Impact Assessment Study: BORL',
        place: 'Bina region',
        year: '2017',
        note: "Study of BORL's CSR initiatives across 22 villages, informing a strategic CSR framework.",
      },
      {
        kind: 'programme',
        title: 'Samanvay Mandapam',
        place: 'Bina',
        year: '2021',
        note: 'Agri-entrepreneurship programme for rural youth, formalising agri-related occupations into professions.',
      },
    ],
  },
  {
    id: 'arunachalpradesh',
    stateId: 'Arunachal Pradesh',
    name: 'Arunachal Pradesh',
    coordinates: [94.7, 27.9],
    items: [
      {
        kind: 'partnership',
        title: 'Government of Arunachal Pradesh',
        year: '2019–20',
        note: 'Programme design support, mentoring and incubation calls in partnership with the state government.',
      },
    ],
  },
  {
    id: 'kerala',
    stateId: 'Kerala',
    name: 'Kerala',
    coordinates: [76.3, 10.1],
    items: [
      {
        kind: 'partnership',
        title: 'Nidhi Accelerator: Maker Village',
        year: '2021',
        note: 'Knowledge partner supporting 15 enterprises with venture planning, marketing and investment-pitch workshops.',
      },
    ],
  },
  {
    id: 'punjab',
    stateId: 'Punjab',
    name: 'Punjab',
    coordinates: [75.6, 30.9],
    items: [
      {
        kind: 'venture',
        title: 'ForschMedX — TrachEase',
        note: 'Sensor-enabled airway secretion management system for ICU ventilator patients; Startup Punjab Seed Fund grantee.',
        headline: 'From an ICU Problem to a Global MedTech Innovation',
        story:
          'Abhishek Gaikar noticed a problem sitting at the heart of intensive care: managing airway secretions in ventilator patients. TrachEase, his sensor-enabled suctioning system, has since won India’s Best Design Project Award and a place in BIRAC’s BIG-24 programme for medical devices.',
      },
    ],
  },
  {
    id: 'haryana',
    stateId: 'Haryana',
    name: 'Haryana',
    coordinates: [77.03, 28.46],
    items: [
      {
        kind: 'partnership',
        title: 'Azisly.ai',
        place: 'Gurugram',
        year: '2025',
        note: 'MoU for an online course on entrepreneurship and applied AI for young graduates and professionals, under TIF Gurukul.',
        headline: 'Bringing AI to the Next Generation of Entrepreneurs',
        story:
          'TIF partnered with Azisly.ai, an AI-enabled learning platform, to co-create a course blending entrepreneurship with the applied use of AI — pairing TIF’s decade of grassroots incubation experience with Azisly’s technology-driven approach to employability, as part of TIF Gurukul’s push to take entrepreneurship education beyond institutional boundaries.',
      },
    ],
  },
];
