/**
 * ModernSysGroup.com - Application Controller
 * Blending Horizon (Architecture & Dynamic Views) + Evergreen (Pill UI & Trust) + TheAIFlex (Matrix Filtering)
 * Grounded in ModernSysGroup Enterprise IT Services Catalog
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initDynamicFilters();
  initMatrixTabs();
  initScorecardQuiz();
  initDeepDiveModal();
  initConsultationForm();
  initBotProtectedContacts();
  initMobileMenu();
  handleUrlHash();
});

/* ==========================================================================
   1. Theme Switcher (Horizon Executive <-> Evergreen Elite)
   ========================================================================== */
function initThemeSwitcher() {
  const switchBtn = document.getElementById('themeSwitchBtn');
  const themeLabel = document.getElementById('themeSwitchLabel');
  
  const savedTheme = localStorage.getItem('msg_theme') || 'horizon';
  setTheme(savedTheme);

  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'horizon';
      const newTheme = currentTheme === 'horizon' ? 'evergreen' : 'horizon';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('msg_theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'horizon' ? 'Horizon Theme' : 'Evergreen Theme';
    }

    // 1. Dynamic Favicon Color Synchronization
    const isEvergreen = (theme === 'evergreen');
    const faviconPath = isEvergreen ? 'favicon-evergreen.svg' : 'favicon.svg';
    const siteFavicon = document.getElementById('siteFavicon');
    const siteFaviconAlt = document.getElementById('siteFaviconAlt');
    if (siteFavicon) siteFavicon.href = faviconPath;
    if (siteFaviconAlt) siteFaviconAlt.href = faviconPath;

    // 2. Dynamic Brand Logo Crest Synchronization (Navbar & Footer)
    const logoSrc = isEvergreen ? 'assets/images/logo_icon_evergreen.svg' : 'assets/images/logo_icon.svg';
    const crestImages = document.querySelectorAll('.brand-crest-svg');
    crestImages.forEach(img => {
      img.src = logoSrc;
    });

    // 3. Dynamic Hero Enterprise Tech Visual Synchronization
    const heroTechSrc = isEvergreen 
      ? 'assets/images/hero_enterprise_tech_evergreen.jpg' 
      : 'assets/images/hero_enterprise_tech.jpg';
    const heroImgs = document.querySelectorAll('.theme-adaptive-hero-img');
    heroImgs.forEach(img => {
      img.src = heroTechSrc;
    });
  }

  window.setTheme = setTheme;
}

/* ==========================================================================
   2. Dynamic Adaptive Filters (TheAIFlex Feature: Show Only What's Needed)
   ========================================================================== */
function initDynamicFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn-pill');
  const cards = document.querySelectorAll('.horizon-card');
  const alertChip = document.getElementById('filterAlertChip');
  const activeCategorySpan = document.getElementById('activeFilterCategory');
  const resetBtn = document.getElementById('resetFilterLink');

  const categoryLabels = {
    'all': 'All Solutions',
    'ai': 'Applied AI & Autonomous Systems',
    'enterprise': 'Enterprise ERP & Data Systems',
    'cloud': 'Cloud Infrastructure & DevOps',
    'security': 'Full-Stack Cybersecurity & GRC'
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      applyFilter(cat);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => applyFilter('all'));
  }

  function applyFilter(category) {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-category') === category) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (category !== 'all') {
      history.replaceState(null, null, `#${category}`);
    } else {
      history.replaceState(null, null, ' ');
    }

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 20);
      } else {
        card.style.display = 'none';
      }
    });

    if (alertChip && activeCategorySpan) {
      if (category === 'all') {
        alertChip.classList.remove('show');
      } else {
        activeCategorySpan.textContent = categoryLabels[category] || category;
        alertChip.classList.add('show');
      }
    }

    if (category !== 'all') {
      const tab = document.querySelector(`.matrix-tab[data-tab="${category}"]`);
      if (tab) tab.click();
    }
  }

  window.applyFilter = applyFilter;
}

function handleUrlHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const valid = ['ai', 'enterprise', 'cloud', 'security'];
  if (valid.includes(hash) && window.applyFilter) {
    window.applyFilter(hash);
  }
}

