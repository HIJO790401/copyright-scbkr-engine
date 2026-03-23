const failurePool = {
  licenseCategory: '用途超出原授權分類 / Usage exceeds original license category',
  substitution: '從摘要漂移到內容替代 / Summary drifts into content substitution',
  retrievalTraining: '從檢索漂移到訓練 / Retrieval drifts into training',
  researchCommercial: '從研究漂移到商業生成 / Research drifts into commercial generation',
  chainOpen: '責任鏈未閉合 / Responsibility chain not closed',
  reportingMissing: '回報責任人未設定 / Reporting owner not assigned',
  scaleExceeded: '使用規模超出原聲明 / Usage scale exceeds declared scope',
};

const boundaryModels = {
  READ_ONLY: {
    title: 'READ_ONLY / 僅閱讀',
    zh: '僅允許人工閱讀與參考，不得納入生成或訓練流程。',
    en: 'Only allows human reading and reference, without entering generation or training workflows.',
  },
  INDEX_ONLY: {
    title: 'INDEX_ONLY / 僅索引',
    zh: '可建立檢索索引，但不得用於內容重寫或生成替代。',
    en: 'May be indexed for retrieval, but not used for rewriting or substitute generation.',
  },
  SUMMARY_ONLY: {
    title: 'SUMMARY_ONLY / 僅摘要',
    zh: '內容可被濃縮說明，但不得形成可替代原文市場的輸出。',
    en: 'Content may be condensed into summaries, but must not create outputs that substitute the original market.',
  },
  RAG_ASSIST: {
    title: 'RAG_ASSIST / 檢索輔助',
    zh: '可作為檢索輔助依據，但不得把來源內容直接吸收成模型權重。',
    en: 'May support retrieval-augmented responses, but must not be absorbed into model weights.',
  },
  TRAINING_USE: {
    title: 'TRAINING_USE / 訓練使用',
    zh: '內容被納入模型學習或微調流程，風險與責任顯著提高。',
    en: 'Content is incorporated into model learning or fine-tuning, increasing both risk and responsibility.',
  },
  COMMERCIAL_GEN: {
    title: 'COMMERCIAL_GEN / 商業生成',
    zh: '內容被用於直接或間接商業輸出，需重新審視授權與責任邊界。',
    en: 'Content is used for direct or indirect commercial generation, requiring renewed licensing and responsibility review.',
  },
  REDISTRIBUTION: {
    title: 'REDISTRIBUTION / 再分發',
    zh: '內容或其衍生結果被再次傳播或提供給第三方。',
    en: 'Content or its derivatives are redistributed or delivered to third parties.',
  },
};

