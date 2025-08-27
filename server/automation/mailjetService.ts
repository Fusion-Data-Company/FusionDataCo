import Mailjet from 'mailjet';

export class MailjetService {
  private mailjet: any;

  constructor() {
    this.initializeMailjet();
  }

  private initializeMailjet(): void {
    try {
      this.mailjet = new Mailjet({
        apiKey: process.env.MAILJET_API_KEY!,
        apiSecret: process.env.MAILJET_SECRET!
      });
      console.log('[MAILJET] Service initialized');
    } catch (error) {
      console.error('[MAILJET] Failed to initialize:', error);
    }
  }

  async sendNewsletter(
    subject: string,
    content: string,
    recipients: { email: string; name?: string }[]
  ): Promise<void> {
    if (!this.mailjet) {
      throw new Error('Mailjet service not initialized');
    }

    try {
      const request = this.mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [{
            From: {
              Email: "content@fusiondataco.com",
              Name: "FusionDataCo VIBE CODING Newsletter"
            },
            To: recipients.map(recipient => ({
              Email: recipient.email,
              Name: recipient.name || recipient.email
            })),
            Subject: subject,
            HTMLPart: content,
            TextPart: this.stripHtml(content)
          }]
        });

      const result = await request;
      console.log(`[MAILJET] Newsletter sent to ${recipients.length} recipients`);
      console.log(`[MAILJET] Response:`, result.body);

    } catch (error) {
      console.error('[MAILJET] Failed to send newsletter:', error);
      throw error;
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  async sendTestEmail(to: string): Promise<void> {
    if (!this.mailjet) {
      throw new Error('Mailjet service not initialized');
    }

    try {
      const request = this.mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [{
            From: {
              Email: "test@fusiondataco.com",
              Name: "FusionDataCo Test"
            },
            To: [{
              Email: to,
              Name: "Test Recipient"
            }],
            Subject: "FusionDataCo Automation Test",
            HTMLPart: `
              <h1>🚀 FusionDataCo Automation Test</h1>
              <p>This is a test email from your FusionDataCo automation system!</p>
              <p>If you're receiving this, the email integration is working correctly.</p>
              <p><strong>VIBE CODING</strong> newsletter system is ready to go!</p>
            `,
            TextPart: "FusionDataCo Automation Test - Email integration working correctly!"
          }]
        });

      const result = await request;
      console.log(`[MAILJET] Test email sent to ${to}`);
      
    } catch (error) {
      console.error('[MAILJET] Failed to send test email:', error);
      throw error;
    }
  }
}

export const mailjetService = new MailjetService();