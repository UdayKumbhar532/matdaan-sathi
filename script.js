// ── Data ────────────────────────────────────────────
const ELECTION_STEPS = [
  { title:"Electoral Registration", description:"Ensure your name is on the Electoral Roll. Apply online via the ECI Voter Portal using <strong>Form 6</strong> (eligible at 18+).", icon:"user-plus" },
  { title:"Search Electoral Roll", description:"Verify your name and polling station at <strong>electoralsearch.eci.gov.in</strong>. Note your Part Number and Serial Number before voting day.", icon:"search" },
  { title:"Identity Verification", description:"Carry your <strong>EPIC (Voter ID)</strong> or any of 12 alternatives — Aadhaar, Driving Licence, Passport — to establish identity.", icon:"id-card" },
  { title:"The Polling Station", description:"Official 1 checks the electoral roll. Official 2 marks your finger with <strong>indelible ink</strong>, takes your signature, and gives a voter slip.", icon:"user-check" },
  { title:"EVM & VVPAT Voting", description:"Press the blue button on the EVM next to your candidate. The <strong>VVPAT</strong> shows your choice for 7 seconds before the slip drops into the sealed box.", icon:"fingerprint" }
];

const FLASHCARDS = [
  { question:"Minimum age to vote in India?", answer:"18 years — changed from 21 years by the 61st Constitutional Amendment Act, 1988.", icon:"cake" },
  { question:"What does EVM stand for?", answer:"Electronic Voting Machine. Used in all Indian general elections since 2004 for fast, tamper-resistant voting.", icon:"cpu" },
  { question:"What is VVPAT?", answer:"Voter Verifiable Paper Audit Trail — lets voters confirm their vote was recorded correctly via a 7-second paper slip.", icon:"file-text" },
  { question:"What is the Model Code of Conduct?", answer:"A set of ECI guidelines for political parties & candidates ensuring free and fair elections during the election period.", icon:"shield-check" },
  { question:"How long is the Lok Sabha term?", answer:"5 years, unless dissolved earlier by the President of India on the advice of the Council of Ministers.", icon:"calendar" },
  { question:"What is NOTA?", answer:"None Of The Above — introduced in 2013, it lets voters officially reject all candidates on the ballot.", icon:"x-circle" }
];

const QUIZ = [
  { q:"Which body conducts elections in India?", opts:["Supreme Court","Parliament","Election Commission of India","Home Ministry"], ans:2, exp:"The ECI is an independent constitutional body established under Article 324." },
  { q:"What color is the indelible ink used on voters' fingers?", opts:["Black","Blue","Violet/Purple","Green"], ans:2, exp:"Silver nitrate-based violet/purple ink is used to prevent double voting." },
  { q:"How many phases did the 2024 General Elections have?", opts:["3 phases","5 phases","7 phases","9 phases"], ans:2, exp:"The 2024 Lok Sabha elections were conducted in 7 phases across the country." },
  { q:"Which form is used for new voter registration?", opts:["Form 7","Form 8","Form 6","Form 12"], ans:2, exp:"Form 6 is specifically for fresh enrollment in the electoral roll." },
  { q:"What is Universal Adult Franchise?", opts:["Vote only for adults above 21","Right to vote for all citizens 18+, regardless of caste/gender","Only educated citizens can vote","Only taxpayers can vote"], ans:1, exp:"Every Indian citizen aged 18+ has the right to vote irrespective of caste, religion, or gender." },
  { q:"Which article of the Constitution establishes the ECI?", opts:["Article 312","Article 324","Article 356","Article 370"], ans:1, exp:"Article 324 establishes the Election Commission of India as a constitutional authority." }
];

// ── State ────────────────────────────────────────────
let currentSection = 'assistant';
let quiz = { idx:0, score:0, done:false, answered:false, timerInterval:null, timeLeft:20 };
let chatHistory = [];

// ── DOM ──────────────────────────────────────────────
const contentArea = document.getElementById('content-area');
const sectionTitle = document.getElementById('section-title');
const navItems = document.querySelectorAll('.nav-item');

// ── Init ─────────────────────────────────────────────
function init() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      if (sec === currentSection) return;
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentSection = sec;
      navigate(sec);
    });
  });
  renderAssistant();
}

