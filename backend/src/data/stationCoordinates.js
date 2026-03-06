/**
 * Indian Railway Station Code → [latitude, longitude]
 * Coordinates are city-centre / station-level accurate.
 * Codes match the station codes used in EXP-TRAINS.json (the part after " - " in stationName).
 */
const stationCoordinates = {
  // ── Delhi / NCR ──────────────────────────────────────────────────────────
  NDLS:  [28.6419,  77.2192],  // New Delhi
  NZM:   [28.5770,  77.2524],  // Hazrat Nizamuddin
  DLI:   [28.6587,  77.2274],  // Delhi Junction
  DSA:   [28.6587,  77.2274],  // Delhi Sarai Rohilla
  GZB:   [28.6668,  77.4194],  // Ghaziabad
  TKJ:   [28.5127,  77.2745],  // Tughlakabad
  ANDI:  [28.6800,  77.3100],  // Anand Vihar
  SBB:   [28.6419,  77.2192],  // Shakur Basti (treat as Delhi)
  ANVT:  [28.6479,  77.3151],  // Anand Vihar Terminal

  // ── Uttar Pradesh ────────────────────────────────────────────────────────
  MTJ:   [27.4911,  77.6732],  // Mathura
  AGC:   [27.1558,  77.9834],  // Agra Cantt
  AF:    [27.1774,  78.0094],  // Agra Fort
  TDL:   [27.2100,  78.2300],  // Tundla
  ETW:   [26.8000,  79.0300],  // Etawah
  CNB:   [26.4599,  80.3449],  // Kanpur Central
  LKO:   [26.8390,  80.9128],  // Lucknow Charbagh
  LJN:   [26.8300,  80.9200],  // Lucknow Junction (NER)
  PRYJ:  [25.4599,  81.8521],  // Prayagraj Junction
  ALD:   [25.4599,  81.8521],  // Allahabad Junction
  ALN:   [25.4599,  81.8521],  // Allahabad (NER)
  BSB:   [25.3174,  82.9994],  // Varanasi Junction
  MFP:   [26.1208,  85.3906],  // Muzaffarpur
  GKP:   [26.7521,  83.3705],  // Gorakhpur
  BCY:   [28.3638,  79.4254],  // Bareilly
  MB:    [29.9718,  77.5468],  // Muzaffarnagar → approx Roorkee area
  SRE:   [29.9718,  77.5468],  // Saharanpur

  // ── Rajasthan ────────────────────────────────────────────────────────────
  JP:    [26.9193,  75.7886],  // Jaipur Junction
  JAIPUR:[26.9193,  75.7886],  // Jaipur (alt code)
  AII:   [26.4516,  74.6424],  // Ajmer Junction
  KOTA:  [25.1792,  75.8441],  // Kota Junction
  ABR:   [24.8934,  72.6392],  // Abu Road
  MTD:   [26.6900,  73.0100],  // Merta Road
  JU:    [26.2694,  73.0168],  // Jodhpur Junction
  JSM:   [26.9196,  70.9009],  // Jaisalmer
  BKN:   [28.0170,  73.3190],  // Bikaner Junction
  UDZ:   [24.5913,  73.7230],  // Udaipur City
  CHNR:  [24.8839,  74.6235],  // Chittorgarh
  RE:    [28.1973,  76.6205],  // Rewari
  BXN:   [25.3600,  75.3800],  // Bundi → approx

  // ── Madhya Pradesh ───────────────────────────────────────────────────────
  GWL:   [26.2160,  78.1767],  // Gwalior
  JHS:   [25.4477,  78.5692],  // Jhansi
  LAL:   [24.6865,  78.4145],  // Lalitpur
  BIK:   [24.1791,  78.1379],  // Bina
  SGO:   [23.8500,  78.7400],  // Saugor (Sagar)
  DWX:   [23.8339,  77.0520],  // Dewas
  MAX:   [24.0550,  77.0000],  // Maksi
  RTM:   [23.3277,  75.0419],  // Ratlam
  BPL:   [23.2704,  77.4207],  // Bhopal Junction
  HBJ:   [23.2327,  77.4416],  // Habibganj (Rani Kamlapati)
  ET:    [22.6139,  77.7616],  // Itarsi
  BTC:   [21.9163,  77.9027],  // Betul
  AMLA:  [22.1000,  78.1200],  // Amla Junction
  NGP:   [21.1477,  79.0873],  // Nagpur Junction
  SEG:   [20.7724,  78.6427],  // Sevagram
  WR:    [20.7571,  78.6019],  // Wardha
  KTE:   [23.8500,  80.3900],  // Katni
  JBP:   [23.1602,  79.9311],  // Jabalpur
  DMO:   [22.8340,  80.9730],  // Dhamtari → approx
  STA:   [23.1100,  76.5800],  // Shajapur → approx
  MURI:  [23.3600,  85.8600],  // Muri

  // ── Maharashtra ──────────────────────────────────────────────────────────
  BCT:   [18.9694,  72.8193],  // Mumbai Central
  CSTM:  [18.9400,  72.8355],  // Chhatrapati Shivaji Terminus
  LTT:   [19.0625,  72.9086],  // Lokmanya Tilak Terminus
  BDTS:  [19.0545,  72.8368],  // Bandra Terminus
  DR:    [19.0189,  72.8416],  // Dadar
  TNA:   [19.1889,  72.9710],  // Thane
  KYN:   [19.2450,  73.1350],  // Kalyan
  PVR:   [18.9949,  73.1126],  // Panvel
  KJT:   [18.9074,  73.3175],  // Karjat
  IGP:   [19.7012,  73.5590],  // Igatpuri
  IGTD:  [19.7012,  73.5590],  // Igatpuri (alt)
  NSK:   [19.9967,  73.8013],  // Nasik Road
  MMR:   [20.2517,  74.4408],  // Manmad
  AWB:   [19.8807,  75.3261],  // Aurangabad
  PUNE:  [18.5283,  73.8718],  // Pune Junction
  DD:    [18.4612,  74.5739],  // Daund
  SUR:   [17.6788,  75.9064],  // Solapur
  NED:   [19.1594,  77.3107],  // Nanded
  BSL:   [21.0429,  75.7783],  // Bhusawal
  JL:    [20.9100,  75.5600],  // Jalgaon
  ACC:   [20.7097,  77.0058],  // Akola
  MRJ:   [16.8264,  74.6503],  // Miraj
  KOP:   [16.7050,  74.2433],  // Kolhapur
  SNG:   [17.0100,  74.1100],  // Sangli
  PAN:   [16.8300,  74.1200],  // Pandharpur → approx

  // ── Gujarat ──────────────────────────────────────────────────────────────
  ADI:   [23.0258,  72.6041],  // Ahmedabad Junction
  BRC:   [22.3095,  73.1842],  // Vadodara Junction
  ST:    [21.1979,  72.8491],  // Surat
  BL:    [20.5976,  72.9327],  // Valsad
  UMD:   [20.1762,  72.7540],  // Umargam Road
  BLDA:  [20.4000,  72.8300],  // Billimora
  NVS:   [21.8400,  73.4900],  // Nandurbar → approx
  GDA:   [22.0400,  73.0100],  // Godhra
  ANND:  [22.5570,  72.9620],  // Anand
  NDL:   [22.0400,  73.0100],  // Nadiad → approx
  RJT:   [22.3019,  70.7921],  // Rajkot
  JND:   [22.0050,  70.0565],  // Junagadh
  PBR:   [21.6166,  69.6099],  // Porbandar
  OKHA:  [22.4774,  69.0696],  // Okha
  BDKT:  [24.3650,  72.4200],  // (near Palanpur)

  // ── Punjab / Haryana / Himachal ──────────────────────────────────────────
  ASR:   [31.6367,  74.8726],  // Amritsar
  LDH:   [30.9010,  75.8573],  // Ludhiana
  JUC:   [31.3252,  75.5762],  // Jalandhar City
  FZR:   [30.9098,  74.6184],  // Firozpur
  PTK:   [30.3456,  76.3870],  // Patiala → approx
  UMB:   [30.3790,  76.9270],  // Ambala Cantt
  CDG:   [30.6805,  76.7799],  // Chandigarh
  KLK:   [30.8478,  77.1320],  // Kalka
  SML:   [31.1048,  77.1734],  // Shimla
  KGM:   [29.9660,  77.5546],  // Roorkee → approx
  RE2:   [28.1973,  76.6205],  // Rewari (alt)
  KKDE:  [29.9728,  76.8436],  // Kurukshetra
  PNP:   [29.3878,  76.9864],  // Panipat
  SNP:   [29.3878,  76.9864],  // Sonipat → approx
  GGN:   [28.4595,  77.0266],  // Gurgaon

  // ── Jammu & Kashmir ──────────────────────────────────────────────────────
  JAT:   [32.7266,  74.8570],  // Jammu Tawi
  UHP:   [32.9778,  74.4972],  // Udhampur → approx
  SVK:   [34.0837,  74.7973],  // Srinagar (road) → using city centre

  // ── Bihar ────────────────────────────────────────────────────────────────
  PNBE:  [25.5941,  85.1376],  // Patna Junction
  GAYA:  [24.7869,  84.9930],  // Gaya Junction
  MFP2:  [26.1208,  85.3906],  // Muzaffarpur
  BJU:   [25.9400,  86.1300],  // Barauni Junction
  KIR:   [25.5446,  87.5644],  // Katihar
  RJPB:  [25.5941,  85.1376],  // Rajendra Pul → Patna area
  SPJ:   [25.9200,  86.4500],  // Samastipur
  PHD:   [26.6900,  85.1600],  // Sitamarhi → approx
  SPW:   [24.3700,  84.5200],  // Sasaram → approx

  // ── Jharkhand ────────────────────────────────────────────────────────────
  DHN:   [23.7997,  86.4534],  // Dhanbad
  RNC:   [23.3441,  85.3096],  // Ranchi
  JSME:  [23.7997,  86.4534],  // Jasidih → near Dhanbad area
  GMO:   [23.8700,  86.1500],  // Gomoh Junction
  HTE:   [23.3441,  85.3096],  // Hatia (Ranchi)

  // ── West Bengal ──────────────────────────────────────────────────────────
  HWH:   [22.5839,  88.3425],  // Howrah Junction
  KOAA:  [22.5641,  88.3703],  // Kolkata (Chitpur)
  SDAH:  [22.5699,  88.3697],  // Sealdah
  BWN:   [23.2324,  87.8614],  // Burdwan (Bardhaman)
  DGR:   [23.5503,  87.3296],  // Durgapur
  ASN:   [23.6835,  86.9666],  // Asansol
  PKR:   [24.3634,  86.2440],  // Pakur
  NFK:   [27.0360,  88.2627],  // NJP (New Jalpaiguri) → near Darjeeling
  NJP:   [26.7027,  88.3538],  // New Jalpaiguri
  MLT:   [25.5441,  88.0900],  // Malda Town
  KGP:   [22.3436,  87.3308],  // Kharagpur

  // ── Odisha ───────────────────────────────────────────────────────────────
  BBS:   [20.2647,  85.8353],  // Bhubaneswar
  CTC:   [20.4686,  85.8830],  // Cuttack
  PURI:  [19.8135,  85.8312],  // Puri
  BHC:   [19.8135,  85.8312],  // Brahmapur (Berhampur) → approx
  BAM:   [21.5000,  84.8300],  // Bamra → approx
  ROU:   [22.2510,  84.8828],  // Rourkela

  // ── Andhra Pradesh / Telangana ───────────────────────────────────────────
  SC:    [17.4341,  78.5003],  // Secunderabad
  HYB:   [17.3817,  78.4756],  // Hyderabad Deccan
  NZB:   [17.3937,  78.4740],  // Nampally
  KZJ:   [17.9802,  79.5014],  // Kazipet
  WL:    [18.0000,  79.5800],  // Warangal
  MTM:   [17.0100,  81.7800],  // Rajahmundry → approx
  RJY:   [17.0005,  81.7801],  // Rajahmundry
  EE:    [17.0005,  81.7801],  // Eluru → approx
  BZA:   [16.5228,  80.6208],  // Vijayawada
  GNT:   [16.3035,  80.4469],  // Guntur
  OGL:   [15.5057,  80.0505],  // Ongole
  NLR:   [14.4426,  79.9865],  // Nellore
  GDR:   [14.1494,  79.8504],  // Gudur
  RU:    [13.6344,  79.5114],  // Renigunta
  VSKP:  [17.7237,  83.3018],  // Visakhapatnam
  VZM:   [18.1066,  83.3956],  // Vizianagaram
  WADI:  [16.9726,  76.9717],  // Wadi
  GBD:   [18.3236,  79.1451],  // Nalgonda → approx
  SNF:   [18.4800,  78.2100],  // Nizamabad → approx
  KCG:   [17.3800,  78.4600],  // Kacheguda
  KZJR:  [17.9802,  79.5014],  // Kazipet Road
  MQU:   [16.7000,  77.7200],  // Mahbubnagar → approx
  PAK:   [17.5400,  78.3200],  // Pattancheru → approx
  MTM2:  [14.1700,  78.2200],  // Tirupati → approx (use TPT below)
  TPT:   [13.6288,  79.4192],  // Tirupati
  MTP:   [12.9254,  79.1323],  // Katpadi
  KPD:   [12.9254,  79.1323],  // Katpadi (alt code)

  // ── Karnataka ────────────────────────────────────────────────────────────
  SBC:   [12.9770,  77.5726],  // Bengaluru City Junction
  YPR:   [13.0175,  77.5389],  // Yeshwantpur
  BNCE:  [12.9994,  77.5990],  // Bangalore Cantt
  KJM:   [13.0070,  77.6963],  // Krishnarajapuram
  BNC:   [12.9910,  77.5918],  // Bangalore East (alt)
  TK:    [13.3407,  77.0994],  // Tumkur
  ASK:   [13.3140,  76.2603],  // Arsikere
  HAS:   [13.0068,  76.1016],  // Hassan → approx
  MYS:   [12.2958,  76.6394],  // Mysore
  BAND:  [15.1467,  76.9305],  // Ballari (Bellary)
  UBL:   [15.3647,  75.1240],  // Hubli
  DHW:   [14.4663,  75.9295],  // Davangere
  DVG:   [14.4663,  75.9295],  // Davangere (alt)
  GR:    [17.3300,  76.8247],  // Gulbarga (Kalaburagi)
  SUR2:  [17.6788,  75.9064],  // Solapur (appears in both AP and MH)
  GDG:   [15.4193,  75.0253],  // Gadag
  MAO:   [15.3596,  73.9381],  // Madgaon (Goa)
  THVM:  [15.5965,  73.9589],  // Thivim (Goa)
  VASCO: [15.3990,  73.8136],  // Vasco da Gama
  LD:    [15.3596,  73.9381],  // (alt Goa)
  MNT:   [13.8700,  75.5100],  // Mangalore Town → approx
  MAQ:   [12.8698,  74.8426],  // Mangaluru Central
  MAJN:  [12.8590,  74.8416],  // Mangaluru Junction

  // ── Tamil Nadu ───────────────────────────────────────────────────────────
  MAS:   [13.0827,  80.2753],  // Chennai Central
  MS:    [13.0801,  80.2619],  // Chennai Egmore
  TBM:   [12.9233,  80.1170],  // Tambaram
  CGL:   [12.6843,  79.9842],  // Chengalpattu
  AJJ:   [13.0816,  79.6714],  // Arakkonam
  JTJ:   [12.5600,  78.5800],  // Jolarpettai
  SA:    [11.6527,  78.1560],  // Salem
  ED:    [11.3405,  77.7202],  // Erode
  CBE:   [10.9990,  77.0101],  // Coimbatore
  TUP:   [10.9068,  76.9532],  // Tiruppur
  PGT:   [10.7739,  76.6516],  // Palakkad
  SRR:   [10.8505,  76.5224],  // Shoranur
  TCR:   [10.5276,  76.2144],  // Thrissur
  MDU:   [ 9.9192,  78.1201],  // Madurai
  TPJ:   [10.8128,  78.6873],  // Tiruchirappalli
  TJ:    [10.7870,  79.1378],  // Thanjavur
  NCJ:   [ 8.1698,  77.4197],  // Nagercoil
  TEN:   [ 8.7600,  77.6900],  // Tirunelveli
  NME:   [11.1100,  78.1700],  // Namakkal → approx
  VM:    [11.5400,  79.4986],  // Villupuram
  TLOT:  [11.3500,  77.9800],  // Tiruchirapalli outer → approx
  KCVL:  [ 8.4887,  76.9596],  // Kochuveli (Thiruvananthapuram)

  // ── Kerala ───────────────────────────────────────────────────────────────
  TVC:   [ 8.4887,  76.9596],  // Thiruvananthapuram Central
  QLN:   [ 8.8932,  76.6141],  // Kollam
  ERS:   [ 9.9862,  76.2982],  // Ernakulam Junction (Kochi)
  AWY:   [ 9.9816,  76.2941],  // Ernakulam Town
  KNY:   [ 9.6510,  76.3750],  // Kottayam
  ALLP:  [ 9.4981,  76.3388],  // Alappuzha (Alleppey)
  CLT:   [11.2588,  75.7804],  // Kozhikode (Calicut)
  CAN:   [12.8698,  74.8426],  // Kannur
  SRR2:  [10.8505,  76.5224],  // Shoranur (alt)
  POY:   [10.7700,  76.6700],  // Palakkad Town → approx

  // ── Assam / North East ───────────────────────────────────────────────────
  GHY:   [26.1816,  91.7340],  // Guwahati
  DBRG:  [27.4728,  94.9010],  // Dibrugarh
  TSK:   [26.6338,  93.6300],  // Tinsukia → approx
  NTSK:  [27.4728,  95.3400],  // New Tinsukia → approx
  RNY:   [26.1600,  91.7700],  // Rangiya
  AGT:   [26.2800,  91.6100],  // Agthori → approx
  LMG:   [26.2040,  92.7352],  // Lumding
  RMMU:  [23.7300,  92.7200],  // Aizawl area → approx

  // ── Himachal / Uttarakhand ───────────────────────────────────────────────
  DDN:   [30.3165,  78.0322],  // Dehradun
  HW:    [29.9457,  78.1642],  // Haridwar
  RKSH:  [30.0869,  78.2676],  // Rishikesh → approx
  RK:    [30.0869,  78.2676],  // Rishikesh (alt)

  // ── Chhattisgarh ────────────────────────────────────────────────────────
  R:     [21.2514,  81.6296],  // Raipur
  RJNR:  [21.8800,  83.0200],  // Rajnandgaon → approx
  BPH:   [22.2010,  82.0160],  // Bilaspur
  BSP:   [22.2010,  82.0160],  // Bilaspur (alt)

  // ── Madhya Pradesh (more) ────────────────────────────────────────────────
  INDB:  [22.7196,  75.8577],  // Indore
  MHW:   [22.6500,  75.9600],  // Dewas → approx (second entry)
  UJN:   [23.1793,  75.7849],  // Ujjain
  NMJ:   [22.5961,  77.3298],  // Narsimhapur → approx
  SGU:   [23.8339,  78.7100],  // Saugor (Sagar) alt

  // ── Misc / multistate ───────────────────────────────────────────────────
  VGLB:  [15.3990,  73.8136],  // Vasco-da-Gama (Goa)
  KCVL2: [ 8.4887,  76.9596],  // Kochuveli (alt)
};

/**
 * Lookup coordinates for a station code (case-insensitive).
 * Returns [lat, lng] or null if not found.
 */
function getStationCoords(code) {
  if (!code) return null;
  return stationCoordinates[code.trim().toUpperCase()] ?? null;
}

module.exports = { stationCoordinates, getStationCoords };
