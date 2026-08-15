'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from './CartProvider';

export function CartSheet() {
  const { state, dispatch, subtotal, totalCount } = useCart();
  const isOpen = state.isOpen;

  const closeCart = () => dispatch({ type: 'SET_CART_OPEN', open: false });

  return (
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
            aria-label="Close cart backdrop"
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
                <h2 className="font-serif text-2xl font-medium tracking-tight">Your Shopping Bag</h2>
                <span className="rounded-full bg-[#E8B4A6]/40 px-2.5 py-0.5 text-xs font-mono text-[#241B15]">
                  {totalCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-[#241B15]/5 transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {state.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-[#E8B4A6]/30 flex items-center justify-center mb-4 text-[#D64B3A]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <p className="font-serif text-xl text-[#241B15]">Your bag is empty</p>
                  <p className="mt-2 text-xs font-sans text-[#8B8078] max-w-[240px]">
                    Discover Juicy Lasting Tint and give your lips a glass-like shine.
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
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.shadeName && (
                          <p className="text-xs font-sans text-[#8B8078] mt-0.5">Shade: {item.shadeName}</p>
                        )}
                        <p className="text-sm font-semibold text-[#D64B3A] mt-1">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center rounded-full border border-[#241B15]/20 bg-white/60 px-2 py-1">
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
                            aria-label="Decrease quantity"
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
                            aria-label="Increase quantity"
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
                  <span className="font-sans text-[#8B8078]">Subtotal</span>
                  <span className="font-mono text-lg font-semibold text-[#241B15]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-[#8B8078]">
                  Taxes and shipping calculated at checkout. Free shipping on orders over $40.
                </p>

                <button
                  onClick={() => alert('Demo store: Checkout functionality is disabled in MVP.')}
                  className="w-full rounded-full bg-[#D64B3A] py-3.5 text-xs font-sans font-semibold tracking-wider text-white hover:bg-[#b83b2b] transition-colors uppercase"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs font-sans text-[#8B8078] hover:text-[#241B15] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
