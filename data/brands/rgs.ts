import { Product } from "../products";

export const rgsProducts: Product[] = [
  {
    id: "rgs-av916c",
    brand: "RGS (Italy)",
    category: "週邊設備",
    series: "AV916C Series",
    name: "AV916C 真空抽粉機",
    name_zh: "真空抽粉機 / Pneumatic Conveyor",
    image: "/images/products/rgs-av916c.jpg",
    description: "AV916C 是義大利 RGS 公司生產作為粉體原料輸送的機種。200 kg/Hr 的輸送能力，適合製藥廠及食品業使用。利用真空幫浦抽真空吸取的原理，不會破壞粉體原料混合結構。",
    features: [
      "輸送能力 200 kg/Hr",
      "利用真空原理吸取，不破壞粉體混合結構",
      "機器小巧、重量輕 (22 kg)，移動與安裝方便",
      "容易拆卸清洗，值得信賴",
      "適用於打錠機、膠囊充填機及攪拌機等供料"
    ],
    // 補上 missing 的 tags 欄位
    tags: ["真空輸送", "自動補料", "藥粉輸送", "低噪音"], 
    specs: {
      capacity: "200 kg/Hr",
      power: "0.55 KW",
      voltage: "220V / 60 Hz / 3 phase",
      vacuum: "16 m³/Hr (流量)",
      weight: "22 kg",
      dimensions: "400L x 650W x 1000H mm"
    },
    application: ["打錠機供料", "膠囊充填機", "粉末充填", "攪拌機輸送"],
    models: [
      {
        name: "AV916C",
        power: "0.55 KW",
        capacity: "200 kg/Hr",
        gas_vol: "16 m³/Hr",
        weight: "22 kg",
        dimensions: "400x650x1000H"
      }
    ],
    note: "AV916C 適合直接接在打錠機 Hopper 上方進行自動補料。元堉技術團隊提供連通配件與電眼感應安裝建議。"
  },
  {
    id: "rgs-a-series",
    brand: "RGS (Italy)",
    category: "週邊設備",
    series: "A Series Industrial",
    name: "A236 / A347 / A757 系列",
    name_zh: "大流量工業真空輸送系統",
    image: "/images/products/rgs-a-series.jpg",
    description: "義大利 R.G.S. 生產的真空抽粉機，可做為粉體原料的輸送動力。具備超大過濾面積，有利於大流量粉體輸送，且桶槽裝卸容易。",
    features: [
      "體積小，不佔面積",
      "回收用桶槽裝卸容易",
      "過濾袋面積超大，有利於大流量輸送",
      "低噪音運轉",
      "可與混合機以管路連接，供做輸送動力"
    ],
    // 補上 missing 的 tags 欄位
    tags: ["大流量", "長距離輸送", "混合機對接", "工業級"],
    specs: {
      vacuum: "200 mbar (Max)",
      range: "長距離、大流量粉體輸送",
      material: "工業級不鏽鋼配置"
    },
    application: ["混合機原料輸送", "大流量產線", "工業級粉體處理"],
    models: [
      {
        name: "A236X2",
        power: "2 HP",
        vacuum: "200 mbar",
        capacity: "210 M3/min",
        weight: "90 Kg",
        dimensions: "40x70x126H cm"
      },
      {
        name: "A347/60X2",
        power: "3 HP",
        vacuum: "200 mbar",
        capacity: "310 M3/min",
        weight: "120 Kg",
        dimensions: "50x80x154H cm"
      },
      {
        name: "A757KX2",
        power: "5.5 HP",
        vacuum: "200 mbar",
        capacity: "520 M3/min",
        weight: "200 Kg",
        dimensions: "64x110x150H cm"
      }
    ]
  }
];