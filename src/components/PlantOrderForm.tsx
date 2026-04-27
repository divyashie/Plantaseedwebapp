import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Minus, Plus, Send, ShoppingBag, X } from 'lucide-react';
import { Button } from './ui/button';
import { settings, type Product } from '../lib/content';

interface PlantOrderFormProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  initialQuantities?: Record<string, number>;
  variant?: 'overlay' | 'inline';
}

type DeliveryOption = 'pickup' | 'local_delivery';

const inputClass = 'w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white';
const inputStyle = { border: '1px solid #d1d5db' };
const labelStyle = { color: '#374151', fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.25rem' };

export function PlantOrderForm({
  open,
  onClose,
  products,
  initialQuantities = {},
  variant = 'overlay',
}: PlantOrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('pickup');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [validationError, setValidationError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      const seededQuantities = products.reduce<Record<string, number>>((acc, product) => {
        const seeded = initialQuantities[product.title] ?? 0;
        acc[product.title] = seeded > 0 ? seeded : 0;
        return acc;
      }, {});

      setQuantities(seededQuantities);
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryOption('pickup');
      setAddress('');
      setNote('');
      setValidationError('');
      setCopied(false);
    }
  }, [open, products, initialQuantities]);

  const selectedItems = useMemo(
    () =>
      products
        .map((product) => ({ product, quantity: quantities[product.title] ?? 0 }))
        .filter((entry) => entry.quantity > 0),
    [products, quantities]
  );

  const totalItems = selectedItems.reduce((sum, entry) => sum + entry.quantity, 0);

  const updateQuantity = (title: string, nextQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [title]: Math.max(0, nextQuantity),
    }));
  };

  const buildOrderText = () => {
    if (!customerName.trim()) {
      setValidationError('Please enter your name before sending the order.');
      return null;
    }
    if (selectedItems.length === 0) {
      setValidationError('Select at least one plant before sending the order.');
      return null;
    }
    if (deliveryOption === 'local_delivery' && !address.trim()) {
      setValidationError('Please add a delivery address for local delivery.');
      return null;
    }

    setValidationError('');

    const itemLines = selectedItems.map(
      ({ product, quantity }) => `- ${product.title} x${quantity} (${product.currency} ${product.price} each)`
    );
    const subtotal = selectedItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

    const messageLines = [
      'Hi Danielle! I would like to place a plant order.',
      '',
      `Name: ${customerName.trim()}`,
      customerPhone.trim() ? `Phone: ${customerPhone.trim()}` : '',
      '',
      'Order items:',
      ...itemLines,
      '',
      `Total quantity: ${totalItems} item${totalItems === 1 ? '' : 's'}`,
      `Estimated subtotal: MUR ${subtotal.toFixed(2)}`,
      '',
      `Delivery option: ${deliveryOption === 'pickup' ? 'Pickup at Cascavelle Mall' : 'Local delivery'}`,
      deliveryOption === 'local_delivery' ? `Delivery address: ${address.trim()}` : '',
      note.trim() ? `Notes: ${note.trim()}` : '',
    ].filter(Boolean);

    return messageLines.join('\n');
  };

  const submitToWhatsApp = () => {
    const orderText = buildOrderText();
    if (!orderText) return;

    const waUrl = `https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(orderText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const submitByEmail = () => {
    const orderText = buildOrderText();
    if (!orderText) return;

    const subject = encodeURIComponent('Plant Order Request');
    const body = encodeURIComponent(orderText);
    window.location.href = `mailto:${settings.contact.email}?subject=${subject}&body=${body}`;
  };

  const copyOrderText = async () => {
    const orderText = buildOrderText();
    if (!orderText) return;
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setValidationError('Could not copy automatically. Please use Email or WhatsApp send options.');
    }
  };

  if (!open) return null;

  const isInline = variant === 'inline';

  return (
    <div
      className={
        isInline
          ? 'w-full'
          : 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4'
      }
      onClick={isInline ? undefined : onClose}
    >
      <div
        className={
          isInline
            ? 'max-w-4xl mx-auto w-full max-h-none overflow-visible p-0 border border-emerald-200 overflow-hidden rounded-2xl bg-white shadow-[0_18px_60px_rgba(16,185,129,0.2)]'
            : 'sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-none overflow-hidden rounded-2xl bg-white shadow-2xl'
        }
        onClick={isInline ? undefined : (event) => event.stopPropagation()}
      >
        <div
          className={
            isInline
              ? 'relative overflow-hidden p-6 bg-gradient-to-r from-emerald-100 via-lime-100 to-emerald-50 border-b border-emerald-200'
              : 'relative overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-lime-700 p-6 text-center'
          }
        >
          <div className="absolute -top-10 -left-8 h-28 w-28 rounded-full bg-emerald-300/35 blur-2xl animate-pulse" />
          <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-lime-300/35 blur-2xl animate-pulse" />

          <div className="flex justify-end">
            <button
              type="button"
              className={
                isInline
                  ? 'relative z-10 rounded-full p-1 text-emerald-900/85 hover:text-emerald-950 hover:bg-white/70 transition-colors'
                  : 'relative z-10 rounded-full p-1 text-white/90 hover:text-white hover:bg-white/15 transition-colors'
              }
              onClick={onClose}
              aria-label="Close order form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="-mt-2 relative z-10 text-center">
            <h3
              className={
                isInline
                  ? 'text-emerald-950 text-3xl sm:text-4xl font-black tracking-tight flex flex-col items-center gap-2'
                  : 'text-white text-2xl sm:text-3xl font-extrabold tracking-tight flex flex-col items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
              }
            >
              <div
                className={
                  isInline
                    ? 'bg-white p-3 rounded-full ring-2 ring-emerald-300 shadow-md animate-bounce [animation-duration:2.2s]'
                    : 'bg-white/20 p-3 rounded-full ring-2 ring-white/35 animate-bounce [animation-duration:2.2s]'
                }
              >
                <ShoppingBag className={isInline ? 'w-6 h-6 text-emerald-800' : 'w-6 h-6'} />
              </div>
              Build Your Plant Cart
            </h3>
            <p
              className={
                isInline
                  ? 'text-emerald-900 text-sm sm:text-base max-w-xl mx-auto mt-1 font-medium'
                  : 'text-emerald-50 text-sm sm:text-base opacity-100 max-w-xl mx-auto mt-1'
              }
            >
              Pick quantities, add delivery details, and send one clean WhatsApp order to Danielle.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5 bg-gradient-to-b from-emerald-50/60 to-white">
          <div className="rounded-xl border border-emerald-300 bg-white px-4 py-3 shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-emerald-700">Order Form</p>
            <h4 className="text-xl sm:text-2xl font-extrabold text-emerald-950 leading-tight">
              Build Your Plant Cart
            </h4>
            <p className="text-sm text-emerald-800 mt-1">
              Choose quantities below and send your full order to Danielle on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-1 duration-500">
            <div>
              <label style={labelStyle}>Your Name <span className="text-red-500">*</span></label>
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="Marie"
              />
            </div>
            <div>
              <label style={labelStyle}>Phone (optional)</label>
              <input
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="+230 ..."
              />
            </div>
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-1 duration-700">
            <p style={labelStyle}>Select plants and quantity <span className="text-red-500">*</span></p>
            <div className="max-h-64 overflow-y-auto rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-3 space-y-2">
              {products.map((product) => {
                const quantity = quantities[product.title] ?? 0;
                return (
                  <div key={product.title} className="bg-white border border-emerald-100 rounded-lg p-3 flex items-center justify-between gap-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{product.title}</p>
                      <p className="text-xs text-gray-500">{product.currency} {product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.title, quantity - 1)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <input
                        type="number"
                        min={0}
                        value={quantity}
                        onChange={(event) => updateQuantity(product.title, Number(event.target.value) || 0)}
                        className="w-14 h-8 rounded-md border border-gray-300 text-center text-sm"
                      />
                      <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.title, quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500">Selected items: <strong>{totalItems}</strong></p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-1 duration-900">
            <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>
              Delivery option <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${deliveryOption === 'pickup' ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <input
                  type="radio"
                  checked={deliveryOption === 'pickup'}
                  onChange={() => setDeliveryOption('pickup')}
                  className="accent-green-600 mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">Pickup - Cascavelle Mall</p>
                  <p className="text-xs text-gray-500">Free, schedule directly with Danielle</p>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${deliveryOption === 'local_delivery' ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <input
                  type="radio"
                  checked={deliveryOption === 'local_delivery'}
                  onChange={() => setDeliveryOption('local_delivery')}
                  className="accent-green-600 mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">Local delivery (Mauritius)</p>
                  <p className="text-xs text-gray-500">Delivery fee discussed on WhatsApp</p>
                </div>
              </label>
            </div>
          </div>

          {deliveryOption === 'local_delivery' && (
            <div>
              <label style={labelStyle}>Delivery Address <span className="text-red-500">*</span></label>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="Village, town, landmark"
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Notes (optional)</label>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              placeholder="Preferred pickup day, pot color, etc."
            />
          </div>

          {validationError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {validationError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in slide-in-from-bottom-1 duration-1000">
            <Button type="button" variant="ghost" className="font-semibold text-gray-600" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-semibold rounded-xl"
              onClick={submitToWhatsApp}
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Send on WhatsApp
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-semibold rounded-xl"
              onClick={submitByEmail}
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send by Email
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-semibold rounded-xl"
              onClick={copyOrderText}
            >
              <span className="flex items-center gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Order Text'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

