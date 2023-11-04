import { createTransport } from "nodemailer";

export default async function send_mail_verification(
  name: string,
  code: number,
  email: string
) {
  const transport = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.FROM_GMAIL,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  let res = await transport.sendMail({
    from: `WEVER<process.env.FROM_GMAIL>`,
    to: email,
    subject: "Verify your mail for WEVER!",
    text: "123456 is your verification code for WEVER app.",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Verify your email for WEVER</title>
    
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet" />
    </head>
    
    <body style="
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          background: #ffffff;
          font-size: 14px;
        ">
        <div style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #F7EEE5;
            background-image: url(${
              process.env.VERCEL_URL
            }/img/email-backdrop.png);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          ">
            <header>
                <table style="width: 100%;">
                    <tbody>
                        <tr style="height: 0;">
                            <td>
                                <p style="color:#130B06; font-weight:bold; font-size:1.7rem">WEVER</p>
                            </td>
                            <td style="text-align: right;">
                                <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${new Intl.DateTimeFormat(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                ).format(Date.now())}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>
    
            <main>
                <div style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              ">
                    <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                        <h1 style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  ">
                            Your OTP
                        </h1>
                        <p style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  ">
                            Hey ${name},
                        </p>
                        <p style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  ">
                            New signup request to <span style="font-weight: 600; color: #1f1f1f;">WEVER</span> app for your
                            email. Please enter the OTP to continue. The code will expire within
                            <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                            Do not share this code with others, including <span
                                style="font-weight: 600; color: #1f1f1f;">WEVER</span>
                            employees.
                        </p>
                        <p style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color:#9F6550;;
                  ">
                            ${code}
                        </p>
                        <p style="
                    margin: 0;
                    margin-top: 30px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  ">If you did not make the request you can safely ignore the mail.</p>
                    </div>
                </div>
    
                <p style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              ">
                    Need help? Ask at
                    <a href="mailto:the.wever.app@gmail.com" style="color: #9F6550; text-decoration: none;">the.wever.app@gmail.com</a>
                    or visit our
                    <a href="" target="_blank" style="color: #9F6550; text-decoration: none;">Help Center</a>
                </p>
            </main>
    
            <footer style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            ">
                <p style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              ">
                    Wever App
                </p>
                <p style="margin: 0; margin-top: 8px; color: #434343;">
                    Dhaka, Bangladesh
                </p>
                <div style="margin: 0; margin-top: 16px;">
                    <a href="" target="_blank" style="display: inline-block;">
                        <img width="36px" alt="Facebook"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
                    </a>
                    <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                        <img width="36px" alt="Instagram"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
                    <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                        <img width="36px" alt="Twitter"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                    </a>
                    <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                        <img width="36px" alt="Youtube"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
                </div>
                <p style="margin: 0; margin-top: 16px; color: #434343;">
                    Copyright © ${new Date().getFullYear()} WEVER. All rights reserved.
                </p>
            </footer>
        </div>
    </body>
    
    </html>`,
  });

  return res;
}