/* ==========================================================================
   3. Capabilities Matrix Tabs
   ========================================================================== */
function initMatrixTabs() {
  const tabs = document.querySelectorAll('.matrix-tab');
  const panels = document.querySelectorAll('.matrix-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`panel-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Deep-Dive Modal Data & Logic (Directly from Catalog)
   ========================================================================== */
const SPEC_DATA = {
  ai_agent: {
    title: 'Autonomous AI Agent Engineering & Multi-Agent Orchestration',
    lead: 'Design, engineer, and deploy autonomous task-specific and collaborative multi-agent systems that handle ambiguous, multi-step business logic autonomously.',
    standards: 'SOC 2 Type II Auditable AI • OWASP Top 10 for LLMs • Private VPC Deployment',
    deliverables: [
      { title: 'Multi-Agent Orchestration', desc: 'LangGraph, AutoGen, and CrewAI pipelines executing collaborative reasoning loops and workflow automation.' },
      { title: 'Enterprise System Tool-Use', desc: 'Tool-use integration with CRM, ERP (SAP/Dynamics), internal ticketing systems, and corporate knowledge bases.' },
      { title: 'Long-Term Memory Retrieval', desc: 'Context-aware episodic and semantic vector retrieval (Pinecone, Qdrant, pgvector) with strict tenant isolation.' },
      { title: 'Safety & Guardrail Railings', desc: 'Automated hallucination filters, output verification checks, and prompt injection defense layers.' }
    ],
    timeline: 'Rapid Pilot: 2 weeks • Production Integration: 4–8 weeks',
    stack: 'LangGraph, AutoGen, CrewAI, OpenAI, Anthropic, Qdrant, pgvector, Python'
  },
  ai_fde: {
    title: 'Forward Deployed Engineering (FDE) & AI Enablement',
    lead: 'High-velocity, embedded technical consulting teams operating directly inside client environments to compress time-to-market with zero internal hiring lag.',
    standards: 'Production Hardening • Low-Latency SLA • Agile On-Site Delivery',
    deliverables: [
      { title: 'Rapid Prototyping & Feasibility', desc: 'De-risking architectural viability and delivering production pilot prototypes within compressed timelines.' },
      { title: 'Legacy & AI Foundation Bridging', desc: 'Connecting legacy monolithic environments with modern foundational models and vector indices.' },
      { title: 'Production Hardening', desc: 'Low-latency benchmarking, automated load testing, failover configurations, and staff enablement.' },
      { title: 'Executive AI Enablement', desc: 'Co-engineering with internal tech leads and transferring operational documentation and playbooks.' }
    ],
    timeline: 'Sprint Deployments: 2–6 weeks embedded team',
    stack: 'Kubernetes, PyTorch, TensorRT-LLM, vLLM, Triton Server'
  },
  erp_modernization: {
    title: 'Enterprise ERP Implementation & Modernization',
    lead: 'Full lifecycle consulting for enterprise resource planning platforms from scoping to round-the-clock SLA-backed maintenance.',
    standards: 'GAAP & IFRS Compliant • Sarbanes-Oxley (SOX) Ready • Role-Based Separation of Duties (SoD)',
    deliverables: [
      { title: 'Greenfield & Cloud Migration', desc: 'End-to-end implementation and customization across SAP S/4HANA, Oracle NetSuite, and Microsoft Dynamics 365.' },
      { title: 'Legacy Database Reconciliation', desc: 'Historical database cleansing, master-data harmonization, and parallel-run cutover orchestration.' },
      { title: '24/7 SLA Tier-1 to Tier-3 Support', desc: 'Round-the-clock enterprise health checks, emergency incident resolution, and routine security patching.' },
      { title: 'Supply Chain & Financial Automation', desc: 'Automating multi-currency ledgers, inventory forecasting, and procurement approvals.' }
    ],
    timeline: 'Discovery & Blueprint: 4 weeks • Phased agile implementation: 3–9 months',
    stack: 'SAP S/4HANA, Microsoft Dynamics 365, Oracle Cloud ERP, NetSuite, Odoo Enterprise'
  },
  api_integration: {
    title: 'API Strategy, Architecture & iPaaS Integration',
    lead: 'Unified integration architectures enabling seamless, real-time data flow across hybrid on-premise and multi-cloud systems.',
    standards: 'OpenAPI 3.1 • GraphQL Security • gRPC Protocol Buffers • OAuth 2.0 / OIDC',
    deliverables: [
      { title: 'API Gateway & Tokenization', desc: 'Centralized rate limiting, JWT tokenization, automated throttling, and self-service developer portals.' },
      { title: 'iPaaS & Middleware Deployment', desc: 'Enterprise Service Bus (ESB) implementation leveraging MuleSoft, Boomi, and Workato.' },
      { title: 'Event-Driven Architectures', desc: 'Asynchronous event streaming and webhook orchestration decoupling mission-critical services.' },
      { title: 'Legacy Decoupling', desc: 'Wrapping legacy backends with modern RESTful and GraphQL interfaces ready for partner integration.' }
    ],
    timeline: 'Integration Architecture: 3 weeks • Service Bus Deployment: 6 weeks',
    stack: 'MuleSoft, Boomi, Kong Gateway, Apollo GraphQL, gRPC, Kafka'
  },
  data_lakehouse: {
    title: 'Data Engineering & Modern Lakehouse Architecture',
    lead: 'Resilient batch and real-time streaming ETL/ELT pipelines, distributed data storage, and enterprise business intelligence enablement.',
    standards: 'ACID Compliance • Delta Lake / Apache Iceberg • Data Lineage & Governance',
    deliverables: [
      { title: 'Batch & Streaming Pipelines', desc: 'High-throughput data streaming and ingestion using Apache Kafka, Apache Flink, and Spark.' },
      { title: 'Cloud Lakehouse Deployment', desc: 'Optimized warehousing on Snowflake, Databricks, Google BigQuery, and AWS Redshift.' },
      { title: 'Data Modeling & Lineage', desc: 'Declarative SQL modeling and automated data validation with dbt and Great Expectations.' },
      { title: 'BI & Analytics Dashboards', desc: 'Executive KPI reporting and unified data marts ready for operational machine learning.' }
    ],
    timeline: 'Lakehouse Discovery: 2 weeks • Pipeline Deployment: 4–8 weeks',
    stack: 'Snowflake, Databricks, BigQuery, Apache Kafka, dbt, Spark'
  },
  cloud_kubernetes: {
    title: 'Cloud Infrastructure, Hybrid Architecture & Kubernetes',
    lead: 'Resilient, scalable cloud foundations built across hyperscalers (AWS, Azure, GCP) with enterprise Kubernetes cluster orchestration.',
    standards: 'AWS Well-Architected Framework • Azure CAF • 99.99% High Availability SLA',
    deliverables: [
      { title: 'Multi-Cloud Architecture', desc: 'Workload migration and interconnectivity across AWS, Microsoft Azure, and Google Cloud Platform.' },
      { title: 'Production Kubernetes (EKS/AKS/GKE)', desc: 'Service discovery, GitOps deployment, automated horizontal pod scaling, and ingress security.' },
      { title: 'Hybrid Cloud Interconnect', desc: 'Dedicated software-defined routing connecting on-premises data centers with cloud VPCs.' },
      { title: 'FinOps Cloud Cost Governance', desc: 'Resource utilization auditing, rightsizing, and reserved capacity strategy saving 25%+.' }
    ],
    timeline: 'Cloud Assessment: 2 weeks • Infrastructure Migration: 4–12 weeks',
    stack: 'AWS, Azure, GCP, Kubernetes (EKS/AKS/GKE), Docker, Cilium, Istio'
  },
  devops_iac: {
    title: 'Infrastructure as Code (IaC) & DevOps Automation',
    lead: 'End-to-end automation of infrastructure deployment, drift detection, and continuous delivery pipelines shortening release cycles to minutes.',
    standards: 'CIS Benchmarks • GitOps Standards • Immutable Infrastructure',
    deliverables: [
      { title: 'Declarative IaC Modules', desc: 'Modular, repeatable infrastructure definitions using Terraform, OpenTofu, and Pulumi.' },
      { title: 'Automated CI/CD Pipelines', desc: 'GitHub Actions, GitLab CI, and ArgoCD pipelines with automated security and compliance gates.' },
      { title: 'Server Hardening & Baseline', desc: 'Ansible configuration management enforcing baseline security standards and patch automation.' },
      { title: 'Disaster Recovery Rebuilds', desc: 'Zero-touch automated environment spin-up across alternate availability zones or clouds.' }
    ],
    timeline: 'Pipeline Audit: 1 week • Automation Implementation: 3–6 weeks',
    stack: 'Terraform, OpenTofu, Ansible, GitHub Actions, ArgoCD, Helm'
  },
  cyber_security: {
    title: 'Full-Stack Cyber Security & Zero-Trust Defense Engineering',
    lead: 'Multi-layered defensive security engineering across code, cloud, network, and endpoint layers to protect against advanced persistent threats.',
    standards: 'Zero-Trust Architecture (ZTA) • NIST SP 800-207 • CIS Controls v8',
    deliverables: [
      { title: 'Zero-Trust (ZTA) & IAM', desc: 'Least-privilege role design, identity micro-segmentation, and strict MFA enforcement.' },
      { title: '24/7 Managed SIEM & EDR', desc: 'Centralized threat correlation, continuous endpoint monitoring, and automated threat containment.' },
      { title: 'DevSecOps & SAST/DAST', desc: 'Static and dynamic code vulnerability scanning embedded directly into developer pull requests.' },
      { title: 'Cloud Security Posture (CSPM)', desc: 'Continuous automated scanning of IAM permissions, open ports, and cloud resource drift.' }
    ],
    timeline: 'Initial Defense Review: 1 week • Full Zero-Trust Rollout: 4–8 weeks',
    stack: 'CrowdStrike Falcon, Microsoft Sentinel, Palo Alto Networks, Okta, Snyk'
  },
  compliance_vapt: {
    title: 'Compliance, Threat Modeling & Vulnerability Management',
    lead: 'Proactive risk assessment, technical vulnerability discovery (VAPT), and audit readiness for global compliance standards.',
    standards: 'SOC 2 Type II • ISO/IEC 27001:2022 • HIPAA • GDPR • DPDPA 2023',
    deliverables: [
      { title: 'Compliance Readiness Automation', desc: 'Gap analysis and evidence collection for SOC 2 Type II, ISO 27001, HIPAA, and GDPR.' },
      { title: 'Adversary Penetration Testing (VAPT)', desc: 'Ethical red teaming assessing cloud infrastructure, web apps, internal networks, and APIs.' },
      { title: 'STRIDE Threat Modeling', desc: 'Architectural risk discovery identifying security flaws before software reaches production.' },
      { title: 'Incident Response & Drills', desc: 'Playbook authoring, tabletop disaster crisis drills, and automated escalation procedures.' }
    ],
    timeline: 'Audit Readiness: 3–6 weeks • Penetration Test Report: 2 weeks',
    stack: 'Tenable Nessus, Burp Suite Enterprise, Metasploit, Vanta, Drata'
  },
  blockchain_dlt: {
    title: 'Decentralized Systems & Blockchain Solutions',
    lead: 'Enterprise distributed ledger technology, smart contract development, and cryptographic verifiable provenance for critical workflows.',
    standards: 'Smart Contract Formal Verification • Enterprise DLT Security • ERC / Layer-2 Protocols',
    deliverables: [
      { title: 'Enterprise Blockchain Systems', desc: 'Permissioned consortia architectures utilizing Hyperledger Fabric, Polygon, and Ethereum L2s.' },
      { title: 'Smart Contract Auditing & Optimization', desc: 'Gas optimization, formal verification, reentrancy audits, and secure settlement logic.' },
      { title: 'Decentralized Identity (DID)', desc: 'Self-sovereign verifiable credentials and cryptographic tamper-proof audit trails.' },
      { title: 'Asset Tokenization (RWA)', desc: 'Compliant tokenization architecture for real-world assets, trade finance, and inventory.' }
    ],
    timeline: 'Smart Contract Audit: 2 weeks • Enterprise DLT Deployment: 6–12 weeks',
    stack: 'Hyperledger Fabric, Solidity, Hardhat, Foundry, Polygon, Ethereum'
  }
};

function initDeepDiveModal() {
  const modal = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const inspectBtns = document.querySelectorAll('.inspect-btn');
  const titleEl = document.getElementById('modalTitle');
  const leadEl = document.getElementById('modalLead');
  const standardsEl = document.getElementById('modalStandards');
  const deliverablesGrid = document.getElementById('modalDeliverablesGrid');
  const timelineEl = document.getElementById('modalTimeline');
  const stackEl = document.getElementById('modalStack');
  const bookBtn = document.getElementById('modalBookBtn');

  let activeCat = 'cyber_security';

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-inspect') || 'cyber_security';
      openModal(cat);
    });
  });

  function openModal(cat) {
    const data = SPEC_DATA[cat];
    if (!data) return;

    activeCat = cat;
    titleEl.textContent = data.title;
    leadEl.textContent = data.lead;
    standardsEl.textContent = data.standards;
    timelineEl.textContent = data.timeline;
    stackEl.textContent = data.stack;

    deliverablesGrid.innerHTML = '';
    data.deliverables.forEach(item => {
      const box = document.createElement('div');
      box.style.background = 'rgba(255,255,255,0.03)';
      box.style.border = '1px solid var(--border-light)';
      box.style.borderRadius = 'var(--radius-md)';
      box.style.padding = '1.1rem';
      box.innerHTML = `
        <h4 style="color:var(--accent); font-size:0.9rem; font-weight:700; margin-bottom:0.35rem;">${item.title}</h4>
        <p style="color:var(--text-muted); font-size:0.82rem; margin:0; line-height:1.45;">${item.desc}</p>
      `;
      deliverablesGrid.appendChild(box);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      closeModal();
      const consultSec = document.getElementById('consultation');
      if (consultSec) {
        consultSec.scrollIntoView({ behavior: 'smooth' });
        // Map to corresponding form chip
        let formVal = 'security';
        if (activeCat.startsWith('ai')) formVal = 'ai';
        else if (activeCat.startsWith('erp') || activeCat.startsWith('api') || activeCat.startsWith('data')) formVal = 'enterprise';
        else if (activeCat.startsWith('cloud') || activeCat.startsWith('devops')) formVal = 'cloud';
        selectFormChip(formVal);
      }
    });
  }
}

