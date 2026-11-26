/* Trang chủ — giao diện 3 (kiểu sàn thiết bị kỹ thuật) */
(function () {
  'use strict';
  const H = window.HTAT, { D, icon, esc, $, $$, cardHTML, img, thumb } = H;
  const P = D.products;
  const bySlug = (s) => P.find((p) => p.slug === s);
  const bestIds = new Set(P.filter((p) => p.cats.includes(D.bestSellerCat)).map((p) => p.id));
  const inKeys = (p, keys) => keys.some((k) => { const g = H.groupByKey.get(k); return g && H.inGroup(p, g); });
  const picOf = (list) => list.find((p) => bestIds.has(p.id) && p.imgs.length) || list.find((p) => p.imgs.length) || list[0];
  const big = (p) => (p && p.imgs[0] ? p.imgs[0].src : '');
  const eager = (html) => html.replace('loading="lazy"', 'loading="eager"');

  // ---- Cột danh mục bên trái (có menu bay ra khi rê chuột) ----
  const groupIcons = ['toggle', 'cpu', 'gauge', 'fan', 'sun'];
  $('#t3-side').innerHTML = D.groups.map((g, i) =>
    '<li class="t3-side__item"><a href="' + H.groupUrl(g.items[0].key) + '"><span class="t3-side__ic">' + icon(groupIcons[i] || 'box') + '</span>' + esc(g.name) + icon('chevron') + '</a>' +
    '<div class="t3-side__fly"><h4>' + esc(g.name) + '</h4><ul>' +
    g.items.map((it) => '<li><a href="' + H.groupUrl(it.key) + '">' + esc(it.name) + ' <span>' + it.count + '</span></a></li>').join('') + '</ul></div></li>').join('') +
    '<li class="t3-side__item"><a href="danh-muc.html"><span class="t3-side__ic">' + icon('shield') + '</span>Thương hiệu' + icon('chevron') + '</a>' +
    '<div class="t3-side__fly"><h4>Thương hiệu</h4><ul>' + H.brandsShown.map((b) => '<li><a href="' + H.brandUrl(b) + '">' + esc(b) + ' <span>' + H.brandCount(b) + '</span></a></li>').join('') + '</ul></div></li>';

  // ---- Banner trượt: ảnh sản phẩm thật, tự chuyển 6 giây, dừng khi rê chuột ----
  $$('.t3-slide__img').forEach((box) => {
    box.innerHTML = box.dataset.imgs.split(',').map(bySlug).filter(Boolean).map((p) => eager(img(big(p), ''))).join('');
  });
  const slides = $$('.t3-slide'), dots = $('#t3-dots');
  let cur = 0, timer;
  dots.innerHTML = slides.map((_, i) => '<button type="button" aria-label="Slide ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>').join('');
  const go = (i) => {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-on', k === cur); s.setAttribute('aria-hidden', k !== cur); });
    $$('button', dots).forEach((d, k) => d.setAttribute('aria-current', k === cur));
  };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const play = () => { if (!reduce) { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); } };
  $$('button', dots).forEach((d, i) => d.addEventListener('click', () => { go(i); play(); }));
  $('.t3-slider__arrow--prev').addEventListener('click', () => { go(cur - 1); play(); });
  $('.t3-slider__arrow--next').addEventListener('click', () => { go(cur + 1); play(); });
  const slider = $('#t3-slider');
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', play);
  let sx = null;
  slider.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); play(); } });
  go(0); play();

  // ---- 3 banner nhỏ bên phải ----
  const banners = [['bien-tan', 'Biến tần (Inverter)', 'Hyundai · Growatt'], ['acb', 'Máy cắt không khí ACB', 'Osemco · Hyundai'], ['lam-mat', 'Quạt & điều hoà tủ điện', 'Primus · Thái Lan']];
  $('#t3-banners').innerHTML = banners.map(([k, t, s]) => {
    const list = P.filter((p) => inKeys(p, [k]));
    return '<a class="t3-banner" href="' + H.groupUrl(k) + '"><div><b>' + t + '</b><small>' + s + ' · ' + list.length + ' sản phẩm</small><span class="t3-pill">Xem ngay</span></div>' +
      '<div class="t3-banner__img">' + eager(img(thumb(picOf(list)), '')) + '</div></a>';
  }).join('');

  // ---- 4 banner hãng ----
  $('#t3-promos').innerHTML = [['Osemco', 'Hàn Quốc'], ['Hyundai', 'Hàn Quốc'], ['Daco', 'Hàn Quốc'], ['Primus', 'Thái Lan']].map(([b, c]) => {
    const list = P.filter((p) => H.matchBrand(p, b));
    return '<a class="t3-promo" href="' + H.brandUrl(b) + '"><div><b>Thiết bị ' + b + '</b><small>' + c + ' · ' + list.length + ' sản phẩm</small><span class="t3-pill">Xem ngay</span></div>' +
      '<div class="t3-promo__img">' + img(thumb(picOf(list)), '') + '</div></a>';
  }).join('');

  // ---- Danh mục nổi bật: thẻ ảnh sản phẩm thật ----
  const featured = ['ats', 'acb', 'mccb', 'contactor', 'relay', 'bien-tan', 'dong-ho', 'nhiet-do', 'tin-hieu', 'ssr', 'lam-mat', 'nlmt'];
  $('#t3-cats').innerHTML = featured.map((k) => H.groupByKey.get(k)).filter(Boolean).map((g) => {
    const list = P.filter((p) => H.inGroup(p, g));
    return '<a class="t3-cat" href="' + H.groupUrl(g.key) + '"><div class="t3-cat__img">' + img(thumb(picOf(list)), '') + '</div><b>' + esc(g.name) + '</b><small>' + g.count + ' sản phẩm</small></a>';
  }).join('');

  // ---- Khối sản phẩm theo nhóm: khung ảnh trái + thanh lọc + băng chuyền ----
  const blocks = [
    { t: 'Thiết Bị <span>Đóng Cắt</span>', p: 'Bộ chuyển nguồn ATS, máy cắt ACB, aptomat MCCB / MCB, khởi động từ, relay bảo vệ.', keys: ['ats', 'acb', 'mccb', 'mcb', 'contactor', 'relay'] },
    { t: 'Đo Lường &amp; <span>Điều Khiển</span>', p: 'Đồng hồ hiển thị, điều khiển nhiệt độ, chuyển đổi tín hiệu, relay bán dẫn, bộ nguồn…', keys: ['dong-ho', 'nhiet-do', 'tin-hieu', 'ssr', 'nguon', 'den-bao', 'encoder', 'bom'] },
    { t: 'Biến Tần &amp; <span>Năng Lượng</span>', p: 'Biến tần, thiết bị năng lượng mặt trời, quạt và điều hoà tủ điện.', keys: ['bien-tan', 'nlmt', 'lam-mat'] },
  ];
  $('#t3-blocks').innerHTML = blocks.map((b, i) => {
    const all = P.filter((p) => inKeys(p, b.keys));
    const subs = b.keys.map((k) => H.groupByKey.get(k)).filter((g) => g && g.count > 0);
    const pic = picOf(all);
    const brands = [...new Set(all.map((p) => p.brand).filter(Boolean))];
    return '<section class="section' + (i % 2 ? ' section--white' : '') + '"><div class="container">' +
      '<div class="t3-title"><h2>' + b.t + '</h2><p>' + b.p + '</p></div>' +
      '<div class="t3-block" data-block="' + i + '">' +
      '<aside class="t3-block__aside"><div class="t3-block__visual">' + img(big(pic), '') + '<b>' + b.t.replace(/<\/?span>/g, '') + '</b><small>' + all.length + ' sản phẩm · ' + brands.slice(0, 3).join(', ') + '</small></div>' +
      '<div class="t3-trend"><h4>Xu hướng tìm kiếm</h4><div>' + subs.slice(0, 6).map((g) => '<a href="' + H.groupUrl(g.key) + '">' + esc(g.name.replace(/\s*\(.*\)/, '')) + '</a>').join('') + '</div></div></aside>' +
      '<div class="t3-block__main">' +
      '<div class="t3-filter"><div class="t3-filter__chips"><button type="button" aria-pressed="true" data-k="*">Tất cả sản phẩm</button>' +
      subs.map((g) => '<button type="button" aria-pressed="false" data-k="' + g.key + '">' + esc(g.name) + '</button>').join('') + '</div>' +
      '<button class="t3-filter__arrow prev" type="button" aria-label="Xem trước" data-icon="chevron"></button><button class="t3-filter__arrow next" type="button" aria-label="Xem tiếp" data-icon="chevron"></button></div>' +
      '<div class="scroller" data-list></div>' +
      '<div class="t3-block__more"><a class="btn btn--navy" data-more href="' + H.groupUrl(b.keys[0]) + '">Xem tất cả →</a></div>' +
      '</div></div></div></section>';
  }).join('');
  $$('#t3-blocks [data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  $$('.t3-block').forEach((el) => {
    const b = blocks[Number(el.dataset.block)], list = $('[data-list]', el), more = $('[data-more]', el);
    const show = (k) => {
      const items = P.filter((p) => (k === '*' ? inKeys(p, b.keys) : inKeys(p, [k])))
        .sort((x, y) => (bestIds.has(y.id) - bestIds.has(x.id)) || (y.imgs.length > 0) - (x.imgs.length > 0)).slice(0, 12);
      list.innerHTML = items.map(cardHTML).join('');
      list.scrollLeft = 0;
      more.href = H.groupUrl(k === '*' ? b.keys[0] : k);
      $$('.t3-filter__chips button', el).forEach((c) => c.setAttribute('aria-pressed', c.dataset.k === k));
    };
    $('.t3-filter__chips', el).addEventListener('click', (e) => { const c = e.target.closest('button'); if (c) show(c.dataset.k); });
    const step = () => (list.firstElementChild ? list.firstElementChild.getBoundingClientRect().width + 16 : 300);
    $('.t3-filter__arrow.prev', el).addEventListener('click', () => list.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('.t3-filter__arrow.next', el).addEventListener('click', () => list.scrollBy({ left: step(), behavior: 'smooth' }));
    show('*');
  });

  // Mũi tên cho dải danh mục nổi bật
  $$('[data-for="t3-cats"]').forEach((b) => b.addEventListener('click', () => {
    const sc = $('#t3-cats'), w = sc.firstElementChild ? sc.firstElementChild.getBoundingClientRect().width + 16 : 200;
    sc.scrollBy({ left: b.classList.contains('prev') ? -w * 2 : w * 2, behavior: 'smooth' });
  }));

  // ---- Kiến thức mới nhất ----
  H.loadPosts().then((list) => {
    $('#posts').innerHTML = list.slice(0, 3).map((p) => H.postCardHTML(p).replace('</p></div></article>', '</p><a class="post__more" href="' + H.postUrl(p) + '">Đọc tiếp »</a></div></article>')).join('');
  }).catch(() => { $('#posts').innerHTML = '<p class="muted">Không tải được tin tức.</p>'; });

  // ---- Khách hàng nói gì (giữ nguyên nội dung web cũ) ----
  const quotes = [
    ['Đã mua ở đây nhiều sản phẩm, sản phẩm chất lượng và chế độ bảo hành rất tốt, rất hài lòng.', 'Chị Nga'],
    ['Thiết bị điện an toàn, chất lượng, hướng dẫn lắp đặt tận tình đánh giá 5 sao cho htat.vn', 'Anh Hiếu'],
    ['Nhân viên tư vấn nhiệt tình, thái độ phục vụ tốt, đã mua ở nhiều cửa hàng nhưng vẫn thích htat.vn nhất', 'Chị Bông'],
  ];
  $('#quotes').innerHTML = quotes.map((q) => '<blockquote class="quote">' + icon('quote') + '<p>' + esc(q[0]) + '</p><footer>— ' + esc(q[1]) + '</footer></blockquote>').join('');
})();
