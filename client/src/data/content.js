export const SITE = {
  name: 'Lawsake',
  tagline: 'Cyber crime, financial fraud & data protection counsel',
  phone: '+91 93951 59957',
  phoneHref: 'tel:+919395159957',
  whatsapp: '919395159957',
  whatsappText: 'Hello, I need legal assistance regarding a cyber matter.',
  email: 'contact@lawsake.com',
  location: 'New Delhi NCR, India',
  hours: 'Monday–Saturday, 10:00–19:00 IST',
};

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappText)}`;

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Practice Areas',
    to: '/practice-areas',
    children: [
      { label: 'Cyber Crime & Online Fraud', to: '/practice-areas/cyber-crime-online-fraud' },
      { label: 'Bank Account Unfreeze & Lien Removal', to: '/practice-areas/bank-account-unfreeze' },
      { label: 'Merchant & Payment Gateway Holds', to: '/practice-areas/merchant-payment-gateway-holds' },
      { label: 'ED, EOW & PMLA Matters', to: '/practice-areas/ed-eow-pmla' },
      { label: 'Criminal Litigation (BNS/BNSS)', to: '/practice-areas/criminal-litigation' },
      { label: 'DPDP Act & Data Protection', to: '/practice-areas/dpdp-compliance' },
      { label: 'Privacy Policies & Platform Docs', to: '/practice-areas/platform-documentation' },
      { label: 'FinTech & Banking Regulatory', to: '/practice-areas/fintech-banking' },
      { label: 'Corporate Contracts', to: '/practice-areas/contracts' },
      { label: 'CERT-In, ISO & AI Governance', to: '/practice-areas/cybersecurity-ai-governance' },
      { label: 'Trademark & Brand Protection', to: '/practice-areas/ip' },
      { label: 'POSH Act Compliance', to: '/practice-areas/posh' },
      { label: 'Cross-Border & International', to: '/practice-areas/international' },
    ],
  },
  {
    label: 'Knowledge',
    to: '/knowledge',
    children: [
      { label: 'Articles', to: '/knowledge' },
      { label: 'FAQs', to: '/knowledge/faq' },
      { label: 'Resources & Checklists', to: '/knowledge/resources' },
      { label: 'Glossary', to: '/knowledge/glossary' },
    ],
  },
  { label: 'Speaking', to: '/speaking' },
  { label: 'Contact', to: '/contact', cta: true },
];

export const STATS = [
  { value: '22.68L+', label: 'Cybercrime incidents reported in India (2024)' },
  { value: '₹22,845 Cr', label: 'Reported financial losses in 2024, up 206% YoY' },
  { value: '7,000+', label: 'Complaints reported daily on the national portal' },
  { value: '₹1,935 Cr', label: 'Lost to “digital arrest” scams in 2024 alone' },
];

export const PRACTICE_AREAS = [
  {
    slug: 'cyber-crime-online-fraud',
    title: 'Cyber Crime & Online Fraud',
    short: 'Investment scams, UPI fraud, digital arrest, sextortion, identity theft — from FIR to recovery.',
    intro:
      'From ₹10,000 UPI frauds to multi-crore investment scams, cyber offences in India are prosecuted through the IT Act, 2000, the BNS, 2023, and procedure under the BNSS, 2023. Results depend on speed, correct forum selection, and disciplined follow-up.',
    forWhom: [
      'Victims of online financial fraud',
      'Persons targeted by digital-arrest and impersonation scams',
      'Victims of sextortion, cyberstalking, and online harassment',
      'Businesses hit by account takeover, phishing, or insider data theft',
      'Persons wrongly implicated in cyber FIRs',
    ],
    whatWeDo: [
      'First-response strategy on NCRP / 1930, bank fraud-desk escalation, and preservation requests',
      'Drafting and filing complaints and FIRs under the IT Act and BNS',
      'Follow-up with cyber cells across states; fund-trail representations',
      'Recovery-side applications for release/restitution before magistrates',
      'Defence: bail, anticipatory bail, and quashing for wrongly named parties',
    ],
    faqs: [
      {
        q: 'Is there a time limit to report?',
        a: 'Practically, yes — the first hours decide whether funds can be held. Report on 1930/the portal immediately, then build the formal case.',
      },
      {
        q: 'Can money actually be recovered?',
        a: 'Amounts frozen in beneficiary accounts can be restored through bank process and magistrate orders. Prospects depend on how fast the trail was frozen.',
      },
      {
        q: 'The fraudster is in another state. Does that matter?',
        a: 'Cyber offences can be reported where you are; investigation then travels. We routinely coordinate matters across state lines.',
      },
    ],
  },
  {
    slug: 'bank-account-unfreeze',
    title: 'Bank Account Unfreeze & Lien Removal',
    short: 'Structured multi-state action to release accounts and liens frozen in cybercrime investigations.',
    urgent: true,
    intro:
      'Every day, thousands of accounts across India are frozen because a disputed transaction touched them. Release is possible through a disciplined process: identify the freezing authority, obtain complaint details, address the tainted amount, and pursue the correct remedy.',
    forWhom: [
      'Individuals and companies with accounts frozen or lien-marked by cyber cells',
      'Account holders with full-balance freezes over small disputed amounts',
      'Businesses with multiple freezes from different states on one account',
    ],
    whatWeDo: [
      'Diagnosis: map every freeze — authority, reference number, disputed amount',
      'Bank-level action: nodal-officer representations to convert full freezes into liens',
      'Police-level representations and appearances with transaction proof and KYC',
      'Magistrate applications under BNSS Sections 106, 497 and 503; High Court writs where warranted',
      'Multi-state parallel-track programmes using a pan-India cyber police directory',
    ],
    faqs: [
      {
        q: 'The bank will not say why my account is frozen.',
        a: 'Banks often share only a reference number. Extracting source details through the nodal desk and portal trail is step one of our process.',
      },
      {
        q: 'The disputed amount is small but my whole account is frozen.',
        a: 'Full-balance freezes over small disputed sums are common and challengeable. Courts favour limiting freezes to the tainted amount.',
      },
      {
        q: 'How long does release take?',
        a: 'It varies with jurisdictions and officer responsiveness. What we control is pace: complete documentation, immediate escalation, and court action where police tracks stall.',
      },
    ],
  },
  {
    slug: 'merchant-payment-gateway-holds',
    title: 'Merchant & Payment Gateway Account Holds',
    short: 'Settlement holds, nodal/escrow restrictions, and marketplace payout blocks for online sellers.',
    intro:
      'Online sellers face settlements held by payment aggregators, nodal restrictions, and marketplace blocks — often from a handful of complaints or a cybercrime reference against one transaction. The framework spans RBI aggregator regulations, merchant agreements, and criminal procedure.',
    forWhom: [
      'E-commerce sellers and service businesses facing gateway settlement holds',
      'Merchants with nodal/escrow restrictions or marketplace payout freezes',
      'Exporters and platforms hit by cybercrime-linked debits',
    ],
    whatWeDo: [
      'Trace whether the hold originates from risk desk, bank, or law enforcement',
      'Notices and representations under merchant agreements and RBI directions',
      'Cyber-cell and magistrate proceedings for LEA-driven holds',
      'Chargeback and dispute-representation strategy',
      'Advisory on onboarding, KYC, and settlement structures',
    ],
    faqs: [
      {
        q: 'The gateway only says “risk review”.',
        a: 'Merchant agreements and RBI’s framework impose obligations on aggregators. A structured legal demand usually converts silence into specifics.',
      },
      {
        q: 'Can they hold my entire settlement for one disputed order?',
        a: 'Proportionality is the battleground. We push holds down to the disputed exposure, with timelines.',
      },
    ],
  },
  {
    slug: 'ed-eow-pmla',
    title: 'ED, EOW & PMLA Matters',
    short: 'Advisory and representation in enforcement-agency proceedings — summons, attachment, and defence.',
    intro:
      'Enforcement proceedings run on different rails: ECIRs instead of FIRs, Section 50 PMLA statements, provisional attachment, and parallel predicate investigations. Early, precise handling shapes everything that follows.',
    forWhom: [
      'Persons and businesses summoned by the ED or EOW',
      'Parties facing provisional attachment of assets',
      'Banks and FinTechs responding to economic-offence investigations',
      'Persons named in predicate-offence FIRs feeding a PMLA case',
    ],
    whatWeDo: [
      'Advisory on Section 50 PMLA summons and EOW notices',
      'Representation in provisional-attachment and Adjudicating Authority proceedings',
      'Defence in predicate-offence investigations underlying money-laundering allegations',
      'KYC/AML and PMLA-compliance advisory for regulated entities',
    ],
    faqs: [
      {
        q: 'I received an ED summons. Should I go?',
        a: 'Yes — non-appearance has consequences. Go prepared with organised documents and advice on scope before the date.',
      },
      {
        q: 'Can attached property be recovered?',
        a: 'Attachment is provisional and contestable at multiple stages. Timelines are strict; act on the first notice.',
      },
    ],
  },
  {
    slug: 'criminal-litigation',
    title: 'Criminal Litigation (BNS/BNSS)',
    short: 'Bail, anticipatory bail, quashing, and trial defence in cyber and economic-offence FIRs.',
    intro:
      'The new criminal codes — BNS, BNSS, and the Bharatiya Sakshya Adhiniyam — govern every FIR registered since July 2024. The practice handles both defence and victim-side briefs where the facts are technological.',
    forWhom: [
      'Accused persons in cyber and economic-offence FIRs',
      'Persons needing anticipatory bail in interstate cyber matters',
      'Victims seeking compensation and restitution',
    ],
    whatWeDo: [
      'Regular and anticipatory bail, including interstate cyber FIRs',
      'Quashing petitions under Section 528 BNSS',
      'Trial-court defence in cheating, forgery, CBT, and IT Act prosecutions',
      'Victim-side prosecution support and compensation applications',
      'Responses to police notices; complaint cases and revisions',
    ],
    faqs: [
      {
        q: 'Police from another state called me. What now?',
        a: 'Do not ignore it, and do not travel unprepared. Verify the FIR, obtain a copy, and take advice on protective relief first.',
      },
      {
        q: 'What changed under BNSS?',
        a: 'Procedure, timelines, and electronic modes changed substantially — including property seizure/release and summons. Strategy citing only old CrPC sections falls behind.',
      },
    ],
  },
  {
    slug: 'dpdp-compliance',
    title: 'DPDP Act & Data Protection Compliance',
    short: 'End-to-end compliance under the DPDP Act, 2023 and Rules, 2025 — consent, breach, audits.',
    intro:
      'With the DPDP Rules notified in November 2025, India’s data-protection regime is operational on a phased schedule, with full obligations by May 2027 and penalties of up to ₹250 crore for security-safeguard failures.',
    forWhom: [
      'Startups and platforms processing Indian users’ personal data',
      'E-commerce, gaming, and social platforms within retention classes',
      'Enterprises assessing Significant Data Fiduciary exposure',
      'Foreign businesses serving Indian users',
    ],
    whatWeDo: [
      'Gap assessment: lawful basis, notice, consent, retention, security, grievance',
      'Consent architecture and parental-consent flows',
      'Data-mapping, retention schedules, and Third Schedule erasure timelines',
      'Breach-response protocols aligned with DPDP Rules and CERT-In',
      'DPAs, cross-border transfer assessment, and team training',
    ],
    faqs: [
      {
        q: 'We are a small startup. Does this apply?',
        a: 'If you process digital personal data of individuals in India, yes. Notice, consent, security, and grievance basics apply broadly.',
      },
      {
        q: 'When do penalties begin?',
        a: 'The Board is operational; core obligations phase in through May 2027. Building now is cheaper than rebuilding under enforcement.',
      },
    ],
  },
  {
    slug: 'platform-documentation',
    title: 'Privacy Policies & Platform Documentation',
    short: 'DPDP-aligned privacy policies, terms, DPAs, and the full legal stack for digital products.',
    intro:
      'Every serious digital product needs documentation that is accurate, enforceable, and DPDP-aligned — not a foreign template with the names changed.',
    forWhom: ['Websites, apps, SaaS products, and AI businesses needing a complete legal stack'],
    whatWeDo: [
      'Privacy policies — product-specific, bilingual where needed',
      'Terms of use, EULAs, and community guidelines',
      'Cookie notices and consent-flow copy',
      'Data processing agreements and API terms',
      'Intermediary-compliance documentation under the IT Act and IT Rules',
    ],
    faqs: [
      {
        q: 'We already have a privacy policy.',
        a: 'The question is whether it reflects your real data flows and the 2025 Rules. A policy that misdescribes practice is documented evidence of non-compliance.',
      },
    ],
  },
  {
    slug: 'fintech-banking',
    title: 'FinTech & Banking Regulatory',
    short: 'KYC/AML, payment regulation, and fraud-response counsel for FinTechs, merchants, and banks.',
    intro:
      'India’s payments stack is regulated at every layer — and enforcement increasingly runs through it. We advise where payments regulation, KYC/AML, and criminal process intersect.',
    forWhom: ['FinTechs', 'Merchants', 'Banks and NBFCs'],
    whatWeDo: [
      'KYC/AML programme advisory and PMLA-compliance frameworks',
      'Payment-aggregator, PPI, and digital-lending regulatory advisory',
      'Fraud-response playbooks for banks and FinTechs',
      'Panel/retainer litigation support for banks',
      'Merchant advisory on onboarding, settlement, and dispute terms',
    ],
    faqs: [],
  },
  {
    slug: 'contracts',
    title: 'Corporate Contracts & Agreements',
    short: 'MSAs, NDAs, SaaS, vendor and employment agreements drafted for technology businesses.',
    intro:
      'Most commercial disputes are drafted into existence. We draft, review, and negotiate the agreement set that technology and services businesses actually run on.',
    forWhom: ['Startups', 'Digital businesses', 'Service companies'],
    whatWeDo: [
      'MSAs, SOWs, MoUs, and term sheets',
      'NDAs, SaaS, software licensing, and API agreements',
      'Vendor, employment, founder, and contractor agreements',
      'Compliance checklists and governance policies',
      'Legal notices and pre-litigation correspondence',
    ],
    faqs: [],
  },
  {
    slug: 'cybersecurity-ai-governance',
    title: 'CERT-In, ISO & AI Governance',
    short: 'CERT-In readiness, ISO 27001 legal support, and ISO 42001 AI-governance advisory.',
    intro:
      'Security and AI obligations now arrive from multiple directions: CERT-In incident reporting, sectoral requirements, ISO/IEC 27001, and AI governance under ISO/IEC 42001.',
    forWhom: ['Product companies', 'Enterprises', 'AI-driven platforms'],
    whatWeDo: [
      'CERT-In compliance: 6-hour reporting window, log retention, point-of-contact frameworks',
      'Legal-side ISO/IEC 27001:2022 support (founder is a certified internal auditor)',
      'ISO/IEC 42001 AI management systems advisory',
      'Incident and breach counsel — privilege-conscious response and notifications',
    ],
    faqs: [],
  },
  {
    slug: 'ip',
    title: 'Trademark, Copyright & Brand Protection',
    short: 'Registration, opposition, takedowns, and enforcement for brands in India’s digital marketplace.',
    intro: 'Brand protection for digital businesses — from Registry filings to marketplace takedowns and impersonation complaints.',
    forWhom: ['Brands', 'Startups', 'Content and software businesses'],
    whatWeDo: [
      'Trademark search, filing, prosecution, and oppositions',
      'Copyright registration and enforcement',
      'Infringement notices, marketplace takedowns, domain and social impersonation complaints',
      'IP clauses and licensing frameworks in commercial contracts',
    ],
    faqs: [
      {
        q: 'Someone is running ads using our brand name.',
        a: 'Digital impersonation is both an IP violation and often a cyber offence. We pursue platform takedown plus enforcement action in parallel.',
      },
    ],
  },
  {
    slug: 'posh',
    title: 'POSH Act Compliance',
    short: 'POSH policies, Internal Committee setup and training, inquiry guidance, and filings.',
    intro: 'Statutory POSH compliance for organisations — policy, IC constitution, training, and inquiry support.',
    forWhom: ['Corporates', 'Startups', 'Institutions'],
    whatWeDo: [
      'POSH policy drafting and employee communication',
      'Internal Committee constitution and review',
      'IC training, inquiry-process guidance, and report-drafting support',
      'Annual-report and district-officer filing compliance',
    ],
    faqs: [],
  },
  {
    slug: 'international',
    title: 'Cross-Border & International Matters',
    short: 'India-side recovery and counsel for overseas and NRI clients across eight jurisdictions.',
    intro:
      'Fraud does not respect borders. The practice has handled client matters across India, Australia, the UK, Canada, the UAE, Singapore, Azerbaijan, and the BVI — with India-side execution as the anchor.',
    forWhom: ['Overseas fraud victims', 'NRI clients', 'Foreign businesses with Indian exposure'],
    whatWeDo: [
      'India-side recovery for overseas victims of frauds routed through Indian infrastructure',
      'Coordination of complaints, investigations, and asset-tracing in India',
      'Technology-law advisory for foreign businesses with Indian users',
      'Cross-border contracts addressing governing law, data transfer, and dispute resolution',
      'Remote end-to-end NRI representation in cyber and financial-fraud matters',
    ],
    faqs: [],
  },
];

export const AUDIENCES = [
  {
    title: 'Individuals & Families',
    text: 'Victims of investment scams, digital arrest, UPI fraud, job frauds, loan-app harassment, sextortion, and account takeover — complaint strategy through recovery.',
  },
  {
    title: 'Account Holders Facing Freezes',
    text: 'Individuals and companies whose accounts or FDs stand frozen because a disputed transaction passed through them. Structured release across jurisdictions.',
  },
  {
    title: 'Merchants & Exporters',
    text: 'Online sellers facing payment-gateway holds, nodal restrictions, and marketplace payout freezes — restoring cash flow with banking and cyber-cell practice.',
  },
  {
    title: 'Startups & Platforms',
    text: 'DPDP compliance, privacy and platform documentation, contracts, CERT-In readiness, and IP protection — practical, product-aware counsel.',
  },
  {
    title: 'Banks, NBFCs & FinTech',
    text: 'Panel and retainer support: fraud response, PMLA/KYC-AML advisory, security-documentation disputes, and economic-offence representation.',
  },
  {
    title: 'International & NRI Clients',
    text: 'Cross-border fraud recovery in India and technology-law advisory for foreign businesses — matters across eight jurisdictions.',
  },
];

export const EXPERIENCE = [
  {
    title: '₹2,200 crore cryptocurrency fraud',
    text: 'Represented clients in proceedings arising out of the HPZ Token matter — multi-agency investigation and cross-border money trails.',
  },
  {
    title: 'Multi-state account unfreeze programmes',
    text: 'Coordinated release efforts for accounts frozen at the instance of 18+ cyber police stations across multiple states in parallel.',
  },
  {
    title: 'Payment-aggregator settlement holds',
    text: 'Acted for e-commerce merchants whose gateway settlements were withheld following cybercrime complaints — securing structured releases.',
  },
  {
    title: 'Bank-side economic-offence matters',
    text: 'Advised and represented a private-sector bank in high-value EOW proceedings involving forged security documentation.',
  },
  {
    title: 'Anticipatory bail in interstate cyber FIRs',
    text: 'Secured protective relief for business operators named in cybercrime FIRs registered in other states.',
  },
  {
    title: 'Enforcement-agency representation',
    text: 'Advised summoned parties in ED and EOW proceedings — statement preparation, document strategy, and connected criminal defence.',
  },
];

export const ARTICLES = [
  {
    slug: 'bank-account-frozen-cybercrime-guide',
    title: 'Bank Account Frozen After a Cybercrime Complaint? The Complete Guide to Getting It Released',
    excerpt: 'Why accounts freeze through CFCFRMS, and the exact bank–police–magistrate path to release.',
    readTime: '12 min',
    body: [
      {
        h: 'Why accounts get frozen',
        p: 'When a victim reports cyber fraud on 1930 or cybercrime.gov.in, the complaint enters CFCFRMS. The system traces money through receiving accounts and banks freeze flagged accounts on police instructions. Innocent second or third parties in a payment chain often lose access to their entire balance over a few thousand rupees.',
      },
      {
        h: 'Step 1: Get the facts from the bank',
        p: 'Ask in writing for: (a) the freezing authority; (b) the reference/acknowledgement number; (c) whether it is a full debit freeze or a lien, and the amount. Address the branch manager and the bank’s nodal officer.',
      },
      {
        h: 'Step 2: Understand your position in the money trail',
        p: 'Identify the disputed credit and assemble proof of bona fide receipt — invoices, delivery records, chats, agreements, tax filings. This is the backbone of nearly every successful release.',
      },
      {
        h: 'Step 3: Approach the investigating authority',
        p: 'A written representation to the police unit that ordered the freeze — with KYC and transaction proof — asking that the freeze be limited or lifted is the fastest route when it works.',
      },
      {
        h: 'Step 4: The courts',
        p: 'Magistrate applications under BNSS Sections 497 and 503 can direct release of seized property including bank balances. Where freezes are mechanical or indefinite, High Courts can intervene under Article 226.',
      },
      {
        h: 'What not to do',
        p: 'Do not ignore it. Do not send angry unsigned emails. Do not pay “agents” who promise release through contacts. Do not transact through friends’ accounts in ways that create fresh suspicion.',
      },
    ],
  },
  {
    slug: 'digital-arrest-scam-guide',
    title: '“Digital Arrest” Scams: There Is No Such Thing — And What To Do If You Are Targeted',
    excerpt: '₹1,935 crore lost in 2024. No Indian law provides for arrest over a video call. Here is what to do.',
    readTime: '8 min',
    body: [
      {
        h: 'How the scam works',
        p: 'A call claims your parcel has drugs, your Aadhaar was used in money-laundering, or a warrant has been issued. You are put on a video call with uniforms and forged letterheads, told you are under “digital arrest”, and pressured to transfer funds for “verification” or “bail”.',
      },
      {
        h: 'What the law actually says',
        p: 'Arrest is a physical act under the BNSS with mandatory safeguards. Police do not arrest by video call, do not demand secrecy, and never collect money to close cases. Bail is granted by courts. Every rupee demanded on such a call is theft in progress.',
      },
      {
        h: 'If you are on such a call right now',
        p: 'Hang up. Do not transfer anything. Note numbers and account details. If money has been transferred, call 1930 immediately, alert your bank fraud desk, preserve evidence, and file a police complaint.',
      },
    ],
  },
  {
    slug: 'dpdp-act-startup-compliance-roadmap',
    title: 'DPDP Act Compliance for Startups: A Practical Roadmap to the May 2027 Deadline',
    excerpt: 'Six workstreams — from data mapping to grievance handling — before full obligations bind.',
    readTime: '10 min',
    body: [
      {
        h: 'Know your role',
        p: 'The Act regulates Data Fiduciaries — whoever decides why and how personal data is processed. Foreign companies serving users in India are covered too. Significant Data Fiduciaries attract extra obligations.',
      },
      {
        h: 'The six workstreams',
        p: 'Data mapping; notice and consent; children’s data; security and breach response; retention and erasure; rights and grievance handling. Penalties of up to ₹250 crore attach to security-safeguard failures.',
      },
      {
        h: 'A realistic sequence',
        p: 'Now–Q4 2026: data map, rewrite notices, fix consent, appoint an owner, repaper processor agreements. Through mid-2027: security review, breach runbook, retention in product, rights workflow, training, and internal audit.',
      },
    ],
  },
  {
    slug: 'ed-summons-section-50-pmla-guide',
    title: 'Summoned by the Enforcement Directorate under Section 50 PMLA? Read This Before You Go',
    excerpt: 'Preparation — not panic — is what the moment demands. Before, during, and after the statement.',
    readTime: '9 min',
    body: [
      {
        h: 'Understand what an ED case is',
        p: 'The ED opens an ECIR based on a predicate offence and investigates proceeds of crime. A summons is not, by itself, an accusation — but how you engage with it matters enormously.',
      },
      {
        h: 'Before the date',
        p: 'Do not ignore the summons. Reconstruct transactions. Organise documents chronologically. Take legal advice on scope. Produce summoned documents in indexed form and keep copies with acknowledgement.',
      },
      {
        h: 'During and after',
        p: 'Answer truthfully and precisely. Do not guess. Read the recorded statement carefully before signing. Debrief with counsel while memory is fresh. Consistency across follow-up summons is critical.',
      },
    ],
  },
  {
    slug: 'crypto-investment-fraud-legal-remedies',
    title: 'Crypto and Investment-App Frauds: The Legal Route to Getting Money Back',
    excerpt: 'Speed decides outcomes. Portal complaint, FIR, fund-trail follow-up, and restitution proceedings.',
    readTime: '10 min',
    body: [
      {
        h: 'Why speed decides outcomes',
        p: 'Fraud proceeds move in layers within hours. CFCFRMS can hold funds along the chain if the complaint reaches it before money exits. Report first (1930 / cybercrime.gov.in), reconstruct later.',
      },
      {
        h: 'The legal machinery',
        p: 'Portal complaint and bank alert; insist on FIR registration; follow the money in writing through counsel; pursue restitution before the magistrate where amounts stand frozen; and stake claims in ED attachment tracks for large schemes.',
      },
      {
        h: 'Evidence',
        p: 'Preserve the app, payment references, wallet addresses, chat groups, screenshots of withdrawal demands, and bank statements. Victims who arrive with an indexed file get materially better traction.',
      },
    ],
  },
  {
    slug: 'payment-gateway-settlement-hold-merchants',
    title: 'Payment Gateway Held Your Settlements? A Merchant’s Legal Playbook',
    excerpt: 'Risk hold, bank hold, or police freeze — identify which you have and the legal route to release.',
    readTime: '9 min',
    body: [
      {
        h: 'Identify the hold type',
        p: 'Aggregator risk hold, bank-side hold, or LEA-driven freeze — each has a different counterparty, legal basis, and remedy. Demanding the wrong thing wastes the weeks that matter most.',
      },
      {
        h: 'The merchant agreement is the battlefield',
        p: 'For risk holds, rights live in the merchant agreement and RBI’s aggregator framework. A structured legal notice demanding grounds, transaction list, amount, and a response timeline converts opaque “risk review” into a negotiable dispute.',
      },
      {
        h: 'When the police are behind it',
        p: 'Identify the police unit and complaint reference, make a documented representation with invoices and delivery proofs, and where necessary move the magistrate for release of the untainted balance.',
      },
    ],
  },
];

export const FAQS = [
  {
    q: 'Do you handle matters outside Delhi?',
    a: 'Yes. The practice is structured for pan-India work — appearances, local counsel coordination, and police-station representation across states, with most client interaction handled remotely.',
  },
  {
    q: 'Can you guarantee my account will be unfrozen or my money recovered?',
    a: 'No advocate can ethically guarantee outcomes. What we commit to is process: complete documentation, correct forums, defined timelines, and constant follow-up.',
  },
  {
    q: 'How do consultations work?',
    a: 'Share a brief description through the contact form or WhatsApp. You receive a consultation slot, a document list, and after it, a written assessment of remedy, forum, and sequence.',
  },
  {
    q: 'What do you charge?',
    a: 'Fees depend on complexity, forums, and timelines, and are discussed transparently at consultation — with clear scope in writing before any engagement begins.',
  },
  {
    q: 'I am not in India. Can you still act for me?',
    a: 'Yes. Cross-border matters — foreign victims of India-routed fraud, NRI matters, and India-side enforcement — are a regular part of the practice.',
  },
  {
    q: 'The police have called me for questioning. Should I just go?',
    a: 'Get advice first. Cooperation is usually right, but unprepared statements create avoidable problems.',
  },
  {
    q: 'My matter is urgent — an account freeze is choking my business.',
    a: 'Use the “Urgent” option on the contact form or WhatsApp with the word URGENT. Freeze matters are triaged for same-day document review wherever possible.',
  },
  {
    q: 'Is what I share with you confidential?',
    a: 'Yes. Communications with an advocate for legal advice are protected, and this practice treats confidentiality as absolute.',
  },
];

export const GLOSSARY = [
  { term: 'NCRP', def: 'National Cybercrime Reporting Portal (cybercrime.gov.in).' },
  { term: '1930', def: 'National cyber-fraud helpline; the fastest trigger for the fund-hold chain.' },
  { term: 'CFCFRMS', def: 'Citizen Financial Cyber Fraud Reporting and Management System — traces and holds fraud proceeds across the payment chain.' },
  { term: 'Lien', def: 'A bank marking that blocks a specific amount, as distinct from a full debit freeze.' },
  { term: 'Nodal officer', def: 'The bank official who interfaces with law enforcement on freezes and fraud requests.' },
  { term: 'ECIR', def: 'Enforcement Case Information Report — the ED’s internal case-initiation record.' },
  { term: 'Predicate offence', def: 'The underlying scheduled offence on which a PMLA case is built.' },
  { term: 'BNS / BNSS / BSA', def: 'India’s criminal codes in force since July 2024.' },
  { term: 'Section 106 BNSS', def: 'Police power to seize property connected with an offence — usual legal basis of account freezes.' },
  { term: 'DPDP Act / Rules', def: 'India’s data-protection framework, phasing in fully by May 2027.' },
  { term: 'CERT-In', def: 'Indian Computer Emergency Response Team; mandates incident reporting including a 6-hour window for specified incidents.' },
  { term: 'Mule account', def: 'A bank account used to layer fraud proceeds — exposing the holder to criminal liability.' },
];

export const STEPS = [
  { n: '01', title: 'Consult', text: 'Share facts, documents, and timeline in a focused consultation.' },
  { n: '02', title: 'Plan', text: 'Get a written assessment: forum, remedy, sequence, and realistic expectations.' },
  { n: '03', title: 'Act', text: 'Filings, bank escalations, and appearances executed on an agreed plan.' },
  { n: '04', title: 'Close', text: 'Regular updates until release, recovery, quashing, or compliance sign-off.' },
];

export const WHY = [
  {
    title: 'Enforcement-facing experience',
    text: 'Regular work with cyber police, ED, CBI, and EOW — where cyber matters are often won or lost before court.',
  },
  {
    title: 'Pan-India coordination',
    text: 'A working map of cyber cells nationwide, and hands-on handling of one matter across many states.',
  },
  {
    title: 'Both sides of the table',
    text: 'We advise fraud victims seeking recovery and businesses defending freezes — so we anticipate how banks and officers move.',
  },
  {
    title: 'Speed as strategy',
    text: 'Built for fast first response: same-day complaints, bank escalation, and evidence preservation.',
  },
];
