/* Trang chi tiết sản phẩm */
(function () {
  'use strict';
  const H = window.HTAT, { D, SITE, icon, esc, $, $$, params, cardHTML, img } = H;

  const DEFAULT_SLUG = 'bo-chuyen-nguon-ats-osung-3p100a';
  const p = H.byId.get(Number(params.get('id'))) || D.products.find((x) => x.slug === DEFAULT_SLUG) || D.products[0];
  const group = H.groupItems.find((g) => H.inGroup(p, g));

  document.title = p.name + ' – Hoàng Trang';
  $('#crumbs').innerHTML = '<li><a href="index.html">Trang chủ</a></li><li><a href="danh-muc.html">Sản phẩm</a></li>' +
    (group ? '<li><a href="' + H.groupUrl(group.key) + '">' + esc(group.name) + '</a></li>' : '') + '<li>' + esc(p.name) + '</li>';

  // Thông tin chính (chỉ dữ liệu có sẵn trên web cũ)
  $('#pd-brand').textContent = p.brand;
  $('#pd-name').textContent = p.name;
  const facts = [
    ['Mã sản phẩm', p.ma ? '<span class="mono" style="font-size:15px">' + esc(p.ma) + '</span>' : ''],
    ['Thương hiệu', esc(p.hang || p.brand)],
    ['Xuất xứ', esc(p.xuatXu)],
    ['Bảo hành', esc(p.baoHanh)],
    ['Tình trạng', p.tinhTrang ? '<span class="' + (/còn/i.test(p.tinhTrang) ? 'ok' : '') + '">' + esc(p.tinhTrang) + '</span>' : ''],
  ].filter((f) => f[1]);
  $('#pd-facts').innerHTML = facts.map((f) => '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>').join('');
  $('#pd-price-note').textContent = 'Báo giá qua Hotline ' + SITE.hotline + ' hoặc Zalo ' + SITE.zalo;

  $('#btn-add').dataset.add = p.id;
  $('#btn-add').innerHTML = icon('plus') + 'Thêm vào giỏ báo giá';
  $$('[data-step]').forEach((b) => b.addEventListener('click', () => {
    const i = $('#qty'); i.value = Math.max(1, (parseInt(i.value, 10) || 1) + Number(b.dataset.step));
  }));

  $('#contact-btns').innerHTML = '<a class="btn btn--outline" href="' + SITE.tel + '">' + icon('phone') + 'Gọi ' + SITE.hotline + '</a>' +
    '<a class="btn btn--zalo" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + 'Chat Zalo</a>';
  const extraPhones = p.phones.filter((x) => x !== SITE.hotline && x !== SITE.zalo);
  if (extraPhones.length) $('#pd-phone').innerHTML = 'Liên hệ phụ trách sản phẩm: <a href="tel:' + extraPhones[0].replace(/\D/g, '') + '"><b>' + extraPhones[0] + '</b></a>';

  // 3 ô chính sách (chữ giữ theo web cũ)
  $('#policies').innerHTML = [
    ['shield', 'Bảo hành', p.baoHanh ? esc(p.baoHanh.split(',')[0]) : 'Theo chính sách'],
    ['card', 'Thanh toán', 'Tiền mặt, chuyển khoản'],
    ['receipt', 'Hoá đơn đỏ', 'Không tính phí xuất hoá đơn'],
  ].map((x) => '<div class="policy">' + icon(x[0]) + '<b>' + x[1] + '</b>' + x[2] + '</div>').join('');

  // Thư viện ảnh
  const imgs = p.imgs.length ? p.imgs : [{ src: '', thumb: '' }];
  let cur = 0;
  function showImg(i) {
    cur = i;
    $('#g-main').innerHTML = img(imgs[i].src, p.name).replace('loading="lazy"', 'loading="eager" fetchpriority="high"');
    $$('#g-thumbs button').forEach((b, k) => b.setAttribute('aria-current', k === i));
  }
  $('#g-thumbs').innerHTML = imgs.length > 1 ? imgs.map((m, i) => '<button type="button" aria-label="Ảnh ' + (i + 1) + '">' + img(m.thumb || m.src, '') + '</button>').join('') : '';
  $$('#g-thumbs button').forEach((b, i) => b.addEventListener('click', () => showImg(i)));
  showImg(0);
  // Vuốt đổi ảnh trên điện thoại
  let sx = null;
  $('#g-main').addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  $('#g-main').addEventListener('touchend', (e) => {
    if (sx == null || imgs.length < 2) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) showImg((cur + (dx < 0 ? 1 : -1) + imgs.length) % imgs.length);
  });
  // Phóng to
  const lb = $('#lightbox');
  $('#lb-close').innerHTML = icon('x');
  const openLb = () => { if (!imgs[cur].src) return; $('#lb-img').src = imgs[cur].src; lb.classList.add('open'); };
  $('#g-main').addEventListener('click', openLb);
  $('#g-main').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(); } });
  lb.addEventListener('click', (e) => { if (e.target !== $('#lb-img')) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });

  // Tab: chỉ hiện tab có dữ liệu thật
  const tabs = [['mo-ta', 'Mô tả']];
  const specRows = p.specs.slice();
  function addTabs(hasTables) {
    if (specRows.length || hasTables) { tabs.push(['thong-so', 'Thông số kỹ thuật']); $('#thong-so').hidden = false; }
    if (p.docs.length) { tabs.push(['tai-lieu', 'Tài liệu tải về']); $('#tai-lieu').hidden = false; }
    $('#ptabs').innerHTML = tabs.map((t, i) => '<a class="tab" role="tab" href="#' + t[0] + '" aria-selected="' + (i === 0) + '" style="display:inline-flex;align-items:center;text-decoration:none">' + t[1] + '</a>').join('');
  }

  if (p.docs.length) {
    $('#docs').innerHTML = p.docs.map((u) => {
      const name = decodeURIComponent(u.split('/').pop());
      return '<li><a href="' + esc(u) + '" target="_blank" rel="noopener">' + icon('file') + '<span>' + esc(name) + '</span></a></li>';
    }).join('');
  }

  // Mô tả: tải riêng để trang nhẹ
  fetch('assets/data/mo-ta.json?v=9').then((r) => r.json()).then((all) => {
    const d = all[String(p.id)] || { html: '', tables: [] };
    $('#desc').innerHTML = d.html || '<p class="muted">Mô tả đang được cập nhật.</p>';
    H.localizeLinks($('#desc'));
    let specHTML = '';
    if (specRows.length) specHTML += '<table class="spec-table">' + specRows.map((r) => '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>').join('') + '</table>';
    if (d.tables.length) specHTML += '<div class="prose" style="margin-top:16px">' + d.tables.join('') + '</div>';
    $('#specs').innerHTML = specHTML;
    H.localizeLinks($('#specs'));
    addTabs(d.tables.length > 0);
    requestAnimationFrame(() => { if ($('#desc').scrollHeight <= 700) { $('#desc').classList.remove('collapsed'); $('#desc-more').hidden = true; } });
  }).catch(() => {
    $('#desc').innerHTML = '<p class="muted">Không tải được mô tả. Hãy mở bản mẫu qua máy chủ local (xem README).</p>';
    $('#desc-more').hidden = true;
    addTabs(false);
  });
  $('#desc-more').addEventListener('click', (e) => {
    const c = $('#desc').classList.toggle('collapsed');
    e.target.textContent = c ? 'Xem thêm' : 'Thu gọn';
  });
  // Đánh dấu tab theo vị trí cuộn
  window.addEventListener('scroll', () => {
    let active = tabs[0][0];
    tabs.forEach((t) => { const el = document.getElementById(t[0]); if (el && !el.hidden && el.getBoundingClientRect().top < 160) active = t[0]; });
    $$('#ptabs .tab').forEach((a) => a.setAttribute('aria-selected', a.getAttribute('href') === '#' + active));
  }, { passive: true });

  // Sản phẩm liên quan: cùng nhóm, rồi cùng hãng
  const rel = [];
  const push = (x) => { if (x.id !== p.id && !rel.includes(x) && rel.length < 10) rel.push(x); };
  if (group) D.products.filter((x) => H.inGroup(x, group)).forEach(push);
  D.products.filter((x) => p.brand && x.brand === p.brand).forEach(push);
  $('#related').innerHTML = rel.map(cardHTML).join('');

  // Thanh dưới cố định (điện thoại)
  $('#pbar').innerHTML = '<a class="btn btn--outline" href="' + SITE.tel + '" aria-label="Gọi">' + icon('phone') + '</a>' +
    '<a class="btn btn--zalo" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener" aria-label="Zalo">' + icon('chat') + '</a>' +
    '<button class="btn btn--accent" type="button" data-add="' + p.id + '" data-qty-from="#qty">' + icon('plus') + 'Thêm vào giỏ báo giá</button>';
})();