function navigate(sec) {
  clearQuizTimer();
  contentArea.classList.add('fade-out');
  setTimeout(() => {
    contentArea.innerHTML = '';
    const titles = { assistant:'Election Assistant', flashcards:'Knowledge Flashcards', quiz:'Quiz Arena ⚡', info:'About Indian Elections', ask:'AI Election Bot 🤖' };
    sectionTitle.textContent = titles[sec] || sec;
    if (sec==='assistant') renderAssistant();
    else if (sec==='flashcards') renderFlashcards();
    else if (sec==='quiz') { resetQuiz(); renderQuiz(); }
    else if (sec==='info') renderInfo();
    else if (sec==='ask') renderChat();
    if (window.lucide) window.lucide.createIcons();
    contentArea.classList.remove('fade-out');
    contentArea.classList.add('fade-in');
    setTimeout(() => contentArea.classList.remove('fade-in'), 300);
  }, 300);
}

// ── ASSISTANT ────────────────────────────────────────
function renderAssistant() {
  const c = document.createElement('div');
  c.className = 'assistant-container';
  ELECTION_STEPS.forEach((step, i) => {
    const el = document.createElement('div');
    el.className = 'journey-step';
    el.style.animationDelay = `${i*0.1}s`;
    el.innerHTML = `
      <div class="step-number">${i+1}</div>
      <div class="step-content card">
        <h3><i data-lucide="${step.icon}" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;"></i>${step.title}</h3>
        <p>${step.description}</p>
      </div>`;
    c.appendChild(el);
  });
  contentArea.appendChild(c);
}

// ── FLASHCARDS ───────────────────────────────────────
function renderFlashcards() {
  const grid = document.createElement('div');
  grid.className = 'flashcards-grid';
  FLASHCARDS.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'flashcard';
    el.style.animation = `fadeInUp 0.5s forwards ${i*0.08}s`;
    el.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <i data-lucide="${card.icon}"></i>
          <h3>${card.question}</h3>
          <p style="margin-top:1rem;font-size:0.85rem;color:var(--text-secondary);">Click to reveal</p>
        </div>
        <div class="flashcard-back">
          <h4>Answer</h4>
          <p>${card.answer}</p>
        </div>
      </div>`;
    el.addEventListener('click', () => el.classList.toggle('flipped'));
    grid.appendChild(el);
  });
  contentArea.appendChild(grid);
}

// ── QUIZ ─────────────────────────────────────────────
function resetQuiz() {
  clearQuizTimer();
  quiz = { idx:0, score:0, done:false, answered:false, timerInterval:null, timeLeft:20 };
}

function clearQuizTimer() {
  if (quiz.timerInterval) { clearInterval(quiz.timerInterval); quiz.timerInterval = null; }
}

function renderQuiz() {
  if (quiz.done) { renderResult(); return; }
  const q = QUIZ[quiz.idx];
  const arena = document.createElement('div');
  arena.className = 'quiz-arena';

  const pct = (quiz.idx / QUIZ.length) * 100;
  arena.innerHTML = `
    <div class="quiz-hud">
      <div class="hud-stat">
        <div class="hud-label">Score</div>
        <div class="hud-value saffron" id="hud-score">${quiz.score}</div>
      </div>
      <div class="hud-stat" style="flex:1;padding:0 2rem;">
        <div class="hud-label" style="text-align:center;margin-bottom:6px;">Progress</div>
        <div class="quiz-progress-track" style="width:100%;"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="hud-stat">
        <div class="hud-label">Question</div>
        <div class="hud-value">${quiz.idx+1}/${QUIZ.length}</div>
      </div>
    </div>
    <div class="quiz-question-card" id="q-card">
      <div style="margin-bottom:1rem;">
        <span class="qnum-label">Question ${quiz.idx+1}</span>
        <div class="timer-track" style="margin-top:0.5rem;"><div class="timer-bar" id="timer-bar"></div></div>
        <div style="text-align:right;font-size:0.8rem;color:var(--text-secondary);margin-top:3px;" id="timer-text">⏱ 20s</div>
      </div>
      <div class="question-text">${q.q}</div>
      <div class="options-grid" id="opts-grid">
        ${q.opts.map((o,i) => `
          <button class="option-btn" data-i="${i}">
            <span class="opt-letter">${['A','B','C','D'][i]}</span>
            ${o}
          </button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-fb"></div>
      <button class="next-btn" id="next-btn" style="display:none;">${quiz.idx+1 < QUIZ.length ? 'Next Question →' : 'See Results 🏆'}</button>
    </div>`;

  contentArea.appendChild(arena);

  // Timer
  quiz.timeLeft = 20;
  const bar = document.getElementById('timer-bar');
  const timerTxt = document.getElementById('timer-text');
  bar.style.width = '100%';
  quiz.timerInterval = setInterval(() => {
    quiz.timeLeft--;
    const p = (quiz.timeLeft / 20) * 100;
    bar.style.width = p + '%';
    timerTxt.textContent = `⏱ ${quiz.timeLeft}s`;
    if (quiz.timeLeft <= 5) bar.classList.add('danger');
    if (quiz.timeLeft <= 0) {
      clearQuizTimer();
      if (!quiz.answered) timeUp(q);
    }
  }, 1000);

  // Option click
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (quiz.answered) return;
      clearQuizTimer();
      quiz.answered = true;
      const chosen = parseInt(btn.dataset.i);
      const isCorrect = chosen === q.ans;
      if (isCorrect) quiz.score++;
      showFeedback(isCorrect, q, chosen);
    });
  });

  document.getElementById('next-btn').addEventListener('click', goNext);
}

