/* Sample wholesale catalog. Replace MRP and discount before going live.
   Wholesale price is calculated in script.js from MRP and discount. */
const CATEGORIES = [
  { id: "all", en: "All", hi: "सभी" },
  { id: "staples", en: "Staples", hi: "अनाज व दाल" },
  { id: "spices", en: "Spices", hi: "मसाले" },
  { id: "dryfruits", en: "Dry fruits", hi: "ड्राई फ्रूट्स" },
  { id: "snacks", en: "Snacks", hi: "नमकीन व बिस्कुट" },
  { id: "household", en: "Household & dairy", hi: "घरेलू व डेयरी" }
];

const PRODUCTS = [
  { id: "basmati", name: "Basmati Rice", nameHi: "बासमती चावल", category: "staples", pack: "25 kg", mrp: 3400, discount: 14 },
  { id: "sona", name: "Sona Masoori Rice", nameHi: "सोना मसूरी चावल", category: "staples", pack: "25 kg", mrp: 1850, discount: 11 },
  { id: "atta", name: "Wheat Flour", nameHi: "गेहूं का आटा", category: "staples", pack: "10 kg", mrp: 480, discount: 8 },
  { id: "toor", name: "Toor Dal", nameHi: "तूअर दाल", category: "staples", pack: "1 kg", mrp: 180, discount: 10 },
  { id: "moong", name: "Moong Dal", nameHi: "मूंग दाल", category: "staples", pack: "1 kg", mrp: 160, discount: 9 },
  { id: "chana", name: "Chana Dal", nameHi: "चना दाल", category: "staples", pack: "1 kg", mrp: 140, discount: 7 },
  { id: "mustard", name: "Mustard Oil", nameHi: "सरसों का तेल", category: "staples", pack: "5 L", mrp: 950, discount: 12 },
  { id: "sunflower", name: "Sunflower Oil", nameHi: "सूरजमुखी तेल", category: "staples", pack: "5 L", mrp: 820, discount: 15 },
  { id: "sugar", name: "Sugar", nameHi: "चीनी", category: "staples", pack: "5 kg", mrp: 240, discount: 5 },
  { id: "salt", name: "Iodised Salt", nameHi: "आयोडीन नमक", category: "staples", pack: "1 kg", mrp: 28, discount: 2 },

  { id: "haldi", name: "Turmeric Powder", nameHi: "हल्दी पाउडर", category: "spices", pack: "500 g", mrp: 160, discount: 18 },
  { id: "mirch", name: "Red Chilli Powder", nameHi: "लाल मिर्च पाउडर", category: "spices", pack: "500 g", mrp: 190, discount: 16 },
  { id: "dhania", name: "Coriander Powder", nameHi: "धनिया पाउडर", category: "spices", pack: "500 g", mrp: 120, discount: 12 },
  { id: "garam", name: "Garam Masala", nameHi: "गरम मसाला", category: "spices", pack: "200 g", mrp: 145, discount: 20 },
  { id: "jeera", name: "Cumin Seeds", nameHi: "जीरा", category: "spices", pack: "500 g", mrp: 280, discount: 15 },

  { id: "badam", name: "Almonds", nameHi: "बादाम", category: "dryfruits", pack: "1 kg", mrp: 980, discount: 22 },
  { id: "kaju", name: "Cashews", nameHi: "काजू", category: "dryfruits", pack: "1 kg", mrp: 1150, discount: 30 },
  { id: "kishmish", name: "Raisins", nameHi: "किशमिश", category: "dryfruits", pack: "500 g", mrp: 220, discount: 18 },
  { id: "akhrot", name: "Walnuts", nameHi: "अखरोट", category: "dryfruits", pack: "500 g", mrp: 650, discount: 20 },
  { id: "pista", name: "Pistachios", nameHi: "पिस्ता", category: "dryfruits", pack: "500 g", mrp: 760, discount: 28 },

  { id: "namkeen", name: "Classic Namkeen", nameHi: "क्लासिक नमकीन", category: "snacks", pack: "1 kg", mrp: 220, discount: 15 },
  { id: "mixture", name: "Bombay Mixture", nameHi: "बॉम्बे मिक्सचर", category: "snacks", pack: "500 g", mrp: 125, discount: 10 },
  { id: "glucose", name: "Glucose Biscuits", nameHi: "ग्लूकोज बिस्कुट", category: "snacks", pack: "1 kg", mrp: 140, discount: 8 },
  { id: "marie", name: "Marie Biscuits", nameHi: "मैरी बिस्कुट", category: "snacks", pack: "carton", mrp: 480, discount: 12 },

  { id: "tea", name: "Assam Tea", nameHi: "असम चाय", category: "household", pack: "1 kg", mrp: 420, discount: 18 },
  { id: "ghee", name: "Pure Ghee", nameHi: "शुद्ध घी", category: "household", pack: "1 L", mrp: 680, discount: 10 },
  { id: "milk", name: "Milk Powder", nameHi: "मिल्क पाउडर", category: "household", pack: "1 kg", mrp: 490, discount: 12 },
  { id: "detergent", name: "Detergent Powder", nameHi: "डिटर्जेंट पाउडर", category: "household", pack: "1 kg", mrp: 145, discount: 20 },
  { id: "soap", name: "Bathing Soap", nameHi: "नहाने का साबुन", category: "household", pack: "pack of 4", mrp: 160, discount: 15 },
  { id: "dishwash", name: "Dishwash Bar", nameHi: "डिशवॉश बार", category: "household", pack: "1 bar", mrp: 40, discount: 6 }
];
