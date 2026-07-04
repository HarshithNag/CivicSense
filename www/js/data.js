/* ==========================================================================
   CIVIC SENSE — MOCK DATA
   Everything in this file is fictional. No real government records,
   departments, contractors, or citizen data are represented here.
   Edit freely — this is the single place all "content" lives.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Reference lists                                                        */
/* ---------------------------------------------------------------------- */
const DEPARTMENTS = [
  "BBMP — Roads & Infrastructure Wing", "BWSSB — Bengaluru Water Supply & Sewerage Board",
  "BESCOM — Bengaluru Electricity Supply Co.", "BMRCL — Bengaluru Metro Rail Corporation",
  "BMTC — Bengaluru Metropolitan Transport Corp.", "Karnataka PWD — Bridges Division",
  "Dept. of Health & Family Welfare, Karnataka", "Dept. of School Education, Karnataka",
  "Karnataka State Police Housing & Infra. Corp.", "Bengaluru Smart City Ltd.",
  "Karnataka Slum Development Board", "Dept. of Horticulture, Karnataka",
  "Karnataka Urban Water Supply & Drainage Board", "Dept. of Forest, Ecology & Environment"
];

const CONTRACTORS = [
  "Shreeram Infra Projects Pvt. Ltd.", "Nandi Constructions Ltd.", "KRV Engineers & Associates",
  "Vishwa Bridgeworks Pvt. Ltd.", "Sarayu Buildtech Co.", "Manasa Infrastructure Ltd.",
  "Bhoomi Civil Contractors", "Aparna Metro Builders Consortium", "Trident Urban Developers",
  "Kaveri Hydro Engineering", "Sundar Electricals Pvt. Ltd.", "Deccan Construction Co."
];

