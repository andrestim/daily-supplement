import type {
  MenuSlot,
  SpecialSituation,
  ClinicPriority,
  NamedNote,
  SearchEntry,
  Category,
} from '../types'

// =============================================================
// 一、每日固定菜單
// =============================================================
export const dailyMenu: MenuSlot[] = [
  {
    time: '早餐',
    emoji: '🥣',
    items: [
      { id: 'oatmeal', name: '桂格大燕麥片', dose: '30–40g' },
      {
        id: 'breakfast-protein',
        name: '搭配蛋白質（擇一）',
        note: '蛋、無糖豆漿、牛奶、乳清、希臘優格擇一',
      },
    ],
  },
  {
    time: '週一 / 三 / 五 10:30',
    emoji: '🌾',
    items: [
      {
        id: 'psyllium',
        name: 'NOW 洋車前子殼粉',
        dose: '1/2 茶匙',
        note: '搭配 300–500ml 水，攪拌後馬上喝完。與藥物、過敏藥、保健品錯開至少 2 小時。',
        mwfOnly: true,
      },
    ],
  },
  {
    time: '午餐後',
    emoji: '🍽️',
    items: [
      { id: 'lutein', name: '三倍堅金盞花葉黃素', dose: '1 顆' },
      {
        id: 'zinc',
        name: 'Thorne 甘氨酸鋅 15mg',
        dose: '1 顆',
        note: '僅週一 / 三 / 五',
        mwfOnly: true,
      },
    ],
  },
  {
    time: '下午 / 運動後',
    emoji: '💪',
    items: [
      {
        id: 'creatine',
        name: '一水肌酸',
        dose: '3g',
        note: '可配水、無糖豆漿、牛奶或乳清，不建議配果汁。沒運動日也照吃。',
      },
    ],
  },
  {
    time: '晚餐後',
    emoji: '🌙',
    items: [
      { id: 'fishoil', name: 'Blackmores 三倍濃縮魚油', dose: '1 顆' },
      {
        id: 'dhc-uric',
        name: 'DHC 高尿酸值對策',
        dose: '通常每日 2 顆',
        note: '依包裝指示',
      },
    ],
  },
  {
    time: '睡前 / 空腹',
    emoji: '🛌',
    items: [{ id: 'probiotic', name: '台灣 01 益生菌', dose: '1 份' }],
  },
]

// 週一 / 三 / 五 額外固定項目（摘要用）
export const mwfHighlights: { time: string; text: string }[] = [
  { time: '10:30', text: 'NOW 洋車前子殼粉 1/2 茶匙 + 300–500ml 水' },
  { time: '午餐後', text: 'Thorne 甘氨酸鋅 15mg 1 顆' },
]

// =============================================================
// 二、洋車前子升級規則
// =============================================================
export const psylliumRules: { phase: string; condition: string; action: string }[] =
  [
    {
      phase: '第 1–2 週',
      condition: '起步階段',
      action: '週一 / 三 / 五 10:30，每次 1/2 茶匙',
    },
    {
      phase: '第 3–4 週',
      condition: '若沒有脹氣、打嗝、胃悶、腹瀉或便秘變嚴重',
      action: '可改每天 1/2 茶匙',
    },
    {
      phase: '第 5 週後',
      condition: '若完全適應',
      action: '才考慮每天 1 茶匙',
    },
    {
      phase: '若脹氣明顯',
      condition: '出現明顯脹氣',
      action: '洋車前子暫停、鋅暫停，可用 Bloat Relief 飯後依標示使用',
    },
  ]

// =============================================================
// 三、特殊狀況
// =============================================================
export const specialSituations: SpecialSituation[] = [
  {
    id: 'bloat',
    emoji: '🫧',
    title: '脹氣 / 打嗝 / 吃太飽',
    lines: [
      'Life Extension Bloat Relief 飯後依標示使用',
      '當天不要疊洋車前子、Onaka、夜酵素、XYLO、Foodology、船井 burner',
      '若魚油回嗝嚴重，魚油可暫停一天',
    ],
  },
  {
    id: 'eatout',
    emoji: '🍱',
    title: '外食 / 高油高澱粉餐',
    lines: [
      '賢者之食桌可作外食備用，1 包隨餐',
      '初期不要和洋車前子同天硬疊',
      '脹氣日不用',
    ],
  },
  {
    id: 'purine',
    emoji: '🍻',
    title: '高普林大餐 / 應酬日',
    lines: [
      '平常吃 DHC 高尿酸值對策',
      '火鍋、燒肉、海鮮、啤酒日，可改赤晶對策 EX',
      'DHC 和赤晶對策 EX 二選一，不要同天疊',
      '尿酸偏高期間避免雞精、蜆精與啤酒',
    ],
  },
  {
    id: 'allergy',
    emoji: '🤧',
    title: '過敏發作（三款選一，不要同天疊）',
    lines: [
      '皮膚癢 / 蕁麻疹：敏的',
      '鼻水 / 打噴嚏：コルゲンコーワ鼻炎フィルムα',
      '鼻塞嚴重：パブロン鼻炎カプセルSα（短期用）',
      '過敏藥當天：不喝酒、不用 Steel-Libido Red',
      'パブロン當天不要大量咖啡',
      '洋車前子和過敏藥錯開至少 2 小時',
    ],
  },
  {
    id: 'fatigue',
    emoji: '🔋',
    title: '疲勞 / 腰背酸 / 肩頸痠',
    lines: [
      '一般疲勞、熬夜：DHC B 群，早餐後 1 顆，偶爾用',
      '腰背酸、肩頸痠、眼睛疲勞：合利他命，飯後 1–2 錠，短期 3–7 天',
      'DHC B 群和合利他命不要同天吃',
    ],
  },
]

