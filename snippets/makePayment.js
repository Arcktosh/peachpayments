import api from "@/api/peachapi"

const makePayment = async ({
  amount,
  paymentBrand,
  paymentType,
  cardNumber,
  cardHolder,
  cardExpiryMonth,
  cardExpiryYear,
  cardCvv,
  enitityId = "8a8294174e735d0c014e78cf26461790",
}) => {
  const isSyncFlow = 1 //paymentBrand?.startsWith("sync")
  // const brand = paymentBrand.replace("sync", "").replace("async", "")

  let requestData = {
    "authentication.entityId": "8ac7a49f6e4a18ae016e4b8b4c4b2146",
    amount: "12.00",
    currency: "EUR",
    paymentBrand: "VISA",
    paymentType: "PA",
    merchantTransactionId: "order99234",
    transactionCategory: "EC",
    "card.number": "4000000000000010",
    "card.expiryMonth": "12",
    "card.expiryYear": "2025",
    "card.cvv": "123",
    "card.holder": "John Smith",
    "merchant.name": "MerchantCo",
    "merchant.city": "Munich",
    "merchant.country": "DE",
    "merchant.mcc": "5399",
    shopperResultUrl: "https://merchant.org",
    "customer.ip": "192.168.0.1",
    "customer.browser.acceptHeader": "text/html",
    "customer.browser.screenColorDepth": "48",
    "customer.browser.javaEnabled": "false",
    "customer.browser.language": "de",
    "customer.browser.screenHeight": "1200",
    "customer.browser.screenWidth": "1600",
    "customer.browser.timezone": "60",
    "customer.browser.challengeWindow": "4",
    "customer.browser.userAgent": "Mozilla/4.0 (MSIE 6.0; Windows NT 5.0)",
    testMode: "EXTERNAL",
  }

  try {
    const payment = await api.post(
      "/payments",
      URLSearchParams.toString(requestData)
    )

    console.log("--- payment ---")
    console.log(payment)
  } catch (error) {
    console.error(error)
  }
}

export default makePayment
