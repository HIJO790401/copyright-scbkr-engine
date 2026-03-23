const scenarios = {
  news: {
    labelZh: '新聞內容授權',
    labelEn: 'News Content Licensing',
    descriptionZh: '新聞資料具時效與授權限制，適合展示摘要、檢索與商業生成邊界差異。',
    descriptionEn: 'News content carries timeliness and license constraints, making it suitable for showing differences between summary, retrieval, and commercial generation boundaries.',
    source: '授權新聞資料庫 / Licensed news archive',
    claim: '僅可提供有限轉述，不可替代原文發佈 / Limited paraphrase only, no substitute publication',
    boundary: '需保留來源、日期、媒體與不可替代性聲明 / Must retain source, date, publisher, and non-substitution notice',
    transformation: '從摘要可升高至生成再製風險 / Escalates from summary into generative reproduction risk',
    relay: '責任由部署方、商業使用方與內容供應方串接 / Responsibility relays across deployer, commercial user, and content provider',
    uses: {
      summary: {
        state: 'WARN',
        summary: '摘要可有限成立，但必須保留來源與引用範圍。 / Summary is conditionally valid, but source and quotation scope must be preserved.',
        modelZh: '條件式衍生邊界：可做短摘要，不可構成替代閱讀。',
        modelEn: 'Conditional derivation boundary: short summaries are allowed, but they cannot replace reading the source.',
        failure: [
          '移除原媒體、作者或日期資訊即失效。 / Removing publisher, author, or date invalidates the boundary.',
          '摘要長度逼近原文再現時轉入警示。 / If the summary approaches source reproduction, the state remains warned.',
        ],
        anchor: [
          'Anchor A1：來源媒體與出版日期 / Source publisher and publication date',
          'Anchor A2：摘要長度上限與用途聲明 / Summary length limit and use declaration',
        ],
      },
      rag: {
        state: 'NON-CLOSABLE',
        summary: '檢索輔助可提供片段回應，但若回收不到原授權閉環，責任鏈不可閉合。 / Retrieval assistance may cite fragments, but the chain becomes non-closable if it cannot return to the original license closure.',
        modelZh: '不可閉合責任邊界：檢索引用可行，但必須可回指原內容與權利條件。',
        modelEn: 'Non-closable liability boundary: retrieval quotation is possible only if it can point back to the original content and rights conditions.',
        failure: [
          '回答未保留引用位置與原始連結。 / The answer omits citation positions and source links.',
          '模型將片段整合為替代型完整報導。 / The model combines fragments into a substitutive report.',
        ],
        anchor: [
          'Anchor B1：檢索片段位置、URL 與版本號 / Retrieval span, URL, and version ID',
          'Anchor B2：部署端提示詞與回答長度策略 / Deployer prompt and answer-length policy',
        ],
      },
      training: {
        state: 'NON-CLOSABLE',
        summary: '將新聞內容納入訓練會讓原授權邊界難以回收，需額外授權。 / Training on news content makes the original license boundary hard to recover and requires additional authorization.',
        modelZh: '不可閉合責任邊界：訓練將內容內化，無法用一般引用條件閉合責任。',
        modelEn: 'Non-closable liability boundary: training internalizes the content and cannot close responsibility through ordinary citation terms.',
        failure: [
          '缺少明示訓練授權。 / No explicit training authorization is present.',
          '無法證明模型輸出不會回吐核心內容。 / No proof that outputs will not leak core source content.',
        ],
        anchor: [
          'Anchor C1：資料匯入清單與授權附件 / Data ingestion inventory and license annex',
          'Anchor C2：模型版本與去識別化處理紀錄 / Model version and de-identification log',
        ],
      },
      commercial: {
        state: 'OVERRUN',
        summary: '商業生成超過新聞授權邊界，主要責任轉由越界部署或商業使用方承擔。 / Commercial generation exceeds the news licensing boundary, shifting primary responsibility to the overrunning deployer or commercial user.',
        modelZh: '商業越界邊界：若生成內容替代原新聞價值，即構成越界。',
        modelEn: 'Overrun commercial boundary: once generated content substitutes the original news value, an overrun occurs.',
        failure: [
          '輸出可直接替代付費新聞或授權內容。 / Output directly substitutes paid or licensed news content.',
          '生成結果被再分發或商品化。 / Generated results are redistributed or commercialized.',
        ],
        anchor: [
          'Anchor D1：營收場景、產品頁與使用者規模 / Revenue scenario, product page, and user scale',
          'Anchor D2：權利人通知與風險升級紀錄 / Rights-holder notice and escalation log',
        ],
      },
    },
  },
  education: {
    labelZh: '教材語料授權',
    labelEn: 'Educational Dataset Licensing',
    descriptionZh: '教材資料具教育用途條件，適合展示 ALLOW 與 VOID 的切換。',
    descriptionEn: 'Educational datasets carry teaching-use conditions, making them useful for showing transitions between ALLOW and VOID.',
    source: '教材授權包與教學用途條款 / Licensed educational package and teaching-use terms',
    claim: '可於教學輔助使用，不得脫離教育情境商品化 / Usable for instructional assistance, not for commercialization outside education',
    boundary: '必須限定教育機構、課程場景與引用標記 / Must remain within educational institutions, course contexts, and marked quotation',
    transformation: '從輔助摘要延伸到訓練與再分發時需重審 / Reassessment is required once assistance extends into training or redistribution',
    relay: '責任由教材供應方、校方與部署方共同承接 / Responsibility is shared by the content licensor, institution, and deployer',
    uses: {
      summary: {
        state: 'ALLOW',
        summary: '在課程內做摘要與導讀時，授權與責任邊界完整成立。 / Summaries and guided-reading support inside a course remain fully valid.',
        modelZh: '閉合歸因邊界：教育場景、引用標記與非商業前提齊備。',
        modelEn: 'Closed attribution boundary: educational context, citation marking, and non-commercial assumptions are all in place.',
        failure: ['脫離課程情境即失去 ALLOW。 / Leaving the course context removes ALLOW.', '未標示教材來源會降為 WARN。 / Missing source marking downgrades the state to WARN.'],
        anchor: ['Anchor E1：課程代碼與授課單位 / Course code and institution', 'Anchor E2：教材版本與引用頁碼 / Material version and cited pages'],
      },
      rag: {
        state: 'WARN',
        summary: '教育檢索輔助可成立，但必須限制查詢對象與回應範圍。 / Educational retrieval assistance is valid with restrictions on query scope and answer range.',
        modelZh: '條件式衍生邊界：僅限課內問答，不可形成公開知識庫。',
        modelEn: 'Conditional derivation boundary: limited to class Q&A and not for building a public knowledge base.',
        failure: ['開放給非課程成員時超出原授權。 / Opening access to non-course members exceeds the original license.', '回答整合成可下載教材包。 / Responses are compiled into a downloadable teaching package.'],
        anchor: ['Anchor F1：使用者群組限制 / User group restriction', 'Anchor F2：回答可見性與存取日誌 / Answer visibility and access log'],
      },
      training: {
        state: 'WARN',
        summary: '若教材授權明示允許研究性訓練，可暫列 WARN；否則需升級審查。 / If the material license explicitly allows research training, it may remain WARN; otherwise review must escalate.',
        modelZh: '條件式衍生邊界：需有研究條款與不可商轉限制。',
        modelEn: 'Conditional derivation boundary: requires research clauses and non-commercial transfer limits.',
        failure: ['無研究條款附件。 / Research clause annex is missing.', '訓練成果轉入商用產品。 / Training outputs are moved into commercial products.'],
        anchor: ['Anchor G1：研究使用授權附件 / Research-use licensing annex', 'Anchor G2：模型用途隔離紀錄 / Model purpose segregation log'],
      },
      commercial: {
        state: 'VOID',
        summary: '教材語料若直接轉為商業生成服務，原教育授權即失效。 / If educational materials are turned into a commercial generation service, the original educational license becomes void.',
        modelZh: '授權失效邊界：教育用途條款無法支撐外部商品化。',
        modelEn: 'Void licensing boundary: educational-use terms cannot support external commercialization.',
        failure: ['對外收費且未取得商用條款。 / Charging external users without commercial terms.', '輸出內容重建教材核心結構。 / Outputs reconstruct the material’s core structure.'],
        anchor: ['Anchor H1：商業定價頁與產品方案 / Commercial pricing page and product plan', 'Anchor H2：授權條款缺口報告 / Licensing gap report'],
      },
    },
  },
  media: {
    labelZh: '媒體內容生成使用',
    labelEn: 'Media Content Generative Use',
    descriptionZh: '媒體內容進入生成式流程時，邊界與責任會快速轉移。',
    descriptionEn: 'Once media content enters generative workflows, boundaries and responsibilities shift rapidly.',
    source: '媒體片段、影像腳本與品牌授權條款 / Media clips, scripts, and brand licensing terms',
    claim: '可做內部參考與風格分析，不得未經授權對外替代發佈 / Internal reference and style analysis are allowed, but external substitutive publication is not',
    boundary: '需區分參考、衍生、再製與品牌混淆 / Must distinguish reference, derivation, reproduction, and brand confusion',
    transformation: '從風格分析走向生成替代時風險急升 / Risk rises sharply as style analysis shifts into generative substitution',
    relay: '責任由模型操作者、創作者與上架平台共同承接 / Responsibility is relayed across the model operator, creator, and distribution platform',
    uses: {
      summary: {
        state: 'WARN',
        summary: '可做風格摘要，但不可暗示生成內容等同原媒體作品。 / Style summaries are possible, but generated content cannot be implied to equal the original work.',
        modelZh: '條件式衍生邊界：限於風格解析與內部評估。',
        modelEn: 'Conditional derivation boundary: limited to style analysis and internal evaluation.',
        failure: ['摘要加入可直接複製的場景結構。 / Summary includes directly reproducible scene structures.', '對外宣稱可替代原媒體素材。 / Publicly claiming it can replace the original media asset.'],
        anchor: ['Anchor M1：內容片段 ID 與場景編號 / Asset fragment ID and scene number', 'Anchor M2：對外說明文案 / External messaging copy'],
      },
      rag: {
        state: 'WARN',
        summary: 'RAG Assist 可檢索授權片段，但需嚴格避免產生可重建的完整腳本。 / RAG Assist may retrieve licensed fragments, but must strictly avoid reconstructing a full script.',
        modelZh: '條件式衍生邊界：片段索引可行，完整重建不可行。',
        modelEn: 'Conditional derivation boundary: fragment indexing is viable, full reconstruction is not.',
        failure: ['多輪對話累積成完整台詞。 / Multi-turn interaction accumulates into a complete dialogue.', '檢索結果跨品牌授權混用。 / Retrieval results mix content across brand licenses.'],
        anchor: ['Anchor M3：對話輪次記錄 / Conversation turn record', 'Anchor M4：品牌授權映射表 / Brand license mapping table'],
      },
      training: {
        state: 'VOID',
        summary: '未明示授權下以媒體內容進行訓練，原邊界直接失效。 / Training on media content without explicit authorization voids the original boundary immediately.',
        modelZh: '授權失效邊界：內容進入訓練權利缺口。',
        modelEn: 'Void licensing boundary: content enters a training-rights gap.',
        failure: ['未取得訓練或衍生創作權。 / No training or derivative-creation rights obtained.', '模型可再現角色、腳本或視覺識別。 / The model can recreate characters, scripts, or visual identity.'],
        anchor: ['Anchor M5：權利盤點清單 / Rights inventory list', 'Anchor M6：訓練資料集組成證據 / Training dataset composition evidence'],
      },
      commercial: {
        state: 'OVERRUN',
        summary: '商業生成若足以替代原媒體內容，將構成越界並產生高責任暴露。 / Commercial generation that can substitute original media content constitutes an overrun with high liability exposure.',
        modelZh: '商業越界邊界：替代性、品牌混淆與再分發風險同時成立。',
        modelEn: 'Overrun commercial boundary: substitutability, brand confusion, and redistribution risk arise together.',
        failure: ['生成內容進入付費產品或廣告。 / Generated content enters paid products or advertising.', '使用者被誤導為官方或原創授權內容。 / Users are misled into believing the output is official or originally licensed.'],
        anchor: ['Anchor M7：商品頁與宣傳素材 / Product page and promotional assets', 'Anchor M8：平台上架與告警紀錄 / Platform listing and alert history'],
      },
    },
  },
};