/* ---------------------------------------------------------------------- */
/* Development & Bills — fictional project pipeline                       */
/* ---------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "p01", name: "Outer Ring Road Expansion — Hebbal to Sarjapur",
    area: "Hebbal · Bengaluru", type: "Roads", status: "Ongoing", statusTone: "navy",
    budget: "₹842 Cr", billPassed: "14 Feb 2025", department: DEPARTMENTS[0], contractor: CONTRACTORS[0],
    start: "Mar 2025", eta: "Nov 2027", progress: 38, distanceKm: 6,
    desc: "Widening the ORR carriageway to six lanes with dedicated service roads and pedestrian subways to ease peak-hour congestion along the tech corridor.",
    impact: "Expected to cut average commute time on this stretch by 22 minutes and reduce accident black-spots at four junctions.",
    safety: "Night-time lane closures between 11 PM–5 AM. Two-wheeler riders should use the marked service road diversions near Nagawara."
  },
  {
    id: "p02", name: "Hebbal Junction Grade Separator", area: "Hebbal · Bengaluru",
    type: "Bridges", status: "Delayed", statusTone: "red", budget: "₹216 Cr", billPassed: "02 Jun 2024",
    department: DEPARTMENTS[5], contractor: CONTRACTORS[3], start: "Jul 2024", eta: "Aug 2026 (revised)", progress: 54, distanceKm: 6.5,
    desc: "A three-tier flyover and underpass system to decongest the Hebbal signal, integrating with the ORR widening works nearby.",
    impact: "Will remove the single largest traffic bottleneck on the northern approach into the city from KIA.",
    safety: "Underpass currently flooded in heavy rain — use the Ballari Road diversion until pumps are upgraded this monsoon."
  },
  {
    id: "p03", name: "Whitefield Metro Phase 3B Extension", area: "Whitefield · Bengaluru",
    type: "Metro", status: "Ongoing", statusTone: "navy", budget: "₹3,120 Cr", billPassed: "19 Sep 2023",
    department: DEPARTMENTS[3], contractor: CONTRACTORS[7], start: "Jan 2024", eta: "Dec 2027", progress: 29, distanceKm: 14,
    desc: "8.2 km elevated corridor extending the Whitefield line towards KR Puram with three new interchange stations.",
    impact: "Projected to serve 4.1 lakh daily commuters and cut ORR-Whitefield bus dependency by a third.",
    safety: "Pillar casting work ongoing — pedestrians must use covered walkways marked in green near Kadugodi."
  },
  {
    id: "p04", name: "Electronic City Flyover Capacity Upgrade", area: "Electronic City · Bengaluru",
    type: "Bridges", status: "Under Review", statusTone: "gold", budget: "₹156 Cr", billPassed: "11 Dec 2025",
    department: DEPARTMENTS[5], contractor: "Not yet awarded", start: "Est. Apr 2026", eta: "Est. Q4 2028", progress: 6, distanceKm: 19,
    desc: "Adding a parallel elevated lane above the existing Electronic City flyover to separate local and highway traffic.",
    impact: "Aims to reduce evening peak travel time from Silk Board to Electronic City by up to 15 minutes.",
    safety: "No active site work yet — public consultation on the DPR is open until the next quarter."
  },
  {
    id: "p05", name: "Yelahanka Lake Restoration & Wetland Buffer", area: "Yelahanka · Bengaluru",
    type: "Environment", status: "Ongoing", statusTone: "navy", budget: "₹64 Cr", billPassed: "05 Aug 2024",
    department: DEPARTMENTS[13], contractor: CONTRACTORS[9], start: "Sep 2024", eta: "Mar 2026", progress: 71, distanceKm: 11,
    desc: "Desilting, bund strengthening and a native-species wetland buffer to restore water quality and revive migratory bird habitats.",
    impact: "Expected to recharge groundwater for 3 surrounding wards and reduce urban flooding downstream.",
    safety: "Fenced construction zone along the eastern bund — joggers should use the western pathway only."
  },
  {
    id: "p06", name: "Malleswaram Underground Cabling Project", area: "Malleswaram · Bengaluru",
    type: "Electricity", status: "Ongoing", statusTone: "navy", budget: "₹38 Cr", billPassed: "22 Jan 2025",
    department: DEPARTMENTS[2], contractor: CONTRACTORS[10], start: "Feb 2025", eta: "Oct 2026", progress: 45, distanceKm: 7,
    desc: "Converting overhead LT/HT lines to underground cabling across 12 residential blocks to reduce outages during storms.",
    impact: "Projected 60% drop in monsoon-related power outages for roughly 9,000 households.",
    safety: "Trenching work on 8th Cross — please avoid parking over marked cable routes."
  },
  {
    id: "p07", name: "Cauvery Stage VI Pipeline Extension", area: "South Bengaluru",
    type: "Water Supply", status: "Ongoing", statusTone: "navy", budget: "₹5,550 Cr", billPassed: "30 Mar 2023",
    department: DEPARTMENTS[1], contractor: CONTRACTORS[9], start: "Apr 2023", eta: "Jun 2027", progress: 61, distanceKm: 22,
    desc: "Extending Cauvery water supply trunk lines to 110 peripheral villages recently added to BBMP limits.",
    impact: "Will bring piped drinking water to an estimated 5.6 lakh residents currently dependent on borewells and tankers.",
    safety: "Road cuts active on Kanakapura Road — two-wheelers advised to reduce speed near marked trenches."
  },
  {
    id: "p08", name: "Jayanagar Community Hospital Upgrade", area: "Jayanagar · Bengaluru",
    type: "Hospitals", status: "Completed", statusTone: "green", budget: "₹47 Cr", billPassed: "18 Apr 2024",
    department: DEPARTMENTS[6], contractor: CONTRACTORS[6], start: "May 2024", eta: "Jan 2026", progress: 100, distanceKm: 9,
    desc: "Added a 60-bed maternity and critical-care wing along with a new diagnostic imaging centre.",
    impact: "Doubles institutional delivery capacity for the surrounding wards and cuts referral distance to Vani Vilas.",
    safety: "Fully operational — the old block is now the outpatient wing with a separate entrance on 4th Block."
  },
  {
    id: "p09", name: "Smart Classrooms — Govt. Schools, Bengaluru South", area: "Bengaluru South Zone",
    type: "Schools", status: "Ongoing", statusTone: "navy", budget: "₹22 Cr", billPassed: "09 Jul 2025",
    department: DEPARTMENTS[7], contractor: CONTRACTORS[4], start: "Aug 2025", eta: "Apr 2026", progress: 64, distanceKm: 13,
    desc: "Interactive display panels, backup power and computer labs being rolled out across 84 government schools.",
    impact: "Brings digital learning access to roughly 31,000 students in classes 6–10.",
    safety: "Installation happens after school hours — no disruption to regular classes."
  },
  {
    id: "p10", name: "Koramangala Police Station Modernization", area: "Koramangala · Bengaluru",
    type: "Police", status: "Ongoing", statusTone: "navy", budget: "₹18 Cr", billPassed: "27 Oct 2025",
    department: DEPARTMENTS[8], contractor: CONTRACTORS[11], start: "Nov 2025", eta: "Jul 2026", progress: 33, distanceKm: 8,
    desc: "New citizen service desk, CCTV command room and a dedicated women's help desk with a private complaint room.",
    impact: "Reduces average FIR filing wait time and adds 24x7 staffed support for women's safety complaints.",
    safety: "Front office remains operational throughout — enter via the temporary side gate on 80 Feet Road."
  },
  {
    id: "p11", name: "BMTC Electric Bus Depot", area: "Rajajinagar · Bengaluru",
    type: "Public Transport", status: "Ongoing", statusTone: "navy", budget: "₹96 Cr", billPassed: "14 May 2025",
    department: DEPARTMENTS[4], contractor: CONTRACTORS[5], start: "Jun 2025", eta: "Mar 2027", progress: 21, distanceKm: 10,
    desc: "A 200-bus electric depot with charging bays, battery-swap infrastructure and a driver training facility.",
    impact: "Part of BMTC's plan to electrify 40% of its fleet, cutting an estimated 18,000 tonnes of CO₂ annually.",
    safety: "Heavy vehicle movement near the depot gate — pedestrians should use the marked crossing only."
  },
  {
    id: "p12", name: "Sarjapur Road Stormwater Drain Network", area: "Sarjapur Road · Bengaluru",
    type: "Drainage", status: "Delayed", statusTone: "red", budget: "₹128 Cr", billPassed: "03 Feb 2024",
    department: DEPARTMENTS[0], contractor: CONTRACTORS[2], start: "Apr 2024", eta: "Sep 2026 (revised)", progress: 47, distanceKm: 17,
    desc: "A primary rajakaluve widening and box-drain network to address recurring flooding along the IT corridor.",
    impact: "Targets the removal of 6 chronic flood black-spots that currently disrupt traffic every monsoon.",
    safety: "Open trenches near Kaikondrahalli — pedestrians must use barricaded walkways after dark."
  },
  {
    id: "p13", name: "Cubbon Park Heritage Zone Restoration", area: "Cubbon Park · Bengaluru",
    type: "Parks", status: "Ongoing", statusTone: "navy", budget: "₹14 Cr", billPassed: "21 Nov 2025",
    department: DEPARTMENTS[11], contractor: CONTRACTORS[6], start: "Dec 2025", eta: "Aug 2026", progress: 18, distanceKm: 5,
    desc: "Restoring heritage pathways, replanting native canopy species and upgrading accessible seating and lighting.",
    impact: "Improves accessibility for elderly and differently-abled visitors while conserving 140-year-old tree cover.",
    safety: "Sections near the bandstand fenced off — please follow the marked diversion routes."
  },
  {
    id: "p14", name: "Peenya Industrial Smart City Node", area: "Peenya · Bengaluru",
    type: "Smart City", status: "Under Review", statusTone: "gold", budget: "₹310 Cr", billPassed: "08 Jan 2026",
    department: DEPARTMENTS[9], contractor: "Not yet awarded", start: "Est. Jun 2026", eta: "Est. 2029", progress: 4, distanceKm: 15,
    desc: "Integrated sensor network for air quality, traffic and utility monitoring across Asia's largest industrial estate.",
    impact: "Aims to cut industrial-zone response time for utility faults from days to under 4 hours.",
    safety: "Public feedback stage — no construction activity yet."
  },
  {
    id: "p15", name: "Rajanukunte Public Housing Cluster", area: "Rajanukunte · Bengaluru North",
    type: "Public Housing", status: "Ongoing", statusTone: "navy", budget: "₹210 Cr", billPassed: "16 Jun 2024",
    department: DEPARTMENTS[10], contractor: CONTRACTORS[1], start: "Jul 2024", eta: "Dec 2026", progress: 58, distanceKm: 24,
    desc: "1,200 EWS housing units with community halls, a primary health centre and a government school within the cluster.",
    impact: "Provides secure ownership housing for families currently in identified slum-rehabilitation zones.",
    safety: "Site visits for eligible families by appointment only — no walk-ins at the construction gate."
  },
  {
    id: "p16", name: "Civic Digital Kiosk Network", area: "City-wide · Bengaluru",
    type: "Other", status: "Ongoing", statusTone: "navy", budget: "₹9 Cr", billPassed: "30 Sep 2025",
    department: DEPARTMENTS[9], contractor: CONTRACTORS[4], start: "Oct 2025", eta: "May 2026", progress: 40, distanceKm: 4,
    desc: "Self-service touchscreen kiosks at 40 ward offices for certificate applications, bill payments and grievance filing.",
    impact: "Cuts average in-person wait time at ward offices for routine certificate requests.",
    safety: "Kiosks are staffed by a help-desk volunteer during the first month of rollout."
  }
];

const PROJECT_TYPES = ["Roads","Buildings","Bridges","Metro","Electricity","Water Supply","Hospitals","Schools","Police","Public Transport","Drainage","Parks","Smart City","Environment","Public Housing","Other"];
const TIME_FILTERS = ["Today","Last 24 Hours","Last Week","15 Days","Last Month","Quarter","Year","Custom"];

/* ---------------------------------------------------------------------- */
/* Help categories                                                        */
/* ---------------------------------------------------------------------- */
const HELP_CATEGORIES = [
  { key: "law", label: "Law", icon: "scale", desc: "Understand a law, get AI analysis and a volunteer legal responder.", urgent: false },
  { key: "police", label: "Police", icon: "shield", desc: "Report an incident or reach your nearest station.", urgent: true },
  { key: "travel", label: "Travel", icon: "compass", desc: "Transit disruptions, permits and travel advisories.", urgent: false },
  { key: "medical", label: "Medical", icon: "cross", desc: "Nearby facilities, ambulance dispatch and health guidance.", urgent: true },
  { key: "public-services", label: "Public Services", icon: "building", desc: "Certificates, utility complaints and civic requests.", urgent: false },
  { key: "womens-safety", label: "Women's Safety", icon: "heart-shield", desc: "Confidential support, escort requests and safety mapping.", urgent: true },
  { key: "child-protection", label: "Child Protection", icon: "child", desc: "Report concerns and reach child welfare responders.", urgent: true },
  { key: "traffic", label: "Traffic", icon: "traffic", desc: "Live diversions, closures and violation reporting.", urgent: false },
  { key: "disaster-response", label: "Disaster Response", icon: "alert", desc: "Flood, storm and emergency shelter coordination.", urgent: true },
  { key: "consumer-rights", label: "Consumer Rights", icon: "cart", desc: "Billing disputes, warranty issues and fraud complaints.", urgent: false },
  { key: "cyber-crime", label: "Cyber Crime", icon: "lock", desc: "Report fraud, phishing or online harassment.", urgent: true },
  { key: "environment", label: "Environment", icon: "leaf", desc: "Pollution, waste management and green space concerns.", urgent: false },
  { key: "municipal", label: "Municipal", icon: "landmark", desc: "Ward-level civic issues and BBMP coordination.", urgent: false },
  { key: "housing", label: "Housing", icon: "home", desc: "Tenancy disputes, allotments and housing schemes.", urgent: false },
  { key: "utilities", label: "Utilities", icon: "bolt", desc: "Power, water and gas connection support.", urgent: false },
  { key: "animal-welfare", label: "Animal Welfare", icon: "paw", desc: "Stray animal concerns and veterinary response.", urgent: false },
  { key: "senior-citizens", label: "Senior Citizens", icon: "elder", desc: "Pension support, care services and safety checks.", urgent: false },
  { key: "accessibility", label: "Accessibility", icon: "accessibility", desc: "Report barriers and request accessible infrastructure.", urgent: false },
  { key: "lost-found", label: "Lost & Found", icon: "search", desc: "Report or search for lost documents and belongings.", urgent: false },
  { key: "other", label: "Other", icon: "dots", desc: "Anything that doesn't fit the categories above.", urgent: false }
];

