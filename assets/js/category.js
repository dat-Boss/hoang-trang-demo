/* Trang danh mục / kết quả tìm kiếm / thương hiệu */
(function () {
  'use strict';
  const H = window.HTAT, { D, icon, esc, $, $$, params, store, cardHTML, img, thumb } = H;
  const PER_PAGE = 16;

  const nhom = params.get('nhom'), hang = params.get('hang'), q = (params.get('q') || '').trim();
  const group = nhom ? H.groupByKey.get(nhom) : null;

  // Tập sản phẩm gốc của trang
  let base, title, desc, crumb;
  if (group) {
    base = D.products.filter((p) => H.inGroup(p, group));
    title = group.name; crumb = [group.group, group.name];
    desc = group.count + ' sản phẩm trong nhóm “' + group.group + '”. Giá: Liên hệ — gọi Hotline ' + H.SITE.hotline + ' để nhận báo giá.';
  } else if (hang) {
    base = D.products.filter((p) => H.matchBrand(p, hang));
    title = 'Thương hiệu ' + hang; crumb = ['Thương hiệu', hang];
    desc = base.length ? 'Các sản phẩm ' + hang + ' đang có trên website.' : '';
  } else if (q) {
    base = H.search(q);
    title = 'Kết quả tìm “' + q + '”'; crumb = ['Tìm kiếm'];
    desc = '';
  } else {
    base = D.products.slice();
    title = 'Tất cả sản phẩm'; crumb = [];
    desc = 'Toàn bộ ' + base.length + ' sản phẩm đang có trên website.';
  }
  document.title = title + ' – Hoàng Trang';
  $('#cat-title').textContent = title;
  $('#cat-desc').textContent = desc;
  $('#crumbs').innerHTML = '<li><a href="index.html">Trang chủ</a></li><li><a href="danh-muc.html">Sản phẩm</a></li>' +
    crumb.map((c) => '<li>' + esc(c) + '</li>').join('');

  // Chuẩn hoá xuất xứ (dữ liệu web cũ viết nhiều kiểu)
  function origin(p) {
    const n = H.norm(p.xuatXu);
    if (!n) return '';
    if (/korea|han quoc/.test(n)) return 'Hàn Quốc';
    if (/thai/.test(n)) return 'Thái Lan';
    if (/china|trung quoc/.test(n)) return 'Trung Quốc';
    if (/usa|my\b|america/.test(n)) return 'Mỹ';
    return p.xuatXu.replace(/\(.*?\)/g, '').trim();
  }
  const brandOf = (p) => p.brand || 'Khác';

  // Trạng thái lọc
  const state = { brands: new Set(), origins: new Set(), sort: 'default', page: 1, view: store.get('htat_view', 'grid') };

  // Bộ lọc: danh mục
  $('#f-groups').innerHTML = '<li><a href="danh-muc.html"' + (!group && !hang && !q ? ' class="active"' : '') + '>Tất cả sản phẩm <span>' + D.products.length + '</span></a></li>' +
    H.groupItems.map((g) => '<li><a href="' + H.groupUrl(g.key) + '"' + (group && g.key === group.key ? ' class="active" aria-current="page"' : '') + '>' + esc(g.name) + ' <span>' + g.count + '</span></a></li>').join('');

  function checkList(el, values, set, key) {
    const counts = {};
    values.forEach((v) => { if (v) counts[v] = (counts[v] || 0) + 1; });
    const keys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    if (!keys.length) { el.innerHTML = '<p class="small muted" style="margin:0">Không có dữ liệu</p>'; return; }
    el.innerHTML = keys.map((k) => '<label class="check"><input type="checkbox" data-' + key + '="' + esc(k) + '"' + (set.has(k) ? ' checked' : '') + '> ' + esc(k) + ' <span class="n">' + counts[k] + '</span></label>').join('');
  }
  checkList($('#f-brands'), base.map(brandOf), state.brands, 'brand');
  checkList($('#f-origins'), base.map(origin), state.origins, 'origin');

  $('#filters').addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.brand != null) t.checked ? state.brands.add(t.dataset.brand) : state.brands.delete(t.dataset.brand);
    if (t.dataset.origin != null) t.checked ? state.origins.add(t.dataset.origin) : state.origins.delete(t.dataset.origin);
    state.page = 1; render();
  });
  $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; render(); });

  // Lưới / danh sách
  const vbtns = $$('.view-toggle button');
  vbtns[0].innerHTML = icon('grid'); vbtns[1].innerHTML = icon('list');
  vbtns.forEach((b) => b.addEventListener('click', () => { state.view = b.dataset.view; store.set('htat_view', state.view); render(); }));

  // Bảng lọc trượt (điện thoại)
  const sheet = $('#filters'), bg = $('#sheet-bg');
  $('#filters-open').innerHTML = icon('filter') + 'Bộ lọc';
  $('#filters-close').innerHTML = icon('x');
  const openSheet = (o) => { sheet.classList.toggle('open', o); bg.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
  $('#filters-open').addEventListener('click', () => openSheet(true));
  $('#filters-close').addEventListener('click', () => openSheet(false));
  $('#filters-apply').addEventListener('click', () => openSheet(false));
  bg.addEventListener('click', () => openSheet(false));

  function filtered() {
    let list = base.filter((p) => (!state.brands.size || state.brands.has(brandOf(p))) && (!state.origins.size || state.origins.has(origin(p))));
    const cmp = { az: (a, b) => a.name.localeCompare(b.name, 'vi'), za: (a, b) => b.name.localeCompare(a.name, 'vi'), code: (a, b) => (a.ma || '~').localeCompare(b.ma || '~') }[state.sort];
    if (cmp) list = list.slice().sort(cmp);
    return list;
  }

  function rowHTML(p) {
    return '<div class="row"><a href="' + H.productUrl(p) + '" tabindex="-1" aria-hidden="true">' + img(thumb(p), '') + '</a>' +
      '<div><a class="row__name" href="' + H.productUrl(p) + '">' + esc(p.name) + '</a></div>' +
      '<div class="mono">' + esc(p.ma || '—') + '</div><div>' + esc(p.brand || '—') + '</div><div class="c-origin">' + esc(origin(p) || '—') + '</div>' +
      '<div><button class="btn btn--outline" type="button" data-add="' + p.id + '">' + icon('plus') + 'Thêm vào giỏ</button></div></div>';
  }

  function render() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    state.page = Math.min(state.page, pages);
    const slice = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);
    const from = list.length ? (state.page - 1) * PER_PAGE + 1 : 0;
    $('#result-count').textContent = 'Hiển thị ' + from + '–' + ((state.page - 1) * PER_PAGE + slice.length) + ' trong ' + list.length + ' sản phẩm';
    vbtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === state.view));
    const isList = state.view === 'list' && window.matchMedia('(min-width: 1024px)').matches;

    if (!list.length) {
      $('#results').innerHTML = '<div class="empty"><p><b>Chưa tìm thấy sản phẩm phù hợp.</b></p><p>Gọi Hotline <a href="' + H.SITE.tel + '">' + H.SITE.hotline + '</a> hoặc Zalo <a href="' + H.SITE.zaloUrl + '">' + H.SITE.zalo + '</a> để được hỗ trợ tìm mã.</p></div>';
    } else if (isList) {
      $('#results').innerHTML = '<div class="list"><div class="row row--head"><span></span><span>Sản phẩm</span><span>Mã</span><span>Hãng</span><span class="c-origin">Xuất xứ</span><span></span></div>' + slice.map(rowHTML).join('') + '</div>';
    } else {
      $('#results').innerHTML = '<div class="grid grid--4">' + slice.map(cardHTML).join('') + '</div>';
    }

    const pg = $('#pager');
    if (pages <= 1) { pg.innerHTML = ''; return; }
    let html = '<button type="button" data-p="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="Trang trước">‹</button>';
    for (let i = 1; i <= pages; i++) html += '<button type="button" data-p="' + i + '"' + (i === state.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
    html += '<button type="button" data-p="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + ' aria-label="Trang sau">›</button>';
    pg.innerHTML = html;
  }
  $('#pager').addEventListener('click', (e) => {
    const b = e.target.closest('[data-p]');
    if (!b || b.disabled) return;
    state.page = Number(b.dataset.p); render();
    $('.cat-head').scrollIntoView({ behavior: 'smooth' });
  });
  window.addEventListener('resize', (() => { let t; return () => { clearTimeout(t); t = setTimeout(render, 150); }; })());
  render();
})();