function timeUp(q) {
  quiz.answered = true;
  document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; if (parseInt(b.dataset.i)===q.ans) b.classList.add('correct'); });
  const fb = document.getElementById('quiz-fb');
  fb.className = 'quiz-feedback show incorrect-fb';
  fb.innerHTML = `<span class="feedback-emoji">⏰</span><div class="feedback-label">Time's up!</div><div class="feedback-explanation">${q.exp}</div>`;
  document.getElementById('next-btn').style.display = 'block';
}

function showFeedback(isCorrect, q, chosen) {
  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    else if (i === chosen && !isCorrect) b.classList.add('incorrect');
  });
  const fb = document.getElementById('quiz-fb');
  fb.className = `quiz-feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`;
  fb.innerHTML = isCorrect
    ? `<span class="feedback-emoji">🎉</span><div class="feedback-label">Correct! +1 point</div><div class="feedback-explanation">${q.exp}</div>`
    : `<span class="feedback-emoji">❌</span><div class="feedback-label">Incorrect</div><div class="feedback-explanation">${q.exp}</div>`;
  const scoreEl = document.getElementById('hud-score');
  if (scoreEl) { scoreEl.textContent = quiz.score; scoreEl.classList.add('hud-value','saffron','score-pop'); setTimeout(()=>scoreEl.classList.remove('score-pop'),500); }
  document.getElementById('next-btn').style.display = 'block';
}

function goNext() {
  quiz.idx++;
  quiz.answered = false;
  if (quiz.idx >= QUIZ.length) quiz.done = true;
  contentArea.innerHTML = '';
  renderQuiz();
  if (window.lucide) window.lucide.createIcons();
}

function renderResult() {
  const pct = Math.round((quiz.score / QUIZ.length) * 100);
  let rank = 'Voter Novice 🌱', emoji = '🌱';
  if (pct === 100) { rank = 'Election Expert 🏆'; emoji = '🏆'; }
  else if (pct >= 80) { rank = 'Democracy Champion 🎖️'; emoji = '🎖️'; }
  else if (pct >= 60) { rank = 'Informed Citizen ⭐'; emoji = '⭐'; }
  else if (pct >= 40) { rank = 'Rising Voter 📈'; emoji = '📈'; }

  document.getElementById('user-badge').textContent = rank.split(' ')[0]+' '+rank.split(' ')[1];

  const confetti = Array.from({length:20}, (_,i) => {
    const colors = ['#ff9933','#002b5b','#128807','#ffffff','#ffd700'];
    return `<div class="confetti-piece" style="left:${Math.random()*100}%;background:${colors[i%colors.length]};animation-delay:${Math.random()*0.8}s;animation-duration:${1.2+Math.random()*0.8}s;"></div>`;
  }).join('');

  const c = document.createElement('div');
  c.className = 'card quiz-result';
  c.innerHTML = `
    <div class="confetti-container">${confetti}</div>
    <div class="result-trophy">${emoji}</div>
    <div class="result-score-display">${quiz.score}<span>/${QUIZ.length}</span></div>
    <div style="color:var(--text-secondary);margin:0.5rem 0 1rem;">correct answers · ${pct}%</div>
    <div class="result-rank">${rank}</div>
    <p class="result-message">${pct===100 ? 'Perfect score! You are an election expert!' : pct>=60 ? 'Great job! Keep learning about Indian democracy.' : 'Keep going! Every informed vote matters.'}</p>
    <button class="restart-btn" id="restart-btn">🔄 Try Again</button>`;
  contentArea.appendChild(c);
  document.getElementById('restart-btn').addEventListener('click', () => { resetQuiz(); contentArea.innerHTML=''; renderQuiz(); if(window.lucide) window.lucide.createIcons(); });
}

