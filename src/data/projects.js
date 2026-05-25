export const projects = [
  {
    id: "erp-saas",
    title: "Multi-Tenant SaaS ERP",
    type: "Professional",
    period: "Jan 2026 – Present",
    featured: true,
    description:
      "Architecting a production-grade multi-tenant SaaS ERP with domain-driven schema organization and row-level tenant isolation on a 400+ table MS SQL Server schema. Engineered with an orchestrator pattern (use-cases, steps, engines, pipelines) for modular, scalable business logic. Designed as a commercially distributable product with multi-tenancy and reseller support built into the core architecture.",
    highlights: [
      "400+ table MS SQL Server schema with row-level tenant isolation",
      "Orchestrator-driven Node.js backend: use-cases, steps, engines, pipelines",
      "Multi-tenancy and reseller support in core architecture",
    ],
    tech: ["Node.js", "Express.js", "Microsoft SQL Server", "Orchestrator Architecture"],
    // Commercial product — source is closed.
    private: true,
    links: {},
  },
  {
    id: "macromate",
    title: "MacroMate",
    type: "Capstone Project",
    period: "2025 – 2026",
    description:
      "AI-powered cross-platform mobile app for calorie, macronutrient, and workout tracking with personalized recommendations. Built REST APIs with FastAPI for authentication and data management. Integrated Gemini API for food image recognition and a pretrained model for meal plan generation. Designed end-to-end from mobile UI to backend, delivering a seamless experience across iOS and Android.",
    highlights: [
      "Gemini API integration for food image recognition",
      "Pretrained ML model for personalized meal plan generation",
      "Cross-platform Flutter app targeting iOS and Android",
    ],
    tech: ["Flutter", "FastAPI", "Python", "Gemini API", "REST API"],
    // TODO(owner): replace with the exact repo/demo URLs.
    links: { github: "https://github.com/zaier84/" },
  },
  {
    id: "ocr-scanner",
    title: "OCR Scanner with AI Summarization",
    type: "Project",
    period: "2025",
    description:
      "Python-based OCR pipeline achieving 95%+ text extraction accuracy on multi-page PDFs with sub-3-second processing time. Integrated an AI summarization model to generate document summaries 50% faster than manual reading.",
    highlights: [
      "95%+ text extraction accuracy on multi-page PDFs",
      "Sub-3-second processing time",
      "50% faster document summarization than manual reading",
    ],
    tech: ["Python", "OpenCV", "Gemini API"],
    // TODO(owner): replace with the exact repo URL.
    links: { github: "https://github.com/zaier84/" },
  },
  {
    id: "interpreter-go",
    title: "Interpreter in Go",
    type: "Project",
    period: "2026",
    description:
      "Complete interpreter for the Monkey language in Go, covering lexical analysis, parsing, AST construction, and tree-walking evaluation. Applied compiler design principles including Pratt parsing, scope handling, closures, and first-class functions. Maintained correctness throughout using test-driven development with Go's native testing framework.",
    highlights: [
      "Full pipeline: lexer → parser → AST → tree-walking evaluator",
      "Pratt parsing, closures, first-class functions",
      "Test-driven development with Go's native testing framework",
    ],
    tech: ["Go"],
    // TODO(owner): replace with the exact repo URL.
    links: { github: "https://github.com/zaier84/" },
  },
];
