export const forgetPasswordEmailTemplate=(url:string)=>{
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: #a31621;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        background: #a31621;
        color: #ffffff !important;
        padding: 12px 20px;
        margin: 20px auto;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        font-size: 12px;
        color: #888888;
        text-align: center;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>We received a request to reset your password for your account. Click the button below to set a new password:</p>
        
        
          <a href="${url}" class="button">Reset My Password</a>
        
        <p>If you did not request this, you can safely ignore this email — your password will not be changed.</p>
        <p>This link will expire in <strong>10 minutes</strong>.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} fash.com | All rights reserved</p>
      </div>
    </div>
  </body>
  </html>
  `;

}