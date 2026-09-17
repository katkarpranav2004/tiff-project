import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const REPORT_BASE = 'https://tissincubefoundation.com/wp-content/uploads/2025/12';

async function main() {
  console.log('Seeding database...');

  // ---- Default admin -------------------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tissincubefoundation.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword, name: 'System Admin', role: 'super_admin' },
  });
  console.log(`✅ Admin ready: ${admin.email}`);

  // ---- Board members (verified from the live site) -------------------
  const boardMembers = [
    {
      name: 'Prof. Satyajit Majumdar',
      designation: 'Managing Director',
      order: 1,
      bio: 'Ex-Professor and Dean of the School of Management and Labour Studies, Tata Institute of Social Sciences, Mumbai, he is the Managing Director of TIF. With more than 40 years of cumulative experience across corporate and academics, he is the driving force behind TIF.',
    },
    {
      name: 'Dr. Madhav Sathe',
      designation: 'Director',
      order: 2,
      bio: 'A practicing anaesthesiologist with over 40 years of experience, currently serving as the Joint Honorary Secretary of the Bombay Mothers and Children Welfare Society (BMCWS). He demonstrates expertise in NGOs, capacity building and social entrepreneurship while leading impactful initiatives in urban and rural healthcare in Maharashtra. Dr. Sathe is the co-founder of TISS Incube Foundation.',
    },
    {
      name: 'Dr. Vipin Kumar',
      designation: 'Director',
      order: 3,
      bio: 'Dr. Vipin Kumar is Chief Scientist and Former Director at the National Innovation Foundation – India (NIF). His research and interest areas are incubation and promotion of inclusive and demand-driven innovations through value addition, intellectual property protection, business development, commercialization and open-source technologies for generating employment opportunities. He has incubated several innovative technologies that reached domestic and international markets.',
    },
    {
      name: 'Dr. Archana Singh',
      designation: 'Director',
      order: 4,
      bio: 'Assistant Professor and Centre Chairperson at the Centre for Social Entrepreneurship, School of Management and Labour Studies. She is an expert in Social Entrepreneurship, Social Change and Women Entrepreneurship.',
    },
  ];

  if ((await prisma.boardMember.count()) === 0) {
    await prisma.boardMember.createMany({ data: boardMembers });
    console.log('✅ Board members seeded (with biographies)');
  }

  // ---- Annual reports (with real PDF links) --------------------------
  const reports = [
    { title: 'Annual Report 2021-22', year: '2021-22', fileUrl: `${REPORT_BASE}/TIF-Annual-Report-2021-22.pdf` },
    { title: 'Annual Report 2022-23', year: '2022-23', fileUrl: `${REPORT_BASE}/TIF-Annual-Report-2022-23.pdf` },
    { title: 'Annual Report 2023-24', year: '2023-24', fileUrl: `${REPORT_BASE}/TIF-Annual-Report-2023-24.pdf` },
    { title: 'Annual Report 2024-25', year: '2024-25', fileUrl: `${REPORT_BASE}/Incubation-Centre-Annual-Report-2024-25.pdf` },
  ];

  if ((await prisma.report.count()) === 0) {
    await prisma.report.createMany({ data: reports });
    console.log('✅ Annual reports seeded (with PDF links)');
  }

  // ---- Programs & offerings ------------------------------------------
  const programs = [
    { title: 'Incubation', description: 'Self-designed incubation programmes, with or without seed funding, for rural and social ventures.', order: 1 },
    { title: 'Entrepreneurship Training', description: 'Training on entrepreneurship and related areas for founders and changemakers.', order: 2 },
    { title: 'Capacity Building', description: 'Strengthening organisations and individuals to deliver sustainable impact.', order: 3 },
    { title: 'Impact Assessment', description: 'Field-based assessment of outcomes and social impact of interventions.', order: 4 },
    { title: 'CSR', description: 'Design and delivery of CSR-related projects and sponsored programmes.', order: 5 },
    { title: 'Innovation Support', description: 'Support for inclusive, demand-driven innovation and commercialization.', order: 6 },
  ];

  if ((await prisma.program.count()) === 0) {
    await prisma.program.createMany({
      data: programs.map((p) => ({
        ...p,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      })),
    });
    console.log('✅ Programs seeded');
  }

  // ---- Site settings (contact info — verified from live site) --------
  const settings = [
    { key: 'contact_email', value: 'tif@tissincubefoundation.com' },
    {
      key: 'contact_registered_address',
      value: 'The Mumbai Bala Mata Sangopan Kendra,\n1929 Wada Road,\nTal Khed,\nRajgurunagar, Pune.',
    },
    {
      key: 'contact_communication_address',
      value: 'TISS Incube Foundation\nTata Institute of Social Sciences\nMalti and A D Jal Naoroji Campus\nRoom Number 304, 3rd floor\nAcademic Building 2\nDeonar Farm Road, Deonar\nMumbai 400 088',
    },
    { key: 'site_title', value: 'TISS Incube Foundation' },
    {
      key: 'site_description',
      value: 'Empowering startups for the next wave of innovation. Helping entrepreneurs transform ideas into meaningful and scalable ventures.',
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Site settings seeded');

  console.log('🎉 Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
