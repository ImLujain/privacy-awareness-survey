const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const CSV_FILE_PATH = path.resolve(__dirname, 'survey_results.csv');

app.post('/api/save-survey-results', (req, res) => {
    console.log("Received request with data:", req.body);

    // Convert the data into CSV format
    const csvData = convertSurveyDataToCsv(req.body);

    // Check if CSV file exists, if not create with headers
    if (!fs.existsSync(CSV_FILE_PATH)) {
        const headers = getSurveyCsvHeaders();
        fs.writeFileSync(CSV_FILE_PATH, headers + '\n');
    }

    fs.appendFile(CSV_FILE_PATH, csvData + '\n', (err) => {
        if (err) {
            console.error('Failed to save CSV data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.send('Data saved successfully.');
    });
});

const convertSurveyDataToCsv = (data) => {
    // Create an array of values for each survey question
    const values = [
        data.heardOfWebTrackers || "",
        data.familiarWithBrowserFingerprinting || "",
        Array.isArray(data.whatWebTrackersCollect) ? data.whatWebTrackersCollect.join('; ') : "",
        data.understandBrowserFingerprint || "",
        data.usedToolsToLimitWebTrackers || "",
        data.concernAboutBrowserFingerprinting || "",
        data.knowledgeAboutInformationCollected || "",
        data.ageRange || "",
        data.techSavviness || ""
    ];
    
    return values.map(val => `"${val}"`).join(','); // Wrap each value with quotes and join with commas
};

const getSurveyCsvHeaders = () => {
    const headers = [
        "Heard of Web Trackers",
        "Familiar with Browser Fingerprinting",
        "What Web Trackers Collect",
        "Understand Browser Fingerprint",
        "Used Tools to Limit Web Trackers",
        "Concern about Browser Fingerprinting",
        "Knowledge about Information Collected",
        "Age Range",
        "Tech-Savviness"
    ];
    return headers.join(',');
};

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