// ── INFO ─────────────────────────────────────────────
function renderInfo() {
  contentArea.innerHTML = `
    <div class="info-hero">
      <h2>The Festival of Democracy</h2>
      <p>India is the world's largest democracy. Over 970 million citizens participate in a monumental exercise of collective will every 5 years.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
      <div class="card">
        <h3 style="color:var(--sidebar-bg);margin-bottom:1rem;"><i data-lucide="landmark" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"></i>Parliamentary System</h3>
        <p style="color:var(--text-secondary);line-height:1.7;">India follows a bicameral system. The <strong>Lok Sabha</strong> (House of the People) represents citizens directly, while the <strong>Rajya Sabha</strong> represents states and union territories.</p>
      </div>
      <div class="card">
        <h3 style="color:var(--sidebar-bg);margin-bottom:1rem;"><i data-lucide="shield-check" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"></i>The ECI Authority</h3>
        <p style="color:var(--text-secondary);line-height:1.7;">The <strong>Election Commission of India (ECI)</strong> is a permanent, independent constitutional body under Article 324, ensuring free and fair elections without external influence.</p>
      </div>
      <div class="card" style="grid-column:span 2;">
        <h3 style="color:var(--sidebar-bg);margin-bottom:1.5rem;"><i data-lucide="fingerprint" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"></i>Universal Adult Franchise</h3>
        <p style="color:var(--text-secondary);line-height:1.7;font-size:1.05rem;">Every Indian citizen aged 18 or above, regardless of caste, creed, religion, or gender, has the equal right to vote — the cornerstone of our constitutional democracy.</p>
        <div style="margin-top:2rem;padding:1.5rem;background:#f8fafc;border-radius:12px;border-left:5px solid var(--accent-saffron);">
          <p style="font-style:italic;color:var(--text-primary);">"Democracy is not just a form of government. It is primarily a mode of associated living, of conjoint communicated experience." — Dr. B.R. Ambedkar</p>
        </div>
      </div>
    </div>`;
  if (window.lucide) window.lucide.createIcons();
}

// AI ELECTION BOT (Offline - No API Key Needed)
const QUICK_CHIPS = [
  "How to register to vote?",
  "What is EVM?",
  "What is NOTA?",
  "What is ECI?",
  "What is Model Code of Conduct?"
];

