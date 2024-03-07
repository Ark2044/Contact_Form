# Contact Page Using React

## Setup Instructions
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd my-contact-form`
3. Install dependencies: `npm install`

## How to Run Locally
Run the project locally using the following command: `npm start`

## Google Sheets Integration
Form submissions are sent to a Google Sheet for data collection using Google Sheets API.
The google sheet can be accessed [here](https://docs.google.com/spreadsheets/d/1wb-5WDfSAcPymvoH4qltgpJ5RtcQgQlp3ot-zFw1s4o/edit?usp=sharing).

## Google Sheets AppScript Code

```
const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1wb-5WDfSAcPymvoH4qltgpJ5RtcQgQlp3ot-zFw1s4o/edit#gid=0");
 //if you have changed your sheet name then replace the below Sheet1 with your sheet name
const sheet = sheets.getSheetByName("Sheet1");
function doPost(e){
  let data = e.parameter;
  sheet.appendRow([data.Name,data.Email,data.Phone,data.Message]);
  return ContentService.createTextOutput("Your message was successfully sent to the Googlesheet database!");
}
```

## Deployment
The project is deployed on Vercel and can be accessed [here](https://contact-form-drab-eight.vercel.app/).
