// import axios from 'axios';
// import { showAlert } from './alert';
// const stripe = Stripe(
//   'pk_test_51Kx1DSSCWDanvLJGemKyXVRjdpLyXk2ULFKvcoqAvIdv3n6JPS3pfVZhxAg0Vf7DOUJCUbPf56rXV1GS9ZMtys4T00cXpcEv74'
// );

// export const bookTour = async (tourId) => {
//   try {
//     // 1) Get checkout session from API
//     const session = await axios(
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//     );
//     console.log(session);

//     // 2) Create checkout from + chare creadi card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id,
//     });
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };
