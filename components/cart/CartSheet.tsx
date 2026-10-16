'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from './CartProvider';
import { formatVND } from '@/lib/utils';

export function CartSheet() {
  const { state, dispatch, subtotal, totalCount } = useCart();
  const isOpen = state.isOpen;

  // Checkout modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    note: '',
  });

  const closeCart = () => dispatch({ type: 'SET_CART_OPEN', open: false });

  const freeShippingThreshold = 350000;
  const isFreeShip = subtotal >= freeShippingThreshold;
  const missingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleStartCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'ROMND-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(randomCode);
    setIsSuccess(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
    setFormData({ name: '', phone: '', address: '', paymentMethod: 'cod', note: '' });
    closeCart();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 z-50 bg-[#241B15]"
              aria-label="Đóng giỏ hàng"
            />

            {/* Sheet Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#FAF3EA] text-[#241B15] p-6 sm:p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#241B15]/10 pb-5">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#D64B3A]" />
                  <h2 className="font-serif text-2xl font-medium tracking-tight">Giỏ Hàng Của Bạn</h2>
                  <span className="rounded-full bg-[#E8B4A6]/40 px-2.5 py-0.5 text-xs font-mono font-semibold text-[#241B15]">
                    {totalCount}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="rounded-full p-2 hover:bg-[#241B15]/5 transition-colors"
                  aria-label="Đóng giỏ hàng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Freeship Progress Bar */}
              {state.items.length > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-white/80 border border-[#241B15]/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sans">
                    <Truck className="w-4 h-4 text-[#D64B3A]" />
                    {isFreeShip ? (
                      <span className="font-medium text-[#D64B3A]">
                        🎉 Bạn đã được MIỄN PHÍ vận chuyển toàn quốc!
                      </span>
                    ) : (
                      <span>
                        Mua thêm <strong className="text-[#D64B3A]">{formatVND(missingForFreeShip)}</strong> để được Freeship
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-[#241B15]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D64B3A] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Item List */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {state.items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-full bg-[#E8B4A6]/30 flex items-center justify-center mb-4 text-[#D64B3A]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <p className="font-serif text-xl text-[#241B15]">Giỏ hàng đang trống</p>
                    <p className="mt-2 text-xs font-sans text-[#8B8078] max-w-[260px] leading-relaxed">
                      Hãy chọn cho mình một sắc son Juicy Lasting Tint yêu thích để bờ môi luôn căng mọng rạng rỡ nhé!
                    </p>
                  </div>
                ) : (
                  state.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.shadeName}`}
                      className="flex gap-4 border-b border-[#241B15]/10 pb-5"
                    >
                      {item.imageSrc ? (
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#E8B4A6]/20">
                          <Image
                            src={item.imageSrc}
                            alt={item.productName}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-[#E8B4A6]/30 flex items-center justify-center text-xs font-serif text-[#D64B3A]">
                          rom&nd
                        </div>
                      )}

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-base font-medium leading-snug">{item.productName}</h3>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'REMOVE_ITEM',
                                  productId: item.productId,
                                  shadeName: item.shadeName,
                                })
                              }
                              className="text-[#8B8078] hover:text-[#D64B3A] transition-colors p-1"
                              aria-label="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.shadeName && (
                            <p className="text-xs font-sans text-[#8B8078] mt-0.5">Tone màu: {item.shadeName}</p>
                          )}
                          <p className="text-sm font-semibold text-[#D64B3A] mt-1">{formatVND(item.price)}</p>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center rounded-full border border-[#241B15]/20 bg-white/80 px-2 py-1 shadow-inner">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'UPDATE_QUANTITY',
                                  productId: item.productId,
                                  shadeName: item.shadeName,
                                  quantity: item.quantity - 1,
                                })
                              }
                              className="p-1 hover:text-[#D64B3A] transition-colors"
                              aria-label="Giảm số lượng"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'UPDATE_QUANTITY',
                                  productId: item.productId,
                                  shadeName: item.shadeName,
                                  quantity: item.quantity + 1,
                                })
                              }
                              className="p-1 hover:text-[#D64B3A] transition-colors"
                              aria-label="Tăng số lượng"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Subtotal */}
              {state.items.length > 0 && (
                <div className="border-t border-[#241B15]/10 pt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-sans text-[#8B8078]">Tạm tính</span>
                    <span className="font-serif text-xl font-semibold text-[#241B15]">
                      {formatVND(subtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B8078] leading-tight">
                    Miễn phí vận chuyển cho đơn hàng từ 350.000₫. Giao hàng toàn quốc trong 1-3 ngày làm việc.
                  </p>

                  <button
                    onClick={handleStartCheckout}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#D64B3A] py-4 text-xs font-sans font-semibold tracking-wider text-white hover:bg-[#b83b2b] transition-all uppercase shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Tiến hành đặt hàng</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={closeCart}
                    className="w-full text-center text-xs font-sans text-[#8B8078] hover:text-[#241B15] transition-colors py-1"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* QUICK CHECKOUT MODAL (Master FE Feature) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-[#241B15]"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#FAF3EA] border border-[#241B15]/15 p-6 sm:p-8 text-[#241B15] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {!isSuccess ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#241B15]/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#D64B3A]">
                        rom&nd Việt Nam
                      </span>
                      <h3 className="font-serif text-2xl font-medium">Xác Nhận Đặt Hàng</h3>
                    </div>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="rounded-full p-2 hover:bg-[#241B15]/5 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="mt-5 space-y-4">
                    {/* Order summary pill */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 border border-[#241B15]/10 text-xs">
                      <span className="text-[#8B8078]">Tổng thanh toán ({totalCount} món):</span>
                      <strong className="font-serif text-base text-[#D64B3A]">{formatVND(subtotal)}</strong>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-[#241B15]">
                        Họ và tên người nhận <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-[#241B15]/20 bg-white/90 px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#D64B3A]/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-[#241B15]">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-[#241B15]/20 bg-white/90 px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#D64B3A]/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-[#241B15]">
                        Địa chỉ nhận hàng (Số nhà, đường, phường/xã, tỉnh/TP) <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ví dụ: 123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-xl border border-[#241B15]/20 bg-white/90 px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#D64B3A]/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-[#241B15]">Phương thức thanh toán</label>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <label
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-sans transition-all ${
                            formData.paymentMethod === 'cod'
                              ? 'border-[#D64B3A] bg-[#E8B4A6]/20 font-medium text-[#241B15]'
                              : 'border-[#241B15]/15 bg-white/70 text-[#8B8078]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                            className="hidden"
                          />
                          <span>💵 Thanh toán khi nhận (COD)</span>
                        </label>
                        <label
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-sans transition-all ${
                            formData.paymentMethod === 'bank'
                              ? 'border-[#D64B3A] bg-[#E8B4A6]/20 font-medium text-[#241B15]'
                              : 'border-[#241B15]/15 bg-white/70 text-[#8B8078]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="bank"
                            checked={formData.paymentMethod === 'bank'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                            className="hidden"
                          />
                          <span>📲 Chuyển khoản QR</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-sans font-medium text-[#241B15]">Ghi chú đơn hàng (tuỳ chọn)</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Giao giờ hành chính, bọc gói quà..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="w-full rounded-xl border border-[#241B15]/20 bg-white/90 px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#D64B3A]/40"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[#D64B3A] py-4 text-xs font-sans font-semibold uppercase tracking-widest text-white hover:bg-[#b83b2b] transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Hoàn tất đặt hàng — {formatVND(subtotal)}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Screen */
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8B4A6]/40 text-[#D64B3A]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D64B3A]">
                      Đặt hàng thành công!
                    </span>
                    <h3 className="font-serif text-3xl text-[#241B15]">Cảm Ơn Bạn Đã Chọn rom&nd</h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 border border-[#241B15]/10 text-xs font-sans space-y-2 text-left max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-[#8B8078]">Mã đơn hàng:</span>
                      <strong className="font-mono text-[#D64B3A]">{orderCode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B8078]">Người nhận:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B8078]">Số điện thoại:</span>
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B8078]">Địa chỉ:</span>
                      <span className="text-right max-w-[200px] truncate">{formData.address}</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#8B8078] max-w-sm mx-auto leading-relaxed">
                    Chuyên viên tư vấn rom&nd Việt Nam sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng và điều phối giao hàng.
                  </p>

                  <button
                    onClick={handleFinish}
                    className="rounded-full bg-[#241B15] px-8 py-3.5 text-xs font-sans font-semibold uppercase tracking-widest text-[#FAF3EA] hover:bg-black transition-all"
                  >
                    Tiếp tục khám phá
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

