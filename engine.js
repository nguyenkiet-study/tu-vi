/* Tử Vi engine: đổi lịch, lập lá số theo quy tắc an sao của sách "Tử Vi Chính Biện".
   Chi: 0=Tý 1=Sửu 2=Dần 3=Mão 4=Thìn 5=Tỵ 6=Ngọ 7=Mùi 8=Thân 9=Dậu 10=Tuất 11=Hợi
   Can: 0=Giáp 1=Ất 2=Bính 3=Đinh 4=Mậu 5=Kỷ 6=Canh 7=Tân 8=Nhâm 9=Quý */
(function (root) {
  'use strict';
  var CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  var CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  var CUNG_NAMES = ['Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
    'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'];
  var HANH_CUNG = ['Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa', 'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'];

  function mod(n, m) { return ((n % m) + m) % m; }
  var floor = Math.floor, PI = Math.PI;

  /* ---------- Đổi dương lịch sang âm lịch (thuật toán Hồ Ngọc Đức, múi giờ +7) ---------- */
  function jdFromDate(dd, mm, yy) {
    var a = floor((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    var jd = dd + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - floor(y / 100) + floor(y / 400) - 32045;
    if (jd < 2299161) jd = dd + floor((153 * m + 2) / 5) + 365 * y + floor(y / 4) - 32083;
    return jd;
  }
  function newMoonDay(k, tz) {
    var T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    var M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    var Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    var F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    var C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    var dT = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
    return floor(Jd1 + C1 - dT + 0.5 + tz / 24);
  }
  function sunLongitude(jdn, tz) {
    var T = (jdn - 0.5 - tz / 24 - 2451545.0) / 36525, T2 = T * T, dr = PI / 180;
    var M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    var L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    var DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    var L = (L0 + DL) * dr;
    L -= PI * 2 * floor(L / (PI * 2));
    return floor(L / PI * 6);
  }
  function lunarMonth11(yy, tz) {
    var off = jdFromDate(31, 12, yy) - 2415021;
    var k = floor(off / 29.530588853);
    var nm = newMoonDay(k, tz);
    if (sunLongitude(nm, tz) >= 9) nm = newMoonDay(k - 1, tz);
    return nm;
  }
  function leapMonthOffset(a11, tz) {
    var k = floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    var last, i = 1, arc = sunLongitude(newMoonDay(k + i, tz), tz);
    do { last = arc; i++; arc = sunLongitude(newMoonDay(k + i, tz), tz); } while (arc !== last && i < 14);
    return i - 1;
  }
  function solarToLunar(dd, mm, yy, tz) {
    tz = tz === undefined ? 7 : tz;
    var dayNumber = jdFromDate(dd, mm, yy);
    var k = floor((dayNumber - 2415021.076998695) / 29.530588853);
    var monthStart = newMoonDay(k + 1, tz);
    if (monthStart > dayNumber) monthStart = newMoonDay(k, tz);
    var a11 = lunarMonth11(yy, tz), b11 = a11, lunarYear;
    if (a11 >= monthStart) { lunarYear = yy; a11 = lunarMonth11(yy - 1, tz); }
    else { lunarYear = yy + 1; b11 = lunarMonth11(yy + 1, tz); }
    var lunarDay = dayNumber - monthStart + 1;
    var diff = floor((monthStart - a11) / 29), lunarLeap = 0, lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      var lm = leapMonthOffset(a11, tz);
      if (diff >= lm) { lunarMonth = diff + 10; if (diff === lm) lunarLeap = 1; }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap === 1 };
  }

  /* ---------- Bảng tra ---------- */
  // 30 nạp âm theo thứ tự Giáp Tý, Bính Dần, Mậu Thìn... (mỗi nạp âm 2 năm)
  var NAP_AM = ['Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim', 'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy',
    'Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim', 'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy'];
  var NAP_AM_TEN = ['Hải Trung Kim', 'Lư Trung Hỏa', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim', 'Sơn Đầu Hỏa',
    'Giản Hạ Thủy', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc', 'Tuyền Trung Thủy', 'Ốc Thượng Thổ',
    'Tích Lịch Hỏa', 'Tùng Bách Mộc', 'Trường Lưu Thủy', 'Sa Trung Kim', 'Sơn Hạ Hỏa', 'Bình Địa Mộc',
    'Bích Thượng Thổ', 'Kim Bạc Kim', 'Phú Đăng Hỏa', 'Thiên Hà Thủy', 'Đại Trạch Thổ', 'Thoa Xuyến Kim',
    'Tang Đố Mộc', 'Đại Khê Thủy', 'Sa Trung Thổ', 'Thiên Thượng Hỏa', 'Thạch Lựu Mộc', 'Đại Hải Thủy'];
  var CUC_SO = { 'Thủy': 2, 'Mộc': 3, 'Kim': 4, 'Thổ': 5, 'Hỏa': 6 };
  var CUC_TEN = { 2: 'Thủy Nhị Cục', 3: 'Mộc Tam Cục', 4: 'Kim Tứ Cục', 5: 'Thổ Ngũ Cục', 6: 'Hỏa Lục Cục' };

  function napAmIndex(can, chi) {
    for (var n = 0; n < 60; n++) if (n % 10 === can && n % 12 === chi) return floor(n / 2);
    return 0;
  }

  // Khôi - Việt theo Can năm (sách trang 12)
  var KHOI_VIET = [[1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [6, 2], [3, 5], [3, 5]];
  KHOI_VIET[2] = [11, 9]; KHOI_VIET[3] = [11, 9]; // Bính Đinh: Hợi, Dậu
  KHOI_VIET[6] = [6, 2]; KHOI_VIET[7] = [6, 2];   // Canh Tân: Ngọ, Dần
  KHOI_VIET[8] = [3, 5]; KHOI_VIET[9] = [3, 5];   // Nhâm Quý: Mão, Tỵ
  // Triệt (Giáp Kỷ: Thân Dậu ...)
  var TRIET = [[8, 9], [6, 7], [4, 5], [2, 3], [0, 1]];
  var LOC_TON = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  var THIEN_MA = { 2: 8, 6: 8, 10: 8, 8: 2, 0: 2, 4: 2, 5: 11, 9: 11, 1: 11, 11: 5, 3: 5, 7: 5 };
  var TU_HOA = [ // Lộc, Quyền, Khoa, Kỵ theo Can năm (sách trang 14)
    ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương'],
    ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm'],
    ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh'],
    ['Thái Âm', 'Thiên Đồng', 'Thiên Cơ', 'Cự Môn'],
    ['Tham Lang', 'Thái Âm', 'Hữu Bật', 'Thiên Cơ'],
    ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc'],
    ['Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Thái Âm'],
    ['Cự Môn', 'Thái Dương', 'Văn Khúc', 'Văn Xương'],
    ['Thiên Lương', 'Tử Vi', 'Thiên Phủ', 'Vũ Khúc'],
    ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang']
  ];
  var DAO_HOA = { 2: 3, 6: 3, 10: 3, 8: 9, 0: 9, 4: 9, 5: 6, 9: 6, 1: 6, 11: 0, 3: 0, 7: 0 };
  var HOA_CAI = { 2: 10, 6: 10, 10: 10, 8: 4, 0: 4, 4: 4, 5: 1, 9: 1, 1: 1, 11: 7, 3: 7, 7: 7 };
  var PHUC_QUAN = [[9, 7], [8, 4], [0, 5], [11, 2], [3, 3], [2, 9], [6, 11], [5, 9], [6, 10], [5, 6]]; // [Thiên Phúc, Thiên Quan]
  var HOA_LINH = { 2: [1, 3], 6: [1, 3], 10: [1, 3], 8: [2, 10], 0: [2, 10], 4: [2, 10], 5: [3, 10], 9: [3, 10], 1: [3, 10], 11: [9, 10], 3: [9, 10], 7: [9, 10] };
  var CO_QUA = { 2: [5, 1], 3: [5, 1], 4: [5, 1], 5: [8, 4], 6: [8, 4], 7: [8, 4], 8: [11, 7], 9: [11, 7], 10: [11, 7], 11: [2, 10], 0: [2, 10], 1: [2, 10] };
  var KIEP_SAT = { 2: 11, 6: 11, 10: 11, 8: 5, 0: 5, 4: 5, 5: 2, 9: 2, 1: 2, 11: 8, 3: 8, 7: 8 };
  var PHA_TOAI = { 0: 5, 6: 5, 3: 5, 9: 5, 2: 9, 8: 9, 5: 9, 11: 9, 4: 1, 10: 1, 1: 1, 7: 1 };
  var LUU_HA_TRU = [[9, 5], [10, 6], [7, 0], [4, 5], [5, 6], [6, 8], [8, 2], [3, 6], [11, 9], [2, 10]]; // [Lưu Hà, Thiên Trù]
  var VAN_TINH = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
  var TIEU_HAN_START = { 2: 4, 6: 4, 10: 4, 8: 10, 0: 10, 4: 10, 5: 7, 9: 7, 1: 7, 11: 1, 3: 1, 7: 1 };
  var TRANG_SINH_START = { 6: 2, 3: 11, 4: 5, 2: 8, 5: 8 };
  var TRANG_SINH = ['Tràng Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
  var BAC_SI = ['Bác Sĩ', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'];
  var THAI_TUE = ['Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù', 'Tử Phù', 'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức', 'Điếu Khách', 'Trực Phù'];
  var HUNG = { 'Kình Dương': 1, 'Đà La': 1, 'Địa Không': 1, 'Địa Kiếp': 1, 'Hỏa Tinh': 1, 'Linh Tinh': 1, 'Thiên Hình': 1, 'Thiên Khốc': 1,
    'Thiên Hư': 1, 'Cô Thần': 1, 'Quả Tú': 1, 'Thiên Thương': 1, 'Thiên Sứ': 1, 'Kiếp Sát': 1, 'Phá Toái': 1, 'Tang Môn': 1, 'Tuế Phá': 1,
    'Bạch Hổ': 1, 'Điếu Khách': 1, 'Quan Phù': 1, 'Tử Phù': 1, 'Tiểu Hao': 1, 'Đại Hao': 1, 'Bệnh Phù': 1, 'Phục Binh': 1, 'Thiên Khó': 1,
    'Triệt': 1, 'Tuần': 1, 'Lưu Hà': 1, 'Quan Phủ': 1 };
  var CHINH_TINH = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh', 'Thiên Phủ', 'Thái Âm', 'Tham Lang',
    'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'];

  /* ---------- Lập lá số ---------- */
  // input: {name, gender:'nam'|'nu', day, month, year (dương lịch), hour (0-23)} hoặc {lunar:{day,month,year}, hourChi}
  function lapLaSo(inp) {
    var lunar, hourChi = inp.hourChi;
    if (inp.lunar) lunar = inp.lunar;
    else lunar = solarToLunar(inp.day, inp.month, inp.year, 7);
    if (hourChi === undefined) hourChi = floor((inp.hour + 1) / 2) % 12;
    var ly = lunar.year, lm = lunar.month, ld = lunar.day;
    var yCan = mod(ly + 6, 10), yChi = mod(ly + 8, 12);
    var duongAm = yCan % 2 === 0 ? 'Dương' : 'Âm';
    var nam = inp.gender === 'nam';
    var thuan = (duongAm === 'Dương') === nam; // Dương nam, Âm nữ: thuận
    var dir = thuan ? 1 : -1;

    // Mệnh, Thân
    var mPos = mod(2 + (lm - 1), 12);
    var menh = mod(mPos - hourChi, 12);
    var than = mod(mPos + hourChi, 12);

    // Cục (ngũ hổ độn tìm Can của cung Mệnh)
    var canDan = [2, 4, 6, 8, 0][yCan % 5];
    var canMenh = mod(canDan + mod(menh - 2, 12), 10);
    var napIdx = napAmIndex(canMenh, menh);
    var hanhCuc = NAP_AM[napIdx], cuc = CUC_SO[hanhCuc];

    // Bản mệnh theo nạp âm của năm sinh
    var banMenhIdx = napAmIndex(yCan, yChi);

    // Tử Vi
    var q = Math.ceil(ld / cuc), x = q * cuc - ld;
    var tv = 2 + q - 1;
    tv = (x % 2 === 1) ? tv - x : tv + x;
    tv = mod(tv, 12);

    var cungs = [];
    for (var i = 0; i < 12; i++) cungs.push({ chi: i, chinh: [], cat: [], hung: [], ten: '', hanh: HANH_CUNG[i], dai: 0 });
    function put(pos, name, group) {
      pos = mod(pos, 12);
      var g = group || (HUNG[name] ? 'hung' : 'cat');
      cungs[pos][g].push(name);
    }
    var pos = {}; // vị trí từng sao để tra
    function placeChinh(name, p) { p = mod(p, 12); pos[name] = p; cungs[p].chinh.push(name); }

    placeChinh('Tử Vi', tv); placeChinh('Thiên Cơ', tv - 1); placeChinh('Thái Dương', tv - 3);
    placeChinh('Vũ Khúc', tv - 4); placeChinh('Thiên Đồng', tv - 5); placeChinh('Liêm Trinh', tv - 8);
    var tp = mod(4 - tv, 12);
    placeChinh('Thiên Phủ', tp); placeChinh('Thái Âm', tp + 1); placeChinh('Tham Lang', tp + 2); placeChinh('Cự Môn', tp + 3);
    placeChinh('Thiên Tướng', tp + 4); placeChinh('Thiên Lương', tp + 5); placeChinh('Thất Sát', tp + 6); placeChinh('Phá Quân', tp + 10);

    // Tên 12 cung
    for (i = 0; i < 12; i++) cungs[mod(menh + i, 12)].ten = CUNG_NAMES[i];

    function sao(name, p, group) { pos[name] = mod(p, 12); put(p, name, group); }
    var kv = KHOI_VIET[yCan];
    sao('Thiên Khôi', kv[0]); sao('Thiên Việt', kv[1]);
    sao('Văn Xương', 10 - hourChi); sao('Văn Khúc', 4 + hourChi);
    sao('Ân Quang', pos['Văn Xương'] + (ld - 1) - 1); sao('Thiên Quý', pos['Văn Khúc'] - (ld - 1) + 1);
    sao('Thai Phụ', pos['Văn Khúc'] + 1); sao('Phong Cáo', pos['Văn Khúc'] - 1);
    sao('Tả Phụ', 4 + (lm - 1)); sao('Hữu Bật', 10 - (lm - 1));
    sao('Tam Thai', pos['Tả Phụ'] + (ld - 1)); sao('Bát Tọa', pos['Hữu Bật'] - (ld - 1));
    sao('Long Trì', 4 + yChi); sao('Phượng Các', 10 - yChi); sao('Giải Thần', pos['Phượng Các']);
    var th = TU_HOA[yCan], hoaNames = ['Hóa Lộc', 'Hóa Quyền', 'Hóa Khoa', 'Hóa Kỵ'];
    var tuHoa = [];
    for (i = 0; i < 4; i++) {
      var sp = pos[th[i]];
      if (sp !== undefined) { cungs[sp].cat.push(hoaNames[i]); tuHoa.push({ hoa: hoaNames[i], sao: th[i], cung: sp }); }
    }
    var lt = LOC_TON[yCan];
    sao('Lộc Tồn', lt); sao('Kình Dương', lt + 1); sao('Đà La', lt - 1);
    sao('Thiên Mã', THIEN_MA[yChi]);
    sao('Quốc Ấn', lt + 8); sao('Đường Phù', lt - 7);
    for (i = 0; i < 12; i++) sao(BAC_SI[i], lt + dir * i);
    var ts = TRANG_SINH_START[cuc];
    for (i = 0; i < 12; i++) cungs[mod(ts + dir * i, 12)].trangSinh = TRANG_SINH[i];
    for (i = 0; i < 12; i++) sao(THAI_TUE[i], yChi + i);
    var hl = mod(3 - yChi, 12);
    sao('Hồng Loan', hl); sao('Thiên Hỷ', hl + 6);
    sao('Đào Hoa', DAO_HOA[yChi]); sao('Hoa Cái', HOA_CAI[yChi]);
    sao('Thiên Phúc', PHUC_QUAN[yCan][0]); sao('Thiên Quan', PHUC_QUAN[yCan][1]);
    sao('Thiên Đức', 9 + yChi); sao('Nguyệt Đức', 5 + yChi);
    sao('Thiên Tài', menh + yChi); sao('Thiên Thọ', than + yChi);
    sao('Thiên Khó', 2 - (lm - 1)); sao('Thiên Giải', 8 + (lm - 1)); sao('Địa Giải', 7 + (lm - 1));
    sao('Địa Kiếp', 11 + hourChi); sao('Địa Không', 11 - hourChi);
    sao('Thiên Không', pos['Thái Tuế'] + 1);
    sao('Thiên Hình', 9 + (lm - 1)); sao('Thiên Diêu', 1 + (lm - 1)); sao('Thiên Y', 1 + (lm - 1));
    var hlc = HOA_LINH[yChi];
    sao('Hỏa Tinh', hlc[0] + dir * hourChi); sao('Linh Tinh', hlc[1] - dir * hourChi);
    sao('Thiên Khốc', 6 - yChi); sao('Thiên Hư', 6 + yChi);
    sao('Cô Thần', CO_QUA[yChi][0]); sao('Quả Tú', CO_QUA[yChi][1]);
    sao('Đẩu Quân', pos['Thái Tuế'] - (lm - 1) + hourChi);
    sao('Thiên Thương', menh + 5); sao('Thiên Sứ', menh + 7);
    sao('Kiếp Sát', KIEP_SAT[yChi]); sao('Phá Toái', PHA_TOAI[yChi]);
    sao('Lưu Hà', LUU_HA_TRU[yCan][0]); sao('Thiên Trù', LUU_HA_TRU[yCan][1]);
    sao('Văn Tinh', VAN_TINH[yCan]);

    // Triệt, Tuần
    var tr = TRIET[yCan % 5];
    put(tr[0], 'Triệt'); put(tr[1], 'Triệt');
    var gStart = mod(yChi - yCan, 12);
    put(gStart - 2, 'Tuần'); put(gStart - 1, 'Tuần');

    // Đại hạn
    for (i = 0; i < 12; i++) {
      var cp = mod(menh + dir * i, 12);
      cungs[cp].dai = cuc + 10 * i;
    }
    // Tiểu hạn: tuổi 1 ở cung xuất phát, nam thuận, nữ nghịch
    var thDir = nam ? 1 : -1, thStart = TIEU_HAN_START[yChi];
    for (i = 0; i < 12; i++) cungs[mod(thStart + thDir * i, 12)].tieuHanTuoi = [i + 1, i + 13, i + 25, i + 37, i + 49, i + 61, i + 73];

    return {
      input: inp, lunar: lunar,
      yCan: yCan, yChi: yChi, canChiNam: CAN[yCan] + ' ' + CHI[yChi],
      duongAm: duongAm, thuan: thuan, amDuongNamNu: duongAm + ' ' + (nam ? 'Nam' : 'Nữ'),
      hourChi: hourChi, menh: menh, than: than,
      canMenh: canMenh, napAm: NAP_AM_TEN[napIdx], hanhCuc: hanhCuc, cuc: cuc, cucTen: CUC_TEN[cuc],
      banMenh: NAP_AM_TEN[banMenhIdx], banMenhHanh: NAP_AM[banMenhIdx],
      cungs: cungs, pos: pos, tuHoa: tuHoa, tuViPos: tv,
      cungMenhTen: CHI[menh], cungThanTen: CHI[than]
    };
  }

  // Tiểu hạn của một năm xem (năm dương lịch hoặc năm âm)
  function tieuHanNam(laSo, namXem) {
    var tuoi = namXem - laSo.lunar.year + 1;
    for (var i = 0; i < 12; i++) {
      var t = laSo.cungs[i].tieuHanTuoi;
      if (t.indexOf(tuoi) >= 0) return { tuoi: tuoi, cung: i };
    }
    return { tuoi: tuoi, cung: null };
  }
  function daiHanTuoi(laSo, tuoi) {
    for (var i = 0; i < 12; i++) {
      var d = laSo.cungs[i].dai;
      if (tuoi >= d && tuoi < d + 10) return i;
    }
    return null;
  }

  var api = {
    CAN: CAN, CHI: CHI, CUNG_NAMES: CUNG_NAMES, CHINH_TINH: CHINH_TINH, HANH_CUNG: HANH_CUNG,
    solarToLunar: solarToLunar, lapLaSo: lapLaSo, tieuHanNam: tieuHanNam, daiHanTuoi: daiHanTuoi, jdFromDate: jdFromDate
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TuViEngine = api;
})(typeof window !== 'undefined' ? window : this);
