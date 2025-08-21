import * as brevo from '@getbrevo/brevo';

export async function sendQuizResults(
  email: string,
  animalType: string,
  animalData: any,
  selectedTraits: string[],
  cohortId?: string
) {
  // Initialize API instance inside the function to ensure env vars are loaded
  const apiInstance = new brevo.TransactionalEmailsApi();
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('BREVO_API_KEY is not configured');
    throw new Error('Email service is not configured');
  }
  
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `🎉 Your Animal Personality Quiz Results: ${animalData.title}`;
  sendSmtpEmail.to = [{ email, name: email.split('@')[0] }];
  sendSmtpEmail.sender = { name: 'Animal Personality Quiz', email: process.env.FROM_EMAIL || 'noreply@animalquiz.com' };
  
  const traitsHtml = selectedTraits.map(trait => `<li>${trait}</li>`).join('');
  const strengthsHtml = animalData.strengths.map((strength: string) => `<li>${strength}</li>`).join('');
  const challengesHtml = animalData.challenges.map((challenge: string) => `<li>${challenge}</li>`).join('');
  
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Animal Personality Results</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px; }
            .header-content { background: rgba(255, 255, 255, 0.15); padding: 20px; border-radius: 8px; color: white; }
            .animal-emoji { font-size: 60px; margin-bottom: 10px; }
            .animal-title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .description { font-size: 16px; opacity: 0.9; }
            .section { margin-bottom: 25px; padding: 20px; border-radius: 8px; }
            .traits-section { background: #f8f4ff; border-left: 4px solid #667eea; }
            .strengths-section { background: #f0f9f4; border-left: 4px solid #22c55e; }
            .challenges-section { background: #fef2f2; border-left: 4px solid #ef4444; }
            .info-section { background: #f0f9ff; border-left: 4px solid #0ea5e9; }
            .section-title { font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #333; }
            ul { padding-left: 20px; }
            li { margin-bottom: 8px; }
            .footer { text-align: center; padding-top: 30px; border-top: 1px solid #e5e7eb; margin-top: 30px; color: #666; font-size: 14px; }
            .cohort-info { background: #fefce8; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .copyright { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
            .cookie-notice { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 12px; color: #856404; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-content">
                <div class="animal-emoji">${animalData.emoji}</div>
                <div class="animal-title">You are ${animalData.title}!</div>
                <div class="description">${animalData.description}</div>
            </div>
        </div>

        ${cohortId ? `
        <div class="cohort-info">
            <strong>📊 Group: ${cohortId}</strong><br>
            Your results are part of your group's personality analysis.
        </div>
        ` : ''}

        <div class="section traits-section">
            <div class="section-title">🎯 Your Selected Traits</div>
            <ul>${traitsHtml}</ul>
        </div>

        <div class="section strengths-section">
            <div class="section-title">⭐ Your Strengths</div>
            <ul>${strengthsHtml}</ul>
        </div>

        <div class="section challenges-section">
            <div class="section-title">🔍 Areas for Growth</div>
            <ul>${challengesHtml}</ul>
        </div>

        <div class="section info-section">
            <div class="section-title">💼 Work Style</div>
            <p>${animalData.workStyle}</p>
        </div>

        <div class="section info-section">
            <div class="section-title">💬 Communication Style</div>
            <p>${animalData.communication}</p>
        </div>

        <div class="section info-section">
            <div class="section-title">👥 Leadership Approach</div>
            <p>${animalData.leadership}</p>
        </div>

        <div class="section info-section">
            <div class="section-title">🎯 What Motivates You</div>
            <p>${animalData.motivation}</p>
        </div>

        <div class="footer">
            <p>Thank you for taking the Animal Personality Quiz!</p>
            <p>Share your results with friends and colleagues to build better teams.</p>
        </div>

        <div class="copyright">
            <p>&copy; 2025 Ethos Lab. All Rights Reserved.</p>
            <p><a href="https://www.ethosaz.com" style="color: #667eea; text-decoration: none;">www.ethosaz.com</a></p>
        </div>

        <div class="cookie-notice">
            <p><strong>Cookie Notice:</strong> This email was sent based on your quiz participation. We use cookies and similar technologies to improve your experience on our website. By using our services, you consent to our use of cookies in accordance with our privacy policy. For more information about how we handle your data, please visit our website.</p>
        </div>
    </body>
    </html>
  `;

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', result);
    return { success: true, messageId: (result as any).messageId || 'unknown' };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}