const usageOptions = {
  summary: { labelZh: '摘要', labelEn: 'Summary' },
  rag: { labelZh: '檢索輔助', labelEn: 'RAG Assist' },
  training: { labelZh: '訓練', labelEn: 'Training' },
  commercial: { labelZh: '商業生成', labelEn: 'Commercial Generation' },
};

const appState = { selectedCase: 'news', selectedUse: 'summary', currentResult: null, autoTimer: null };

const caseButtons = document.getElementById('caseButtons');
const useButtons = document.getElementById('useButtons');
const selectedCaseLabel = document.getElementById('selectedCaseLabel');
const selectedUseLabel = document.getElementById('selectedUseLabel');
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
  { caseKey: 'news', useKey: 'summary', label: '載入新聞案例並以 Summary 執行，結果為 WARN。 / Load the news scenario and run Summary, resulting in WARN.' },
  { caseKey: 'news', useKey: 'rag', label: '切換至 RAG Assist，責任鏈轉為 NON-CLOSABLE。 / Switch to RAG Assist; the responsibility chain becomes NON-CLOSABLE.' },
  { caseKey: 'news', useKey: 'training', label: '升高至 Training，維持 NON-CLOSABLE 並要求額外授權。 / Escalate to Training; the state remains NON-CLOSABLE and demands additional authorization.' },
  { caseKey: 'news', useKey: 'commercial', label: '進入 Commercial Generation，判定為 OVERRUN。 / Move into Commercial Generation, resulting in OVERRUN.' },
  { action: 'hash', label: '生成 Semantic Responsibility Hash，完成可追蹤輸出。 / Generate the Semantic Responsibility Hash to complete the traceable output.' },
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

  selectedCaseLabel.textContent = `${scenarios[appState.selectedCase].labelZh} / ${scenarios[appState.selectedCase].labelEn}`;
  selectedUseLabel.textContent = `${usageOptions[appState.selectedUse].labelZh} / ${usageOptions[appState.selectedUse].labelEn}`;

  caseButtons.querySelectorAll('[data-case]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.selectedCase = button.dataset.case;
      renderButtons();
    });
  });

  useButtons.querySelectorAll('[data-use]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.selectedUse = button.dataset.use;
      renderButtons();
    });
  });
}

