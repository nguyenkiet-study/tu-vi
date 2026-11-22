/**
 * Tử Vi: dịch vụ hỏi đáp AI (Google Apps Script, triển khai dạng Web app).
 *
 * Trang web (index.html) gửi POST, nội dung là JSON { question, chart } với Content-Type text/plain,
 * dịch vụ trả JSON { answer } hoặc { error }.
 *
 * Cài đặt:
 *  1. Project Settings > Script Properties: thêm GEMINI_API_KEY = key Gemini của bạn (key KHÔNG nằm trong code).
 *  2. Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone".
 *  3. Dán đường link /exec vào config.js (window.TUVI_AI_URL).
 *
 * Giới hạn để người lạ không dùng hết hạn mức: tối đa DAILY_LIMIT câu hỏi mỗi ngày cho cả trang,
 * câu hỏi tối đa 500 ký tự, phần lá số tối đa 8000 ký tự.
 */

var MODELS = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];   // thử lần lượt: model thứ hai là dự phòng
var DAILY_LIMIT = 150;
var MAX_QUESTION = 500;
var MAX_CHART = 8000;

/** Kiểm tra nhanh: mở link /exec trên trình duyệt sẽ thấy {"ok":true,...}. */
function doGet() {
  var hasKey = !!PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  return json_({ ok: true, service: 'tu-vi-ai', keySet: hasKey });
}

function doPost(e) {
  try {
    var body = {};
    try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ error: 'Dữ liệu gửi lên không đọc được.' }); }
    var question = String(body.question || '').trim();
    var chart = String(body.chart || '').trim();
    if (!question) return json_({ error: 'Bạn nhập câu hỏi giúp mình nhé.' });
    if (!chart) return json_({ error: 'Bạn lập lá số trước rồi hãy hỏi nhé.' });
    if (question.length > MAX_QUESTION) return json_({ error: 'Câu hỏi hơi dài, bạn rút gọn dưới ' + MAX_QUESTION + ' ký tự nhé.' });
    if (chart.length > MAX_CHART) chart = chart.slice(0, MAX_CHART);

    var key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!key) return json_({ error: 'Dịch vụ AI chưa được cài key. Chủ trang cần thêm GEMINI_API_KEY trong Script Properties.' });

    if (!takeQuota_()) return json_({ error: 'Hôm nay đã hết lượt hỏi AI. Bạn quay lại vào ngày mai nhé.' });

    var answer = askGemini_(key, buildPrompt_(question, chart));
    if (!answer) return json_({ error: 'AI chưa trả lời được. Bạn thử lại sau ít phút nhé.' });
    return json_({ answer: answer });
  } catch (err) {
    console.error(err);
    return json_({ error: 'Có lỗi khi hỏi AI. Bạn thử lại sau ít phút nhé.' });
  }
}

/** Đếm số câu hỏi trong ngày (giờ Việt Nam). Trả false khi đã đủ DAILY_LIMIT. */
function takeQuota_() {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(5000); } catch (err) { return true; }   // không khóa được thì vẫn cho hỏi, tránh chặn nhầm
  try {
    var day = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd');
    var props = PropertiesService.getScriptProperties();
    var raw = props.getProperty('QUOTA') || '';
    var parts = raw.split('|');
    var count = parts[0] === day ? Number(parts[1]) || 0 : 0;
    if (count >= DAILY_LIMIT) return false;
    props.setProperty('QUOTA', day + '|' + (count + 1));
    return true;
  } finally {
    lock.releaseLock();
  }
}

function buildPrompt_(question, chart) {
  return [
    'Bạn là người luận giải tử vi theo trường phái Tử Vi Đẩu Số (tham khảo sách "Tử Vi Chính Biện"), viết tiếng Việt, giọng ấm áp, dễ hiểu.',
    'Dưới đây là lá số đã được lập sẵn (cung, chính tinh, cát tinh, hung tinh). Chỉ dựa vào lá số này, không tự lập lại lá số.',
    '',
    'LÁ SỐ:',
    chart,
    '',
    'CÂU HỎI: ' + question,
    '',
    'Yêu cầu trả lời:',
    '- Trả lời đúng trọng tâm câu hỏi, khoảng 150 đến 300 từ, chia đoạn ngắn.',
    '- Nêu rõ dựa vào cung nào và sao nào khi luận.',
    '- Nói theo hướng xu hướng và lời khuyên, không phán chắc chắn chuyện xấu, không hù dọa.',
    '- Không đưa lời khuyên y tế, pháp lý hay đầu tư cụ thể; nếu câu hỏi về các chuyện đó, khuyên người hỏi tìm chuyên gia.',
    '- Không dùng markdown (không dấu *, #). Cuối bài thêm một câu: "Lá số chỉ để tham khảo, bạn mới là người quyết định cuộc sống của mình."'
  ].join('\n');
}

/** Gọi Gemini, thử model chính rồi model dự phòng. Trả về chữ hoặc '' nếu không được. */
function askGemini_(key, prompt) {
  var payload = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
  };
  for (var i = 0; i < MODELS.length; i++) {
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODELS[i] + ':generateContent';
    var res = UrlFetchApp.fetch(url, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { 'x-goog-api-key': key },
      payload: JSON.stringify(payload)
    });
    var code = res.getResponseCode();
    if (code !== 200) { console.warn('Gemini ' + MODELS[i] + ' HTTP ' + code + ': ' + res.getContentText().slice(0, 300)); continue; }
    var data = JSON.parse(res.getContentText());
    var parts = (((data.candidates || [])[0] || {}).content || {}).parts || [];
    var text = parts.map(function (p) { return p.text || ''; }).join('').trim();
    if (text) return text.replace(/[*#]+/g, '');
  }
  return '';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy tay trong trình soạn thảo để thử (Run > testAsk): xem kết quả ở Execution log. */
function testAsk() {
  var out = doPost({ postData: { contents: JSON.stringify({ question: 'Công danh năm nay thế nào?', chart: 'Nam\nNăm sinh: Giáp Tý\nMệnh (Tý): Tử Vi | Văn Xương' }) } });
  console.log(out.getContent());
}
