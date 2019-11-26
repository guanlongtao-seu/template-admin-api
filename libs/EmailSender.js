const nodeMailer = require('nodemailer');
const options = require('../config').EmailSender;

class EmailSender {
  constructor() {
    this.transporter = nodeMailer.createTransport(options);

  };
  async sendMail({subject, to, text, attachments, html = ''}) {
    return await this.transporter.sendMail({
      from: options.auth.user,
      subject,
      to,
      text: String(text), // 内容必须是string 或者 buffer
      attachments,
      html
    })
  }
}

module.exports = EmailSender;