const scenarios = {
  newsTaiwan: {
    caseId: 'newsTaiwan',
    labelZh: '台灣新聞內容授權',
    labelEn: 'Taiwanese News Content Licensing',
    caseTitleZh: '台灣新聞內容授權事件',
    caseTitleEn: 'Taiwanese News Content Licensing Event',
    sourceContent: '報導型新聞文章 / investigative news article',
    applicantZh: '某 AI 團隊 / 某模型開發方',
    applicantEn: 'An AI team / a model development group',
    rolesZh: '專案負責人 / 法務窗口 / 模型操作人',
    rolesEn: 'Project owner / Legal contact / Model operator',
    scbkr: {
      subjectZh: '主體可定位，但屬多角色責任鏈；申請方與操作方需共同進場。',
      subjectEn: 'The subject is identifiable, but it enters as a multi-role responsibility chain shared by the applicant and operator.',
      causeZh: '用途從新聞內容延伸到摘要、檢索、訓練與商業生成，使用鏈條逐步增強。',
      causeEn: 'The use chain extends from news content into summary, retrieval, training, and commercial generation with escalating intensity.',
      boundaryZh: '新聞內容具有明確市場替代風險，法律、生成與再分發邊界都必須被明示。',
      boundaryEn: 'News content has a clear market substitution risk, so legal, generative, and redistribution boundaries must be explicit.',
      costZh: '編採與報導成本高，資料價值敏感，替代與流量分流風險都偏高。',
      costEn: 'Editorial and reporting costs are high, data value is sensitive, and both substitution and traffic diversion risks are elevated.',
      responsibilityZh: '若轉為訓練或商業生成，責任需從單純使用責任重落到部署與商業決策責任。',
      responsibilityEn: 'If the use shifts into training or commercial generation, responsibility must move from simple usage accountability into deployment and commercial decision liability.',
    },
    responsibilityAnchorZh: '原方窗口：內容權利方；使用方窗口：專案負責人 / 法務窗口 / 模型操作人。',
    responsibilityAnchorEn: 'Origin owner: content rights holder; usage side: project owner / legal contact / model operator.',
    uses: {
      summary: { state: 'WARN', model: 'SUMMARY_ONLY', failure: ['licenseCategory', 'substitution'], summaryZh: '摘要暫時成立，但需限制長度與保留新聞來源。', summaryEn: 'Summary is conditionally valid, but length and source retention must be enforced.' },
      rag: { state: 'WARN', model: 'RAG_ASSIST', failure: ['substitution', 'scaleExceeded'], summaryZh: 'RAG Assist 可用於檢索輔助，但不得把片段組裝成替代報導。', summaryEn: 'RAG Assist may support retrieval, but fragments must not be assembled into a substitute report.' },
      training: { state: 'NON-CLOSABLE', model: 'TRAINING_USE', failure: ['retrievalTraining', 'chainOpen', 'reportingMissing'], summaryZh: '訓練使用使責任鏈無法閉合，需人工與法務共同介入。', summaryEn: 'Training use makes the responsibility chain non-closable and requires legal and human intervention.' },
      commercial: { state: 'OVERRUN', model: 'COMMERCIAL_GEN', failure: ['licenseCategory', 'researchCommercial', 'scaleExceeded'], summaryZh: '商業生成已超出原新聞授權邊界，屬越界使用。', summaryEn: 'Commercial generation exceeds the original news licensing boundary and constitutes an overrun.' },
    },
  },
  eduDataset: {
    caseId: 'eduDataset',
    labelZh: '教材語料授權',
    labelEn: 'Educational Dataset Licensing',
    caseTitleZh: '教材語料授權事件',
    caseTitleEn: 'Educational Dataset Licensing Event',
    sourceContent: '課程教材 / educational content',
    applicantZh: '教育科技團隊',
    applicantEn: 'Education technology team',
    rolesZh: '課程平台主管 / 資料管理者 / 模型責任人',
    rolesEn: 'Learning platform lead / Data steward / Model owner',
    scbkr: {
      subjectZh: '教育用途主體較清楚，責任可集中在平台與教材治理角色。',
      subjectEn: 'The educational subject is clearer, and responsibility can be concentrated in platform and content governance roles.',
      causeZh: '用途多半從內容整理走向教學輔助，偏向教學內部支持。',
      causeEn: 'The usage chain typically moves from content organization into instructional assistance inside the learning context.',
      boundaryZh: '摘要與檢索較容易成立，但商業生成需重新判定法律與商用邊界。',
      boundaryEn: 'Summary and retrieval are easier to justify, but commercial generation requires renewed legal and commercial review.',
      costZh: '教材具有整理、授課與教學設計成本，不宜被無差別替代。',
      costEn: 'Educational materials embody curation, teaching, and instructional design costs and should not be indiscriminately substituted.',
      responsibilityZh: '若跨到商業輸出，責任必須由平台、資料管理與模型責任人共同追加。',
      responsibilityEn: 'If the use crosses into commercial output, responsibility must be explicitly expanded across the platform, data steward, and model owner.',
    },
    responsibilityAnchorZh: '原方窗口：教材權利方；使用方窗口：課程平台主管 / 資料管理者 / 模型責任人。',
    responsibilityAnchorEn: 'Origin owner: educational rights holder; usage side: learning platform lead / data steward / model owner.',
    uses: {
      summary: { state: 'ALLOW', model: 'SUMMARY_ONLY', failure: ['substitution'], summaryZh: '教材摘要在教學情境內可成立。', summaryEn: 'Educational summary is valid within the teaching context.' },
      rag: { state: 'WARN', model: 'RAG_ASSIST', failure: ['licenseCategory', 'scaleExceeded'], summaryZh: '教學檢索輔助可成立，但需限制使用者與範圍。', summaryEn: 'Teaching-oriented RAG assistance is valid with restrictions on users and scope.' },
      training: { state: 'WARN', model: 'TRAINING_USE', failure: ['retrievalTraining', 'reportingMissing'], summaryZh: '若以研究或教學輔助訓練使用，需保留責任追蹤與回報機制。', summaryEn: 'If used for research or teaching-support training, traceability and reporting must remain in place.' },
      commercial: { state: 'NON-CLOSABLE', model: 'COMMERCIAL_GEN', failure: ['researchCommercial', 'chainOpen', 'scaleExceeded'], summaryZh: '教材若走向商業生成，原教育責任鏈無法自然閉合。', summaryEn: 'If educational material shifts into commercial generation, the original educational responsibility chain cannot close naturally.' },
    },
  },
  mediaCommercial: {
    caseId: 'mediaCommercial',
    labelZh: '媒體內容商業生成使用',
    labelEn: 'Media Content Commercial Generative Use',
    caseTitleZh: '媒體內容商業生成使用事件',
    caseTitleEn: 'Media Content Commercial Generative Use Event',
    sourceContent: '媒體文章與評論內容 / media article and commentary content',
    applicantZh: '商業生成平台',
    applicantEn: 'Commercial generation platform',
    rolesZh: '平台營運責任人 / 模型部署責任人 / 回報責任人',
    rolesEn: 'Platform operations owner / Deployment owner / Reporting owner',
    scbkr: {
      subjectZh: '主體雖可落地，但商業平台責任更重，回報鏈需要更清楚。',
      subjectEn: 'The subject is identifiable, but the commercial platform bears heavier responsibility and needs a clearer reporting chain.',
      causeZh: '用途直接靠近生成與市場替代，原因鏈條更短且更具外部影響。',
      causeEn: 'The usage chain sits directly near generation and market substitution, with shorter and more externally impactful causation.',
      boundaryZh: '邊界極易越界，特別是生成、再分發與商用邊界。',
      boundaryEn: 'Its boundaries are easy to overrun, especially across generative, redistribution, and commercial limits.',
      costZh: '替代、流量分流與品牌損耗風險更高，現實代價更直接。',
      costEn: 'Substitution, traffic diversion, and brand erosion risks are higher, making real-world costs more immediate.',
      responsibilityZh: '若回報與追蹤不足，責任鏈很快斷裂，平台側責任將快速擴大。',
      responsibilityEn: 'If reporting and tracing are insufficient, the responsibility chain breaks quickly and platform-side liability expands fast.',
    },
    responsibilityAnchorZh: '原方窗口：媒體權利方；使用方窗口：平台營運責任人 / 模型部署責任人 / 回報責任人。',
    responsibilityAnchorEn: 'Origin owner: media rights holder; usage side: platform operations owner / deployment owner / reporting owner.',
    uses: {
      summary: { state: 'WARN', model: 'SUMMARY_ONLY', failure: ['substitution', 'reportingMissing'], summaryZh: '摘要可短暫成立，但需防止評論被重組成可替代內容。', summaryEn: 'Summary may remain conditionally valid, but commentary must not be recomposed into substitute content.' },
      rag: { state: 'NON-CLOSABLE', model: 'RAG_ASSIST', failure: ['retrievalTraining', 'chainOpen', 'reportingMissing'], summaryZh: '檢索輔助若無法維持明確回報與引用閉環，即屬不可閉合。', summaryEn: 'If retrieval assistance cannot preserve explicit reporting and citation closure, it becomes non-closable.' },
      training: { state: 'OVERRUN', model: 'TRAINING_USE', failure: ['licenseCategory', 'retrievalTraining', 'scaleExceeded'], summaryZh: '媒體內容進入訓練即快速跨越原始授權邊界。', summaryEn: 'Once media content enters training, it quickly crosses the original licensing boundary.' },
      commercial: { state: 'VOID', model: 'COMMERCIAL_GEN', failure: ['licenseCategory', 'researchCommercial', 'chainOpen', 'scaleExceeded'], summaryZh: '商業生成平台直接使用媒體內容生成輸出，不具成立資格。', summaryEn: 'A commercial generation platform using media content directly for output does not qualify as valid.' },
    },
  },
};

