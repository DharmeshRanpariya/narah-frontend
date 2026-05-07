import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { contactService } from '../services/api'

export default function Contact() {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await contactService.submitContact(data)
      toast.success('Message sent successfully! We will get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to submit form')
    }
  }

  const href =`https://wa.me/${(import.meta as any).env.VITE_WHATSAPP_PHONE_NUMB}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-light py-8 md:py-12">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-accent">Contact Us</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for any inquiries or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600 text-sm mt-1">info@narah.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600 text-sm mt-1">${(import.meta as any).env.VITE_WHATSAPP_PHONE_NUMBER}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.871 1.195-2.955 2.9-2.955 4.785 0 1.236.235 2.429.654 3.571L2.106 23l3.815-1.993c1.005.591 2.127.928 3.287.928 1.953 0 3.76-.667 5.144-1.8s2.1-2.841 2.1-4.694c.001-1.289-.278-2.521-.795-3.646-.516-1.125-1.231-2.113-2.147-2.913-.916-.8-1.98-1.421-3.144-1.802-1.164-.38-2.407-.571-3.66-.571z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-sm mt-1 inline-block font-semibold transition">
                    Chat with us →
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Operating Hours</p>
                  <p className="text-gray-600 text-sm mt-1">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  {...register('name')}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  {...register('phone')}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  {...register('subject')}
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  {...register('message')}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition text-base md:text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}