import React, { useEffect, useState } from 'react'
import {
  checkPaymentStatus,
  CreateBusinessDetails,
} from '../Functions/functions'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Razorpay(values) {
  const formData = values.formData
  const planDetails = values.planDetails
  const [isScriptLoaded, setScriptLoaded] = useState(false)
  const [businessId, setBusinessId] = useState('')
  const navigate = useNavigate()
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        setScriptLoaded(true)
        resolve(true)
      }
      script.onerror = () => {
        setScriptLoaded(false)
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  // Function to open Razorpay payment window
  const handlePayment = async (id, token) => {
    if (!isScriptLoaded) {
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
    }

    const options = {
      key: 'rzp_test_DBApSwEptkCDdS', // Dummy Razorpay key ID for testing
      amount: planDetails?.amount * 100, // Amount in paise (50000 paise = ₹500)
      currency: 'INR',
      name: 'InConnect',
      description: 'Test Transaction',
      image: '', // Dummy logo URL
      handler: async function (response) {
        console.log(response, 'response')
        var paymentDetails = {
          plan: formData.selectedPlan,
          paymentId: response?.razorpay_payment_id,
        }
        const interval = setInterval(async () => {
          try {
            const paymentData = await checkPaymentStatus(id, token)
            const payment_status = paymentData?.data?.PaymentStatus
            console.log(payment_status, 'paymentStatus----',paymentData?.data)

            if (payment_status === 'success') {
              clearInterval(interval) // Clear the interval if payment is successful
              navigate(`/templates/${id}`)
            }
          } catch (error) {
            console.error('Error fetching payment status:', error)
          }
        }, 2000)

        // Set a timeout to clear the interval after 2 minutes
        setTimeout(() => {
          clearInterval(interval)

          console.log('Stopped checking payment status after 2 minutes')
        }, 2 * 60 * 1000) // 2 minutes in milliseconds
      },
      prefill: {
        name: formData.businessName,
        email: formData.contactDetails.email,
        contact: formData.contactDetails.primaryNumber,
      },
      notes: {
        businessId: id,
      },
      theme: {
        color: formData.theme, // Customize theme color
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const submitData = async () => {
    console.log(formData, 'formData')

    try {
      const res = await CreateBusinessDetails(formData)

      const id = res.data?._id || res.data.data?._id
      const token = res.data?.token || res.data?.data?.token
      setBusinessId(id)
      handlePayment(id, token)
    } catch (error) {
      console.log(error, 'razorpay-error')
    }
  }
  useEffect(() => {
    submitData()
  }, [])
}
