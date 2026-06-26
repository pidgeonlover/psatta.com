# psatta.com Form Backend Setup

GitHub Pages is static, so it cannot securely store private form submissions by itself. This setup uses a Google Sheet as the database and a Google Apps Script Web App as the form endpoint/email automation.

## Database

Submissions spreadsheet:

https://docs.google.com/spreadsheets/d/1ljfQBp5D3oxdL5pqnThitL811XlCgnzPCsl_hD0Va6o/edit?usp=drivesdk

## Apps Script Setup

1. Open the spreadsheet above.
2. Go to **Extensions → Apps Script**.
3. Replace the default code with the contents of `form-backend/google-apps-script.js`.
4. Click **Deploy → New deployment**.
5. Choose **Web app**.
6. Set **Execute as** to **Me**.
7. Set **Who has access** to **Anyone**.
8. Deploy and authorize the script.
9. Copy the Web App URL ending in `/exec`.
10. Paste that URL into `index.html` on the form:

```html
<form class="contact-form" action="#" method="post" data-form-endpoint="YOUR_WEB_APP_URL">
```

After that, every form submission will append a row to the Sheet and email `matei@psatta.com`.
