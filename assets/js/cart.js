/* Trang giỏ hàng (giỏ báo giá) — chỉ giao diện; luồng thanh toán giữ nguyên trên web thật */
(function () {
  'use strict';
  const H = window.HTAT, { SITE, icon, esc, $, cart, img, thumb } = H;
  const root = $('#cart-root');
  const CHECKOUT_NOTE = 'Bản mẫu: trên web thật, nút này dẫn tới trang Thanh toán hiện có của WooCommerce (giữ nguyên chức năng, chỉ đổi giao diện).';

  function render() {
    const items = cart.items();
    document.body.classList.toggle('has-pbar', items.length > 0);
    if (!items.length) {
      root.innerHTML = '<div class="cart-empty">' + icon('cart') + '<h2>Giỏ hàng đang trống</h2>' +
        '<p class="muted">Chọn sản phẩm cần báo giá, hoặc gọi Hotline <a href="' + SITE.tel + '"><b>' + SITE.hotline + '</b></a> để được tư vấn.</p>' +
        '<div class="btns"><a class="btn btn--accent" href="danh-muc.html">Xem sản phẩm</a><a class="btn btn--outline" href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + icon('chat') + 'Chat Zalo</a></div></div>';
      return;
    }
    const count = items.reduce((s, i) => s + i.qty, 0);
    root.innerHTML = '<div class="cart-layout"><div>' +
      '<div class="cart-table" role="table" aria-label="Sản phẩm trong giỏ">' +
      '<div class="citem citem--head" role="row"><span></span><span>Sản phẩm</span><span>Số lượng</span><span>Đơn giá</span><span></span></div>' +
      items.map((i) => {
        const p = H.byId.get(i.id);
        return '<div class="citem" role="row" data-id="' + p.id + '">' +
          '<a href="' + H.productUrl(p) + '" tabindex="-1" aria-hidden="true">' + img(thumb(p), '') + '</a>' +
          '<div class="citem__info"><a class="citem__name" href="' + H.productUrl(p) + '">' + esc(p.name) + '</a>' +
          (p.ma ? '<div class="mono muted">' + esc(p.ma) + '</div>' : '') + '</div>' +
          '<div class="qty" aria-label="Số lượng"><button type="button" data-d="-1" aria-label="Giảm">−</button>' +
          '<input type="number" min="1" value="' + i.qty + '" aria-label="Số lượng ' + esc(p.name) + '" inputmode="numeric"><button type="button" data-d="1" aria-label="Tăng">+</button></div>' +
          '<div class="citem__price">Liên hệ</div>' +
          '<button class="remove" type="button" data-remove aria-label="Xoá ' + esc(p.name) + '">' + icon('trash') + '</button></div>';
      }).join('') + '</div>' +
      '<div class="cart-foot"><a class="btn btn--outline" href="danh-muc.html">← Tiếp tục xem sản phẩm</a>' +
      '<button class="btn btn--outline" type="button" id="clear">' + icon('trash') + 'Xoá tất cả</button></div></div>' +
      '<aside class="summary" aria-label="Tóm tắt"><h2>Tóm tắt yêu cầu</h2><dl>' +
      '<dt>Số mặt hàng</dt><dd>' + items.length + '</dd><dt>Tổng số lượng</dt><dd>' + count + '</dd>' +
      '<dt class="total">Tổng tiền</dt><dd class="total">Liên hệ</dd></dl>' +
      '<button class="btn btn--accent btn--block desk" type="button" data-checkout>Tiến hành gửi yêu cầu</button>' +
      '<div class="notice" role="status">' + CHECKOUT_NOTE + '</div>' +
      '<p class="note">Cần gấp? Gọi <a href="' + SITE.tel + '"><b>' + SITE.hotline + '</b></a> hoặc Zalo <a href="' + SITE.zaloUrl + '" target="_blank" rel="noopener">' + SITE.zalo + '</a>.</p></aside></div>' +
      '<div class="cart-sticky"><button class="btn btn--accent btn--block" type="button" data-checkout>Tiến hành gửi yêu cầu (' + count + ')</button></div>';
  }

  root.addEventListener('click', (e) => {
    const row = e.target.closest('.citem[data-id]');
    if (e.target.closest('[data-checkout]')) { $('.notice').classList.add('show'); H.toast('Bản mẫu: chưa kết nối trang Thanh toán'); return; }
    if (e.target.closest('#clear')) { if (confirm('Xoá tất cả sản phẩm khỏi giỏ?')) { cart.clear(); render(); } return; }
    if (!row) return;
    const id = Number(row.dataset.id);
    if (e.target.closest('[data-remove]')) { cart.remove(id); render(); return; }
    const step = e.target.closest('[data-d]');
    if (step) { const inp = row.querySelector('input'); cart.setQty(id, (parseInt(inp.value, 10) || 1) + Number(step.dataset.d)); render(); }
  });
  root.addEventListener('change', (e) => {
    const row = e.target.closest('.citem[data-id]');
    if (row && e.target.matches('input')) { cart.setQty(Number(row.dataset.id), parseInt(e.target.value, 10) || 1); render(); }
  });
  render();
})();