/* ==========================================================================
   5. Interactive IT Readiness Scorecard
   ========================================================================== */
function initScorecardQuiz() {
  const steps = [
    {
      title: 'Step 1 of 4: Applied AI & Intelligent Automation',
      desc: 'How is your enterprise currently leveraging Artificial Intelligence & Automation?',
      options: [
        { label: 'Manual & Rule-Based', score: 10, desc: 'Brittle static scripts or manual workflows with zero autonomous agent assistance.' },
        { label: 'Ad-hoc LLM Experiments', score: 20, desc: 'Employees using public consumer AI tools without enterprise guardrails, data privacy, or API hooks.' },
        { label: 'Piloting Autonomous Agents', score: 30, desc: 'Active pilots with LangGraph / CrewAI connecting CRM, ERP, and vector stores in isolated environments.' },
        { label: 'Orchestrated Enterprise AI', score: 40, desc: 'Production multi-agent workflows with low-latency private vector databases and continuous MLOps.' }
      ]
    },
    {
      title: 'Step 2 of 4: Enterprise ERP & Systems Integration',
      desc: 'What is the operational maturity of your core ERP and transactional systems?',
      options: [
        { label: 'Fragmented Spreadsheets', score: 10, desc: 'Disconnected legacy databases, manual Excel consolidation, and high administrative friction.' },
        { label: 'Point Solutions with Custom Scripts', score: 20, desc: 'Siloed accounting and CRM tools with fragile point-to-point scripts and recurring data drift.' },
        { label: 'Centralized Cloud ERP & APIs', score: 30, desc: 'Modern integrated platform (SAP, Dynamics 365, or NetSuite) with unified API gateway.' },
        { label: 'Real-Time Event-Driven Core', score: 40, desc: 'Automated real-time financial ledger, demand forecasting, and sub-second multi-entity reconciliation.' }
      ]
    },
    {
      title: 'Step 3 of 4: Cloud Infrastructure & Platform Engineering',
      desc: 'Where do your mission-critical applications and distributed databases run?',
      options: [
        { label: '100% On-Premise Physical Hardware', score: 10, desc: 'Vulnerable to localized power outages, hardware failure, and manual tape backups.' },
        { label: 'Lift-and-Shift Cloud VMs', score: 20, desc: 'Running in AWS/Azure/GCP without containerization, auto-scaling, or infrastructure-as-code.' },
        { label: 'Containerized Kubernetes Fabric', score: 30, desc: 'Hardened Kubernetes clusters (EKS/AKS/GKE) with daily automated backups and CI/CD pipelines.' },
        { label: 'Cloud-Native GitOps & FinOps', score: 40, desc: 'Declarative Terraform IaC, ArgoCD automated deployments, and 99.99% multi-region availability.' }
      ]
    },
    {
      title: 'Step 4 of 4: Cybersecurity & Compliance Posture',
      desc: 'How would you classify your defensive security, threat monitoring, and regulatory compliance?',
      options: [
        { label: 'Basic Anti-Virus Only', score: 10, desc: 'Decentralized endpoint protection with no dedicated SIEM or 24/7 incident response team.' },
        { label: 'Standard Endpoint & MFA', score: 20, desc: 'Centralized antivirus with multi-factor authentication, but ad-hoc log review and no periodic VAPT.' },
        { label: '24/7 Managed SIEM/SOC', score: 30, desc: 'Continuous threat monitoring, sub-15 min containment, and annual third-party penetration testing.' },
        { label: 'Zero-Trust & Audit Certified', score: 40, desc: 'Identity micro-segmentation, DevSecOps SAST/DAST, and verified SOC 2 Type II / ISO 27001 certifications.' }
      ]
    }
  ];

  let currentStep = 0;
  const answers = [];

  const titleEl = document.getElementById('quizStepTitle');
  const descEl = document.getElementById('quizStepDesc');
  const optionsGrid = document.getElementById('quizOptionsGrid');
  const nextBtn = document.getElementById('quizNextBtn');
  const prevBtn = document.getElementById('quizPrevBtn');
  const quizNodes = document.querySelectorAll('.step-bubble-node');
  const quizBox = document.getElementById('quizQuestionsBox');
  const resultBox = document.getElementById('scoreResultCard');
  const scoreNumEl = document.getElementById('scoreBigNumber');
  const scoreTierEl = document.getElementById('scoreTierTitle');
  const recListEl = document.getElementById('scoreRecList');
  const restartBtn = document.getElementById('scoreRestartBtn');

  function renderQuizStep(stepIdx) {
    if (stepIdx >= steps.length) {
      renderQuizResults();
      return;
    }

    const s = steps[stepIdx];
    titleEl.textContent = s.title;
    descEl.textContent = s.desc;

    quizNodes.forEach((node, i) => {
      node.classList.remove('active', 'completed');
      if (i < stepIdx) node.classList.add('completed');
      else if (i === stepIdx) node.classList.add('active');
    });

    optionsGrid.innerHTML = '';
    s.options.forEach((opt, optIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-option-card';
      if (answers[stepIdx] === opt.score) card.classList.add('selected');

      card.innerHTML = `
        <span class="quiz-tier-badge">Tier 0${optIdx + 1}</span>
        <div class="quiz-opt-title">${opt.label}</div>
        <div class="quiz-opt-desc">${opt.desc}</div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        answers[stepIdx] = opt.score;
        nextBtn.disabled = false;
        nextBtn.classList.add('btn-pill-primary');
        nextBtn.classList.remove('btn-pill-outline');
      });

      optionsGrid.appendChild(card);
    });

    prevBtn.style.visibility = stepIdx === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = stepIdx === steps.length - 1 ? 'Calculate Enterprise Score →' : 'Continue Next Step →';
    nextBtn.disabled = answers[stepIdx] === undefined;
    if (nextBtn.disabled) {
      nextBtn.classList.remove('btn-pill-primary');
      nextBtn.classList.add('btn-pill-outline');
    }
  }

  nextBtn.addEventListener('click', () => {
    if (answers[currentStep] === undefined) return;
    currentStep++;
    renderQuizStep(currentStep);
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderQuizStep(currentStep);
    }
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentStep = 0;
      answers.length = 0;
      quizBox.style.display = 'block';
      resultBox.classList.remove('show');
      renderQuizStep(0);
    });
  }

  function renderQuizResults() {
    quizBox.style.display = 'none';
    resultBox.classList.add('show');

    const totalRaw = answers.reduce((a, b) => a + b, 0);
    const normalized = Math.round((totalRaw / 160) * 100);

    scoreNumEl.textContent = normalized;

    let tier = '';
    let recs = [];

    if (normalized < 45) {
      tier = 'High Vulnerability & Modernization Urgency';
      recs = [
        'Engage our Forward Deployed Engineering (FDE) team for immediate external VAPT penetration testing.',
        'Eliminate manual Excel bottlenecks by scoping a centralized cloud ERP modernization roadmap.',
        'Deploy private, enterprise-governed AI infrastructure with strict data leakage prevention.'
      ];
    } else if (normalized < 75) {
      tier = 'Developing Maturity with Integration Bottlenecks';
      recs = [
        'Deploy 24/7 Managed SOC & SIEM with sub-15 minute threat containment and continuous CSPM scans.',
        'Harmonize ERP and CRM architectures via unified API gateways and event-driven pipelines.',
        'Prototype autonomous task-specific AI agents (LangGraph) to automate repetitive operational workflows.'
      ];
    } else {
      tier = 'Resilient Enterprise Leader';
      recs = [
        'Scale multi-agent collaborative workflows with high-performance vector databases (Pinecone / pgvector).',
        'Implement dedicated FinOps cost governance across multi-cloud Kubernetes clusters.',
        'Pursue continuous automated SOC 2 Type II and ISO 27001 compliance validation.'
      ];
    }

    scoreTierEl.textContent = tier;
    recListEl.innerHTML = '';
    recs.forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${r}</span>
      `;
      recListEl.appendChild(li);
    });
  }

  renderQuizStep(0);
}

