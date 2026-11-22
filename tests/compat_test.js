// Kiểm tra phần xem hợp tuổi (compat.js). Chạy: node tests/compat_test.js
const H = require('../compat.js');
let fail = 0;
const t = (n, c, x) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (c ? '' : ' -> ' + JSON.stringify(x))); if (!c) fail++; };

// cung phi (bát trạch) theo năm âm lịch và giới tính, đối chiếu các ví dụ phổ biến
t('nam 1990 là Khảm, nữ 1990 là Cấn', H.TEN_QUE[H.cungPhi(1990, 'nam')] === 'Khảm' && H.TEN_QUE[H.cungPhi(1990, 'nu')] === 'Cấn');
t('nam 1980 là Khôn, nữ 1980 là Tốn', H.TEN_QUE[H.cungPhi(1980, 'nam')] === 'Khôn' && H.TEN_QUE[H.cungPhi(1980, 'nu')] === 'Tốn');
t('nam 2000 là Ly, nữ 2000 là Càn', H.TEN_QUE[H.cungPhi(2000, 'nam')] === 'Ly' && H.TEN_QUE[H.cungPhi(2000, 'nu')] === 'Càn');
t('không bao giờ ra Trung cung 5', [...Array(200)].every((_, i) => H.cungPhi(1900 + i, 'nam') !== 5 && H.cungPhi(1900 + i, 'nu') !== 5));

// bảng du niên suy từ phép đổi hào
const K = { Khảm: 1, Khôn: 2, Chấn: 3, Tốn: 4, Càn: 6, Đoài: 7, Cấn: 8, Ly: 9 };
t('Càn gặp Khôn là Diên Niên', H.duNien(K.Càn, K.Khôn) === 'Diên Niên');
t('Khảm gặp Ly, Chấn gặp Tốn, Cấn gặp Đoài đều là Diên Niên', H.duNien(K.Khảm, K.Ly) === 'Diên Niên' && H.duNien(K.Chấn, K.Tốn) === 'Diên Niên' && H.duNien(K.Cấn, K.Đoài) === 'Diên Niên');
t('Khảm gặp Tốn là Sinh Khí, gặp Chấn là Thiên Y, gặp Khôn là Tuyệt Mệnh', H.duNien(K.Khảm, K.Tốn) === 'Sinh Khí' && H.duNien(K.Khảm, K.Chấn) === 'Thiên Y' && H.duNien(K.Khảm, K.Khôn) === 'Tuyệt Mệnh');
t('Đoài gặp Chấn là Tuyệt Mệnh', H.duNien(K.Đoài, K.Chấn) === 'Tuyệt Mệnh');
const ks = Object.values(K);
t('bảng đối xứng: A gặp B giống B gặp A', ks.every(a => ks.every(b => H.duNien(a, b) === H.duNien(b, a))));
t('mỗi cung gặp 8 cung ra đủ 8 sao khác nhau', ks.every(a => new Set(ks.map(b => H.duNien(a, b))).size === 8));
t('cùng nhóm Đông/Tây tứ mệnh thì luôn tốt, khác nhóm thì luôn xấu', ks.every(a => ks.every(b => {
  const dong = x => [1, 3, 4, 9].includes(x), tot = ['Sinh Khí', 'Thiên Y', 'Diên Niên', 'Phục Vị'].includes(H.duNien(a, b));
  return tot === (dong(a) === dong(b));
})));

// thiên can, địa chi
t('Giáp hợp Kỷ, Giáp xung Canh, Mậu với Giáp bình thường', H.canRel(0, 5).diem === 2 && H.canRel(0, 6).diem === 0 && H.canRel(4, 0).diem === 1);
t('Tý Sửu lục hợp, Thân Tý tam hợp, Tý Ngọ lục xung, Tý Mùi lục hại', H.chiRel(0, 1).diem === 2 && H.chiRel(8, 0).diem === 2 && H.chiRel(0, 6).diem === 0 && H.chiRel(0, 7).diem === 0);
t('Tỵ Thân vừa lục hợp vừa tương hình: 1 điểm', H.chiRel(5, 8).diem === 1);
t('Dần Tỵ hại và hình: 0 điểm; Thìn Thìn tự hình: 0 điểm', H.chiRel(2, 5).diem === 0 && H.chiRel(4, 4).diem === 0);

// một cặp đầy đủ: nam 15/06/1990 (Canh Ngọ, Lộ Bàng Thổ, Khảm) và nữ 10/08/1992 (Nhâm Thân, Kiếm Phong Kim, Đoài)
const r = H.xem({ day: 15, month: 6, year: 1990, gender: 'nam' }, { day: 10, month: 8, year: 1992, gender: 'nu' });
t('người 1: Canh Ngọ, Lộ Bàng Thổ, Khảm', r.a.canChi === 'Canh Ngọ' && r.a.napAm === 'Lộ Bàng Thổ' && r.a.cung === 'Khảm', r.a);
t('người 2: Nhâm Thân, Kiếm Phong Kim, Đoài', r.b.canChi === 'Nhâm Thân' && r.b.napAm === 'Kiếm Phong Kim' && r.b.cung === 'Đoài', r.b);
t('điểm từng tiêu chí 2,1,1,0,2 = 6, Khá hợp', r.rows.map(x => x.kq.diem).join() === '2,1,1,0,2' && r.tong === 6 && r.ket.ten === 'Khá hợp', r.rows.map(x => [x.ten, x.kq.diem, x.kq.ten]));
// sinh trước Tết tính năm trước
const s = H.nguoi({ day: 20, month: 1, year: 1990, gender: 'nam' });
t('sinh 20/01/1990 (trước Tết) là năm Kỷ Tỵ 1989', s.namAm === 1989 && s.canChi === 'Kỷ Tỵ', s);
// tổng luôn từ 0 đến 10 và có kết luận
let ok = true;
for (let i = 0; i < 400; i++) { const y1 = 1940 + (i * 7) % 80, y2 = 1945 + (i * 11) % 75; const x = H.xem({ day: 1 + i % 28, month: 1 + i % 12, year: y1, gender: i % 2 ? 'nam' : 'nu' }, { day: 1 + (i * 3) % 28, month: 1 + (i * 5) % 12, year: y2, gender: i % 3 ? 'nu' : 'nam' }); if (!(x.tong >= 0 && x.tong <= 10 && x.ket.ten && x.rows.every(rw => rw.kq.ten && rw.kq.y))) { ok = false; break; } }
t('400 cặp ngẫu nhiên: tổng 0 đến 10, đủ kết luận và lời giải', ok);

console.log(fail ? fail + ' FAILED' : 'ALL PASSED'); process.exit(fail ? 1 : 0);