/* ---------------------------------------------------------------------- */
/* All Laws categories                                                    */
/* ---------------------------------------------------------------------- */
const LAW_CATEGORIES = [
  { key: "constitution", label: "Constitution", icon: "scroll", count: 12 },
  { key: "transportation", label: "Transportation", icon: "car", count: 24 },
  { key: "education", label: "Education", icon: "book", count: 18 },
  { key: "technology", label: "Technology", icon: "chip", count: 15 },
  { key: "healthcare", label: "Healthcare", icon: "cross", count: 21 },
  { key: "housing", label: "Housing", icon: "home", count: 17 },
  { key: "property", label: "Property", icon: "key", count: 20 },
  { key: "traffic", label: "Traffic", icon: "traffic", count: 14 },
  { key: "environment", label: "Environment", icon: "leaf", count: 19 },
  { key: "taxation", label: "Taxation", icon: "receipt", count: 26 },
  { key: "employment", label: "Employment", icon: "briefcase", count: 23 },
  { key: "business", label: "Business", icon: "store", count: 22 },
  { key: "consumer-rights", label: "Consumer Rights", icon: "cart", count: 13 },
  { key: "digital-services", label: "Digital Services", icon: "cloud", count: 11 },
  { key: "women-child", label: "Women & Child", icon: "heart-shield", count: 16 },
  { key: "senior-citizens", label: "Senior Citizens", icon: "elder", count: 9 },
  { key: "police", label: "Police", icon: "shield", count: 15 },
  { key: "courts", label: "Courts", icon: "gavel", count: 10 },
  { key: "municipal-rules", label: "Municipal Rules", icon: "landmark", count: 18 },
  { key: "agriculture", label: "Agriculture", icon: "sprout", count: 20 },
  { key: "electricity", label: "Electricity", icon: "bolt", count: 12 },
  { key: "water", label: "Water", icon: "droplet", count: 11 },
  { key: "public-safety", label: "Public Safety", icon: "alert", count: 14 },
  { key: "urban-development", label: "Urban Development", icon: "building", count: 17 },
  { key: "tourism", label: "Tourism", icon: "compass", count: 8 }
];

