export interface IncubateeStoryData {
  slug: string;
  name: string;
  image?: string;
  location?: string;
  sector?: string;
  url: string; // official page on tissincubefoundation.com
  description: string[];
}

const TIF = 'https://tissincubefoundation.com/incubatees';

// Content sourced from tissincubefoundation.com/incubatees/<slug>/.
export const INCUBATEE_STORIES: IncubateeStoryData[] = [
  {
    slug: 'ayansh',
    name: 'AYANSH',
    location: 'Thane',
    sector: 'Livelihood / Social Entrepreneurship',
    url: `${TIF}/ayansh/`,
    description: [
      'AYANSH, led by social entrepreneur Sanish Kulkarni, is a Class of 2017 TISS Incube Foundation venture. It aims to provide livelihood to at-risk youth in the form of self-employment.',
      'The venture focuses on creating economic opportunities for vulnerable young people through entrepreneurial self-employment pathways rather than traditional wage-employment models.',
    ],
  },
  {
    slug: 'organo-fresh',
    name: 'Organo Fresh',
    location: 'Mumbai',
    sector: 'Agriculture / Sustainable Farming',
    url: `${TIF}/organo-fresh/`,
    description: [
      'Organo Fresh, led by Suman Kumar, is a Class of 2017 incubatee building sustainable low-cost market linkages to ensure better income for farmers.',
      'Alongside market connections, the venture provides awareness, training and monitoring, promotion and sales support to strengthen agricultural communities.',
    ],
  },
  {
    slug: 'bunkaar-textiles-pvt-ltd',
    name: 'Bunkaar Textiles Pvt Ltd',
    location: 'Mumbai',
    sector: 'Handloom / Textiles',
    url: `${TIF}/bunkaar-textiles-pvt-ltd/`,
    description: [
      'Bunkaar Textiles, founded by Aman Jain (Class of 2017), is a social enterprise working to provide identity and market opportunities to handloom weavers.',
      "It operates as a handloom fabric branding, promotion and sales company, creating market channels and brand recognition for artisans' handloom products.",
    ],
  },
  {
    slug: 'second-step-development',
    name: 'Second Step Development',
    location: 'Uttarakhand',
    sector: 'Renewable Energy',
    url: `${TIF}/second-step-development/`,
    description: [
      'Second Step Development, led by Raj Kumar, works in Uttarakhand villages to address affordability, accessibility and reliability of renewable energy in rural areas.',
      'It promotes renewable energy for rural development by providing renewable energy equipment for productive uses to rural residential households in remote, mountainous regions.',
    ],
  },
  {
    slug: 'ez-doc',
    name: 'EZ Doc',
    location: 'Hyderabad',
    sector: 'Healthcare',
    url: `${TIF}/ez-doc/`,
    description: [
      'EzDoc is a digital health platform working to create increased access to quality healthcare for all, addressing gaps for underserved communities.',
      'Its model combines physical health checkup kiosks in slum areas with a mobile app enabling remote consultations with specialist doctors for primary and specialized care.',
    ],
  },
  {
    slug: 'project-pankh',
    name: 'Project Pankh',
    location: 'Odisha',
    sector: 'Youth Development / Social Welfare',
    url: `${TIF}/project-pankh/`,
    description: [
      'Project Pankh addresses homelessness and social abandonment among Indian youth, with millions of children facing social orphanage despite having living families.',
      'It offers counseling, mentoring, life-skill support, vocational training and job placement, having impacted over 300 youths through a comprehensive psychological, spiritual and economic approach.',
    ],
  },
  {
    slug: 'espirito-kashi',
    name: 'Espírito Kashi',
    location: 'Varanasi',
    sector: 'Cultural Heritage / Media',
    url: `${TIF}/espirito-kashi/`,
    description: [
      "Espirito Kashi is a Varanasi-based nonprofit media organization preserving India's intangible cultural heritage through visual anthropology and ethnographic documentaries.",
      'Using new media technologies, it builds an interactive, publicly accessible archive of Indian folklore, engaging urban and rural audiences to safeguard neglected oral and musical traditions.',
    ],
  },
  {
    slug: 'ranpakhru',
    name: 'Ranpakhru',
    location: 'Amravati, Maharashtra',
    sector: 'Agriculture / Sustainable Farming',
    url: `${TIF}/ranpakhru/`,
    description: [
      'Ranpakhru, founded by Harshwardhan Bhujade, is a social enterprise mobilizing small and marginal farmers in rural Maharashtra to adopt sustainable farming and allied income activities.',
      'It organizes motivated young farmers into groups, trains them in allied activities, and helps establish small agri-businesses with technical and marketing assistance.',
    ],
  },
  {
    slug: 'organifresh24',
    name: 'OrganiFresh24',
    location: 'Delhi NCR',
    sector: 'Organic Agriculture / AgriTech',
    url: `${TIF}/organifresh24/`,
    description: [
      'OrganiFresh24 promotes organic farming while delivering fresh organic vegetables from farm to market within 24 hours as standardized packaged products.',
      "A mobile app lets customers order directly from vendors, eliminating manual weighing and billing. It targets raising 30 farmers' income by 10% and improving health for 5000 consumers.",
    ],
  },
  {
    slug: 'even-cargo',
    name: 'Even Cargo',
    location: 'Delhi',
    sector: "Women's Employment / Economic Empowerment",
    url: `${TIF}/even-cargo/`,
    description: [
      "Even Cargo tackles India's declining female labor force participation, gender divisions in jobs, women's overrepresentation in informal work, and safety barriers in public spaces.",
      'By creating accessible formal employment pathways for women, it aims to boost their economic contribution and unlock wider gains in household decision-making, health and education.',
    ],
  },
  {
    slug: 'innotech-villages',
    name: 'Innotech Villages',
    location: 'Nandurbar, Maharashtra',
    sector: 'Agri-Technology / Rural Development',
    url: `${TIF}/innotech-villages/`,
    description: [
      'Innotech Villages is a technology field-testing service provider bridging R&D developers and farmers by testing agricultural technologies with local farming communities.',
      'It offers needs analysis, profit-sharing advisory, equipment rental via a technology hiring centre, and post-harvest processing, aiming to reduce technology failures and labor drudgery.',
    ],
  },
  {
    slug: 'make-a-space',
    name: 'Make a Space',
    location: 'Lucknow',
    sector: 'Youth Development / Skill Training',
    url: `${TIF}/make-a-space/`,
    description: [
      'Make a Space supports orphan youth outside institutional care who face dropout risks, designing learning programs to build personality and self-reliance.',
      'It runs a Financial and Legal Literacy Program plus skill development for income generation, connecting orphan youth to higher education and improved living standards.',
    ],
  },
  {
    slug: 'cowism',
    name: 'Cowism',
    location: 'Chandrapur, Maharashtra',
    sector: 'Sustainable Agriculture / Rural Development',
    url: `${TIF}/cowism-an-initiative-by-arunokalp-social-organization-for-rural-development/`,
    description: [
      'Cowism, an initiative by Arunokalp Social Organization, promotes sustainable integration of indigenous cattle to reduce agricultural input costs and give farmers regular income.',
      'It runs a dual model: a nonprofit core supporting organic farming and cow rearing, supplemented by commercial sales of A2 milk through a localized supply chain.',
    ],
  },
  {
    slug: 'rural-poultry',
    name: 'Rural Poultry',
    location: 'Jhabua, Madhya Pradesh',
    sector: 'Poultry Farming / Rural Livelihood',
    url: `${TIF}/rural-poultry/`,
    description: [
      'Rural Poultry, led by Vinod Taank, focuses on promotion, development, marketing and management of Kadaknath rural poultry farming among tribal and disadvantaged communities in Jhabua.',
      'By commercializing the disease-resistant Kadaknath black-meat breed, it creates sustainable income, reduces migration, and improves protein access for tribal families and unemployed youth.',
    ],
  },
  {
    slug: 'integrated-development-program',
    name: 'Integrated Development Program',
    location: 'Baran, Rajasthan',
    sector: 'Education / Livelihood',
    url: `${TIF}/integrated-development-program/`,
    description: [
      'The Integrated Development Program, led by Vinita Soni, improves quality of life for the Saharia tribe through social capital formation integrating education and livelihood activities.',
      "Operating across 20 villages via Extension Learning Centres and women's Self Help Groups, it reached 1,000 families and generates income from amla products, vermicompost and pickles.",
    ],
  },
  {
    slug: 'swayambhu',
    name: 'Swayambhu',
    location: 'Bihar',
    sector: 'Bio-energy / Waste Management',
    url: `${TIF}/swayambhu/`,
    description: [
      'Swayambhu, led by Akansha Singh, generates bio-energy by linking Bihar communities to local biogas plants using kitchen waste and animal dung to produce electricity, organic manure and bio-pesticide.',
      'Community plants supply about six hours of evening electricity or low-cost irrigation. The circular model buys waste from residents and returns processed byproducts to them.',
    ],
  },
  {
    slug: 'uncancer-india',
    name: 'unCancer India',
    location: 'Mumbai',
    sector: 'Healthcare / Cancer Care',
    url: `${TIF}/uncancer-india/`,
    description: [
      'unCancer India supports and cares for people diagnosed with cancer across the treatment continuum, connecting patients to doctors, hospitals, diagnostics and financial-aid nonprofits.',
      'Operating as a digital ecosystem of survivors, physicians and support services, it speeds treatment access, cuts unnecessary costs, and is developing services like second medical opinions.',
    ],
  },
  {
    slug: 'center-for-livestock-promotion-development-management',
    name: 'Center for Livestock Promotion, Development & Management',
    location: 'Bihar',
    sector: 'Livestock Farming / Agricultural Entrepreneurship',
    url: `${TIF}/center-for-livestock-promotion-development-management/`,
    description: [
      'Led by Robin Ravi, this venture creates opportunities for marginalized farm labourers and small farmers by promoting livestock farming with scientific tools and techniques.',
      'It trains rural women in goat and chicken farming, supplies vaccinated animals with technical support, provides market linkage, and runs a meat parlour in Patna for direct sales.',
    ],
  },
  {
    slug: 'thread-craft-india',
    name: 'Thread Craft India',
    location: 'Lucknow',
    sector: 'Handicrafts / Artisan Livelihood',
    url: `${TIF}/thread-craft-india/`,
    description: [
      "Thread Craft India works to sustain the traditional Chikankari embroidery art form while improving artisans' economic conditions through design, product diversification and market expansion.",
      'It plans an artisan cooperative to prevent exploitation, has raised embroiderers’ monthly income from Rs 700-800 to Rs 1900, and offers free eye checkups and spectacles.',
    ],
  },
  {
    slug: 'apni-shala',
    name: 'Apni Shala',
    location: 'Mumbai',
    sector: 'Education / Life Skills',
    url: `${TIF}/apni-shala/`,
    description: [
      'Apni Shala (Class of 2013) equips children from low-income communities with life competencies to face everyday challenges and make the most of their opportunities.',
      "Using experiential learning through community engagement, drama and games grounded in WHO's life-skills framework, its founders partner with teachers, school leaders and parents.",
    ],
  },
  {
    slug: 'sampurn-earth-environment-solutions-pvt-ltd',
    name: 'Sampurn(e)arth Environment Solutions Pvt Ltd',
    location: 'Mumbai',
    sector: 'Waste Management / Environment',
    url: `${TIF}/sampurn-earth-environment-solutions-pvt-ltd/`,
    description: [
      'Sampurn(e)arth provides context-based decentralized solid waste management solutions that are environmentally friendly, engage waste pickers, and remain profitable.',
      'Partnering with Stree Mukti Sanghatana and around 3,000 waste-pickers, it improves working conditions and offers skill development and alternative employment while shifting communities toward healthier waste practices.',
    ],
  },
  {
    slug: 'samposhit-sanrakshanam',
    name: 'Samposhit Sanrakshanam',
    location: 'Sikar, Rajasthan',
    sector: 'Rural Development / Water Management',
    url: `${TIF}/samposhit-sanrakshanam/`,
    description: [
      'Samposhit Sanrakshanam, founded by Lokesh Meel in 2013, works on rural development in Sikar district, beginning with Project Aksh to provide safe drinking water in Fatehpur.',
      'After an RO plant proved costly and wasteful, it pivoted to reviving traditional water harvesting systems, renovating existing structures and building new ones for rural communities.',
    ],
  },
  {
    slug: 'krishi-naturals',
    name: 'Krishi Naturals',
    location: 'Vadodara, Gujarat',
    sector: 'Organic Farming / Sustainable Agriculture',
    url: `${TIF}/krishi-naturals/`,
    description: [
      'Krishi Naturals aims to make organic farming a sustainable livelihood source for marginal farmers by connecting consumers and farmers and ensuring assured markets.',
      'It recruits farmer groups within 100 km, plans crops by demand, and delivers weekly seasonal baskets to subscribers, with a planned IT traceability system using images and videos.',
    ],
  },
  {
    slug: 'green-basics',
    name: 'Green Basics',
    location: 'Srikakulam, Andhra Pradesh',
    sector: 'Sustainable Agriculture / Integrated Farming',
    url: `${TIF}/green-basics/`,
    description: [
      'Green Basics, initiated in Srikakulam in December 2009, implements integrated farming systems for sustainable agriculture at scale, offering packaged agricultural services.',
      'It supports farmer collectives with training, capacity building and funding, and through collaboration with Goa Shipyard Limited formed four cooperatives serving about 1,500 families and 3,500 tribal farmers.',
    ],
  },
  {
    slug: 'clips-india-foundation',
    name: 'C-LIPS (CLIPS India Foundation)',
    location: 'Mumbai',
    sector: 'Social Research & Development',
    url: `${TIF}/clips-india-foundation/`,
    description: [
      "C-LIPS ('Community Lips') promotes social research to bridge gaps between organizations and communities through primary research studies.",
      'It conducts Community Needs Assessment, Social Impact Assessment and Monitoring & Evaluation for government, corporate CSR and voluntary organizations, drawing on expertise from institutions like TISS and IIMs.',
    ],
  },
  {
    slug: 'bharat-calling',
    name: 'Bharat Calling',
    location: 'Hoshangabad, Madhya Pradesh',
    sector: 'Education',
    url: `${TIF}/bharat-calling/`,
    description: [
      'Bharat Calling creates a platform for easy transition of rural students to higher education in prestigious universities, partnering with government secondary schools in rural Madhya Pradesh.',
      'Acting as an information hub on colleges, applications, entrance prep and scholarships, it monitors student progress to prevent dropouts and leverages the government school system to connect NGOs and students.',
    ],
  },
];

export const getIncubatee = (slug?: string) =>
  INCUBATEE_STORIES.find((i) => i.slug === slug);

export { TIF };
