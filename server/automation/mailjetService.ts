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
        apiSecret: process.env.MAILJET_SECRET_KEY!
      });
      console.log('[MAILJET] ✅ Service initialized successfully');
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

  async sendFormNotification(formData: any, formType: string): Promise<void> {
    if (!this.mailjet) {
      console.warn('[MAILJET] Service not initialized - skipping email notification');
      return; // Gracefully degrade if Mailjet is not configured
    }

    try {
      // Format form data for email
      const formFields = Object.entries(formData)
        .filter(([key]) => key !== 'source' && key !== 'formType')
        .map(([key, value]) => `<p><strong>${this.formatFieldName(key)}:</strong> ${value || 'Not provided'}</p>`)
        .join('');

      const subject = `New ${formType} Form Submission - FusionDataCo`;
      const htmlContent = `
        <h2>🎯 New ${formType} Form Submission</h2>
        <p>You have received a new form submission from the FusionDataCo website.</p>
        <hr style="border: 1px solid #14ffc8; margin: 20px 0;">
        <h3>Submission Details:</h3>
        ${formFields}
        <hr style="border: 1px solid #14ffc8; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Submitted at: ${new Date().toLocaleString()}<br>
          Source: ${formData.source || 'Website'}
        </p>
      `;

      const request = this.mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [{
            From: {
              Email: "notifications@fusiondataco.com",
              Name: "FusionDataCo Form Notifications"
            },
            To: [{
              Email: "rob@fusiondataco.com",
              Name: "Rob Yeager"
            }],
            Subject: subject,
            HTMLPart: htmlContent,
            TextPart: this.stripHtml(htmlContent)
          }]
        });

      const result = await request;
      console.log(`[MAILJET] Form notification sent for ${formType} submission`);
      
    } catch (error) {
      console.error('[MAILJET] Failed to send form notification:', error);
      // Don't throw - we don't want email failures to break form submissions
      console.error('[MAILJET] Form was saved but email notification failed');
    }
  }

  private formatFieldName(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ')
      .trim();
  }
}

export const mailjetService = new MailjetService();