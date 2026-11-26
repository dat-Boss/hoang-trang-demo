/* =========================================================
   HTAT.VN — Bản mẫu: phần dùng chung cho mọi trang
   (đầu trang, chân trang, menu, tìm kiếm, giỏ báo giá)
   ========================================================= */
(function () {
  'use strict';

  const D = window.HTAT_DATA;
  const SITE = {
    company: 'CÔNG TY TNHH KỸ THUẬT TỰ ĐỘNG HOÀNG TRANG',
    address: '308/18 Bình Lợi, Phường 13, Quận Bình Thạnh, Tp. HCM',
    hotline: '0975.629.596',
    zalo: '0909.428.442',
    email: 'support.hatec@htat.vn',
    hours: '8:30 – 20:00',
    logo: 'https://htat.vn/wp-content/uploads/2019/01/logo-1.png',
    old: 'https://htat.vn',
  };
  SITE.tel = 'tel:' + SITE.hotline.replace(/\D/g, '');
  SITE.zaloUrl = 'https://zalo.me/' + SITE.zalo.replace(/\D/g, '');

  /* ---------- Biểu tượng (nét vẽ kiểu Lucide) ---------- */
  const P = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    cart: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.7a1 1 0 0 0-.2-.6l-3.5-4.3A1 1 0 0 0 17.5 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    pin: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>',
    quote: '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.8-1.6l9.9-10.2a.5.5 0 0 1 .9.5l-1.9 6A1 1 0 0 0 13 10h7a1 1 0 0 1 .8 1.6l-9.9 10.2a.5.5 0 0 1-.9-.5l1.9-6A1 1 0 0 0 11 14z"/>',
    toggle: '<rect width="20" height="12" x="2" y="6" rx="6"/><circle cx="16" cy="12" r="2"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    thermo: '<path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
    fan: '<path d="M10.8 9.9a8 8 0 0 1 .3-7.9 4 4 0 0 1 3.8 6.6M12.7 13.3a8 8 0 0 1-7.4 2.6 4 4 0 0 1 2.2-7.3M14.1 10.4a8 8 0 0 1 5.6 5.6 4 4 0 0 1-7.6 1"/><circle cx="12" cy="12" r="2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    light: '<path d="M9 18h6M10 22h4M15 14c.2-1 .7-1.7 1.5-2.5A4.6 4.6 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6a2 2 0 0 1 .7 1.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }

  /* ---------- Tiện ích ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, ' ').trim();
  const params = new URLSearchParams(location.search);

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } },
  };

  const byId = new Map(D.products.map((p) => [p.id, p]));
  const groupItems = D.groups.flatMap((g) => g.items.map((i) => Object.assign({ group: g.name }, i)));
  const groupByKey = new Map(groupItems.map((g) => [g.key, g]));
  const inGroup = (p, g) => p.cats.some((c) => g.cats.includes(c));
  const productUrl = (p) => 'san-pham.html?id=' + p.id;
  const groupUrl = (k) => 'danh-muc.html?nhom=' + encodeURIComponent(k);
  const brandUrl = (b) => 'danh-muc.html?hang=' + encodeURIComponent(b);
  // Khớp thương hiệu: theo danh mục hãng, hoặc tên hãng xuất hiện trong tên / trường "Thương hiệu" của web cũ
  const matchBrand = (p, b) => {
    const nb = norm(b);
    return norm(p.brand) === nb || (' ' + norm(p.name + ' ' + p.hang) + ' ').includes(' ' + nb + ' ');
  };
  const brandCount = (b) => D.products.filter((p) => matchBrand(p, b)).length;
  // Chỉ hiện hãng đang có sản phẩm (DAH, Samwha, Smatgen hiện chưa có sản phẩm nào trên web cũ)
  const brandsShown = D.brands.filter((b) => brandCount(b) > 0);
  const searchIndex = D.products.map((p) => ({ p, t: norm(p.name + ' ' + p.ma + ' ' + p.brand + ' ' + p.slug) }));

  function search(q, limit) {
    const words = norm(q).split(' ').filter(Boolean);
    if (!words.length) return [];
    const res = searchIndex.filter((x) => words.every((w) => x.t.includes(w))).map((x) => x.p);
    const nq = norm(q).replace(/ /g, '');
    res.sort((a, b) => (norm(b.ma).replace(/ /g, '') === nq) - (norm(a.ma).replace(/ /g, '') === nq));
    return limit ? res.slice(0, limit) : res;
  }

  /* ---------- Giỏ báo giá (bản mẫu: lưu trên trình duyệt) ---------- */
  const cart = {
    items() { return store.get('htat_cart', []).filter((i) => byId.has(i.id)); },
    save(list) { store.set('htat_cart', list); updateCartBadges(); },
    add(id, qty) {
      const list = this.items(); const it = list.find((i) => i.id === id);
      if (it) it.qty += qty; else list.push({ id, qty });
      this.save(list);
    },
    setQty(id, qty) { const list = this.items(); const it = list.find((i) => i.id === id); if (it) it.qty = Math.max(1, qty); this.save(list); },
    remove(id) { this.save(this.items().filter((i) => i.id !== id)); },
    clear() { this.save([]); },
    count() { return this.items().reduce((s, i) => s + i.qty, 0); },
  };
  function updateCartBadges() {
    const n = cart.count();
    $$('.badge-count').forEach((b) => { b.textContent = n > 99 ? '99+' : n; b.dataset.n = n; });
  }

  /* ---------- Thông báo nhỏ ---------- */
  let toastTimer;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Ảnh: tự thay ô "đang cập nhật" khi lỗi ---------- */
  function img(src, alt, cls) {
    if (!src) return '<div class="img-ph">Ảnh đang cập nhật</div>';
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" ' + (cls ? 'class="' + cls + '" ' : '') + 'onerror="this.outerHTML=\'<div class=&quot;img-ph&quot;>Ảnh đang cập nhật</div>\'">';
  }
  const thumb = (p) => (p.imgs[0] ? p.imgs[0].thumb || p.imgs[0].src : '');

  /* ---------- Thẻ sản phẩm ---------- */
  function cardHTML(p) {
    return '<article class="card">' +
      '<a class="card__img" href="' + productUrl(p) + '" tabindex="-1" aria-hidden="true">' + img(thumb(p), p.name) + '</a>' +
      '<div class="card__body">' +
      '<div class="card__brand">' + esc(p.brand) + '</div>' +
      '<h3 class="card__name"><a href="' + productUrl(p) + '" title="' + esc(p.name) + '">' + esc(p.name) + '</a></h3>' +
      '<div class="card__code mono">' + (p.ma ? esc(p.ma) : '&nbsp;') + '</div>' +
      '<div class="card__price">Giá: Liên hệ</div>' +
      '<button class="btn btn--outline" type="button" data-add="' + p.id + '">' + icon('plus') +
      '<span class="lbl-long">Thêm vào giỏ báo giá</span><span class="lbl-short">Thêm vào giỏ</span></button>' +
      '</div></article>';
  }
  /* ---------- Thẻ bài viết ---------- */
  const postUrl = (p) => 'bai-viet.html?id=' + p.id;
  const fmtDate = (d) => { const x = d.split('-'); return x[2] + '/' + x[1] + '/' + x[0]; };
  function postCardHTML(p) {
    return '<article class="post"><a class="post__img" href="' + postUrl(p) + '" tabindex="-1" aria-hidden="true">' + img(p.img, '') + '</a>' +
      '<div class="post__body"><time datetime="' + p.date + '">' + fmtDate(p.date) + (p.minutes ? ' · ' + p.minutes + ' phút đọc' : '') + '</time>' +
      '<h3><a href="' + postUrl(p) + '">' + esc(p.title) + '</a></h3><p>' + esc(p.excerpt) + '</p></div></article>';
  }
  /* ---------- Đổi link web cũ (htat.vn) trong mô tả / bài viết sang trang mới ----------
     - trang sản phẩm, bài viết, danh mục, trang chủ, liên hệ… -> trang tương ứng trên web mới
     - link tới file ảnh (wp-content), trang quản trị (wp-admin) và link không khớp -> bỏ link, giữ chữ/ảnh */
  const OLD_PAGES = { 'tin-tuc': 'tin-tuc.html', 'gioi-thieu': 'gioi-thieu.html', 'lien-he': 'lien-he.html', 'gio-hang': 'gio-hang.html', 'san-pham': 'danh-muc.html', 'cua-hang': 'danh-muc.html' };
  const OLD_GROUPS = { ats: 'ats', acb: 'acb', mcb: 'mcb', mccb: 'mccb', contactor: 'contactor', mc: 'contactor', inverter: 'bien-tan', 'relay-abb': 'relay', 'solid-state-relay': 'ssr', 'nang-luong-mat-troi': 'nlmt', 'fan-blower': 'lam-mat', thermostat: 'nhiet-do' };
  const OLD_BRANDS = { osemco: 'Osemco', hyundai: 'Hyundai', daco: 'Daco', 'primus-thuong-hieu': 'Primus', primus: 'Primus', growatt: 'Growatt', ge: 'GE' };
  const bySlug = new Map(D.products.map((p) => [p.slug, p]));
  function localUrl(href) {
    if (!/^(https?:)?\/\//i.test(href || '')) return undefined;          // #neo, mailto:, tel:, link nội bộ: giữ nguyên
    let u; try { u = new URL(href, 'https://htat.vn/'); } catch (e) { return null; }
    if (!/(^|\.)htat\.vn$/i.test(u.hostname)) return undefined;          // không phải web cũ: giữ nguyên
    const p = u.pathname.split('/').filter(Boolean).map((s) => { try { return decodeURIComponent(s).toLowerCase(); } catch (e) { return s.toLowerCase(); } });
    if (!p.length) return 'index.html';
    if (OLD_PAGES[p[0]]) return OLD_PAGES[p[0]];
    if (p[0] === 'danh-muc') {
      if (p[1] === 'thuong-hieu' && OLD_BRANDS[p[2]] && p.length === 3) return brandUrl(OLD_BRANDS[p[2]]);
      const g = [...p].reverse().find((s) => OLD_GROUPS[s]);
      if (g) return groupUrl(OLD_GROUPS[g]);
      if (p[1] === 'thuong-hieu' && OLD_BRANDS[p[2]]) return brandUrl(OLD_BRANDS[p[2]]);
      return 'danh-muc.html';
    }
    if (p.length === 1) {
      const prod = bySlug.get(p[0]);
      if (prod) return productUrl(prod);
      const post = (window.HTAT_POSTS || []).find((x) => x.slug === p[0]);
      if (post) return 'bai-viet.html?id=' + post.id;
    }
    return null;                                                           // wp-content, wp-admin, không khớp
  }
  function localizeLinks(root) {
    $$('a[href]', root).forEach((a) => {
      const t = localUrl(a.getAttribute('href'));
      if (t === undefined) return;
      if (t) { a.setAttribute('href', t); a.removeAttribute('target'); return; }
      a.replaceWith(...a.childNodes);                                      // bỏ link, giữ nội dung
    });
  }

  // Bài viết nạp sẵn qua assets/js/tin-tuc.js (chạy được cả khi mở file trực tiếp)
  const loadPosts = () => (Array.isArray(window.HTAT_POSTS) && window.HTAT_POSTS.length
    ? Promise.resolve(window.HTAT_POSTS)
    : Promise.reject(new Error('Chưa nạp assets/js/tin-tuc.js')));

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    const id = Number(b.dataset.add);
    const qtyInput = b.dataset.qtyFrom ? $(b.dataset.qtyFrom) : null;
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
    cart.add(id, qty);
    toast('Đã thêm vào giỏ báo giá (' + cart.count() + ' sản phẩm)');
  });

  /* ---------- Đầu trang ---------- */
  function megaHTML() {
    const group = (g) => '<div class="mega__group"><h4>' + esc(g.name) + '</h4><ul>' +
      g.items.map((i) => '<li><a href="' + groupUrl(i.key) + '">' + esc(i.name) + ' <span>' + i.count + '</span></a></li>').join('') +
      '</ul></div>';
    // 4 cột cố định: [Đóng cắt] [Biến tần + Làm mát + NLMT xếp chồng] [Đo lường & điều khiển] [Thương hiệu]
    const g = D.groups;
    const colsHTML = [[g[0]], [g[1], g[3], g[4]], [g[2]]]
      .map((c) => '<div class="mega__col">' + c.filter(Boolean).map(group).join('') + '</div>').join('');
    return '<div class="mega" id="mega"><div class="container mega__inner">' +
      colsHTML +
      '<div class="mega__col mega__brands"><h4>Thương hiệu</h4><ul>' +
      brandsShown.map((b) => '<li><a href="' + brandUrl(b) + '">' + esc(b) + ' <span>' + brandCount(b) + '</span></a></li>').join('') +
      '</ul></div></div>' +
      '<div class="container mega__foot"><a href="danh-muc.html">Xem tất cả ' + D.products.length + ' sản phẩm →</a></div></div>';
  }

  function headerHTML(active) {
    const nav = [
      ['index.html', 'Trang chủ', 'home'],
      ['gioi-thieu.html', 'Giới thiệu', 'about'],   // giới thiệu công ty trước, rồi mới đến sản phẩm
      ['danh-muc.html', 'Sản phẩm', 'products'],
      ['tin-tuc.html', 'Tin tức', 'news'],
      ['lien-he.html', 'Liên hệ', 'contact'],
    ];
    const logo = '<a class="logo" href="index.html" aria-label="Trang chủ Hoàng Trang"><img src="' + SITE.logo + '" alt="Logo Hoàng Trang" width="56" height="56">' +
      '<span class="logo__text"><b>HOÀNG TRANG</b><small>Kỹ thuật tự động</small></span></a>';
    const searchBox = (id) => '<form class="search" action="danh-muc.html" role="search" data-search>' +
      '<label class="sr-only" for="' + id + '">Tìm sản phẩm</label>' +
      '<input id="' + id + '" name="q" type="search" autocomplete="off" placeholder="Tìm theo mã hàng, ví dụ OSS-61-TN" value="' + esc(params.get('q') || '') + '">' +
      '<button type="submit" aria-label="Tìm">' + icon('search') + '</button><div class="search__suggest" role="listbox"></div></form>';

    // Đầu trang máy tính — GIAO DIỆN 3 (kiểu sàn thiết bị kỹ thuật, tham khảo ausotech.com):
    // dải mảnh (khẩu hiệu + Hotline) · đầu trang xanh than (logo · ô tìm to · liên hệ · giỏ) · thanh menu trắng (☰ Danh mục + menu)
    return '<div class="proto-note">Bản mẫu giao diện — dữ liệu lấy từ htat.vn, chưa kết nối đặt hàng thật.</div>' +
      '<div class="t3-top"><div class="container">' +
      '<span class="t3-top__slogan">HATEC · Đại diện chính thức Hyundai · Osemco · Daco · General Electric · Primus</span>' +
      '<span class="t3-top__hot">HOTLINE <a href="' + SITE.tel + '">' + SITE.hotline + '</a></span></div></div>' +
      '<header class="t3-head"><div class="container t3-head__row">' + logo + searchBox('q-desk') +
      '<div class="t3-head__acts">' +
      '<a class="t3-act" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + '<span><small>Tư vấn Zalo</small><b>' + SITE.zalo + '</b></span></a>' +
      '<a class="t3-act t3-act--cart" href="gio-hang.html" aria-label="Giỏ báo giá">' + icon('cart') + '<span class="badge-count" data-n="0">0</span><span><small>Giỏ</small><b>Báo giá</b></span></a>' +
      '</div></div></header>' +
      '<nav class="t3-nav" aria-label="Menu chính"><div class="container t3-nav__row">' +
      '<button class="t3-nav__cat nav__cat" type="button" aria-expanded="false" aria-controls="mega">' + icon('menu') + 'Danh mục sản phẩm</button>' +
      '<ul class="t3-nav__links">' + nav.map((n) => '<li><a href="' + n[0] + '"' + (n[2] === active ? ' aria-current="page"' : '') + '>' + n[1] + '</a></li>').join('') + '</ul>' +
      '<a class="btn btn--accent t3-nav__cta" href="gio-hang.html">Yêu cầu báo giá</a>' +
      '</div>' + megaHTML() + '</nav>' +
      '<div class="mheader"><div class="container"><div class="mheader__row">' +
      '<button class="icon-btn" type="button" data-drawer-open aria-label="Mở menu">' + icon('menu') + '</button>' + logo +
      '<a class="icon-btn" href="gio-hang.html" aria-label="Giỏ báo giá">' + icon('cart') + '<span class="badge-count" data-n="0">0</span></a>' +
      '</div><div class="mheader__search">' + searchBox('q-mob') + '</div></div></div>' +
      '<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__bg" data-drawer-close></div>' +
      '<div class="drawer__panel" role="dialog" aria-label="Menu"><div class="drawer__head"><b>Danh mục</b>' +
      '<button class="icon-btn" type="button" data-drawer-close aria-label="Đóng menu">' + icon('x') + '</button></div>' +
      D.groups.map((g) => '<details><summary>' + esc(g.name) + '</summary>' + g.items.map((i) => '<a href="' + groupUrl(i.key) + '">' + esc(i.name) + ' (' + i.count + ')</a>').join('') + '</details>').join('') +
      '<details><summary>Thương hiệu</summary>' + brandsShown.map((b) => '<a href="' + brandUrl(b) + '">' + esc(b) + '</a>').join('') + '</details>' +
      '<div class="drawer__links">' + nav.map((n) => '<a href="' + n[0] + '">' + n[1] + '</a>').join('') + '</div>' +
      '<div class="drawer__contact"><span>Hotline: <a href="' + SITE.tel + '"><b>' + SITE.hotline + '</b></a></span><span>Zalo: <a href="' + SITE.zaloUrl + '">' + SITE.zalo + '</a></span><span>Giờ làm việc: ' + SITE.hours + '</span></div>' +
      '</div></div>';
  }

  function footerHTML(page) {
    const policies = [
      ['Giới thiệu', 'gioi-thieu.html'], ['Tin tức', 'tin-tuc.html'], ['Liên hệ', 'lien-he.html'], ['Giỏ báo giá', 'gio-hang.html'],
      // Không còn link nào sang web cũ (anh duyệt 13/11/2026). Các trang chính sách
      // (bảo hành, đổi trả, quy định chung, bảo mật) sẽ thêm khi có nội dung thật.
    ];
    const prod = groupItems.filter((g) => ['ats', 'acb', 'mccb', 'contactor', 'bien-tan', 'dong-ho', 'lam-mat'].includes(g.key));
    return '<footer class="footer"><div class="container"><div class="footer__grid">' +
      '<div class="footer__company"><h4>Thông tin liên hệ</h4><b>' + SITE.company + '</b>' +
      '<p>Địa chỉ: ' + SITE.address + '</p><p>Điện thoại: <a href="' + SITE.tel + '">' + SITE.hotline + '</a></p>' +
      '<p>Email: <a href="mailto:' + SITE.email + '">' + SITE.email + '</a></p><p>Zalo: <a href="' + SITE.zaloUrl + '">' + SITE.zalo + '</a></p>' +
      '<p>Thời gian: ' + SITE.hours + '</p></div>' +
      '<details class="foot-fold" open><summary><h4>Sản phẩm</h4></summary><ul>' + prod.map((g) => '<li><a href="' + groupUrl(g.key) + '">' + esc(g.name) + '</a></li>').join('') + '</ul></details>' +
      '<details class="foot-fold" open><summary><h4>Thông tin</h4></summary><ul>' + policies.map((p) => '<li><a href="' + p[1] + '">' + p[0] + '</a></li>').join('') + '</ul></details>' +
      '<div><h4>Đăng ký nhận tư vấn miễn phí</h4><form class="footer__sub" data-proto-form="Đăng ký nhận tư vấn">' +
      '<label class="sr-only" for="sub-email">Email</label><input id="sub-email" type="email" required placeholder="Địa chỉ email">' +
      '<button class="btn btn--accent" type="submit">Gửi</button></form></div>' +
      '</div></div><div class="footer__bottom"><div class="container">© ' + new Date().getFullYear() + ' htat.vn — ' + SITE.company + '</div></div></footer>' +
      // Thanh dưới kiểu ứng dụng (điện thoại): Trang chủ · Danh mục · Gọi · Zalo · Giỏ
      '<nav class="mbar" aria-label="Thao tác nhanh">' +
      '<a href="index.html"' + (page === 'home' ? ' aria-current="page"' : '') + '>' + icon('home') + '<span class="mbar__lbl">Trang chủ</span></a>' +
      '<button type="button" data-drawer-open>' + icon('grid') + '<span class="mbar__lbl">Danh mục</span></button>' +
      '<a class="mbar__call" href="' + SITE.tel + '">' + icon('phone') + '<span class="mbar__lbl">Gọi</span></a>' +
      '<a class="mbar__zalo" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + '<span class="mbar__lbl">Zalo</span></a>' +
      '<a href="gio-hang.html"' + (page === 'cart' ? ' aria-current="page"' : '') + '>' + icon('cart') + '<span class="badge-count" data-n="0">0</span><span class="mbar__lbl"><span class="lbl-l">Giỏ báo giá</span><span class="lbl-s">Giỏ</span></span></a></nav>' +
      '<button class="to-top" type="button" aria-label="Lên đầu trang">' + icon('chevron') + '</button>' +
      // Nút nổi gọi / Zalo ở góc phải (máy tính)
      '<div class="fab" aria-label="Liên hệ nhanh"><a class="fab__call" href="' + SITE.tel + '" aria-label="Gọi ' + SITE.hotline + '">' + icon('phone') + '</a>' +
      '<a class="fab__zalo" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener" aria-label="Chat Zalo">Zalo</a></div>';
  }

  /* ---------- Gắn sự kiện chung ---------- */
  function bindHeader() {
    // Mega menu
    const btn = $('.nav__cat'), mega = $('#mega');
    if (btn && mega) {
      const set = (o) => { mega.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); };
      btn.addEventListener('click', (e) => { e.stopPropagation(); set(!mega.classList.contains('open')); });
      document.addEventListener('click', (e) => { if (!e.target.closest('#mega')) set(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    }
    // Ô tìm kiếm thả xuống ở đầu trang (máy tính)
    const sBtn = $('.hdr__searchbtn'), sBox = $('#hdr-search');
    if (sBtn && sBox) {
      const setS = (o) => { sBox.hidden = !o; sBtn.setAttribute('aria-expanded', o); if (o) $('input', sBox).focus(); };
      sBtn.addEventListener('click', () => setS(sBox.hidden));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sBox.hidden) { setS(false); sBtn.focus(); } });
      if (params.get('q')) setS(true);
    }
    // Đầu trang đổ bóng khi cuộn
    const hdr = $('.hdr') || $('.t3-nav');
    if (hdr) {
      const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 40);
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    // Ngăn kéo điện thoại
    const drawer = $('#drawer');
    const openD = (o) => { drawer.classList.toggle('open', o); drawer.setAttribute('aria-hidden', !o); document.body.style.overflow = o ? 'hidden' : ''; };
    $$('[data-drawer-open]').forEach((b) => b.addEventListener('click', () => openD(true)));
    $$('[data-drawer-close]').forEach((b) => b.addEventListener('click', () => openD(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) openD(false); });

    // Tìm kiếm gợi ý
    $$('[data-search]').forEach((form) => {
      const input = $('input', form), box = $('.search__suggest', form);
      let idx = -1;
      const render = () => {
        const q = input.value.trim();
        if (q.length < 2) { box.classList.remove('open'); return; }
        const r = search(q, 6);
        idx = -1;
        box.innerHTML = r.length
          ? r.map((p) => '<a href="' + productUrl(p) + '" role="option">' + img(thumb(p), '') + '<span><span class="s-name">' + esc(p.name) + '</span>' + (p.ma ? '<span class="mono muted">' + esc(p.ma) + '</span>' : '') + '</span></a>').join('') +
            '<a href="danh-muc.html?q=' + encodeURIComponent(q) + '"><b>Xem tất cả kết quả cho “' + esc(q) + '”</b></a>'
          : '<div class="s-empty">Không tìm thấy “' + esc(q) + '”. Gọi ' + SITE.hotline + ' để được hỗ trợ tìm mã.</div>';
        box.classList.add('open');
      };
      input.addEventListener('input', render);
      input.addEventListener('focus', render);
      input.addEventListener('keydown', (e) => {
        const links = $$('a', box);
        if (!links.length) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
          links.forEach((l, i) => l.classList.toggle('active', i === idx));
        } else if (e.key === 'Enter' && idx >= 0) { e.preventDefault(); location.href = links[idx].href; }
        else if (e.key === 'Escape') box.classList.remove('open');
      });
      document.addEventListener('click', (e) => { if (!form.contains(e.target)) box.classList.remove('open'); });
    });

    // Form bản mẫu (không gửi thật)
    $$('[data-proto-form]').forEach((f) => f.addEventListener('submit', (e) => {
      e.preventDefault();
      toast('Bản mẫu: “' + f.dataset.protoForm + '” sẽ dùng form có sẵn trên web thật.');
    }));
  }

  /* ---------- Khởi tạo ---------- */
  function init() {
    const page = document.body.dataset.page;
    const h = $('#site-header'), f = $('#site-footer');
    if (h) h.outerHTML = headerHTML(page);
    if (f) f.outerHTML = footerHTML(page);
    bindHeader();
    updateCartBadges();
    $$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
    // Chân trang: máy tính luôn mở danh sách; điện thoại gập lại (bấm để mở)
    if (window.matchMedia('(max-width: 767px)').matches) $$('.foot-fold').forEach((d) => d.removeAttribute('open'));
    // Nút lên đầu trang (điện thoại): hiện sau khi cuộn quá 1 màn hình
    const top = $('.to-top');
    if (top) {
      top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      const onS = () => top.classList.toggle('show', window.scrollY > window.innerHeight);
      window.addEventListener('scroll', onS, { passive: true }); onS();
    }
  }
  init();

  window.HTAT = { D, SITE, icon, esc, norm, params, store, byId, groupItems, groupByKey, inGroup, matchBrand, brandCount, brandsShown, productUrl, groupUrl, brandUrl, search, cart, toast, img, thumb, cardHTML, postCardHTML, postUrl, fmtDate, loadPosts, localizeLinks, updateCartBadges, $, $$ };
})();