const KB = [
  { keys:["register","registration","enroll","form 6","new voter","sign up"],
    answer:"<b>How to Register as a Voter:</b><br>1. Visit voters.eci.gov.in<br>2. Fill <b>Form 6</b> with name, DOB, address and Aadhaar<br>3. Upload photo and submit<br>You must be <b>18+ years old</b> and an Indian citizen. Name appears in electoral roll within 4-6 weeks." },
  { keys:["voter id","epic","voter card","election card","voter identification"],
    answer:"<b>Voter ID (EPIC):</b><br>EPIC = Electors Photo Identity Card issued by ECI. You can also vote with 12 alternatives: Aadhaar, Passport, Driving Licence, PAN Card, Passbook with photo, Health Smart Card, MNREGA Job Card, Pension Documents, etc." },
  { keys:["evm","electronic voting machine","voting machine","how evm works"],
    answer:"<b>Electronic Voting Machine (EVM):</b><br>Used in all national elections since <b>2004</b>. Has 2 units: <b>Control Unit</b> (officer) and <b>Balloting Unit</b> (voter presses blue button). EVMs are standalone (not internet-connected), making them tamper-resistant." },
  { keys:["vvpat","paper trail","paper audit","verify vote","verification slip"],
    answer:"<b>VVPAT (Voter Verifiable Paper Audit Trail):</b><br>After pressing EVM button, a paper slip shows candidate name, number and symbol for <b>7 seconds</b>, then drops into a sealed box. Confirms your vote was recorded. 5 random VVPATs per constituency are verified on counting day." },
  { keys:["nota","none of the above","reject all","reject candidate"],
    answer:"<b>NOTA - None of the Above:</b><br>Introduced in <b>2013</b> by Supreme Court order. Last option on EVM to officially reject ALL candidates. NOTA votes are counted but do not change results - the candidate with the most votes still wins." },
  { keys:["age","minimum age","18","eligible","eligibility","who can vote"],
    answer:"<b>Voter Eligibility:</b><br>You can vote if you are 18 years or older (as on 1st Jan of qualifying year), an Indian citizen, and registered in the electoral roll. Age was reduced from 21 to 18 by the <b>61st Constitutional Amendment, 1988</b>." },
  { keys:["eci","election commission","election commission of india","who conducts","who runs election"],
    answer:"<b>Election Commission of India (ECI):</b><br>Established under <b>Article 324</b> of the Constitution. An independent body that conducts Lok Sabha, Rajya Sabha, State Assembly and Presidential elections, enforces Model Code of Conduct, and registers political parties. HQ: Nirvachan Sadan, New Delhi." },
  { keys:["model code","mcc","code of conduct","campaign rules"],
    answer:"<b>Model Code of Conduct (MCC):</b><br>ECI guidelines active from election announcement until results. Prevents: new government schemes, misuse of govt machinery for campaigns, inflammatory speeches, and illegal hoardings. Violation can lead to disqualification or FIR." },
  { keys:["lok sabha","lower house","house of people","543"],
    answer:"<b>Lok Sabha (House of the People):</b><br>543 directly elected seats. Term: 5 years. Min age to contest: 25 years. Uses First-Past-The-Post (FPTP) system. Party or coalition with 272+ seats forms the government." },
  { keys:["rajya sabha","upper house","council of states"],
    answer:"<b>Rajya Sabha (Council of States):</b><br>245 seats (233 elected + 12 nominated by President). Elected by MLAs, not directly by public. Permanent body - never dissolved. Members serve 6-year terms. Min age to contest: 30 years." },
  { keys:["indelible ink","ink","finger mark","voter ink","purple ink"],
    answer:"<b>Indelible Ink:</b><br>Silver nitrate-based violet/purple ink applied on the left index finger to prevent double voting. Made by Mysore Paints and Varnish Ltd - only authorised manufacturer. Stays visible for 2-4 weeks. Used since 1962 General Elections." },
  { keys:["polling station","polling booth","booth","where to vote","find polling"],
    answer:"<b>Polling Station / Booth:</b><br>Find your booth at electoralsearch.eci.gov.in using your name or EPIC number. Usually within 2 km of your address. Each booth handles 1,000-1,500 voters. Voting timings: usually 7 AM to 6 PM." },
  { keys:["how to vote","voting process","voting steps","cast vote","voting day"],
    answer:"<b>How to Vote on Election Day:</b><br>1. Go to your polling station<br>2. Show Voter ID or alternative photo ID<br>3. Official verifies your name in the electoral roll<br>4. Finger marked with indelible ink and sign<br>5. Enter compartment and press the blue EVM button<br>6. Check VVPAT slip for 7 seconds" },
  { keys:["right to vote","voting right","franchise","suffrage","universal adult","article 326"],
    answer:"<b>Right to Vote in India:</b><br>Protected under <b>Article 326</b> - Universal Adult Franchise. Every Indian citizen 18+ can vote regardless of caste, religion, gender, or literacy. It is a constitutional right. Can be lost if serving prison sentence or declared of unsound mind by a court." },
  { keys:["constituency","constituencies","how many seats","seat"],
    answer:"<b>Parliamentary Constituencies:</b><br>India has 543 Lok Sabha constituencies, each electing one MP. Boundaries are fixed by the Delimitation Commission. Uttar Pradesh has the most seats (80)." },
  { keys:["candidate","contest election","nomination","who can contest","stand for election"],
    answer:"<b>Candidate Eligibility:</b><br>To contest Lok Sabha: Indian citizen, min age 25, registered voter, not convicted of serious crime. Must pay deposit: Rs 25,000 (General), Rs 12,500 (SC/ST). Deposit refunded if you get more than 1/6th of valid votes." },
  { keys:["political party","parties","bjp","congress","aap","aam aadmi party","national party","state party"],
    answer:"<b>Political Parties in India:</b><br>Registered by ECI. Currently 6 recognized National Parties (including BJP, Congress, AAP, BSP, CPI(M), NPP). National Party criteria: win at least 2% Lok Sabha seats OR 6% vote share in 4+ states. State parties meet the criteria in one state only." },
  { keys:["2024","general election 2024","lok sabha 2024","2024 result"],
    answer:"<b>2024 General Elections:</b><br>Held in 7 phases from April 19 to June 1, 2024. About 66.3% voter turnout (642 million votes). Result declared June 4, 2024. BJP-led NDA won 293 seats. Narendra Modi sworn in for his 3rd consecutive term. World's largest election by voter count." },
  { keys:["state election","assembly election","vidhan sabha","mla"],
    answer:"<b>State Elections (Vidhan Sabha):</b><br>Each state elects MLAs for 5-year terms. Party with majority forms state government. Its leader becomes Chief Minister. Min age to contest: 25 years." },
  { keys:["president election","presidential election","president of india","rashtrapati"],
    answer:"<b>Presidential Election:</b><br>The President is NOT directly elected by citizens. Chosen by an Electoral College of elected MPs and elected MLAs using Single Transferable Vote (STV). The President serves a 5-year term." },
  { keys:["secret ballot","secret vote","privacy","ballot secret","anonymous vote"],
    answer:"<b>Secrecy of Vote:</b><br>Your vote is 100% secret, protected by Section 128 of the Representation of the People Act, 1951. No one can compel you to reveal your vote, not even officials. EVMs do not record who voted for whom." },
  { keys:["nri","overseas","abroad","overseas voter","form 6a"],
    answer:"<b>NRI / Overseas Voters:</b><br>NRIs who are Indian citizens can register using Form 6A. However, they must be physically present in India on voting day. Proxy or postal voting for NRIs is not yet universally implemented." },
  { keys:["postal ballot","postal vote","vote from home","absentee"],
    answer:"<b>Postal Ballot:</b><br>Allowed for: Armed forces, government employees posted outside constituency, voters aged 85 or above, persons with disabilities, and COVID-19 patients. They receive ballot by post and return it to the Returning Officer before counting." },
  { keys:["counting","vote counting","result day","how counted","counting day"],
    answer:"<b>Vote Counting:</b><br>1. Postal ballots counted first<br>2. EVM seals broken and counted round by round<br>3. 5 random VVPAT slips per constituency verified<br>4. Results declared by Returning Officer. Candidates and agents can observe counting." },
  { keys:["silence period","48 hours","campaign stop","no campaigning"],
    answer:"<b>Silence Period:</b><br>All campaigning must stop 48 hours before polling begins. No rallies, loudspeakers, or alcohol distribution allowed. Exit polls cannot be published. Violation is punishable under Section 126 of the RP Act." },
  { keys:["exit poll","opinion poll","poll prediction","poll survey"],
    answer:"<b>Exit Polls:</b><br>Exit polls cannot be published or broadcast until 30 minutes after the last polling station closes in the final phase. Early publication is punishable with up to 2 years imprisonment under Section 126A of RP Act." },
  { keys:["fptp","first past the post","how winner","voting system","who wins"],
    answer:"<b>First-Past-The-Post (FPTP):</b><br>India's voting system for Lok Sabha. The candidate with the most votes wins, even without 50% majority. Simple system but can result in winners with only 25-30% of votes if votes are split among many candidates." },
  { keys:["reservation","reserved seat","sc st","scheduled caste","scheduled tribe","reserved constituency"],
    answer:"<b>Reserved Seats:</b><br>Of 543 Lok Sabha seats: 84 seats are reserved for Scheduled Castes (SC) and 47 seats for Scheduled Tribes (ST). Only SC/ST candidates can contest from reserved seats, but all voters in that constituency vote." },
  { keys:["helpline","1950","contact eci","voter helpline","complaint"],
    answer:"<b>Voter Helpline:</b><br>Call <b>1950</b> (toll-free during elections) for any query or complaint. Also visit voters.eci.gov.in, use the Voter Helpline App on Android/iOS, or email complaints@eci.gov.in." },
  { keys:["constitution","article 324","constitutional","election law","rp act"],
    answer:"<b>Constitutional Provisions on Elections:</b><br>Article 324: Establishes ECI. Article 325: No discrimination in electoral rolls. Article 326: Universal Adult Franchise. Article 327: Parliament's power to make election laws. Representation of the People Act, 1951 is the main election law." },
  { keys:["anti defection","defection","floor crossing","party switch","tenth schedule"],
    answer:"<b>Anti-Defection Law (Tenth Schedule):</b><br>Added in 1985. An MP or MLA is disqualified if they voluntarily leave their party or vote against party directions without permission. Exception: A merger is valid if 2/3rd of the party members agree." },
  { keys:["hello","hi","hey","namaste","hii","good morning","good evening"],
    answer:"Jai Hind! Welcome to <b>VoteBot</b>! Ask me anything about Indian elections - voter registration, EVM, NOTA, election rules, voting rights, political parties, and more." },
  { keys:["thank","thanks","thank you","dhanyawad"],
    answer:"You are welcome! An informed voter strengthens Indian democracy. Feel free to ask anything else!" },
  { keys:["what can you do","what do you know","help me","capabilities","topics"],
    answer:"<b>I can answer questions about:</b><br>Voter registration and EPIC, EVM and VVPAT, NOTA, Election Commission of India (ECI), Model Code of Conduct, Lok Sabha and Rajya Sabha, Candidate eligibility, Reserved seats (SC/ST), Constitutional provisions, and much more - just ask!" }
];

