//serverless functions create-payment-intent

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "gbp",
            payment_method_types: ["card"],
        });

        return {                                                        // returns the intent back to the frontend if successful
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        };
    } catch (error) {
        console.log({ error });

        return {                                                        // returns back error to the frontend if unsuccessful 
            statusCode: 400,
            body: JSON.stringify({ error })
        }
    }
}