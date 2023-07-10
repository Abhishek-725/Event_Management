import React from 'react';
import GooglePayButton from '@google-pay/button-react';

function Google() {
return ( <>
    <div>
        <div>
            <GooglePayButton
            
                paymentRequest={{
                    apiVersion:2,
                    apiVersionMinor:0,
                    allowedPaymentMethods:[{
                        type:'CARD',
                        parameters:{
                            allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
                            allowedCardNetworks:['MASTERCARD','VISA',]
                        },
                        tokenizationSpecification:{
                            type:'PAYMENT_GATEWAY',
                            parameters: {
                                        gateway: 'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                    }
                        }
                    }],
                    merchantInfo: {
                            merchantId: '12345678901234567890',
                            merchantName: 'Demo Merchant',
                            },
                    transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice: '1.00',
                            currencyCode: 'INR',
                            countryCode: 'INR',
                        },
                    shippingAddressRequired:true,
                    callbackIntents:['PAYMENT_AUTHORIZATION'],


                }
                }
                onLoadPaymentData={paymentRequest => {
                            console.log('load payment data', paymentRequest);
                        }}
                onPaymentAuthorized={paymentData => {
                    console.log("Payment Authorized ",paymentData);
                    return {transactionState:"SUCCESS"}
                }}
                existingPaymentMethodRequired='false'
                buttonColor='black'
                buttonType='pay'
            />
        </div>
    </div>
</>  );
}

export default Google;