/* ==========================================================================
   6. Consultation Booking Form
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  const chips = document.querySelectorAll('.service-select-chip');
  const hiddenInput = document.getElementById('selectedServiceInput');
  const toast = document.getElementById('toastBanner');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (hiddenInput) hiddenInput.value = chip.getAttribute('data-value');
    });
  });

  window.selectFormChip = function(val) {
    chips.forEach(chip => {
      if (chip.getAttribute('data-value') === val) chip.click();
    });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const oldTxt = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = oldTxt;
        submitBtn.disabled = false;

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 6000);
        }
        form.reset();
        if (chips[0]) chips[0].click();
      }, 800);
    });
  }
}

/* ==========================================================================
   7. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('pillNavbar');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('mobile-active'));
    });
  }
}

/* ==========================================================================
   8. Anti-Bot & Anti-Scraper Contact Shield
   Decodes obfuscated communication endpoints client-side using character-shifted base64
   Prevents automated harvesting by scrapers, spider bots, and telemarketing crawlers
   ========================================================================== */
function initBotProtectedContacts() {
  function decodeToken(token) {
    if (!token) return '';
    try {
      const decoded = atob(token);
      return Array.from(decoded).map(c => String.fromCharCode(c.charCodeAt(0) - 3)).join('');
    } catch (e) {
      console.error('Bot Shield decode failure', e);
      return '';
    }
  }

  const elements = document.querySelectorAll('.protected-contact-link');
  elements.forEach(el => {
    const encText = el.getAttribute('data-c-text');
    const encTel = el.getAttribute('data-c-tel');
    const prefix = el.getAttribute('data-prefix') || '';

    if (encText && encTel) {
      const realText = decodeToken(encText);
      const realTel = decodeToken(encTel);

      el.href = 'tel:' + realTel;
      el.textContent = prefix + realText;
      el.setAttribute('title', 'Direct Call • Verified Line');
      el.classList.add('hydrated');
    }
  });
}