const usageOptions = {
  summary: { labelZh: '摘要', labelEn: 'Summary' },
  rag: { labelZh: '檢索輔助', labelEn: 'RAG Assist' },
  training: { labelZh: '訓練', labelEn: 'Training' },
  commercial: { labelZh: '商業生成', labelEn: 'Commercial Generation' },
};

const appState = { selectedCase: 'newsTaiwan', selectedUse: 'summary', currentResult: null, autoTimer: null };

const caseButtons = document.getElementById('caseButtons');
const useButtons = document.getElementById('useButtons');
const selectedCaseLabel = document.getElementById('selectedCaseLabel');
const selectedUseLabel = document.getElementById('selectedUseLabel');
const selectionPreview = document.getElementById('selectionPreview');
const caseTitle = document.getElementById('caseTitle');
const decisionState = document.getElementById('decisionState');
const decisionSummary = document.getElementById('decisionSummary');
const scbkrBreakdown = document.getElementById('scbkrBreakdown');
const boundaryModel = document.getElementById('boundaryModel');
const failureConditions = document.getElementById('failureConditions');
const responsibilityAnchor = document.getElementById('responsibilityAnchor');
const hashValue = document.getElementById('hashValue');
const timestampValue = document.getElementById('timestampValue');
const autoDemoTimeline = document.getElementById('autoDemoTimeline');