/* Hand-authored deep content for the flagship law categories referenced
   directly in the brief. Every other category is generated on demand by
   buildGenericLawDetail() in app.js using the same shape. */
const LAW_DETAILS = {
  education: {
    overview: "Education law in India spans the constitutional right to free and compulsory education, state-level school administration rules, and regulations governing higher education institutions. This overview simplifies the framework citizens most commonly interact with — school admissions, fee regulation, and grievance redress.",
    appliesTo: "Parents and guardians of children aged 6–14, school management committees, private and government school administrators, and students seeking higher-education admissions in Karnataka.",
    rights: [
      "Free and compulsory education for children aged 6 to 14 at a neighbourhood government school.",
      "Protection from capitation fees and donation-based admission at recognised institutions.",
      "The right to transfer certificates within 3 working days of a request.",
      "Access to a grievance redressal cell at the district education office for fee or admission disputes."
    ],
    responsibilities: [
      "Parents must ensure enrolment and regular attendance for children in the 6–14 age bracket.",
      "Schools must publish fee structures and admission criteria publicly before the academic year begins.",
      "Institutions must report infrastructure and safety compliance annually to the state education department."
    ],
    acts: ["Right to Education Act, 2009", "Karnataka Education Act, 1983", "Karnataka Fee Regulation Act, 2017"],
    relatedRules: ["Karnataka RTE Rules, 2012", "State Admission & Transfer Guidelines, 2021"],
    faqs: [
      { q: "Can a school deny admission over a late transfer certificate?", a: "No — schools must provisionally admit the student and allow the certificate to be submitted within a reasonable follow-up window." },
      { q: "How do I contest a sudden fee hike?", a: "File a written complaint with the Karnataka Fee Regulatory Authority along with the fee notice and previous year's receipt." },
      { q: "Is neighbourhood-school allotment guaranteed under RTE?", a: "Priority is given, but final allotment depends on seat availability within the defined neighbourhood radius." }
    ],
    updates: [
      { date: "12 Jun 2026", text: "State RTE reimbursement rates revised upward for the 2026–27 academic year." },
      { date: "02 Apr 2026", text: "New online grievance portal launched for private-school fee disputes." }
    ],
    scenarios: [
      { title: "School asks for a donation at admission", text: "This is not permitted under the Karnataka Fee Regulation Act. You can file a complaint with the district education office citing the specific demand." },
      { title: "Transfer certificate delayed beyond 3 days", text: "You are entitled to escalate directly to the Block Education Officer, who can direct same-week issuance." }
    ],
    aiExplanation: "In plain terms: every child between 6 and 14 has a legal right to a seat in a nearby government school, and no school — private or government — can turn a child away for inability to pay or ask for donations tied to admission. Fee changes must be transparent and pre-announced.",
    related: ["Constitution", "Employment", "Digital Services"],
    links: [
      { label: "Karnataka School Education Dept. Portal", note: "Circulars, admission calendars and RTE forms" },
      { label: "Fee Regulatory Authority Grievance Cell", note: "File and track fee-related complaints" }
    ]
  },
  technology: {
    overview: "Technology law here covers how citizens' data is handled by digital platforms, obligations on intermediaries, and rules around emerging tech deployment in public services — an increasingly common source of citizen queries as government services move online.",
    appliesTo: "Any citizen using digital government services, and any private or public entity that collects or processes personal data in India.",
    rights: [
      "The right to be informed before your personal data is collected or shared.",
      "The right to request correction or deletion of inaccurate personal data held by a service.",
      "Protection against automated decisions that significantly affect you without a review option."
    ],
    responsibilities: [
      "Citizens should verify the legitimacy of a digital service before sharing identity documents.",
      "Platforms must maintain consent records and a grievance officer contact.",
      "Public-sector AI systems must publish a plain-language explanation of what they automate."
    ],
    acts: ["Digital Personal Data Protection Act, 2023", "Information Technology Act, 2000", "IT (Intermediary Guidelines) Rules, 2021"],
    relatedRules: ["Data Protection Board Procedure Rules, 2025"],
    faqs: [
      { q: "Can a government app share my data with a private company?", a: "Only with your explicit consent or where specifically authorised by law, and it must be disclosed in the service's data notice." },
      { q: "What if an AI system denies my application unfairly?", a: "You can request a human review — automated-only rejection without a review path is not permitted for public services." }
    ],
    updates: [
      { date: "20 May 2026", text: "Data Protection Board issues clarified guidance on AI-assisted public service decisions." }
    ],
    scenarios: [
      { title: "An app asks for Aadhaar for an unrelated service", text: "You can decline and ask which specific law requires that document for this transaction — legitimate services must be able to answer this." }
    ],
    aiExplanation: "Think of this as your digital consent layer: services must tell you what they're collecting and why, you can ask them to fix or delete it, and if a machine makes a decision about you, you can always ask a human to look again.",
    related: ["Digital Services", "Consumer Rights", "Business"],
    links: [
      { label: "Data Protection Board of India", note: "File a data grievance" },
      { label: "CERT-In Advisories", note: "Current cyber-safety advisories" }
    ]
  },
  transportation: {
    overview: "Transportation law covers vehicle registration, licensing, road-use rules and public transit regulation — the framework behind most day-to-day interactions citizens have with traffic police and the RTO.",
    appliesTo: "Vehicle owners, drivers, pedestrians and public transport operators within Karnataka.",
    rights: [
      "The right to a clearly displayed challan with reason and amount before payment.",
      "The right to appeal a suspended license through the RTO tribunal.",
      "Access to real-time public transit schedules under the state's open-data mandate."
    ],
    responsibilities: [
      "Vehicle owners must maintain valid registration, insurance and pollution certificates at all times.",
      "Drivers must comply with posted speed limits and lane discipline in designated zones.",
      "Commercial operators must display fare cards visibly to passengers."
    ],
    acts: ["Motor Vehicles Act, 1988 (as amended 2019)", "Karnataka Motor Vehicles Rules, 1989"],
    relatedRules: ["Karnataka City Traffic Regulations, 2020"],
    faqs: [
      { q: "Can I pay a challan in installments?", a: "Currently no — challans must be settled in full, but you can contest the challan before payment if you believe it's incorrect." },
      { q: "Is a digital driving license valid at checkpoints?", a: "Yes, a DigiLocker or mParivahan copy is accepted as valid proof under current rules." }
    ],
    updates: [{ date: "03 Jun 2026", text: "Revised fine schedule for helmet and seatbelt violations comes into effect." }],
    scenarios: [{ title: "Challan issued for a vehicle you sold", text: "File an ownership-transfer objection at the RTO with your sale deed — liability shifts to the new owner from the transfer date." }],
    aiExplanation: "The short version: keep your papers valid, follow posted limits, and you have a right to see exactly why you're being fined before you pay anything.",
    related: ["Traffic", "Police", "Urban Development"],
    links: [{ label: "Parivahan Sewa Portal", note: "Registration, license and challan services" }]
  },
  "consumer-rights": {
    overview: "Consumer protection law gives citizens recourse against defective goods, unfair trade practices and deficient services — from e-commerce disputes to utility billing errors.",
    appliesTo: "Any individual purchasing goods or services, including online transactions and government-run utilities.",
    rights: [
      "The right to a refund or replacement for defective goods within the warranty period.",
      "The right to file a complaint through the National Consumer Helpline without a lawyer.",
      "Protection against misleading advertisements and hidden charges at checkout."
    ],
    responsibilities: [
      "Keep purchase receipts and warranty cards as evidence for any future dispute.",
      "Report unfair practices promptly — most schemes have a limitation period for filing."
    ],
    acts: ["Consumer Protection Act, 2019", "Consumer Protection (E-Commerce) Rules, 2020"],
    relatedRules: ["Karnataka Consumer Disputes Redressal Rules"],
    faqs: [{ q: "Where do I file a complaint under ₹50 lakh?", a: "At the District Consumer Disputes Redressal Commission nearest to your residence or place of purchase." }],
    updates: [{ date: "11 Mar 2026", text: "E-commerce platforms now required to disclose seller country of origin at listing level." }],
    scenarios: [{ title: "Online order never delivered but charged", text: "File on the National Consumer Helpline app with your order ID — most platform disputes resolve within 15 days at this stage." }],
    aiExplanation: "If something you paid for is broken, fake, or never arrived, you don't need a lawyer to start — the consumer helpline and district commission exist specifically for this.",
    related: ["Business", "Digital Services", "Taxation"],
    links: [{ label: "National Consumer Helpline", note: "1915 or the UMANG app" }]
  },
  "women-child": {
    overview: "This category consolidates protections for women and children across domestic safety, workplace conduct, and child welfare — designed to be the first stop before a citizen is routed to a specialised responder.",
    appliesTo: "Women and children across all districts of Karnataka, and any citizen reporting a concern on their behalf.",
    rights: [
      "The right to file a domestic violence complaint through a Protection Officer at no cost.",
      "The right to a safe, confidential reporting channel for workplace harassment (ICC).",
      "Mandatory child-safety reporting for any adult aware of abuse under POCSO."
    ],
    responsibilities: [
      "Workplaces above the prescribed size must maintain a functioning Internal Complaints Committee.",
      "Citizens are legally obligated to report known instances of child abuse."
    ],
    acts: ["Protection of Women from Domestic Violence Act, 2005", "POCSO Act, 2012", "POSH Act, 2013"],
    relatedRules: ["Karnataka State Commission for Women Rules"],
    faqs: [{ q: "Is a domestic violence complaint free to file?", a: "Yes — Protection Officers are mandated to assist free of cost, and legal aid is available regardless of income for POCSO matters." }],
    updates: [{ date: "18 Feb 2026", text: "Karnataka expands one-stop centre coverage to 12 additional talukas." }],
    scenarios: [{ title: "Unsure whether an incident qualifies for POCSO", text: "Report it anyway through Childline 1098 — trained responders assess and route the case, you don't need to determine this yourself." }],
    aiExplanation: "The system is built so you never need to diagnose the legal category yourself — report what you've observed to the right helpline, and trained officers determine the correct legal pathway.",
    related: ["Police", "Housing", "Employment"],
    links: [{ label: "Childline 1098", note: "24x7 child protection helpline" }, { label: "Karnataka State Commission for Women", note: "Complaints and one-stop centres" }]
  },
  "digital-services": {
    overview: "Digital services law covers citizens' entitlements when interacting with e-governance platforms — service-level guarantees, grievance timelines, and accessibility requirements for public digital infrastructure.",
    appliesTo: "Any citizen accessing government services online, including via Seva Sindhu, DigiLocker or municipal portals.",
    rights: [
      "The right to a service delivery timeline published for every online government service.",
      "The right to escalate a delayed application after the published SLA has lapsed.",
      "Accessibility compliance for citizens using assistive technology."
    ],
    responsibilities: [
      "Applicants should retain the digital acknowledgement number for every submission.",
      "Departments must publish downtime notices in advance where feasible."
    ],
    acts: ["Karnataka Guarantee of Services to Citizens Act, 2011", "Digital Personal Data Protection Act, 2023"],
    relatedRules: ["Seva Sindhu Service Level Rules"],
    faqs: [{ q: "My certificate application is past its SLA date — what now?", a: "You can escalate directly to the designated appellate authority listed on the Sakala/Seva Sindhu tracking page." }],
    updates: [{ date: "29 Jan 2026", text: "SLA for income certificate issuance shortened from 15 to 10 working days." }],
    scenarios: [{ title: "Portal down during a submission deadline", text: "Documented downtime extends your deadline automatically under the Guarantee of Services Act — save a screenshot as evidence." }],
    aiExplanation: "Every online government service in Karnataka is supposed to publish how long it should take — if it's late, that delay itself becomes something you can formally escalate.",
    related: ["Technology", "Consumer Rights", "Municipal Rules"],
    links: [{ label: "Seva Sindhu Portal", note: "Track applications and SLAs" }]
  }
};

