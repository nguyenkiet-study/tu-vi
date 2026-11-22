/* Xem hợp tuổi hai người: 5 tiêu chí, mỗi tiêu chí tối đa 2 điểm (tổng 10).
   1 Ngũ hành bản mệnh (nạp âm năm sinh), 2 Thiên can, 3 Địa chi, 4 Cung phi bát trạch, 5 Thiên mệnh (hành của cung phi).
   Năm sinh tính theo năm âm lịch (sinh trước Tết là năm trước). Cung bát trạch không chép tay mà suy từ phép đổi hào
   (Bát Trạch Minh Kính): từ quẻ của mình, lần lượt đổi hào trên, giữa, dưới, giữa, trên, giữa, dưới, giữa. */
(function (root) {
  'use strict';
  var E = (typeof module !== 'undefined' && module.exports) ? require('./engine.js') : root.TuViEngine;
  var CAN = E.CAN, CHI = E.CHI;

  var SINH = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
  function hanhRel(a, b) {
    if (a === b) return { diem: 1, ten: 'Bình hòa', y: 'Cùng hành ' + a + ', hòa hợp nhưng ít bổ sung cho nhau.' };
    if (SINH[a] === b) return { diem: 2, ten: 'Tương sinh', y: a + ' sinh ' + b + ', người trước nâng đỡ người sau.' };
    if (SINH[b] === a) return { diem: 2, ten: 'Tương sinh', y: b + ' sinh ' + a + ', người sau nâng đỡ người trước.' };
    var khac = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };
    return { diem: 0, ten: 'Tương khắc', y: (khac[a] === b ? a + ' khắc ' + b : b + ' khắc ' + a) + ', dễ va chạm, cần nhường nhịn.' };
  }

  /* quẻ bát trạch: hào từ dưới lên (1 = dương) */
  var QUE = { 1: [0, 1, 0], 2: [0, 0, 0], 3: [1, 0, 0], 4: [0, 1, 1], 6: [1, 1, 1], 7: [1, 1, 0], 8: [0, 0, 1], 9: [1, 0, 1] };
  var TEN_QUE = { 1: 'Khảm', 2: 'Khôn', 3: 'Chấn', 4: 'Tốn', 6: 'Càn', 7: 'Đoài', 8: 'Cấn', 9: 'Ly' };
  var HANH_QUE = { 1: 'Thủy', 2: 'Thổ', 3: 'Mộc', 4: 'Mộc', 6: 'Kim', 7: 'Kim', 8: 'Thổ', 9: 'Hỏa' };
  var DU_NIEN = [[2, 'Sinh Khí'], [1, 'Ngũ Quỷ'], [0, 'Diên Niên'], [1, 'Lục Sát'], [2, 'Họa Hại'], [1, 'Thiên Y'], [0, 'Tuyệt Mệnh'], [1, 'Phục Vị']];
  var TOT = { 'Sinh Khí': 1, 'Thiên Y': 1, 'Diên Niên': 1, 'Phục Vị': 1 };
  var Y_SAO = {
    'Sinh Khí': 'cát nhất, gia đạo hưng vượng', 'Thiên Y': 'tốt, hay được quý nhân giúp, sức khỏe yên', 'Diên Niên': 'tốt, vợ chồng hòa thuận bền lâu',
    'Phục Vị': 'tốt vừa, yên ổn', 'Tuyệt Mệnh': 'xấu nhất, dễ bất đồng lớn', 'Ngũ Quỷ': 'xấu, dễ thị phi', 'Lục Sát': 'xấu, dễ hiểu lầm', 'Họa Hại': 'xấu nhẹ, hay vướng chuyện nhỏ'
  };
  function duNien(a, b) {
    var t = QUE[a].slice();
    for (var i = 0; i < DU_NIEN.length; i++) {
      t[DU_NIEN[i][0]] ^= 1;
      var k = Object.keys(QUE).filter(function (q) { return QUE[q].join() === t.join(); })[0];
      if (+k === b) return DU_NIEN[i][1];
    }
    return null;
  }
  /* cung phi theo năm âm lịch và giới tính (số Lạc Thư; 5 là Trung cung: nam về Khôn, nữ về Cấn) */
  function cungPhi(namAm, gioi) {
    var k;
    if (gioi === 'nam') { k = (11 - (namAm % 9)) % 9; if (k === 0) k = 9; if (k === 5) k = 2; }
    else { k = (namAm % 9 + 4) % 9; if (k === 0) k = 9; if (k === 5) k = 8; }
    return k;
  }

  function canRel(a, b) {
    if (Math.abs(a - b) === 5) return { diem: 2, ten: 'Tương hợp', y: CAN[a] + ' hợp ' + CAN[b] + ', dễ đồng lòng.' };
    if (Math.abs(a - b) === 6 && Math.min(a, b) <= 3) return { diem: 0, ten: 'Tương xung', y: CAN[a] + ' xung ' + CAN[b] + ', dễ khác ý.' };
    return { diem: 1, ten: 'Bình thường', y: CAN[a] + ' và ' + CAN[b] + ' không hợp không xung.' };
  }
  var HINH = [[2, 5, 8], [1, 10, 7], [0, 3]];
  function chiRel(a, b) {
    var tot = [], xau = [];
    if (a !== b && a % 4 === b % 4) tot.push('tam hợp');
    if ((a + b) % 12 === 1) tot.push('lục hợp');
    if (Math.abs(a - b) === 6) xau.push('lục xung');
    if ((a + b) % 12 === 7) xau.push('lục hại');
    if (a === b && [4, 6, 9, 11].indexOf(a) >= 0) xau.push('tự hình');
    if (a !== b && HINH.some(function (g) { return g.indexOf(a) >= 0 && g.indexOf(b) >= 0; })) xau.push('tương hình');
    var cap = CHI[a] + ' và ' + CHI[b];
    if (tot.length && !xau.length) return { diem: 2, ten: tot.join(', ').replace(/^./, function (c) { return c.toUpperCase(); }), y: cap + ' ' + tot.join(', ') + ', gắn bó và hiểu nhau.' };
    if (xau.length && !tot.length) return { diem: 0, ten: xau.join(', ').replace(/^./, function (c) { return c.toUpperCase(); }), y: cap + ' ' + xau.join(', ') + ', cần kiên nhẫn với nhau.' };
    if (tot.length && xau.length) return { diem: 1, ten: 'Vừa hợp vừa hình', y: cap + ' ' + tot.join(', ') + ' nhưng cũng ' + xau.join(', ') + ', tốt xấu bù trừ.' };
    if (a === b) return { diem: 1, ten: 'Cùng tuổi', y: 'Cùng tuổi ' + CHI[a] + ', dễ đồng cảm.' };
    return { diem: 1, ten: 'Bình thường', y: cap + ' không hợp không xung.' };
  }

  /* thông tin một người: ngày dương lịch, giới tính ('nam' | 'nu'), tên tùy chọn */
  function nguoi(p) {
    var lu = E.solarToLunar(p.day, p.month, p.year, 7), y = lu.year;
    var ls = E.lapLaSo({ gender: p.gender, day: p.day, month: p.month, year: p.year, hourChi: 0, hour: 0 });
    var can = ((y + 6) % 10 + 10) % 10, chi = ((y + 8) % 12 + 12) % 12, kua = cungPhi(y, p.gender);
    var hanh = String(ls.banMenh).split(' ').pop();
    return { ten: p.name || '', gioi: p.gender, namAm: y, can: can, chi: chi, canChi: CAN[can] + ' ' + CHI[chi], napAm: ls.banMenh, hanh: hanh,
      kua: kua, cung: TEN_QUE[kua], hanhCung: HANH_QUE[kua], nhom: [1, 3, 4, 9].indexOf(kua) >= 0 ? 'Đông tứ mệnh' : 'Tây tứ mệnh' };
  }

  function xem(p1, p2) {
    var a = nguoi(p1), b = nguoi(p2);
    var sao = duNien(a.kua, b.kua);
    var rows = [
      { key: 'menh', ten: 'Ngũ hành bản mệnh', a: a.napAm, b: b.napAm, kq: hanhRel(a.hanh, b.hanh) },
      { key: 'can', ten: 'Thiên can', a: CAN[a.can], b: CAN[b.can], kq: canRel(a.can, b.can) },
      { key: 'chi', ten: 'Địa chi', a: CHI[a.chi], b: CHI[b.chi], kq: chiRel(a.chi, b.chi) },
      { key: 'cung', ten: 'Cung phi bát trạch', a: a.cung + ' (' + a.nhom + ')', b: b.cung + ' (' + b.nhom + ')',
        kq: { diem: TOT[sao] ? 2 : 0, ten: sao, y: a.cung + ' gặp ' + b.cung + ' thành ' + sao + ': ' + Y_SAO[sao] + '.' } },
      { key: 'thienmenh', ten: 'Thiên mệnh', a: a.hanhCung, b: b.hanhCung, kq: hanhRel(a.hanhCung, b.hanhCung) }
    ];
    var tong = rows.reduce(function (s, r) { return s + r.kq.diem; }, 0);
    var ket = tong >= 8 ? { muc: 'rat', ten: 'Rất hợp', y: 'Hai tuổi bổ trợ nhau ở hầu hết các mặt.' }
      : tong >= 6 ? { muc: 'kha', ten: 'Khá hợp', y: 'Nhiều điểm thuận, vài điểm cần nhường nhịn.' }
      : tong >= 4 ? { muc: 'tb', ten: 'Trung bình', y: 'Tốt xấu đan xen. Hiểu và dung hòa nhau là đủ để êm ấm.' }
      : { muc: 'can', ten: 'Cần thấu hiểu nhau hơn', y: 'Có nhiều điểm xung theo tuổi. Sự thấu hiểu và cách cư xử mới quyết định hạnh phúc.' };
    return { a: a, b: b, rows: rows, tong: tong, ket: ket };
  }

  var api = { xem: xem, nguoi: nguoi, cungPhi: cungPhi, duNien: duNien, chiRel: chiRel, canRel: canRel, hanhRel: hanhRel, TEN_QUE: TEN_QUE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TuViHopTuoi = api;
})(typeof window !== 'undefined' ? window : this);