const autoDemoSteps = [
  { caseKey: 'newsTaiwan', useKey: 'summary', label: '載入案例 1：台灣新聞內容授權，用途 Summary，顯示 WARN。 / Load Case 1 Taiwanese News Content Licensing with Summary and show WARN.' },
  { caseKey: 'newsTaiwan', useKey: 'rag', label: '切換到 RAG Assist，顯示 WARN。 / Switch to RAG Assist and show WARN.' },
  { caseKey: 'newsTaiwan', useKey: 'training', label: '切換到 Training，顯示 NON-CLOSABLE。 / Switch to Training and show NON-CLOSABLE.' },
  { caseKey: 'newsTaiwan', useKey: 'commercial', label: '切換到 Commercial Generation，顯示 OVERRUN。 / Switch to Commercial Generation and show OVERRUN.' },
  { action: 'hash', label: '最後生成 Semantic Responsibility Hash 與責任錨點輸出。 / Finally generate the Semantic Responsibility Hash and responsibility anchor output.' },
];

function renderButtons() {
  caseButtons.innerHTML = Object.entries(scenarios).map(([key, scenario]) => `
    <button class="chip ${appState.selectedCase === key ? 'is-active' : ''}" type="button" data-case="${key}">
      <strong>${scenario.labelZh}</strong>
      <span>${scenario.labelEn}</span>
    </button>`).join('');
  useButtons.innerHTML = Object.entries(usageOptions).map(([key, option]) => `
    <button class="chip ${appState.selectedUse === key ? 'is-active' : ''}" type="button" data-use="${key}">
      <strong>${option.labelZh}</strong>
      <span>${option.labelEn}</span>
    </button>`).join('');

  caseButtons.querySelectorAll('[data-case]').forEach((button) => button.addEventListener('click', () => {
    appState.selectedCase = button.dataset.case;
    updateSelectionSummary();
    renderButtons();
  }));
  useButtons.querySelectorAll('[data-use]').forEach((button) => button.addEventListener('click', () => {
    appState.selectedUse = button.dataset.use;
    updateSelectionSummary();
    renderButtons();
  }));
  updateSelectionSummary();
}

