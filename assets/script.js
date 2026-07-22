const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const languageButtons = document.querySelectorAll("[data-lang-toggle]");
const languagePanels = document.querySelectorAll("[data-lang-panel]");
const originalText = new WeakMap();
const preferredLanguage = localStorage.getItem("siteLanguage") || "zh";

const translations = new Map([
  ["主导航", "Main navigation"],
  ["打开导航", "Open navigation"],
  ["个人照片", "Portrait"],
  ["个人背景", "Background"],
  ["项目经历", "Projects"],
  ["科研经历", "Research"],
  ["四川大学软件工程系", "Department of Software Engineering, Sichuan University"],
  ["2023 - 至今", "2023 - Present"],
  [
    "关注机器学习、深度学习、自然语言处理与智能系统开发，重视从算法建模、数据处理到工程实现的完整实践能力。",
    "Focused on machine learning, deep learning, natural language processing, and intelligent system development, with attention to the full workflow from modeling and data processing to engineering implementation."
  ],
  ["查看 CV", "View CV"],
  ["联系我", "Contact"],
  ["电话", "Phone"],
  ["Location", "Location"],
  ["关键背景", "Key background"],
  ["四川大学软件工程系本科生，聚焦机器学习与智能系统研发。", "Software Engineering undergraduate at Sichuan University, focused on machine learning and intelligent systems."],
  ["教育经历", "Education"],
  ["2023 - 至今 · 四川大学软件工程系", "2023 - Present · Department of Software Engineering, Sichuan University"],
  ["成绩排名", "Academic Rank"],
  ["前五学期必修成绩 22/246", "Required-course rank in the first five semesters: 22 / 246"],
  ["英语能力", "English"],
  ["兴趣方向", "Interests"],
  ["技术栈", "Technical Skills"],
  ["编程语言", "Programming"],
  ["前端技术", "Frontend"],
  ["后端与数据", "Backend & Data"],
  ["工具平台", "Tools"],
  ["主要项目经历", "Selected Projects"],
  ["基于训诂学的汉字知识图谱与词典编撰平台", "Chinese Character Knowledge Graph and Lexicography Platform Based on Exegetics"],
  [
    "面向古汉语辞典编撰中的多源异构语料与人工考证成本问题，构建汉字语义演变动态知识图谱，并开发集可视化研判、智能编撰建议与证据溯源于一体的专家辅助平台。",
    "Built a dynamic knowledge graph for Chinese character semantic evolution and an expert-assistance platform for classical Chinese dictionary compilation, supporting visual analysis, intelligent drafting suggestions, and evidence tracing."
  ],
  ["负责数据处理与后端开发，支撑语料清洗、实体关系组织和接口服务。", "Handled data processing and backend development for corpus cleaning, entity-relation organization, and API services."],
  ["参与以训诂学为内核的“审-比-勘-改”多智能体循证链路设计。", "Contributed to a multi-agent evidence-based workflow centered on exegetics."],
  ["技术栈：React、FastAPI、Python、Graph-RAG、知识图谱。", "Tech stack: React, FastAPI, Python, Graph-RAG, knowledge graph."],
  ["面向三次采油的 AI 驱动型分子反向设计平台", "AI-Driven Molecular Inverse Design Platform for Enhanced Oil Recovery"],
  [
    "围绕降低三次采油表面活性剂界面张力的目标，搭建“生成、预测、筛选、进化”闭环平台，用虚拟筛选与定向优化替代高成本湿实验流程。",
    "Built a closed-loop generate-predict-filter-evolve platform for surfactant molecular design, reducing dependence on high-cost wet-lab screening."
  ],
  ["负责随机森林 QSPR 代理模型训练、遗传算法分子生成和分子特征维度对齐。", "Implemented random-forest QSPR surrogate modeling, genetic-algorithm molecule generation, and molecular feature alignment."],
  ["嵌入化学规则约束与模型验证流程，提升分子合规性与筛选效率。", "Integrated chemical validity constraints and model validation to improve compliance and screening efficiency."],
  ["技术栈：Random Forest、Genetic Algorithm、RDKit、SMILES、Pandas。", "Tech stack: Random Forest, Genetic Algorithm, RDKit, SMILES, Pandas."],
  ["Propensity-Weighted Modified Logistic Regression for Robust PU Learning Under Structural Label Noise", "Propensity-Weighted Modified Logistic Regression for Robust PU Learning Under Structural Label Noise"],
  [
    "论文已收录到 Springer 会议论文集《Advanced Intelligent Computing Technology and Applications》，研究 Positive-Unlabeled（PU）learning 在真实场景中因特征依赖标注产生的结构标签噪声问题。",
    "The paper is now included in the Springer proceedings Advanced Intelligent Computing Technology and Applications, and studies structural label noise in Positive-Unlabeled (PU) learning caused by feature-dependent labeling in real-world settings."
  ],
  [
    "构建可控随机与结构 PU 噪声机制，提出 Propensity-weighted Modified Logistic Regression（P-MLR），通过参数化加权分支解耦目标类别分布与特征依赖标注倾向。",
    "It constructs controlled random and structural PU noise mechanisms and proposes Propensity-weighted Modified Logistic Regression (P-MLR), which decouples target class distribution from feature-dependent labeling propensity through a parameterized weighting branch."
  ],
  [
    "在 5 个表格与非表格基准数据集上验证模型在严重结构偏置下的鲁棒性，尤其适配医疗与结构化表格数据，同时保留线性模型可解释性与在线推理复杂度。",
    "Experiments on five tabular and non-tabular benchmarks show robustness under severe structural bias, especially on medical and structured tabular data, while preserving linear-model interpretability and online inference complexity."
  ],
  ["Springer 出版页", "Springer page"],
  ["录用信息", "Acceptance"],
  ["竞赛与荣誉", "Competitions & Honors"],
  ["省级大学生创新创业大赛项目负责人", "Project lead, Provincial College Student Innovation and Entrepreneurship Competition"],
  ["“挑战杯”校级一等奖", "First Prize, university-level Challenge Cup"],
  ["计算机设计大赛省赛", "Provincial Computer Design Competition"],
  ["美国大学生数学建模竞赛", "Mathematical Contest in Modeling"],
  ["蓝桥杯省赛", "Provincial Lanqiao Cup"],
  ["2023-2024 学年综合一等奖学金", "First-Class Comprehensive Scholarship, 2023-2024"],
  ["2024-2025 学年综合三等奖学金", "Third-Class Comprehensive Scholarship, 2024-2025"],
  ["MIT 暑期“大川视界”科技加速营优秀学员", "Outstanding participant, MIT Summer Dachuan Vision Technology Accelerator"],
  ["NUS summer workshop 暑期访学", "NUS Summer Workshop"],
  ["实习经历", "Internship"],
  ["2025.07 - 2025.08 · 深圳", "Jul 2025 - Aug 2025 · Shenzhen"],
  ["九天创智（深圳）科技有限公司 · 算法开发实习生", "Jiutian Chuangzhi (Shenzhen) Technology Co., Ltd. · Algorithm Development Intern"],
  ["参与算法模块开发与维护，负责深度学习模型性能优化及边界条件测试。", "Contributed to algorithm module development and maintenance, focusing on deep learning performance optimization and boundary-condition testing."],
  ["设计自动化测试脚本，对模型在不同数据集上的表现进行回归测试。", "Designed automated testing scripts for regression tests across datasets."],
  ["协助数据清洗与特征工程，提升训练数据质量与规范性。", "Supported data cleaning and feature engineering to improve training data quality and consistency."],
  ["其他经历", "More Experience"],
  ["“光影川大 · 毕业季之美”主题摄影比赛二等奖", "Second prize, SCU graduation-season photography contest"],
  ["“匠心逐影”国风建筑摄影大赛三等奖", "Third prize, Chinese-style architecture photography contest"],
  ["思政主题微视频大赛一等奖", "First prize, ideological and political micro-video contest"],
  ["四川大学学院创业就业部干事", "Officer, Entrepreneurship and Employment Department, Sichuan University"],
  ["班级团支书（2023.09 - 2024.09）", "Class Youth League Branch Secretary (Sep 2023 - Sep 2024)"],
  ["© 范盛颉 四川大学软件工程系", "© Fanshengjie Department of Software Engineering, Sichuan University"],
  ["四川大学软件工程系本科生", "Software Engineering Undergraduate, Sichuan University"],
  ["四川大学软件工程系本科生 · 机器学习 / 深度学习 / 自然语言处理", "Software Engineering Undergraduate, Sichuan University · ML / DL / NLP"],
  ["Chengdu, China", "Chengdu, China"],
  ["打印 / 保存 PDF", "Print / Save PDF"],
  ["四川大学", "Sichuan University"],
  ["软件工程系 · 本科", "Software Engineering · B.Eng."],
  ["学业表现", "Academic Performance"],
  ["前五学期必修成绩排名：17 / 252", "Required-course rank in the first five semesters: 17 / 252"],
  ["大学英语六级：500+", "CET-6: 500+"],
  ["研究兴趣", "Research Interests"],
  ["机器学习、深度学习、自然语言处理、知识图谱、AI for Science。", "Machine learning, deep learning, natural language processing, knowledge graphs, and AI for Science."],
  ["项目经历", "Projects"],
  ["React / FastAPI / Graph-RAG", "React / FastAPI / Graph-RAG"],
  [
    "面向古汉语辞典编撰中的多源异构语料、证据溯源与人工考证成本问题，参与构建汉字语义演变动态知识图谱。",
    "Contributed to a dynamic knowledge graph for Chinese character semantic evolution, targeting heterogeneous corpora, evidence tracing, and costly manual verification in classical Chinese lexicography."
  ],
  ["负责数据处理与后端开发，支撑语料清洗、实体关系组织、知识检索与平台接口服务。", "Handled data processing and backend development for corpus cleaning, entity-relation organization, knowledge retrieval, and platform APIs."],
  ["参与“审-比-勘-改”多智能体循证链路设计，将权威辞典、专家知识与大模型系统结合。", "Helped design a multi-agent evidence-based workflow that combines authoritative dictionaries, expert knowledge, and LLM systems."],
  ["围绕降低表面活性剂界面张力目标，搭建“生成、预测、筛选、进化”闭环分子设计流程。", "Built a closed-loop molecule design pipeline for lowering surfactant interfacial tension."],
  ["负责随机森林 QSPR 代理模型训练、遗传算法分子生成逻辑、SMILES 表征处理与 RDKit 特征提取。", "Implemented random-forest QSPR surrogate training, genetic-algorithm molecule generation, SMILES processing, and RDKit feature extraction."],
  ["嵌入化学规则约束、特征维度对齐和模型验证流程，提升虚拟筛选的合规性与效率。", "Integrated chemical constraints, feature alignment, and validation workflows to improve virtual screening compliance and efficiency."],
  ["PU Learning / P-MLR", "PU Learning / P-MLR"],
  ["聚焦 PU 学习在真实场景中结构标签噪声与 SAR 假设带来的建模挑战。", "Focused on modeling challenges caused by structured label noise and the SAR assumption in real-world PU learning."],
  ["构建可控随机与结构 PU 噪声注入机制，提出 P-MLR 倾向加权改进逻辑回归模型。", "Built controllable random and structured PU noise injection mechanisms and proposed P-MLR, a propensity-weighted improved logistic regression model."],
  ["在 5 个表格与非表格基准数据集上验证模型鲁棒性，保留线性模型可解释性与轻量在线推理复杂度。", "Validated robustness on five tabular and non-tabular benchmarks while preserving interpretability and lightweight inference."],
  ["九天创智（深圳）科技有限公司 · 算法开发实习生", "Jiutian Chuangzhi (Shenzhen) Technology Co., Ltd. · Algorithm Development Intern"],
  ["2025.07 - 2025.08", "Jul 2025 - Aug 2025"],
  ["参与公司算法模块开发与维护，负责深度学习模型性能优化及边界条件测试。", "Contributed to company algorithm module development and maintenance, focusing on deep learning performance optimization and boundary-condition testing."],
  ["设计并执行自动化测试脚本，对模型在不同数据集上的表现进行回归测试并输出分析报告。", "Designed and executed automated testing scripts, ran regression tests across datasets, and produced analysis reports."],
  ["协助团队进行数据清洗与特征工程，提升模型训练数据质量与规范性。", "Supported data cleaning and feature engineering to improve model training data quality and consistency."],
  ["竞赛、荣誉与活动", "Competitions, Honors & Activities"],
  ["操作指南", "Guide"],
  ["语言切换", "Language switch"],
  ["中文", "中文"],
  ["English", "English"]
]);

