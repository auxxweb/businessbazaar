import React, { useState } from 'react'
import { CreateBusinessDetails } from '../Functions/functions'
import axios from 'axios';
import { useNavigate } from 'react-router';




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
    const handlePayment = async (id) => {
      if (!isScriptLoaded) {
        const loaded = await loadRazorpayScript()
        if (!loaded) {
          alert('Razorpay SDK failed to load. Are you online?')
          return
        }
      }

      const options = {
        key: 'rzp_test_DBApSwEptkCDdS', // Dummy Razorpay key ID for testing
        amount: planDetails.amount *100, // Amount in paise (50000 paise = ₹500)
        currency: 'INR',
        name: 'InConnect',
        description: 'Test Transaction',
        image: '', // Dummy logo URL
        handler: async function (response) {
          console.log(response)
          var paymentDetails = {
            plan: formData.selectedPlan,
            paymentId: response.razorpay_payment_id,
            date: new Date(),
            paymentStatus: 'success',
          }
          // setInterval(async () => {
          //   try {
          //     const payment_status = await axios.post(
          //       `https://businessbazaarserver.auxxweb.in/api/v1/payment/status/${response.razorpay_payment_id}`
          //     );
          //     if (payment_status === 'success') {
          //       try {
          //                   const response = await axios.post(
          //                     'https://businessbazaarserver.auxxweb.in/api/v1/payment',
          //                     paymentDetails,
          //                     {
          //                       headers: {
          //                         'Content-Type': 'application/json',
          //                         Authorization: `Bearer ${id}`, // Sending businessId as bearer token
          //                       },
          //                     },
          //                   )
          //                   if (response.status !== 200) {
          //                     throw new Error(`HTTP error! Status: ${response.status}`)
          //                   }

          //                   const data = response.data
          //                   if (data.success) {

          //                     navigate(`/templates/${businessId}`)
          //                     // return data
          //                   } else {
          //                     console.error(
          //                       'Failed to create business details:',
          //                       data.message || 'Unknown error',
          //                     )
          //                     throw new Error(
          //                       data.message || 'Failed to create business details',
          //                     )
          //                   }
          //                 } catch (error) {
          //                   console.error(
          //                     'Error occurred while fetching business site details:',
          //                     error.message,
          //                   )
          //                   throw error
          //                 }
          //     }
          //   } catch (error) {
          //     console.error("Error fetching payment status:", error);
          //   }
          // }, 1000);
          
        },
        prefill: {
          name: formData.businessName,
          email: formData.contactDetails.email,
          contact: formData.contactDetails.primaryNumber,
        },
        notes: {
          businessId: businessId,
        },
        theme: {
          color: formData.theme, // Customize theme color
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }
    const submitData = async () => {
      const res = await CreateBusinessDetails(formData)
      const id = res.data._id || res.data.data?._id
      setBusinessId(id)
      handlePayment(id)
    }
    submitData()
  }