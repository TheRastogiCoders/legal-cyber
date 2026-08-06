/** Curated Unsplash images — professional, non-gavel imagery */
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: u('photo-1451187580459-43490279c0fa'), // night earth / digital network
  problem: u('photo-1550751827-4bd374c3f58b', 1200), // cybersecurity
  about: u('photo-1497366216548-37526070297c', 1200), // modern office
  process: u('photo-1558494949-ef010cbdcc31', 1400), // server / infrastructure blue
  contact: u('photo-1486406146926-c627a92ad1ab', 1400), // glass architecture
  speaking: u('photo-1475721027785-f74eccf877e2', 1200), // speaking / presentation
  experience: u('photo-1454165804606-c3d57bc86b40', 1200), // professional desk work
  cta: u('photo-1516321318423-f06f85e504b3', 1400), // laptop / counsel work
};

export const PRACTICE_IMAGES = {
  'cyber-crime-online-fraud': u('photo-1563986768609-322da13575f3', 900),
  'bank-account-unfreeze': u('photo-1563013544-824ae1b704d3', 900),
  'merchant-payment-gateway-holds': u('photo-1556742049-0cfed4f6a45d', 900),
  'ed-eow-pmla': u('photo-1450101499163-c8848c66ca85', 900),
  'criminal-litigation': u('photo-1589829545856-d10d557cf95f', 900),
  'dpdp-compliance': u('photo-1555949963-aa79dcee981c', 900),
  'platform-documentation': u('photo-1517694712202-14dd9538aa97', 900),
  'fintech-banking': u('photo-1551288049-bebda4e38f71', 900),
  contracts: u('photo-1450101499163-c8848c66ca85', 900),
  'cybersecurity-ai-governance': u('photo-1677442136019-21780ecad995', 900),
  ip: u('photo-1561070791-2526d30994b5', 900),
  posh: u('photo-1521737711867-e3b97375f902', 900),
  international: u('photo-1526304640581-d334cdbbf45e', 900),
};

export const ARTICLE_IMAGES = {
  'bank-account-frozen-cybercrime-guide': u('photo-1601597111158-2fceff292cdc', 900),
  'digital-arrest-scam-guide': u('photo-1512941937669-90a1b58e7e9c', 900),
  'dpdp-act-startup-compliance-roadmap': u('photo-1460925895917-afdab827c52f', 900),
  'ed-summons-section-50-pmla-guide': u('photo-1454165804606-c3d57bc86b40', 900),
  'crypto-investment-fraud-legal-remedies': u('photo-1621761191319-c6fb62004040', 900),
  'payment-gateway-settlement-hold-merchants': u('photo-1556741533-6e6a62bd8b49', 900),
};