// =============================================================
// 四、目前暫停不用（不進主菜單）
// =============================================================
export const pausedItems: string[] = [
  'Prelox',
  'Steel-Libido Red',
  'DHC Maca',
  '戰神黑瑪卡',
  '藥師健生活三十而力',
  '皇弟萬睡 3.0',
  'PillBox Onaka',
  '船井 burner',
  'Foodology 小藍瓶',
  'Simply Super 夜酵素 DX',
  '好立善綜合維他命發泡錠',
  'ORIN 紅石榴汁（作為日常保健飲）',
  '雞精 / 蜆精（日常飲用）',
]

// =============================================================
// 五、建議丟掉 / 淘汰
// =============================================================
export const discardItems: string[] = [
  '無標示膠囊',
  '過期 PhytoMulti',
  '好立善鐵+C+B 發泡錠',
  '船井 burner',
  'Foodology 小藍瓶',
  'Simply Super 夜酵素 DX',
  '保存不確定或開封太久的 ORIN 石榴汁',
]

// =============================================================
// 六、備用區（可留，但不要日常吃）
// =============================================================
export const backupItems: NamedNote[] = [
  { name: 'Dr.Brian Mini rTG Omega-3', note: 'Blackmores 魚油吃完後接' },
  { name: 'BioGaia Gastrus', note: '台灣 01 益生菌無感後再測' },
  { name: '妍美会葉黃素', note: '三倍堅吃完後接' },
  { name: 'Bloat Relief', note: '脹氣、打嗝、吃太飽時用' },
  { name: '赤晶對策 EX', note: '高普林大餐 / 應酬日備用' },
  { name: '賢者之食桌', note: '外食 / 高油高澱粉餐備用' },
  { name: 'DHC B 群', note: '熬夜疲勞日偶爾用' },
  { name: '合利他命', note: '腰背酸、肩頸痠、眼睛疲勞時短期用' },
  { name: '小林製藥 メンタフ', note: '神經緊張 / 不眠 / 眼精疲勞備用' },
  { name: 'NOW 鈣鎂 D3 鋅', note: '可留但不進主菜單' },
  {
    name: 'Steel-Libido Red',
    note: '未來若要測，需確認無 Yohimbe，且不可和 Prelox 同期',
  },
]

// =============================================================
// 七、目前不建議新增購買
// =============================================================
export const doNotBuyNow: string[] = [
  '紅麴',
  '護肝複方',
  '燃脂類',
  '男性功能複方',
  '高劑量魚油',
  '含鐵綜合維他命',
  '高劑量維生素 C',
  '高劑量維生素 E',
]

export const futureMaybe: NamedNote[] = [
  { name: '維生素 D', note: '先驗 25-OH Vitamin D，低再補' },
  { name: '鎂甘胺酸', note: '睡眠、壓力、肌肉緊繃明顯時再考慮' },
  { name: '植物固醇', note: '可和醫師討論是否作 LDL 輔助' },
]

// =============================================================
// 八、看診優先順序
// =============================================================
export const clinicPriorities: ClinicPriority[] = [
  {
    rank: 1,
    dept: '內分泌暨新陳代謝科 / 心臟內科',
    reason: '處理 LDL 223、ApoB 157、高膽固醇風險',
  },
  {
    rank: 2,
    dept: '胃腸肝膽科',
    reason: '處理脂肪肝、ALT/GGT、Ferritin 507',
  },
  {
    rank: 3,
    dept: '風濕過敏免疫科',
    reason: '處理尿酸 9.5',
  },
]

// =============================================================
// 九、目前核心主線
// =============================================================
export const coreLine = {
  menu: '燕麥 + 洋車前子 + 葉黃素 + 肌酸 + 魚油 1 顆 + DHC 高尿酸值對策 + 益生菌 + 週一三五鋅。',
  notes: [
    '南瓜籽油吃完後先停，不續買。',
    'Prelox、Steel-Libido、馬卡、燃脂、護肝複方全部暫停。',
    '接下來真正優先是看診處理 LDL/ApoB、肝指數、Ferritin 與尿酸。',
  ],
}

// =============================================================
// 搜尋索引：把所有品項攤平，方便輸入名稱快速查目前分類
// =============================================================
function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []
  const push = (name: string, category: Category, location: string) =>
    entries.push({ name, category, location })

  // 日常 / 條件式（每日菜單）
  dailyMenu.forEach((slot) => {
    slot.items.forEach((item) => {
      const category: Category = item.mwfOnly ? 'conditional' : 'daily'
      push(item.name, category, `每日菜單・${slot.time}`)
    })
  })

  // 條件式（特殊狀況裡常被點名的品項）
  const conditionalNames = [
    'Life Extension Bloat Relief',
    '賢者之食桌',
    '赤晶對策 EX',
    '敏的',
    'コルゲンコーワ鼻炎フィルムα',
    'パブロン鼻炎カプセルSα',
    'DHC B 群',
    '合利他命',
  ]
  conditionalNames.forEach((n) => push(n, 'conditional', '特殊狀況'))

  pausedItems.forEach((n) => push(n, 'paused', '暫停不用'))
  discardItems.forEach((n) => push(n, 'discard', '建議丟掉'))
  backupItems.forEach((b) => push(b.name, 'backup', '備用區'))

  return entries
}

export const searchIndex: SearchEntry[] = buildSearchIndex()