function buildResult(caseKey, useKey) {
  const scenario = scenarios[caseKey];
  const usage = scenario.uses[useKey];
  return {
    state: usage.state,
    summary: usage.summary,
    breakdown: {
      'S — Source Scope / 來源範圍': scenario.source,
      'C — Claim Surface / 主張表面': scenario.claim,
      'B — Boundary Integrity / 邊界完整性': scenario.boundary,
      'K — Knowledge Transformation / 知識轉換': scenario.transformation,
      'R — Responsibility Relay / 責任接力': scenario.relay,
    },
    model: [usage.modelZh, usage.modelEn],
    failure: usage.failure,
    anchor: usage.anchor,
    baseString: `${caseKey}|${useKey}|${usage.state}|${scenario.source}|${scenario.boundary}`,
  };
}

function stateClass(state) {
  return `decision-state--${state.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`;
}

function renderResult(result) {
  const timestamp = new Date().toISOString();
  appState.currentResult = { ...result, timestamp };
  decisionState.className = `decision-state ${stateClass(result.state)} is-animating`;
  decisionState.textContent = result.state;
  setTimeout(() => decisionState.classList.remove('is-animating'), 80);
  decisionSummary.textContent = result.summary;
  scbkrBreakdown.innerHTML = Object.entries(result.breakdown).map(([term, value]) => `
    <div>
      <dt>${term}</dt>
      <dd>${value}</dd>
    </div>`).join('');
  boundaryModel.innerHTML = result.model.map((paragraph) => `<p>${paragraph}</p>`).join('');
  failureConditions.innerHTML = result.failure.map((item) => `<li>${item}</li>`).join('');
  responsibilityAnchor.innerHTML = result.anchor.map((item) => `<li>${item}</li>`).join('');
  hashValue.classList.remove('is-generating');
  hashValue.textContent = 'Hash pending. Click “Generate Responsibility Hash”. / 雜湊待生成，請按「生成責任雜湊」。';
  timestampValue.textContent = `Timestamp / 時間戳記：${timestamp}`;
}