function updateSelectionSummary() {
  const scenario = scenarios[appState.selectedCase];
  const usage = usageOptions[appState.selectedUse];
  selectedCaseLabel.textContent = `${scenario.caseTitleZh} / ${scenario.caseTitleEn}`;
  selectedUseLabel.textContent = `${usage.labelZh} / ${usage.labelEn}`;
  selectionPreview.innerHTML = `
    <p><strong>來源內容 / Source Content:</strong> ${scenario.sourceContent}</p>
    <p><strong>申請方 / Applicant:</strong> ${scenario.applicantZh} / ${scenario.applicantEn}</p>
    <p><strong>預設責任人 / Default Responsible Roles:</strong> ${scenario.rolesZh} / ${scenario.rolesEn}</p>`;
}

function buildResult(caseKey, useKey) {
  const scenario = scenarios[caseKey];
  const use = scenario.uses[useKey];
  const model = boundaryModels[use.model];
  const timestamp = new Date().toISOString();
  return {
    caseTitle: `${scenario.caseTitleZh} / ${scenario.caseTitleEn}`,
    subject: `${scenario.scbkr.subjectZh} / ${scenario.scbkr.subjectEn}`,
    cause: `${scenario.scbkr.causeZh} / ${scenario.scbkr.causeEn}`,
    boundary: `${scenario.scbkr.boundaryZh} / ${scenario.scbkr.boundaryEn}`,
    cost: `${scenario.scbkr.costZh} / ${scenario.scbkr.costEn}`,
    responsibility: `${scenario.scbkr.responsibilityZh} / ${scenario.scbkr.responsibilityEn}`,
    state: use.state,
    summary: `${use.summaryZh} / ${use.summaryEn}`,
    model,
    failure: use.failure.map((key) => failurePool[key]),
    responsibilityAnchorZh: scenario.responsibilityAnchorZh,
    responsibilityAnchorEn: scenario.responsibilityAnchorEn,
    timestamp,
    hashSeed: [scenario.caseId, useKey, use.model, use.state, scenario.rolesZh, scenario.sourceContent].join('|'),
  };
}

function stateClass(state) {
  return `decision-state--${state.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`;
}

function renderResult(result) {
  appState.currentResult = result;
  caseTitle.innerHTML = `<p>${result.caseTitle}</p>`;
  decisionState.className = `decision-state ${stateClass(result.state)} is-animating`;
  decisionState.textContent = result.state;
  setTimeout(() => decisionState.classList.remove('is-animating'), 80);
  decisionSummary.textContent = result.summary;
  scbkrBreakdown.innerHTML = [
    ['S — Subject / 主體', result.subject],
    ['C — Cause / 因果', result.cause],
    ['B — Boundary / 邊界', result.boundary],
    ['K — Cost Cluster / 成本簇', result.cost],
    ['R — Responsibility / 責任', result.responsibility],
  ].map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  boundaryModel.innerHTML = `<p><strong>${result.model.title}</strong></p><p>${result.model.zh}</p><p>${result.model.en}</p>`;
  failureConditions.innerHTML = result.failure.map((item) => `<li>${item}</li>`).join('');
  responsibilityAnchor.innerHTML = `<p>${result.responsibilityAnchorZh}</p><p>${result.responsibilityAnchorEn}</p>`;
  hashValue.textContent = 'Hash pending. Click Generate Responsibility Hash. / 雜湊待生成，請按生成責任雜湊。';
  hashValue.classList.remove('is-generating');
  timestampValue.textContent = `Timestamp / 時間戳：${result.timestamp}`;
}

function stableHash(input) {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i += 1) {
    const code = input.charCodeAt(i);
    h1 ^= code;
    h1 = Math.imul(h1, 16777619);
    h2 = Math.imul(h2 ^ code, 2246822519);
  }
  const a = (h1 >>> 0).toString(16).padStart(8, '0');
  const b = (h2 >>> 0).toString(16).padStart(8, '0');
  const c = (((h1 ^ h2) >>> 0)).toString(16).padStart(8, '0');
  const d = (((h1 + h2) >>> 0)).toString(16).padStart(8, '0');
  return `SRH-v1::${a}-${b}-${c}-${d}`;
}

