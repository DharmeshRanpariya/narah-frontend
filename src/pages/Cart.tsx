import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../store/cart'

export default function Cart() {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity } = useCart()

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const price = typeof item.productId === 'string' ? 0 : (item.productId.price || 0)
      return sum + price * item.quantity
    }, 0)
  }

  const total = calculateTotal()

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    const phoneNumber = (import.meta as any).env.VITE_WHATSAPP_PHONE_NUMBER

    // Build message with product details including images
    let message = 'Hello! I would like to place an order for the following items:\n\n'

    items.forEach((item, index) => {
      const product = typeof item.productId === 'string' ? null : item.productId
      const productName = typeof item.productId === 'string' ? item.productId : item.productId.name
      const productPrice = typeof item.productId === 'string' ? 0 : item.productId.price
      const productImage = product?.images?.[0]?.url || ''
      const itemTotal = productPrice * item.quantity

      message += `${index + 1}. ${productName}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: Rs. ${productPrice} each\n`
      message += `   Subtotal: Rs. ${itemTotal.toFixed(2)}\n`

      // Add image link if available
      if (productImage) {
        message += `   Image: ${productImage}\n`
      }
      message += '\n'
    })

    message += `📊 *Order Summary*\n`
    message += `Total Items: ${items.length}\n`
    message += `Total Amount: *Rs. ${total.toFixed(2)}*\n\n`
    message += `Please confirm this order. Thank you!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Opening WhatsApp with order details...')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light to-white py-12">
        <div className="container">
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 text-lg">Add some beautiful jewelry to get started!</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light to-white py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">{items.length} item{items.length !== 1 ? 's' : ''} in cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => {
                const productId = typeof item.productId === 'string' ? item.productId : item.productId._id
                const product = typeof item.productId === 'string' ? null : item.productId
                const productName = product?.name || 'Product'
                const productPrice = product?.price || 0
                const productImage = product?.images?.[0]?.url || ''
                const productDescription = product?.shortDescription || ''
                const productMaterial = product?.material || ''

                return (
                  <div key={productId} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Image */}
                      <div className="md:w-32 flex-shrink-0">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={productName}
                            className="w-32 h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/128?text=No+Image'
                            }}
                          />
                        ) : (
                          <div className="w-32 h-32 bg-light rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{productName}</h3>
                            {productMaterial && (
                              <p className="text-sm text-gray-500 mt-1">Material: <span className="font-semibold">{productMaterial}</span></p>
                            )}
                          </div>
                          <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">#{index + 1}</span>
                        </div>

                        {productDescription && (
                          <p className="text-gray-600 text-sm mb-3">{productDescription}</p>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(productId, Math.max(1, item.quantity - 1))}
                              className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center font-bold transition"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(productId, Math.max(1, parseInt(e.target.value) || 1))
                              }
                              className="w-14 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold"
                            />
                            <button
                              onClick={() => updateQuantity(productId, item.quantity + 1)}
                              className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center font-bold transition"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-gray-600 text-sm mb-1">Price</p>
                            <p className="text-2xl font-bold text-primary">Rs. {productPrice}</p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="flex flex-col justify-between items-end gap-2">
                        <p className="text-right text-sm text-gray-600">
                          Subtotal: <span className="font-bold text-lg text-accent">Rs. {(productPrice * item.quantity).toFixed(2)}</span>
                        </p>
                        <button
                          onClick={() => removeItem(productId)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 h-fit">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-2 mb-6 pb-6 border-b-2 border-light max-h-60 overflow-y-auto">
                {items.map((item) => {
                  const productName = typeof item.productId === 'string' ? item.productId : item.productId.name
                  const productPrice = typeof item.productId === 'string' ? 0 : item.productId.price
                  return (
                    <div key={productName} className="flex justify-between text-sm text-gray-700">
                      <span>{productName} x{item.quantity}</span>
                      <span className="font-semibold">Rs. {(productPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (0%)</span>
                  <span className="font-semibold">Rs. 0</span>
                </div>
                <div className="border-t-2 border-light pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-primary">Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition mb-3 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.871 1.195-2.955 2.9-2.955 4.785 0 1.236.235 2.429.654 3.571L2.106 23l3.815-1.993c1.005.591 2.127.928 3.287.928 1.953 0 3.76-.667 5.144-1.8s2.1-2.841 2.1-4.694c.001-1.289-.278-2.521-.795-3.646-.516-1.125-1.231-2.113-2.147-2.913-.916-.8-1.98-1.421-3.144-1.802-1.164-.38-2.407-.571-3.66-.571z"/>
                </svg>
                Order via WhatsApp
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t-2 border-light text-center">
                <p className="text-xs text-gray-600 mb-3">100% Secure Checkout</p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-8 bg-light rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 11-1.414 1.414l-4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