async function generateHash(animated = true) {
  if (!appState.currentResult) {
    decisionSummary.textContent = '請先執行裁決，再生成責任雜湊。 / Run a judgment before generating the responsibility hash.';
    return;
  }
  const seed = `${appState.currentResult.baseString}|${appState.currentResult.timestamp}`;
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
  const hashHex = Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  const formatted = `SRH-v1::${hashHex.slice(0, 16)}-${hashHex.slice(16, 32)}-${hashHex.slice(32, 48)}`;

  if (!animated) {
    hashValue.textContent = formatted;
    return formatted;
  }

  hashValue.classList.add('is-generating');
  hashValue.textContent = '';
  for (const char of formatted) {
    hashValue.textContent += char;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 22));
  }
  hashValue.classList.remove('is-generating');
  return formatted;
}

function resetDemo() {
  window.clearTimeout(appState.autoTimer);
  appState.currentResult = null;
  decisionState.className = 'decision-state decision-state--idle';
  decisionState.textContent = 'READY';
  decisionSummary.textContent = '選擇案例與用途後執行裁決。 / Select a scenario and usage mode, then run judgment.';
  scbkrBreakdown.innerHTML = '';
  boundaryModel.innerHTML = '<p>待執行裁決。 / Awaiting judgment.</p>';
  failureConditions.innerHTML = '<li>尚未執行裁決。 / Judgment has not been executed.</li>';
  responsibilityAnchor.innerHTML = '<li>尚未建立責任錨點。 / Responsibility anchors have not been created yet.</li>';
  hashValue.textContent = 'Awaiting judgment / 等待裁決';
  hashValue.classList.remove('is-generating');
  timestampValue.textContent = 'Timestamp / 時間戳記：—';
  autoDemoTimeline.querySelectorAll('li').forEach((item) => item.className = '');
}

