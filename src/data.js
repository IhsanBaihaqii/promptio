// Curated premium AI prompting database for Promptio

export const CATEGORIES = [
  { id: "all", name: "All Prompts" },
  { id: "cinematic", name: "Cinematic" },
  { id: "cyberpunk", name: "Cyberpunk" },
  { id: "portrait", name: "Portrait" },
  { id: "fashion", name: "Fashion" },
  { id: "automotive", name: "Automotive" },
  { id: "anime", name: "Anime" },
  { id: "landscape", name: "Landscape" },
  { id: "product", name: "Product" }
];

export const INITIAL_PROMPTS = [
  {
    id: "p1",
    title: "Rainy Street Neo-Tokyo",
    category: "cyberpunk",
    prompt: "A futuristic rainy cyberpunk street in Neo-Tokyo, towering skyscrapers with holographic billboard advertisements, neon lighting in purple and magenta, damp asphalt with high reflections, hyper-realistic, 8k, cinematic lighting, shot on 35mm lens --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "1.4k",
    likes: 312,
    upload: "2026-05-28"
  },
  {
    id: "p2",
    title: "Golden Hour Cinematic Portrait",
    category: "portrait",
    prompt: "Cinematic close-up portrait of a woman, dramatic sunset backlighting, golden hour glow, detailed facial features, realistic skin texture, stray hairs, shot on Sony A7R V with 85mm f/1.4 lens, cinematic color grading, photorealistic, 8k --ar 3:4",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
    isPro: false,
    views: "931",
    likes: 184,
    upload: "2026-05-30"
  },
  {
    id: "p3",
    title: "Electric Hypercar Mountain Pass",
    category: "automotive",
    prompt: "A sleek matte-black futuristic electric hypercar speeding through a winding coastal road at twilight, headlights slicing the mist, long exposure light trails, motion blur, photo taken on Hasselblad, hyper-detailed, 8k resolution --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "2.1k",
    likes: 489,
    upload: "2026-05-22"
  },
  {
    id: "p4",
    title: "Brutalist Pavilion Haute Couture",
    category: "fashion",
    prompt: "High-fashion editorial model wearing avant-garde structured metallic silver gown in a minimalist white marble brutalist pavilion, dramatic shadows, architectural symmetry, Vogue style, high-contrast, professional studio lighting --ar 4:5",
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
    isPro: false,
    views: "720",
    likes: 95,
    upload: "2026-05-25"
  },
  {
    id: "p5",
    title: "Dreamy Cosmic Anime Girl",
    category: "anime",
    prompt: "An elegant anime illustration of a girl looking at a glowing nebula in deep space, cosmic stardust flowing around, dreamy neon color scheme, beautiful detailed eyes, artwork by Shinkai Makoto style, digital painting, 4k resolution --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "3.5k",
    likes: 824,
    upload: "2026-05-18"
  },
  {
    id: "p6",
    title: "Glass Architectural Cabin",
    category: "landscape",
    prompt: "A minimalist glass architectural cabin floating on a tranquil mirror-like lake, dense pine forest covered in mist in the background, towering snow-capped mountains, golden morning sun breaking through, atmospheric fog, photorealistic, cinematic composition --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
    isPro: false,
    views: "1.1k",
    likes: 247,
    upload: "2026-05-15"
  },
  {
    id: "p7",
    title: "Luxury Perfume Basalt Rocks",
    category: "product",
    prompt: "Premium perfume glass bottle resting on dark wet volcanic basalt rocks, dynamic splashing water ripples, sharp focus, dramatic ray tracing reflections, neutral luxury tones, minimalist studio photography, cinematic lighting --ar 1:1",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "898",
    likes: 121,
    upload: "2026-05-12"
  },
  {
    id: "p8",
    title: "Astronaut Over Bioluminescent Ocean",
    category: "cinematic",
    prompt: "An astronaut in a highly-detailed spacesuit standing on the structural ruins of a massive ancient metallic ring, looking down at a bioluminescent glowing alien ocean below, epic scale, cosmic fog, cyberpunk color palette --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "4.2k",
    likes: 955,
    upload: "2026-05-09"
  },
  {
    id: "p9",
    title: "Neon Cyberpunk Alleyway Cyber-biker",
    category: "cyberpunk",
    prompt: "A cool cyber-biker with high-tech glowing helmet standing next to a futuristic custom motorcycle in a dark neon-drenched alley, misty air, glowing cables, industrial pipelines, Unreal Engine 5 render, cinematic lighting --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
    isPro: false,
    views: "1.9k",
    likes: 310,
    upload: "2026-05-05"
  },
  {
    id: "p10",
    title: "Cyberpunk Hacker terminal Workstation",
    category: "cyberpunk",
    prompt: "Close up shot of a high tech computer terminal showing glowing green lines of cyber security code, futuristic console, reflections on screen glass, warm keyboard lights, cozy dark room in cyberpunk megastructure, photorealistic --ar 16:9",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "2.5k",
    likes: 541,
    upload: "2026-04-29"
  },
  {
    id: "p11",
    title: "Studio Fashion Contrast Editorial",
    category: "fashion",
    prompt: "Chic studio fashion photography, model with sharp neon yellow designer coat, dark high-contrast backdrop, moody direct flash shadows, ultra modern aesthetic, high key illumination, fine grain film noise --ar 4:5",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
    isPro: true,
    views: "1.3k",
    likes: 290,
    upload: "2026-04-20"
  },
  {
    id: "p12",
    title: "Emerald Forest Waterfall Drone Shot",
    category: "landscape",
    prompt: "Birds-eye view aerial drone photo of a dramatic waterfall plunging into a deep emerald crystal lagoon surrounded by lush prehistoric tropical rainforest, morning sun mist, National Geographic style --ar 3:4",
    imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
    isPro: false,
    views: "3.0k",
    likes: 673,
    upload: "2026-04-18"
  }
];

export const TEAM_MEMBERS = [
  { name: "Prompter", role: "AI Prompt Architect" },
  { name: "Curator", role: "Elite Visionary Director" }
];
