import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../store/cart'
import { formatINR } from '../utils/format'

export default function Checkout() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { items, clearCart } = useCart()

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const price = typeof item.productId === 'string' ? 0 : (item.productId.price || 0)
      return sum + price * item.quantity
    }, 0)
  }

  const total = calculateTotal()

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone || !userName || !email) {
      toast.error('Please fill in all details')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    setLoading(true)

    try {
      // Build detailed WhatsApp message with product info
      let message = `🛍️ *NEW ORDER FROM NARAH*\n\n`
      message += `👤 *Customer Details:*\n`
      message += `Name: ${userName}\n`
      message += `Phone: ${phone}\n`
      message += `Email: ${email}\n\n`

      message += `📦 *Order Items:*\n`
      items.forEach((item, index) => {
        const product = typeof item.productId === 'string' ? null : item.productId
        const productName = typeof item.productId === 'string' ? item.productId : item.productId.name
        const productPrice = typeof item.productId === 'string' ? 0 : item.productId.price
        const productImage = product?.images?.[0]?.url || ''
        const itemTotal = productPrice * item.quantity

        message += `\n${index + 1}. ${productName}\n`
        message += `   Qty: ${item.quantity} x ₹${productPrice.toLocaleString('en-IN')} = ₹${itemTotal.toLocaleString('en-IN')}\n`

        if (productImage) {
          message += `   Image: ${productImage}\n`
        }
      })

      message += `\n📊 *Order Summary:*\n`
      message += `Total Items: ${items.length}\n`
      message += `Total Amount: *₹${total.toLocaleString('en-IN')}*\n\n`
      message += `✅ Please confirm this order.\n`
      message += `Payment can be made via Bank Transfer or Cash on Delivery.`

      // Admin WhatsApp number - update this with your actual admin number
      const adminPhone = '923001234567' // Format: country code + number without +
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, '_blank')

      // Clear cart after successful checkout
      clearCart()
      toast.success('Order sent! Check your WhatsApp with admin.')

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      toast.error('Error opening WhatsApp')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ink py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-ink-border mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2 text-body">Your Cart is Empty</h1>
            <p className="text-muted mb-8 text-lg">Add some timeless jewelry to proceed to checkout.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-gold-gradient text-ink font-bold py-3 px-8 rounded-2xl transition hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-8 md:mb-12 text-body">Order Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleWhatsAppCheckout} className="bg-ink-card border border-ink-border rounded-2xl p-6 md:p-8 transition hover:border-gold/40">
              <h2 className="text-2xl font-serif font-bold mb-6 text-body">Enter Your Details</h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-body mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-ink border border-ink-border rounded-2xl text-body placeholder-gray-500 focus:outline-none focus:border-gold transition"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-body mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-ink border border-ink-border rounded-2xl text-body placeholder-gray-500 focus:outline-none focus:border-gold transition"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-body mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="923001234567"
                    className="w-full px-4 py-3 bg-ink border border-ink-border rounded-2xl text-body placeholder-gray-500 focus:outline-none focus:border-gold transition"
                    required
                  />
                  <p className="text-xs text-faint mt-2">Enter without + or 0. Example: 923001234567</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !phone || !userName || !email}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-ink-border disabled:text-gray-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition text-lg mt-8"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.871 1.195-2.955 2.9-2.955 4.785 0 1.236.235 2.429.654 3.571L2.106 23l3.815-1.993c1.005.591 2.127.928 3.287.928 1.953 0 3.76-.667 5.144-1.8s2.1-2.841 2.1-4.694c.001-1.289-.278-2.521-.795-3.646-.516-1.125-1.231-2.113-2.147-2.913-.916-.8-1.98-1.421-3.144-1.802-1.164-.38-2.407-.571-3.66-.571z"/>
                  </svg>
                  {loading ? 'Opening WhatsApp...' : 'Send Order via WhatsApp'}
                </button>

                <div className="bg-ink-soft border border-ink-border rounded-2xl p-4">
                  <p className="text-sm text-muted">
                    ℹ️ Click the button above to send your order directly to our WhatsApp. No login required!
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-ink-soft border border-ink-border rounded-2xl p-6 md:p-8 h-fit lg:sticky lg:top-32 transition hover:border-gold/40">
            <h2 className="text-2xl font-serif font-bold mb-6 text-body">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map((item) => {
                const productId = typeof item.productId === 'string' ? item.productId : item.productId._id
                const productName = typeof item.productId === 'string' ? item.productId : item.productId.name
                const productPrice = typeof item.productId === 'string' ? 0 : item.productId.price
                return (
                  <div key={productId} className="flex justify-between text-sm border-b border-ink-border pb-3">
                    <span className="text-muted">{productName}</span>
                    <span className="font-semibold text-gold">{formatINR(productPrice * item.quantity)}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t-2 border-ink-border pt-4">
              <div className="flex justify-between mb-3">
                <span className="text-muted">Subtotal:</span>
                <span className="text-faint">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-body bg-ink-card border border-ink-border p-4 rounded-2xl">
                <span>Total</span>
                <span className="text-gold">{formatINR(total)}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-faint text-center">
              <p>✓ No hidden charges</p>
              <p>✓ Direct WhatsApp communication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