function renderAutoDemoTimeline() {
  autoDemoTimeline.innerHTML = autoDemoSteps.map((step, index) => `<li data-step="${index + 1}">${step.label}</li>`).join('');
}

async function playAutoDemo() {
  window.clearTimeout(appState.autoTimer);
  document.getElementById('auto-demo').scrollIntoView({ behavior: 'smooth', block: 'start' });
  renderAutoDemoTimeline();
  resetDemo();
  appState.selectedCase = 'news';
  appState.selectedUse = 'summary';
  renderButtons();

  const items = [...autoDemoTimeline.querySelectorAll('li')];
  for (let index = 0; index < autoDemoSteps.length; index += 1) {
    const step = autoDemoSteps[index];
    items.forEach((item, itemIndex) => {
      item.classList.toggle('is-active', itemIndex === index);
      item.classList.toggle('is-complete', itemIndex < index);
    });

    if (step.action === 'hash') {
      await generateHash(true);
    } else {
      appState.selectedCase = step.caseKey;
      appState.selectedUse = step.useKey;
      renderButtons();
      renderResult(buildResult(step.caseKey, step.useKey));
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => { appState.autoTimer = window.setTimeout(resolve, index === autoDemoSteps.length - 1 ? 300 : 1100); });
  }
  items.forEach((item) => { item.classList.remove('is-active'); item.classList.add('is-complete'); });
}

function setupReveal() {
  const sections = document.querySelectorAll('.section, .footer');
  sections.forEach((section) => section.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.14 });
  sections.forEach((section) => observer.observe(section));
}

document.getElementById('runJudgment').addEventListener('click', () => renderResult(buildResult(appState.selectedCase, appState.selectedUse)));
document.getElementById('generateHash').addEventListener('click', () => { generateHash(true); });
document.getElementById('resetDemo').addEventListener('click', resetDemo);
document.getElementById('playAutoDemo').addEventListener('click', playAutoDemo);
document.getElementById('heroAutoDemo').addEventListener('click', playAutoDemo);

renderButtons();
renderAutoDemoTimeline();
resetDemo();
setupReveal();