/* ---------------------------------------------------------------------- */
/* Volunteers (Law Help responders)                                       */
/* ---------------------------------------------------------------------- */
const VOLUNTEER_NAMES = ["Adv. Kavya Nair","Adv. Rohit Shenoy","Adv. Meera Iyengar","Adv. Sanjay Bhat","Adv. Divya Raghavan","Adv. Arjun Kulkarni","Adv. Priya Deshmukh","Adv. Naveen Gowda"];
const VOLUNTEER_SPECIALISATIONS = ["Education & RTE Law","Consumer Disputes","Property & Tenancy","Employment Law","Women & Child Rights","Cyber & Data Law","Municipal Grievances","Traffic & Motor Vehicle Law"];

function pickVolunteer(seedText) {
  const seed = Math.abs(hashString(seedText || "civic"));
  const name = VOLUNTEER_NAMES[seed % VOLUNTEER_NAMES.length];
  const spec = VOLUNTEER_SPECIALISATIONS[seed % VOLUNTEER_SPECIALISATIONS.length];
  const rating = (4.3 + (seed % 7) / 10).toFixed(1);
  const distance = (0.8 + (seed % 40) / 10).toFixed(1);
  const eta = 6 + (seed % 20);
  const availability = (seed % 3 === 0) ? "Available now" : (seed % 3 === 1) ? "Available in 10 min" : "Available today, 4 PM onward";
  return { name, spec, rating, distance, eta, availability };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return h;
}

