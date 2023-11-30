import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Declare totalPrice using useState
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosPublic();
  const navigate = useNavigate();

  const { data: hr } = useQuery({
    queryKey: ['hr', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/role?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(hr?.package);

  useEffect(() => {
    if (hr?.length > 0) {
      // Calculate and set totalPrice using setTotalPrice
      const calculatedTotalPrice = hr?.reduce((acc, hr) => acc + parseInt(hr?.package), 0);
      setTotalPrice(calculatedTotalPrice);

      axiosSecure
        .post('/create-payment-intent', { price: calculatedTotalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error('Error fetching clientSecret:', error);
        });
    }
  }, [axiosSecure, hr]);
  // const handleSubmit = async (id) => {
  //   const  res = await axiosSecure.patch(`/req-assets/${id}`)
  //   console.log(res);
    
  //   refetch()

  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const  res = await axiosSecure.patch(`/hr/${user.email}`)
    console.log(res?.data);
    Swal.fire({
      title: 'success',
      text: 'payments success',
      icon: 'success',
    });
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        setError(error.message);
      } else {
        setError(paymentMethod,'');
      }

      

      const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details:{
            name: user?.displayName || "anonymous",
            email : user?.email || "anonymous",
  
          }
        }
      })
      if(confirmError){
        console.log("payment method", confirmError);
      }

       else if (paymentIntent?.status === 'succeeded') {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          name: user?.displayName,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: user.package,
          status: 'pending',
        };

        const res = await axiosSecure.post('/payments', payment);
        navigate('/dashboard');
        if (res?.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: 'top-center',
            title: 'Thanks!',
            text: `${totalPrice} Payment has been successfully`,
            icon: 'success',
          });
        }
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during payment.');
    }
  };

  return (
    <div className="m-20">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <p className="my-5 text-red-500 text-center">{error}</p>
        {transactionId && <p className="my-5 text-green-500 text-center">{transactionId}</p>}
        <button className="payment-btn btn btn-accent btn-sm mt-5" type="submit">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
