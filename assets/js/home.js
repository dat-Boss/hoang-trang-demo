/* Trang chủ */
(function () {
  'use strict';
  const H = window.HTAT, { D, SITE, icon, esc, $, cardHTML, img } = H;
  const P = D.products;
  const bySlug = (s) => P.find((p) => p.slug === s);

  // Khối mở đầu: ghép tạm từ ảnh sản phẩm có sẵn
  const heroPicks = [
    'bo-chuyen-nguon-ats-osung-3p4000a',
    'bien-tan-hyundai-n700e-150hf-15kw-3-pha-380v',
    'digital-indicator-model-cm-004n',
    'osb-ii-may-cat-khong-khi-osb-ii-acb-osung-korea',
  ].map(bySlug).filter(Boolean);
  const bests = P.filter((p) => p.cats.includes(D.bestSellerCat));
  while (heroPicks.length < 4 && bests.length) { const b = bests.shift(); if (!heroPicks.includes(b)) heroPicks.push(b); }
  $('#hero-collage').innerHTML = heroPicks.slice(0, 4).map((p) => '<figure>' + img(p.imgs[0] && p.imgs[0].src, '').replace('loading="lazy"', 'loading="eager" fetchpriority="high"') + '</figure>').join('');
  $('#hero-zalo').href = SITE.zaloUrl;

  // Dải cam kết (giữ nội dung web cũ)
  const usp = [
    ['truck', 'Miễn phí giao hàng', 'Nội thành TP.HCM'],
    ['card', 'Thanh toán', 'Đơn giản, an toàn'],
    ['shield', 'Chính sách', 'Đổi trả nếu lỗi'],
    ['headset', 'Hỗ trợ tận tình', 'Giờ làm việc ' + SITE.hours],
  ];
  $('#usp').innerHTML = usp.map((u) => '<div class="usp__item"><div class="usp__icon">' + icon(u[0]) + '</div><div><b>' + u[1] + '</b><span>' + u[2] + '</span></div></div>').join('');

  // Danh mục nổi bật
  const catIcons = { ats: 'zap', acb: 'toggle', mccb: 'shield', contactor: 'box', relay: 'activity', 'bien-tan': 'cpu', 'dong-ho': 'gauge', 'nhiet-do': 'thermo', 'tin-hieu': 'activity', ssr: 'zap', 'lam-mat': 'fan', nlmt: 'sun', 'den-bao': 'light' };
  const featured = ['ats', 'acb', 'mccb', 'contactor', 'relay', 'bien-tan', 'dong-ho', 'nhiet-do', 'tin-hieu', 'ssr', 'lam-mat', 'nlmt'];
  $('#cats').innerHTML = featured.map((k) => H.groupByKey.get(k)).filter(Boolean).map((g) =>
    '<a class="cat-tile" href="' + H.groupUrl(g.key) + '"><div class="cat-tile__icon">' + icon(catIcons[g.key] || 'box') + '</div><b>' + esc(g.name) + '</b><span>' + g.count + ' sản phẩm</span></a>').join('');

  // Bán chạy
  $('#bestsellers').innerHTML = P.filter((p) => p.cats.includes(D.bestSellerCat)).map(cardHTML).join('');

  // Tab sản phẩm theo danh mục
  const tabs = [
    ['ats', 'ATS'], ['acb', 'ACB'], ['mccb', 'MCCB'], ['contactor', 'Contactor'], ['bien-tan', 'Biến tần'], ['brand:Primus', 'Primus'],
  ];
  const tabsEl = $('#tabs'), panel = $('#tab-panel'), more = $('#tab-more');
  tabsEl.innerHTML = tabs.map((t, i) => '<button class="tab" role="tab" type="button" aria-selected="' + (i === 0) + '" data-k="' + t[0] + '">' + t[1] + '</button>').join('');
  function showTab(k) {
    let list, url;
    if (k.startsWith('brand:')) { const b = k.slice(6); list = P.filter((p) => H.matchBrand(p, b)); url = H.brandUrl(b); }
    else { const g = H.groupByKey.get(k); list = P.filter((p) => H.inGroup(p, g)); url = H.groupUrl(k); }
    panel.innerHTML = list.slice(0, 8).map(cardHTML).join('');
    more.href = url;
    tabsEl.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.k === k));
  }
  tabsEl.addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) showTab(b.dataset.k); });
  showTab(tabs[0][0]);

  // Thương hiệu (chữ, chưa dùng logo hãng)
  $('#brands').innerHTML = H.brandsShown.map((b) => '<a class="chip" href="' + H.brandUrl(b) + '">' + esc(b) + '</a>').join('');

  // Dải báo giá
  $('#cta-btns').innerHTML = '<a class="btn btn--accent" href="' + SITE.tel + '">' + icon('phone') + 'Gọi ' + SITE.hotline + '</a>' +
    '<a class="btn btn--ghost-white" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + 'Zalo ' + SITE.zalo + '</a>';

  // Tin tức (3 bài mới nhất, mở trong trang Chi tiết bài viết)
  H.loadPosts().then((list) => { $('#posts').innerHTML = list.slice(0, 3).map(H.postCardHTML).join(''); })
    .catch(() => { $('#posts').innerHTML = '<p class="muted">Không tải được tin tức.</p>'; });

  // Khách hàng nói gì (giữ nguyên nội dung web cũ)
  const quotes = [
    ['Đã mua ở đây nhiều sản phẩm, sản phẩm chất lượng và chế độ bảo hành rất tốt, rất hài lòng.', 'Chị Nga'],
    ['Thiết bị điện an toàn, chất lượng, hướng dẫn lắp đặt tận tình đánh giá 5 sao cho htat.vn', 'Anh Hiếu'],
    ['Nhân viên tư vấn nhiệt tình, thái độ phục vụ tốt, đã mua ở nhiều cửa hàng nhưng vẫn thích htat.vn nhất', 'Chị Bông'],
  ];
  $('#quotes').innerHTML = quotes.map((q) => '<blockquote class="quote">' + icon('quote') + '<p>' + esc(q[0]) + '</p><footer>— ' + esc(q[1]) + '</footer></blockquote>').join('');
})();