const translateTextNode = (node, language) => {
  if (!originalText.has(node)) {
    originalText.set(node, node.nodeValue);
  }

  const original = originalText.get(node);
  const trimmed = original.trim();

  if (!trimmed) {
    return;
  }

  if (language === "en" && translations.has(trimmed)) {
    node.nodeValue = original.replace(trimmed, translations.get(trimmed));
    return;
  }

  node.nodeValue = original;
};

const applyLanguage = (language) => {
  const lang = language === "en" ? "en" : "zh";
  localStorage.setItem("siteLanguage", lang);
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => translateTextNode(node, lang));

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-lang-toggle") === lang);
  });

  languagePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.getAttribute("data-lang-panel") === lang);
  });
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang-toggle");
    applyLanguage(lang);
  });
});

const sectionLinks = document.querySelectorAll("[data-section-link]");
const sections = [...sectionLinks]
  .map((link) => document.getElementById(link.getAttribute("data-section-link")))
  .filter(Boolean);

const setActiveSection = (sectionId = "background") => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("data-section-link") === sectionId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateActiveSection = () => {
  if (!sections.length) {
    return;
  }

  const probeLine = window.scrollY + 120;
  let activeId = sections[0].id;

  sections.forEach((section) => {
    if (section.offsetTop <= probeLine) {
      activeId = section.id;
    }
  });

  setActiveSection(activeId);
};

