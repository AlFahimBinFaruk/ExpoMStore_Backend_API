import transporter from "../config/emailConfig";
const handleSendMail = async (orderInfo: any) => {
  try {
    const {
      id,
      userDetails,
      orderDetails,
      total,
      address,
      paymentStatus,
      orderStatus,
    } = orderInfo;

    //get order details
    let orderDetailsRow: any = "";
    await orderDetails.map((i: any) => {
      orderDetailsRow += `<div class="row">
      <div class="col-sm-8">
        <h2 class="service-title"><a href="">${i.productId}</h2>
        <h5 class="service-subtitle">Qty:${i.qty}</h5>
      </div>
    </div>`;
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "ExpomStrore", // sender address
      to: "fah8m88@gmail.com", // list of receivers
      subject: "Order Invoice", // Subject line
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
          <title>ExpoMStore</title>
          <!-- Bootstrap cdn 3.3.7 -->
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous"
          />
          <!-- Custom font montseraat -->
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700"
            rel="stylesheet"
          />
          <style>
            body {
              font-family: "Montserrat", sans-serif;
            }
            hr {
              margin-top: 10px;
              margin-bottom: 10px;
            }
      
            .invoice {
              position: relative;
              background-color: #f5f5f5;
            }
            .bg-color {
              position: absolute;
              height: 350px; /* Addition of 100px of invoice-wrapper and min-height of invoice-top */
              top: 0;
              left: 0;
              right: 0;
            }
            .invoice-wrapper {
              margin-top: 100px;
              margin-bottom: 30px;
              margin-left: auto;
              margin-right: auto;
              max-width: 900px;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            }
      
            .invoice-top {
              background-color: #f5f5f5;
              min-height: 250px;
              max-height: 250px;
              overflow: hidden;
              padding: 40px 60px;
            }
      
            .invoice-top-left .logo {
              width: 190px;
            }
            .invoice-top-left h1 {
              font-size: 24px;
              letter-spacing: 1.5px;
            }
            .invoice-top-left h5 {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.3);
            }
      
            .invoice-top-right {
              text-align: right;
            }
            .invoice-top-right h4 {
              font-size: 20px;
            }
            .invoice-top-right h6 {
              color: rgba(0, 0, 0, 0.3);
              font-size: 14px;
              margin-top: 15px;
            }
            .invoice-top-right h3 {
              color: rgba(0, 0, 0, 0.3);
              font-size: 14px;
              margin-top: 15px;
            }
            .invoice-top-right .amount {
              color: rgba(0, 200, 83, 0.95);
              font-size: 16px;
              margin-top: 40px;
            }
      
            .invoice-bottom {
              background-color: #ffffff;
              padding: 5px 60px 30px;
            }
      
            .invoice-bottom .service-title {
              font-size: 18px;
            }
            .invoice-bottom .service-subtitle {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.7);
              font-weight: 400;
            }
            .invoice-bottom .service-price {
              font-size: 16px;
              color: rgba(0, 200, 83, 0.55);
              text-align: right;
            }
            .invoice-bottom .price-info {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.3);
              text-align: right;
            }
      
            .sub-total,
            .sub-total-price {
              margin-top: 30px !important;
            }
            .sub-total,
            .discount {
              text-transform: uppercase;
              color: rgba(0, 0, 0, 0.4);
              text-align: right;
              font-size: 13px;
            }
            .sub-total-price,
            .discount-price {
              font-size: 16px;
              color: #333;
              margin-top: 10px;
              text-align: right;
            }
            .total-due {
              text-align: right;
              font-size: 13px;
              color: #333;
            }
            .total-due-price {
              color: rgba(0, 200, 83, 0.95);
              font-size: 18px;
              text-align: right;
            }
      
            .footer {
              background-color: #fafafa;
              padding: 50px 50px;
            }
            .client-address h6 {
              color: rgba(0, 0, 0, 0.3);
              font-size: 15px;
            }
            .client-address h2 {
              color: #222;
              font-size: 16px;
            }
            .client-address h4 {
              font-size: 13px;
              color: rgba(0, 0, 0, 0.4);
              line-height: 1.65;
              font-weight: 400;
            }
      
            .our-address h6 {
              color: rgba(0, 0, 0, 0.3);
              font-size: 15px;
            }
            .our-address h2 {
              color: #222;
              font-size: 16px;
            }
            .our-address h4 {
              font-size: 13px;
              color: rgba(0, 0, 0, 0.4);
              line-height: 1.65;
              font-weight: 400;
            }
      
            .note h6 {
              color: rgba(0, 0, 0, 0.3);
              font-size: 15px;
            }
            .note p {
              color: rgba(0, 0, 0, 0.4);
              margin-top: 20px;
            }
            .payment {
              background-color: #2196f3;
              padding: 20px;
            }
            .payment h3 {
              margin: 0;
              font-size: 20px;
              letter-spacing: 1.5px;
            }
            .payment h3 a {
              color: #fff;
            }
          </style>
        </head>
        <body>
          <section class="invoice">
            <div class="bg-color"></div>
            <div class="container">
              <div class="row">
                <div class="col-xs-12">
                  <div class="invoice-wrapper">
                    <div class="invoice-top">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="invoice-top-left">
                            <h1>ExpoMStore</h1>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="invoice-top-right">
                            <h4>INVOICE</h4>
                            <h6>${id}</h6>
                            <h3>Sep 6th, 2017</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="invoice-bottom">
                    ${orderDetailsRow}
      
                      <hr />
                      <div class="row">
                        <div class="col-sm-10 col-xs-8">
                          <h4 class="sub-total">SUB TOTAL</h4>
                        </div>
                        <div class="col-sm-2 col-xs-4">
                          <h3 class="sub-total-price">$${total}</h3>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-sm-10 col-xs-8">
                          <h4 class="payment status">Payment Status</h4>
                        </div>
                        <div class="col-sm-2 col-xs-4">
                          <h3 class="status">${paymentStatus}</h3>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-sm-10 col-xs-8">
                          <h4 class="order-status">Order Status</h4>
                        </div>
                        <div class="col-sm-2 col-xs-4">
                          <h3 class="order-status">${orderStatus}</h3>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="footer">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="client-address">
                            <h6>TO</h6>
                            <h2>${userDetails.email}</h2>
                            <h4>
                              ${address}
                            </h4>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="our-address">
                            <h6>FROM</h6>
                            <h2>ExpoMStore</h2>
                            <h4>
                              189 Fight Street <br />
                              Las Vegas, LV 878 <br />
                              United States <br />
                              contact@airbnb.co
                            </h4>
                          </div>
                        </div>
                        <div class="col-md-offset-1 col-md-5">
                          <div class="note">
                            <h6>NOTE</h6>
                            <p>Thanks for choosing our service.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <!-- jquery slim version 3.2.1 minified -->
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g="
            crossorigin="anonymous"
          ></script>
      
          <!-- Latest compiled and minified JavaScript -->
          <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"
          ></script>
        </body>
      </html>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("error =>", error);
  }
};
export default handleSendMail;