function getAnswer(userText) {
  const text = userText.toLowerCase().trim();
  let bestMatch = null, bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const key of entry.keys) {
      if (text.includes(key)) score += key.split(" ").length;
    }
    if (score > bestScore) { bestScore = score; bestMatch = entry; }
  }
  if (bestMatch && bestScore > 0) return bestMatch.answer;
  return "I did not quite understand that. Try asking about: How to register to vote, What is EVM or VVPAT, What is NOTA, Election Commission of India, or Model Code of Conduct. Or click one of the chips below!";
}

function renderChat() {
  const wrap = document.createElement('div');
  wrap.className = 'chat-container';
  wrap.innerHTML = `
    <div class="chat-header">
      <div class="bot-avatar">V</div>
      <div class="bot-info">
        <div class="bot-name">VoteBot - Election AI</div>
        <div class="bot-status"><span class="bot-status-dot"></span>Online and Ready - No internet needed</div>
      </div>
    </div>
    <div class="chat-messages" id="chat-msgs"></div>
    <div class="quick-chips" id="chips-row">
      ${QUICK_CHIPS.map(q=>`<button class="chip" data-q="${q}">${q}</button>`).join('')}
    </div>
    <div class="chat-input-row">
      <input class="chat-input" id="chat-input" placeholder="Ask anything about Indian elections..." maxlength="300" />
      <button class="send-btn" id="send-btn"><i data-lucide="send" style="width:18px;height:18px;"></i></button>
    </div>`;
  contentArea.appendChild(wrap);
  if (window.lucide) window.lucide.createIcons();

  addBotMsg("Jai Hind! I am <b>VoteBot</b> - your offline Indian Election guide. I know about voter registration, EVM, NOTA, election rules, voting rights, ECI and much more. No internet needed! What would you like to know?");

  document.getElementById('send-btn').addEventListener('click', sendMsg);
  document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('chat-input').value = chip.dataset.q;
      sendMsg();
    });
  });
}

function addBotMsg(text) {
  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  const el = document.createElement('div');
  el.className = 'message bot';
  el.innerHTML = `<div class="msg-avatar bot-av">V</div><div class="msg-bubble">${text}</div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMsg(text) {
  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  const el = document.createElement('div');
  el.className = 'message user';
  el.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-avatar user-av">U</div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-msgs');
  if (!msgs) return null;
  const el = document.createElement('div');
  el.className = 'message bot';
  el.id = 'typing-indicator';
  el.innerHTML = `<div class="msg-avatar bot-av">V</div><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
  return el;
}

function sendMsg() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMsg(text);
  sendBtn.disabled = true;
  const typing = showTyping();
  setTimeout(() => {
    if (typing) typing.remove();
    addBotMsg(getAnswer(text));
    sendBtn.disabled = false;
    input.focus();
  }, 500 + Math.random() * 400);
}

// Start
init();