if (sections.length) {
  setActiveSection("background");

  if (!window.location.hash) {
    history.replaceState(null, "", "#background");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();
}

applyLanguage(preferredLanguage);

const modalShell = document.querySelector("[data-modal]");
const modalContent = modalShell?.querySelector(".modal-content");
const modalCloseButtons = modalShell?.querySelectorAll("[data-modal-close]") || [];
const detailTriggers = document.querySelectorAll("[data-detail-target]");
const previewTriggers = document.querySelectorAll("[data-preview-src]");
let activeModalTrigger = null;

const closeModal = () => {
  if (!modalShell || !modalContent) {
    return;
  }

  modalShell.hidden = true;
  modalShell.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
  document.body.classList.remove("modal-open");

  if (activeModalTrigger instanceof HTMLElement) {
    activeModalTrigger.focus();
  }
};

const openModal = (trigger, contentNode) => {
  if (!modalShell || !modalContent || !contentNode) {
    return;
  }

  activeModalTrigger = trigger;
  modalContent.innerHTML = "";
  modalContent.append(contentNode);
  modalShell.hidden = false;
  modalShell.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  applyLanguage(localStorage.getItem("siteLanguage") || "zh");

  const closeButton = modalShell.querySelector(".modal-close");
  if (closeButton instanceof HTMLElement) {
    closeButton.focus();
  }
};

detailTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const templateId = trigger.getAttribute("data-detail-target");
    const template = templateId ? document.getElementById(templateId) : null;

    if (!(template instanceof HTMLTemplateElement)) {
      return;
    }

    openModal(trigger, template.content.cloneNode(true));
  });
});

previewTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const source = trigger.getAttribute("data-preview-src");
    const type = trigger.getAttribute("data-preview-type");
    const title = trigger.getAttribute("data-preview-title") || "";
    const caption = trigger.getAttribute("data-preview-caption") || "";

    if (!source || !type) {
      return;
    }

    const article = document.createElement("article");
    article.className = "modal-article";

    const heading = document.createElement("h2");
    heading.textContent = title;
    article.append(heading);

    if (type === "pdf") {
      const frame = document.createElement("iframe");
      frame.className = "preview-frame";
      frame.src = source;
      frame.title = title;
      article.append(frame);
    } else {
      const figure = document.createElement("figure");
      figure.className = "modal-figure";

      const image = document.createElement("img");
      image.className = "preview-image";
      image.src = source;
      image.alt = title;
      figure.append(image);

      article.append(figure);
    }

    if (caption) {
      const note = document.createElement("p");
      note.className = "modal-caption";
      note.textContent = caption;
      article.append(note);
    }

    const actions = document.createElement("div");
    actions.className = "modal-actions";

    const openLink = document.createElement("a");
    openLink.className = "button primary";
    openLink.href = source;
    openLink.target = "_blank";
    openLink.rel = "noreferrer";
    openLink.textContent = type === "pdf" ? "在新窗口打开材料" : "查看原图";
    actions.append(openLink);

    article.append(actions);

    openModal(trigger, article);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalShell && !modalShell.hidden) {
    closeModal();
  }
});

const printTitle = "cv|范盛颉";
const originalTitle = document.title;

window.printCv = () => {
  document.title = printTitle;
  window.print();
};

window.addEventListener("beforeprint", () => {
  if (document.body.classList.contains("cv-page")) {
    document.title = printTitle;
  }
});

window.addEventListener("afterprint", () => {
  if (document.body.classList.contains("cv-page")) {
    document.title = originalTitle;
  }
});
