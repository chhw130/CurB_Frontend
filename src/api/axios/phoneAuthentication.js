// import axios from "axios";
// // const CryptoJS = require("crypto-js");

// import CryptoJS from "crypto-js";

// const Cache = require("memory-cache");

// // const date = Date.now().toString();
// // const uri = secret_key.NCP_serviceID;
// // const secretKey = secret_key.NCP_secretKey;
// // const accessKey = secret_key.NCP_accessKey;
// // const method = "POST";
// // const space = " ";
// // const newLine = "\n";
// // const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
// // const url2 = `/sms/v2/services/${uri}/messages`;

// // const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

// // hmac.update(method);
// // hmac.update(space);
// // hmac.update(url2);
// // hmac.update(newLine);
// // hmac.update(date);
// // hmac.update(newLine);
// // hmac.update(accessKey);

// // const hash = hmac.finalize();
// // const signature = hash.toString(CryptoJS.enc.Base64);

// export const makeSignitureForSMS = () => {
//   const message = [];
//   var hmac = CryptoJS.algo.HMAC.create(
//     CryptoJS.algo.SHA256,
//     secret_key.NCP_secretKey
//   );
//   const timeStamp = Number(Date.now());
//   const space = " ";
//   const newLine = "\n";
//   const method = "POST";

//   message.push(method);
//   message.push(space);
//   message.push(`/sms/v2/services/${secret_key.NCP_serviceID}/messages`);
//   message.push(newLine);
//   message.push(timeStamp);
//   message.push(newLine);
//   message.push(secret_key.NCP_accessKey);
//   var hash = hmac.finalize();

//   return hash.toString(CryptoJS.enc.Base64);
// };

// export const sendMessage = async function (req, res) {
//   const phoneNumber = req.body.phoneNumber;

//   Cache.del(phoneNumber);

//   const signature = makeSignitureForSMS();

//   //인증번호 생성
//   const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
//   Cache.put(phoneNumber, verifyCode.toString());

//   const headers = {
//     "Content-Type": "application/json; charset=utf-8",
//     "x-ncp-apigw-timestamp": Number(Date.now()),
//     "x-ncp-iam-access-key": secret_key.NCP_accessKey,
//     "x-ncp-apigw-signature-v2": signature,
//   };

//   const body = {
//     type: "SMS",
//     contentType: "COMM",
//     countryCode: "82",
//     from: "01062848167",
//     content: `[Curb] 인증번호 [${verifyCode}]를 입력해주세요.`,
//     messages: [
//       {
//         to: `${phoneNumber}`,
//       },
//     ],
//   };

// axios
//   .post(
//     `https://sens.apigw.ntruss.com/sms/v2/services/${secret_key.NCP_serviceID}/messages`,
//     body,
//     { headers }
//   )
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// };

// export const verify = async function (req, res) {
//   const phoneNumber = req.body.phoneNumber;
//   const verifyCode = req.body.verifyCode;

//   const CacheData = Cache.get(phoneNumber);

//   if (!CacheData) {
//     return 1;
//   } else if (CacheData !== verifyCode) {
//     return "값이 틀립니다.";
//   } else {
//     Cache.del(phoneNumber);
//     return 2;
//   }
// };

import axios from "axios";
import CryptoJS from "crypto-js";

const secret_key = {
  NCP_serviceID: "ncp:sms:kr:306207594347:curb-dev",
  NCP_accessKey: "B1EaHVNUwRPkQ3PTspyn",
  NCP_secretKey: "XWYSYWDfx6HjptZBTR0wPcPvlv9NdNNgsYXZwgd7",
};

export function send_message(phone) {
  var user_phone_number = phone;
  var user_auth_number = Math.random().toString(36).slice(2);
  var resultCode = 404;

  const date = Date.now().toString();
  const uri = secret_key.NCP_serviceID;
  const secretKey = secret_key.NCP_secretKey;
  const accessKey = secret_key.NCP_accessKey;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  fetch(`/${uri}/messages`, {
    method: "POST",
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    body: JSON.stringify({
      type: "SMS",
      countryCode: "82",
      from: "0000",
      content: `인증번호 ${user_auth_number} 입니다.`,
      messages: [
        {
          to: `${user_phone_number}`,
        },
      ],
    }),
  }).then((data) => console.log(data));

  // axios(`/${uri}/messages`).then((data) => console.log(data));

  // axios
  //   .post(
  //     `/${uri}/messages`,
  //     {
  //       type: "SMS",
  //       countryCode: "82",
  //       from: "0000",
  //       content: `인증번호 ${user_auth_number} 입니다.`,
  //       messages: [
  //         {
  //           to: `${user_phone_number}`,
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         "Contenc-type": "application/json; charset=utf-8",
  //         "x-ncp-iam-access-key": accessKey,
  //         "x-ncp-apigw-timestamp": date,
  //         "x-ncp-apigw-signature-v2": signature,
  //       },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));
  return resultCode;
}
