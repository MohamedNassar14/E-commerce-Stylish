const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors( { origin: true, credentials: true } ));

const stripe = require("stripe")(`sk_test_51Q5X4aRwxGRAqufm3AvlRxXxjNBeL1EPn8FmLKEUssLczKI3K8s3yV85X4UEIS4h3ehYx3TBIZa0p0SbaR6Pj51I00ObITCu8I`);

app.post(`/checkout`, async (req, res, next) => {
    try{
       const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
                name: item.product.title
            },
            unit_amount: 50,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "http://localhost:4242/success.html",
        cancel_url: "http://localhost:4242/cancel.html",
       });


       res.status(200).json(session);

    }
    catch(error){
       next(error)
    }
});




app.listen(4242, ()=> console.log("app is running on 4242"));