async function generateHash(animated = true) {
  if (!appState.currentResult) {
    decisionSummary.textContent = '請先執行裁決，再生成責任雜湊。 / Run a judgment before generating the responsibility hash.';
    return;
  }
  const signature = stableHash(appState.currentResult.hashSeed);
  if (!animated) {
    hashValue.textContent = signature;
    return signature;
  }
  hashValue.textContent = '';
  hashValue.classList.add('is-generating');
  for (const char of signature) {
    hashValue.textContent += char;
    await new Promise((resolve) => setTimeout(resolve, 18));
  }
  hashValue.classList.remove('is-generating');
  return signature;
}

function resetDemo() {
  clearTimeout(appState.autoTimer);
  appState.currentResult = null;
  caseTitle.innerHTML = '<p>待執行裁決。 / Awaiting judgment.</p>';
  decisionState.className = 'decision-state decision-state--idle';
  decisionState.textContent = 'READY';
  decisionSummary.textContent = '選擇案例與用途後按下執行裁決。 / Select a case and use mode, then click Run Judgment.';
  scbkrBreakdown.innerHTML = '<div><dt>S / C / B / K / R</dt><dd>執行裁決後顯示完整內容。 / Full content appears after judgment.</dd></div>';
  boundaryModel.innerHTML = '<p>待執行裁決。 / Awaiting judgment.</p>';
  failureConditions.innerHTML = '<li>尚未產生失效條件。 / No failure conditions generated yet.</li>';
  responsibilityAnchor.innerHTML = '<p>尚未建立責任錨點。 / Responsibility anchor not generated yet.</p>';
  hashValue.textContent = 'Awaiting judgment / 等待裁決';
  hashValue.classList.remove('is-generating');
  timestampValue.textContent = 'Timestamp / 時間戳：—';
  renderAutoDemoTimeline();
}

function renderAutoDemoTimeline(activeIndex = -1) {
  autoDemoTimeline.innerHTML = autoDemoSteps.map((step, index) => `<li class="${index < activeIndex ? 'is-complete' : ''} ${index === activeIndex ? 'is-active' : ''}" data-step="${index + 1}">${step.label}</li>`).join('');
}

async function playAutoDemo() {
  clearTimeout(appState.autoTimer);
  document.getElementById('auto-demo').scrollIntoView({ behavior: 'smooth', block: 'start' });
  appState.selectedCase = 'newsTaiwan';
  appState.selectedUse = 'summary';
  renderButtons();
  resetDemo();
  for (let i = 0; i < autoDemoSteps.length; i += 1) {
    const step = autoDemoSteps[i];
    renderAutoDemoTimeline(i);
    if (step.action === 'hash') {
      await generateHash(true);
    } else {
      appState.selectedCase = step.caseKey;
      appState.selectedUse = step.useKey;
      renderButtons();
      renderResult(buildResult(step.caseKey, step.useKey));
    }
    await new Promise((resolve) => { appState.autoTimer = setTimeout(resolve, i === autoDemoSteps.length - 1 ? 300 : 1300); });
  }
  renderAutoDemoTimeline(autoDemoSteps.length);
}

function setupReveal() {
  const sections = document.querySelectorAll('.section, .footer');
  sections.forEach((section) => section.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });
  sections.forEach((section) => observer.observe(section));
}

document.getElementById('runJudgment').addEventListener('click', () => renderResult(buildResult(appState.selectedCase, appState.selectedUse)));
document.getElementById('generateHash').addEventListener('click', () => generateHash(true));
document.getElementById('resetDemo').addEventListener('click', resetDemo);
document.getElementById('playAutoDemo').addEventListener('click', playAutoDemo);
document.getElementById('heroAutoDemo').addEventListener('click', playAutoDemo);

renderButtons();
resetDemo();
setupReveal();
