'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Therapist {
  id: number
  name: string
  specialty: string
  image: string
}

const therapists: Therapist[] = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cognitive Behavioral Therapy', image: '👩‍⚕️' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Family & Relationship Therapy', image: '👨‍⚕️' },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Anxiety & Depression', image: '👩‍⚕️' },
  { id: 4, name: 'Dr. James Brown', specialty: 'Trauma & PTSD', image: '👨‍⚕️' },
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [selectedDate, setSelectedDate] = useState<Value>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [isBooked, setIsBooked] = useState(false)

  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist)
    setStep(2)
  }

  const handleDateChange = (value: Value) => {
    setSelectedDate(value)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  const handleReset = () => {
    setStep(1)
    setSelectedTherapist(null)
    setSelectedDate(new Date())
    setSelectedTime('')
    setFormData({ name: '', email: '', phone: '', notes: '' })
    setIsBooked(false)
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <p className="text-gray-700 mb-2"><strong>Therapist:</strong> {selectedTherapist?.name}</p>
            <p className="text-gray-700 mb-2"><strong>Date:</strong> {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : ''}</p>
            <p className="text-gray-700 mb-2"><strong>Time:</strong> {selectedTime}</p>
            <p className="text-gray-700 mb-2"><strong>Name:</strong> {formData.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
          </div>
          <p className="text-gray-600 mb-6">A confirmation email has been sent to {formData.email}</p>
          <button
            onClick={handleReset}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Book Another Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Therapy Sessions</h1>
          <p className="text-xl text-gray-600">Book your session with a qualified professional</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Choose Therapist</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Select Time</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Your Details</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                onClick={() => handleTherapistSelect(therapist)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                <div className="text-6xl text-center mb-4">{therapist.image}</div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{therapist.name}</h3>
                <p className="text-gray-600 text-center text-sm">{therapist.specialty}</p>
              </div>
            ))}
          </div>
        )}

        {step === 2 && selectedTherapist && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <button
                onClick={() => setStep(1)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold mb-4"
              >
                ← Back to Therapists
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Date & Time</h2>
              <p className="text-gray-600">Booking with {selectedTherapist.name}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <CalendarIcon className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Choose a Date</h3>
              </div>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                className="mx-auto"
              />
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Choose a Time</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className="py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors font-semibold text-gray-700"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedTherapist && selectedTime && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <button
                onClick={() => setStep(2)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold mb-4"
              >
                ← Back to Date & Time
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Details</h2>
              <div className="bg-indigo-50 rounded-lg p-4 text-sm text-gray-700">
                <p><strong>Therapist:</strong> {selectedTherapist.name}</p>
                <p><strong>Date:</strong> {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : ''}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="text-gray-700 font-semibold mb-2 block">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none resize-none"
                  placeholder="Any specific concerns or topics you'd like to discuss..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
