/* Trang chủ — giao diện 2 (Công ty → Sản phẩm → Chọn mua) */
(function () {
  'use strict';
  const H = window.HTAT, { D, SITE, icon, esc, $, cardHTML, img, thumb } = H;
  const P = D.products;

  // ① 5 hãng đại diện chính thức (theo tờ giới thiệu HATEC)
  const reps = [['Hyundai', 'Hàn Quốc', 'Hyundai'], ['Osemco', 'Hàn Quốc', 'Osemco'], ['Daco', 'Hàn Quốc', 'Daco'],
    ['General Electric', 'Mỹ', 'GE'], ['Primus', 'Thái Lan', 'Primus']];
  $('#hero-brands').innerHTML = reps.map((r) => '<a href="' + H.brandUrl(r[2]) + '"><b>' + r[0] + '</b><span>' + r[1] + '</span></a>').join('');

  // Dải số liệu: chỉ dùng con số đếm được từ dữ liệu thật trên web
  const groupsWithItems = H.groupItems.filter((g) => g.count > 0).length;
  const stats = [[reps.length, 'Hãng đại diện chính thức'], [P.length, 'Sản phẩm trên website'], [groupsWithItems, 'Nhóm thiết bị'], [3, 'Quốc gia xuất xứ các hãng']];
  $('#stats').innerHTML = stats.map((s) => '<div><b>' + s[0] + '</b><span>' + s[1] + '</span></div>').join('');

  // ② Thẻ sản phẩm theo hãng
  const brandOrder = [['Osemco', 'Hàn Quốc'], ['Hyundai', 'Hàn Quốc'], ['Daco', 'Hàn Quốc'], ['Primus', 'Thái Lan'], ['GE', 'Mỹ'], ['Growatt', '']];
  const bestIds = new Set(P.filter((p) => p.cats.includes(D.bestSellerCat)).map((p) => p.id));
  $('#brand-cards').innerHTML = brandOrder.map(([b, country]) => {
    const list = P.filter((p) => H.matchBrand(p, b));
    if (!list.length) return '';
    const groups = H.groupItems.map((g) => ({ g, n: list.filter((p) => H.inGroup(p, g)).length })).filter((x) => x.n > 0)
      .sort((a, c) => c.n - a.n).slice(0, 5);
    const pic = list.find((p) => bestIds.has(p.id) && p.imgs.length) || list.find((p) => p.imgs.length) || list[0];
    const title = b === 'GE' ? 'General Electric' : b;
    return '<article class="brand-card"><h3>' + esc(title) + '<small>' + (country ? country + ' · ' : '') + list.length + ' sản phẩm</small></h3>' +
      '<div class="brand-card__body"><a class="brand-card__img" href="' + H.brandUrl(b) + '" tabindex="-1" aria-hidden="true">' + img(thumb(pic), '') + '</a>' +
      '<ul>' + (groups.length ? groups.map((x) => '<li><a href="' + H.groupUrl(x.g.key) + '">' + esc(x.g.name) + ' <span>' + x.n + '</span></a></li>').join('')
        : '<li><a href="' + H.brandUrl(b) + '">Xem sản phẩm ' + esc(title) + '</a></li>') + '</ul></div>' +
      '<a class="btn btn--accent" href="' + H.brandUrl(b) + '">Xem thêm</a></article>';
  }).join('');

  // Danh mục dạng gọn
  const catIcons = { ats: 'zap', acb: 'toggle', mccb: 'shield', contactor: 'box', relay: 'activity', 'bien-tan': 'cpu', 'dong-ho': 'gauge', 'nhiet-do': 'thermo', 'tin-hieu': 'activity', ssr: 'zap', 'lam-mat': 'fan', nlmt: 'sun' };
  const featured = ['ats', 'acb', 'mccb', 'contactor', 'relay', 'bien-tan', 'dong-ho', 'nhiet-do', 'tin-hieu', 'ssr', 'lam-mat', 'nlmt'];
  $('#cats').innerHTML = featured.map((k) => H.groupByKey.get(k)).filter(Boolean).map((g) =>
    '<a class="cat-tile" href="' + H.groupUrl(g.key) + '"><div class="cat-tile__icon">' + icon(catIcons[g.key] || 'box') + '</div><b>' + esc(g.name) + '</b><span>' + g.count + ' sản phẩm</span></a>').join('');

  // ③ Bán chạy + mũi tên cuộn
  const sc = $('#bestsellers');
  sc.innerHTML = P.filter((p) => p.cats.includes(D.bestSellerCat)).map(cardHTML).join('');
  const step = () => (sc.firstElementChild ? sc.firstElementChild.getBoundingClientRect().width + 24 : 300);
  document.querySelector('.carousel .prev').addEventListener('click', () => sc.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.querySelector('.carousel .next').addEventListener('click', () => sc.scrollBy({ left: step(), behavior: 'smooth' }));

  // Dịch vụ & cam kết (nội dung web cũ)
  const usp = [
    ['truck', 'Miễn phí giao hàng', 'Nội thành TP.HCM'],
    ['card', 'Thanh toán', 'Đơn giản, an toàn'],
    ['shield', 'Đổi trả nếu lỗi', 'Theo chính sách của công ty'],
    ['headset', 'Hỗ trợ tận tình', 'Giờ làm việc ' + SITE.hours],
  ];
  $('#usp').innerHTML = usp.map((u) => '<div class="service"><div class="service__icon">' + icon(u[0]) + '</div><b>' + u[1] + '</b><span>' + u[2] + '</span></div>').join('');

  // Báo giá
  $('#cta-btns').innerHTML = '<a class="btn btn--accent" href="' + SITE.tel + '">' + icon('phone') + 'Gọi ' + SITE.hotline + '</a>' +
    '<a class="btn btn--ghost-white" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + 'Zalo ' + SITE.zalo + '</a>';

  // Tin mới nhất
  H.loadPosts().then((list) => { $('#posts').innerHTML = list.slice(0, 3).map(H.postCardHTML).join(''); })
    .catch(() => { $('#posts').innerHTML = '<p style="color:#fff">Không tải được tin tức.</p>'; });

  // Khách hàng nói gì (giữ nguyên nội dung web cũ)
  const quotes = [
    ['Đã mua ở đây nhiều sản phẩm, sản phẩm chất lượng và chế độ bảo hành rất tốt, rất hài lòng.', 'Chị Nga'],
    ['Thiết bị điện an toàn, chất lượng, hướng dẫn lắp đặt tận tình đánh giá 5 sao cho htat.vn', 'Anh Hiếu'],
    ['Nhân viên tư vấn nhiệt tình, thái độ phục vụ tốt, đã mua ở nhiều cửa hàng nhưng vẫn thích htat.vn nhất', 'Chị Bông'],
  ];
  $('#quotes').innerHTML = quotes.map((q) => '<blockquote class="quote">' + icon('quote') + '<p>' + esc(q[0]) + '</p><footer>— ' + esc(q[1]) + '</footer></blockquote>').join('');
})();