/* ---------------------------------------------------------------------- */
/* CS AI Assistant — canned fictional responses                          */
/* ---------------------------------------------------------------------- */
const AI_SUGGESTED_PROMPTS = [
  "Explain this law", "Why is this road closed?", "Track my complaint",
  "Find nearby government projects", "Summarize today's updates",
  "Connect me with legal help", "Explain this bill", "Guide me through filing a complaint"
];

const AI_CANNED_RESPONSES = {
  "explain this law": "Tell me which law or topic you'd like explained — for example \"education\" or \"traffic\" — and I'll break it down into what applies to you, your rights, and what to do next. You can also open any law card and I'll summarise it in place.",
  "why is this road closed?": "I'm checking active closures near your selected location... The Hebbal underpass has a temporary night closure (11 PM–5 AM) for grade-separator work, and Sarjapur Road has trench work near Kaikondrahalli. Want me to suggest an alternate route?",
  "track my complaint": "This is a prototype, so no live complaint is on file — but in the full product, I'd pull your complaint ID, show its current stage (Filed → Assigned → In Progress → Resolved), and the officer it's assigned to, with an estimated resolution date.",
  "find nearby government projects": "Based on your selected location scope, I can surface ongoing projects nearby. Try the Development & Bills page and set your radius — I'll highlight the ones closest to you first.",
  "summarize today's updates": "Today's civic snapshot: 3 projects crossed a new progress milestone, 1 new law update was published (Digital Services SLA change), and 2 emergency advisories are active for Traffic. Want the full breakdown?",
  "connect me with legal help": "I can route you to a volunteer legal responder. Head to Help → Law, describe your situation in a few lines, and I'll match you with a specialist and show their estimated response time.",
  "explain this bill": "Open any project card on the Development & Bills page and select \"Details\" — I'll summarise the budget, funding source, and what changed since the last version of the bill in plain language.",
  "guide me through filing a complaint": "Sure — pick the closest category on the Help page (e.g. Municipal, Traffic, Utilities), fill in a short description and your location, and I'll draft a structured complaint for you to review before it's submitted."
};

function getAIResponse(promptText) {
  const key = promptText.trim().toLowerCase();
  if (AI_CANNED_RESPONSES[key]) return AI_CANNED_RESPONSES[key];
  // Generic fallback so free-typed questions still feel handled
  return "Here's a prototype response — in the full product I'd search live civic records for \u201c" + promptText.trim() + "\u201d and return a grounded, sourced answer with links to the relevant page. For now, try one of the suggested prompts above, or explore Development & Bills, Help or Laws directly.";
}
