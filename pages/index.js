import { useEffect, useState } from "react"
import Head from "next/head"
import Alert from "@/components/Alert"
import InputField from "@/components/InputField"
import Formatter from "@/snippets/formatter"
import detectCardType from "@/snippets/detectCardType"

export default function Home() {
  const price = "100.00"
  const [billingAddress, setBillingAddress] = useState("")
  const [billingCity, setBillingCity] = useState("")
  const [billingProvince, setBillingProvince] = useState("")
  const [billingPostalCode, setBillingPostalCode] = useState("")
  const [cardholder, setCardHolder] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [exp, setExp] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardType, setCardType] = useState("")

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkVisa()
  }, [cardNumber])

  const checkVisa = () => {
    setCardType("")
    const res = detectCardType(cardNumber)
    if (res) {
      setCardType(res.toUpperCase())
    }
  }

  const cancel = () => {
    setBillingAddress("")
    setBillingPostalCode("")
    setBillingCity("")
    setBillingProvince("")
    setCardHolder("")
    setCardNumber("")
    setCardType("")
    setCvv("")
    setExp("")
  }

  const subscribe = async () => {
    setLoading(true)
    setError("")

    if (!cardholder || !cardNumber || !exp || !cvv) {
      setError("Please ensure all card details are completed")
      setLoading(false)
      return
    }

    if (!cardType) {
      setError(`The Card Number is not valid`)
      setLoading(false)
      return
    }

    if (exp.length == 4) {
      const expirey = exp.slice(2) + exp.substring(0, 2)
      const date = new Date()
      const dateLimit =
        date.getFullYear().toString().slice(2) +
        ("0" + (date.getMonth() + 1).toString()).slice(-2)

      if (expirey < dateLimit) {
        setError("Card Expired")
        setLoading(false)
        return
      }
    } else {
      setError("Card expirey not valid")
      setLoading(false)
      return
    }

    await makePayment({
      amount: price,
      paymentBrand: cardType,
      paymentType: "",
      cardNumber: cardNumber,
      cardHolder: cardholder,
      cardExpiryMonth: exp.substring(0, 2),
      cardExpiryYear: `20${exp.slice(2)}`,
      cardCvv: cvv,
    })

    setSuccess("Payment successfull!")
    setLoading(false)
    return
  }

  return (
    <>
      <Head>
        <title>Peach Payments</title>
        <meta
          name='description'
          content='basic setup for peach payments integration'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-wrap'>
        <div className='flex items-center justify-between align-middle'>
          <div className='text-4xl text-black'>{Formatter.format(price)}</div>
          <div className='text-xs'>
            <button onClick={cancel} className='cursor-pointer'>
              Cancel
            </button>
          </div>
        </div>
        <div className='py-3'>
          <hr />
        </div>
        <div className='flex'>
          <span>
            <i className='text-black ti-lock'></i>
          </span>{" "}
          Transactions are encrypted and secured.
        </div>
        <div className='flex items-center pt-2 font-bold align-middle'>
          <div className=''>Credit or Debit card</div>
          <div className='ml-1'>
            <img
              src={
                cardType == "VISA"
                  ? "/visa.png"
                  : cardType == "MASTER"
                  ? "/master.png"
                  : "/cardPayment.png"
              }
              alt='Payment'
              className='h-7'
            />
          </div>
        </div>
        <form action=''>
          <InputField
            placeholder='Billing Address'
            onChange={setBillingAddress}
            value={billingAddress}
          />
          <InputField
            placeholder='City'
            onChange={setBillingCity}
            value={billingCity}
          />
          <InputField
            placeholder='Province'
            onChange={setBillingProvince}
            value={billingProvince}
          />
          <InputField
            placeholder='Postal Code'
            type='number'
            onChange={setBillingPostalCode}
            value={billingPostalCode}
          />
          <InputField
            placeholder='Cardholder Name'
            onChange={setCardHolder}
            value={cardholder}
          />
          <InputField
            placeholder='Card Number'
            onChange={setCardNumber}
            value={cardNumber}
          />
          <div className='flex gap-3'>
            <div className='w-1/2'>
              <div className='-mb-3'>
                <label className=''>Exp. (MMYY)</label>
              </div>
              <InputField
                placeholder='MMYY'
                onChange={setExp}
                type='number'
                value={exp}
              />
            </div>
            <div className='w-1/2'>
              <div className='-mb-3'>
                <label>CVV</label>
              </div>
              <InputField
                placeholder='123'
                type='number'
                onChange={setCvv}
                value={cvv}
              />
            </div>
          </div>
          <div className='w-full pb-3 text-center'>
            Please ensure all fields are completed before subscribing
            <Alert success={success} error={error} />
          </div>
          <div className='flex justify-center my-3'>
            <button onClick={subscribe}>
              {loading ? "Loading..." : "Pay now"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
