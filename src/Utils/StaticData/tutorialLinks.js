const tutorialLinks = {
  singleEntry: {
    title: 'Allow only one entry for each IP address.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#allow-single-entry-for-each-ip-address',
  },
  requiredLoggedInUser: {
    title: 'Allow only logged in users to submit the form.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#allow-only-logged-in-users-to-submit-the-form',
  },
  preventEmptySubmission: {
    title: 'This will prevent empty form submission.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#disallow-empty-form-submission',
  },
  validateFocusLost: {
    title: 'This will validate the field when the user leaves the field.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#validate-form-input-for-focus-lost',
  },
  disableEntryStoring: {
    title: 'This will disable storing the user entry in the database.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#disable-entry-storing-in-wordpress-database',
  },
  recaptchaV3: {
    title: 'This will enable reCAPTCHA v3.',
    link: 'https://bitapps.pro/docs/bit-form/integrations/recaptcha-v3-integrations/',
  },
  honeypot: {
    title: `Honeypot protection provides security mechanisms to protect your site from form submission by spam bots. 
    If spam bot activity is detected, form submission is blocked.`,
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#honeypot',
  },
  limitEntry: {
    title: 'This will limit the number of entries.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#disable-this-form-after-limited-entry',
  },
  limitPeriod: {
    title: 'this will limit the form submission for specific period.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#limit-form-submission-period',
  },
  blockedIp: {
    title: 'This will block the specific IP address from submitting the form.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#blocked-ip-list',
  },
  allowedIp: {
    title: 'This will allow the specific IP address to submit the form.',
    link: 'https://bitapps.pro/docs/bit-form/form-settings/#allowed-ip-list',
  },
  googleAdds: {
    title: 'This will enable Google Ads conversion tracking.',
    link: 'https://bitapps.pro/docs/bit-form/integrations/google-ads-integrations/',
  },
  confirmationDoc: {
    title: 'How to Configure Confirmation Message/Redirect page',
    link: 'https://bitapps.pro/docs/bit-form/confirmation-message/',
  },
  conditionalLogic: {
    title: 'How to Configure Conditional Logic',
    link: 'https://youtu.be/OjBgk_QuGsk',
  },
  conditionalLogicDoc: {
    title: 'How to Configure Conditional Logic',
    link: 'https://bitapps.pro/docs/bit-form/conditional-logic/',
  },
  integrations: {
    title: 'How to Setup Integrations',
    link: 'https://youtu.be/vHnwV3Tekr8',
  },
  integrationsDoc: {
    title: 'How to Setup Integrations',
    link: 'https://bitapps.pro/docs/bit-form/integrations/',
  },
  emailTemplates: {
    title: 'How to Configure Email Templates',
    link: 'https://youtu.be/HpMUF5EO-Gg',
  },
  emailTemplatesDoc: {
    title: 'How to Configure Email Templates',
    link: 'https://bitapps.pro/docs/bit-form/email-tempalate/',
  },
  acf: {
    title: 'How to Setup ACF integration',
    link: 'https://www.youtube.com/watch?v=zu0zB4OgE20&ab_channel=BitApps',
  },
  activeCampaign: {
    title: 'How to Setup ActiveCampaign integration',
    link: 'https://www.youtube.com/watch?v=CfKrN2yHDxw&ab_channel=BitApps',
  },
  acumbamail: {
    title: 'How to Setup Acumbamail integration',
    link: 'https://www.youtube.com/watch?v=BKPC_qpN3Ck&ab_channel=BitApps',
  },
  autonami: {
    title: 'How to Setup Autonami integration',
    link: 'https://www.youtube.com/watch?v=yp1CVdfVITw&ab_channel=BitApps',
  },
  dropbox: {
    title: 'How to Setup Dropbox integration',
    link: 'https://www.youtube.com/watch?v=ErbHGx3u0xs&ab_channel=BitApps',
  },
  elasticemail: {
    title: 'How to Setup Elastic Email Integration',
    link: 'https://www.youtube.com/watch?v=FFwpn-9N1lw&ab_channel=BitApps',
  },
  encharge: {
    title: 'How to Setup Encharge integration',
    link: 'https://www.youtube.com/watch?v=0XM9KhOKWWw&ab_channel=BitApps',
  },
  fluentCRM: {
    title: 'How to Setup Fluent-CRM integration',
    link: 'https://www.youtube.com/watch?v=kJ2pCH2FQwU&ab_channel=BitApps',
  },
  googelSheets: {
    title: 'How to Setup Google Sheets integration',
    link: 'https://www.youtube.com/watch?v=Vb4CE-hXbbo&ab_channel=BitApps',
  },
  integrately: {
    title: 'How to Setup Integrately integration',
    link: 'https://www.youtube.com/watch?v=2tj8MrDzfAA&ab_channel=BitApps',
  },
  integromat: {
    title: 'How to Setup Integromat integration',
    link: 'https://www.youtube.com/watch?v=myB_pia6bBM&ab_channel=BitApps',
  },
  mailChimp: {
    title: 'How to Setup MailChamp integration',
    link: 'https://www.youtube.com/watch?v=ZjAVXYbh7LY&ab_channel=BitApps',
  },
  mailPoet: {
    title: 'How to Setup MailPoet integration',
    link: 'https://www.youtube.com/watch?v=5hDcm4vVwcg&ab_channel=BitApps',
  },
  mailerlite: {
    title: 'How to Setup MailerLite integration',
    link: 'https://www.youtube.com/watch?v=5hDcm4vVwcg&ab_channel=BitApps',
  },
  metaBox: {
    title: 'How to Setup MetaBox integration',
    link: 'https://www.youtube.com/watch?v=RSXaqSjqttc&ab_channel=BitApps',
  },
  pabbly: {
    title: 'How to Setup Pabbly integration',
    link: 'https://www.youtube.com/watch?v=SE_ncIRtv7Q&ab_channel=BitApps',
  },
  pods: {
    title: 'How to Setup Pods integration',
    link: 'https://www.youtube.com/watch?v=81Uu2Rbmm0Y&ab_channel=BitApps',
  },
  sendinblue: {
    title: 'How to Setup Brevo(SendinBlue) integration',
    link: 'https://www.youtube.com/watch?v=DLWvKoPbbN8&ab_channel=BitApps',
  },
  telegram: {
    title: 'How to Setup Telegram integration',
    link: 'https://www.youtube.com/watch?v=M0u1joqrRTA&ab_channel=BitApps',
  },
  wooCommerce: {
    title: 'How to Setup WooCommerce integration',
    link: 'https://www.youtube.com/playlist?list=PL7c6CDwwm-AIRTzF919Kh67QBmTlNa3td',
  },
  zapier: {
    title: 'How to Setup Zapier integration',
    link: 'https://www.youtube.com/watch?v=uORXmZANU3M&ab_channel=BitApps',
  },
  zohoAnalytics: {
    title: 'How to Setup Zoho Analytics integration',
    link: 'https://www.youtube.com/watch?v=Eoxxu3U_3_s&ab_channel=BitApps',
  },
  zohoBigin: {
    title: 'How to Setup Zoho Bigin integration',
    link: 'https://www.youtube.com/watch?v=9cU1Tn7m3rY&list=PLJDk81Wj7a_OmS6jPi1t7NeIVGJNPV344',
  },
  zohoCampaigns: {
    title: 'How to Setup Zoho Campaigns integration',
    link: 'https://www.youtube.com/watch?v=ixJXIzy8hOQ&ab_channel=BitApps',
  },
  zohoCreator: {
    title: 'How to Setup Zoho Creator integration',
    link: 'https://www.youtube.com/watch?v=muB8tE1-bVg&ab_channel=BitApps',
  },
  zohoCrm: {
    title: 'How to Setup Zoho-CRM integration',
    link: 'https://www.youtube.com/watch?v=0fYVHhXqSJI&list=PL7c6CDwwm-ALDlpDo9vCBjdiJDJ33Xx0z&ab_channel=BitApps',
  },
  zohoDesk: {
    title: 'How to Setup Zoho Desk integration',
    link: 'https://www.youtube.com/watch?v=zDKRmhTsYEM&ab_channel=BitApps',
  },
  zohoFlow: {
    title: 'How to Setup Zoho Flow integration',
    link: 'https://www.youtube.com/watch?v=lbRiwN7J97Q&ab_channel=BitApps',
  },
  zohoMail: {
    title: 'How to Setup Zoho Mail integration',
    link: 'https://www.youtube.com/watch?v=en6GWQ_8who&ab_channel=BitApps',
  },
  zohoMarketingHub: {
    title: 'How to Setup Zoho Marketing Hub integration',
    link: 'https://www.youtube.com/watch?v=k_Es1XiSQrY&ab_channel=BitApps',
  },
  zohoProjects: {
    title: 'How to Setup Zoho Projects integration',
    link: 'https://www.youtube.com/watch?v=CaxLekQ-xVY&ab_channel=BitApps',
  },
  zohoRecruit: {
    title: 'How to Setup Zoho Recruit integration',
    link: 'https://www.youtube.com/watch?v=Bj-oMYQLDqI&list=PL7c6CDwwm-AJ2qnbOYW-UzZBQjWhRE0hg&ab_channel=BitApps',
  },
  zohoSheet: {
    title: 'How to Setup Zoho Sheet integration',
    link: 'https://www.youtube.com/watch?v=GDYjKL0NRL0&ab_channel=BitApps',
  },
  zohoSign: {
    title: 'How to Setup Zoho Sign integration',
    link: 'https://www.youtube.com/watch?v=3ClKsZ9CBYM&ab_channel=BitApps',
  },
  zohoWorkDrive: {
    title: 'How to Setup Zoho Work Drive integration',
    link: 'https://www.youtube.com/watch?v=27v1F-cZLgg&ab_channel=BitApps',
  },
  doubleOptIn: {
    title: 'How to Configure Double Opt-In',
    link: 'https://youtu.be/JCo2PsZBsVk',
  },
  doubleOptInDoc: {
    title: 'How to Configure Double Opt-In',
    link: 'https://docs.form.bitapps.pro/wpbitform-double-opt-in',
  },
  formAbandonment: {
    title: 'How to Configure Form Abandonment',
    link: 'https://youtu.be/JCo2PsZBsVk',
  },
  formAbandonmentDoc: {
    title: 'How to Configure Form Abandonment',
    link: 'https://docs.form.bitapps.pro/wpbitform-double-opt-in',
  },
  pdfTemplate: {
    title: 'How to Configure PDF Template',
    link: 'https://youtu.be/rE2LB-oYbE8',
  },
  pdfTemplateDoc: {
    title: 'How to Configure PDF Template',
    link: 'https://bitapps.pro/docs/bit-form/pdf-attachment/',
  },
  flowmattic: {
    title: 'How to Setup FlowMattic integration',
    link: '#',
  },
  automatorwp: {
    title: 'How to Setup AutomatorWP integration',
    link: '#',
  },
  uncannyAutomator: {
    title: 'How to Setup Uncanny Automator integration',
    link: '#',
  },
  sperseIO: {
    title: 'How to Setup Automate Hub by Sperse.IO integration',
    link: '#',
  },
  thriveAutomator: {
    title: 'How to Setup Thrive Automator integration',
    link: '#',
  },
  wpWebhooks: {
    title: 'How to Setup WP Webhooks integration',
    link: '#',
  },
  advancedFormIntegration: {
    title: 'How to Setup Advanced Form Integration',
    link: '#',
  },
  ifttt: {
    title: 'How to Setup IFTTT integration',
    link: '#',
  },
  n8nIO: {
    title: 'How to Setup n8n.io integration',
    link: '#',
  },
  sureTriggers: {
    title: 'How to Setup Sure Triggers integration',
    link: '#',
  },
  authSettings: {
    title: 'How to Configure WP User Registration',
    link: 'https://www.youtube.com/watch?v=_uo7hsIB0dM',
  },
  authSettingsDoc: {
    title: 'How to Configure WP User Registration',
    link: 'https://bitapps.pro/docs/bit-form/wp-auth/',
  },
}
export default tutorialLinks
