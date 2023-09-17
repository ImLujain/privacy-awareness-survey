<template>
    <div class="survey-container">
      <div class="language-switcher">
        <button @click="setLanguage('en')">English</button>
        <button @click="setLanguage('ar')">عربى</button>
      </div>
      <SurveyComponent :model="survey" />
    </div>
</template>

<script setup>
import { Model } from 'survey-core';
import axios from 'axios';
import { useRouter } from 'vue-router'; 
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const router = useRouter();
const surveyJson = {
    locale: 'en',
    pages: [
        {
            name: "Awareness & General Knowledge",
            elements: [
                {
                    type: "radiogroup",
                    name: "heardOfWebTrackers",
                    title: {
                        default: "Have you heard of web trackers?",
                        ar: "هل سمعت عن متتبعات الويب؟"
                    },
                    choices: [
                        { value: "yes", text: { default: "Yes", ar: "نعم" } },
                        { value: "no", text: { default: "No", ar: "لا" } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "familiarWithBrowserFingerprinting",
                    title: {
                        default: "Are you familiar with the term \"browser fingerprinting\"?",
                        ar: "هل أنت على دراية بمصطلح \"بصمة المتصفح\"؟"
                    },
                    choices: [
                        { value: "yes", text: { default: "Yes", ar: "نعم" } },
                        { value: "no", text: { default: "No", ar: "لا" } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                }
            ]
        },
        {
            name: "Depth of Understanding",
            elements: [
                {
                    type: "checkbox",
                    name: "whatWebTrackersCollect",
                    title: {
                        default: "Which of the following do you believe web trackers can potentially collect about your online behavior?",
                        ar: "ما الذي تعتقد أن متتبعات الويب يمكنها جمعه بشكل محتمل عن سلوكك على الإنترنت؟"
                    },
                    choices: [
                        { value: "websitesVisit", text: { default: "Websites you visit", ar: "المواقع التي تزورها" } },
                        { value: "duration", text: { default: "Duration of visit on each website", ar: "مدة الزيارة على كل موقع" } },
                        { value: "productsClicked", text: { default: "Products or services you've clicked on", ar: "المنتجات أو الخدمات التي قمت بالنقر عليها" } },
                        { value: "personalInfo", text: { default: "Personal information you provide on websites", ar: "المعلومات الشخصية التي تقدمها على المواقع" } },
                        { value: "none", text: { default: "None of the above", ar: "لا شيء من الخيارات السابقة" } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "understandBrowserFingerprint",
                    title: {
                        default: "What do you understand by the term \"browser fingerprint\"?",
                        ar: "ماذا تفهم من مصطلح \"بصمة المتصفح\"؟"
                    },
                    choices: [
                        { value: "identifyAndTrack", text: { default: "It's a way websites can identify and track browsers, even without cookies, based on characteristics like browser type, operating system, and installed fonts.", ar: "هو وسيلة يمكن للمواقع الإلكترونية من خلالها التعرف على المتصفحات وتتبعها، حتى بدون ملفات تعريف الارتباط، استنادًا إلى خصائص مثل نوع المتصفح ونظام التشغيل والخطوط المثبتة." } },
                        { value: "securityMethod", text: { default: "It's a security method to ensure only authorized browsers can access certain websites.", ar: "هو وسيلة أمان للتأكد من أن المتصفحات المصرح بها فقط هي التي يمكنها الوصول إلى مواقع معينة." } },
                        { value: "uniqueID", text: { default: "It's a unique ID assigned by the browser manufacturer.", ar: "هو معرّف فريد يتم تعيينه من قبل مصنع المتصفح." } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                }
            ]
        },
        {
            name: "Personal Experience & Behavior",
            elements: [
                {
                    type: "radiogroup",
                    name: "usedToolsToLimitWebTrackers",
                    title: {
                        default: "Have you ever used tools or settings to limit web trackers from collecting your data?",
                        ar: "هل استخدمت أدوات أو إعدادات للحد من متتبعات الويب من جمع بياناتك؟"
                    },
                    choices: [
                        { value: "frequently", text: { default: "Yes, frequently", ar: "نعم، بشكل متكرر" } },
                        { value: "occasionally", text: { default: "Yes, occasionally", ar: "نعم، أحيانًا" } },
                        { value: "no", text: { default: "No", ar: "لا" } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "concernAboutBrowserFingerprinting",
                    title: {
                        default: "Are you concerned about how browser fingerprinting might be used to track your online activities?",
                        ar: "هل أنت قلق بشأن كيف قد يتم استخدام بصمة المتصفح لتتبع نشاطاتك على الإنترنت؟"
                    },
                    choices: [
                        { value: "veryConcerned", text: { default: "Very concerned", ar: "قلق جدًا" } },
                        { value: "somewhatConcerned", text: { default: "Somewhat concerned", ar: "قلق إلى حد ما" } },
                        { value: "neutral", text: { default: "Neutral", ar: "محايد" } },
                        { value: "notTooConcerned", text: { default: "Not too concerned", ar: "لست قلقًا جدًا" } },
                        { value: "notConcernedAtAll", text: { default: "Not concerned at all", ar: "لست قلقًا على الإطلاق" } }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "knowledgeAboutInformationCollected",
                    title: {
                        default: "To what extent do you agree with this statement: \"I know exactly what information web trackers and browser fingerprinting collect about me.\"",
                        ar: "إلى أي مدى توافق على هذا البيان: \"أعرف بالضبط أي المعلومات التي تجمعها متتبعات الويب وبصمة المتصفح عني.\""
                    },
                    choices: [
                        { value: "stronglyAgree", text: { default: "Strongly agree", ar: "أوافق بشدة" } },
                        { value: "agree", text: { default: "Agree", ar: "أوافق" } },
                        { value: "neutral", text: { default: "Neutral", ar: "محايد" } },
                        { value: "disagree", text: { default: "Disagree", ar: "لا أوافق" } },
                        { value: "stronglyDisagree", text: { default: "Strongly disagree", ar: "لا أوافق بشدة" } }
                    ]
                }
            ]
        },
        {
            name: "Demographics & Additional Information (Optional)",
            elements: [
                {
                    type: "radiogroup",
                    name: "ageRange",
                    title: {
                        default: "Age range:",
                        ar: "نطاق العمر:"
                    },
                    choices: [
                        { value: "below18", text: { default: "Below 18", ar: "أقل من 18" } },
                        { value: "19-25", text: { default: "19-25", ar: "19-25" } },
                        { value: "26-35", text: { default: "26-35", ar: "26-35" } },
                        { value: "36-50", text: { default: "36-50", ar: "36-50" } },
                        { value: "above50", text: { default: "Above 50", ar: "فوق 50" } }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "techSavviness",
                    title: {
                        default: "How would you rate your overall tech-savviness?",
                        ar: "كيف تقيم خبرتك التقنية العامة؟"
                    },
                    choices: [
                        { value: "beginner", text: { default: "Beginner", ar: "مبتدئ" } },
                        { value: "intermediate", text: { default: "Intermediate", ar: "متوسط" } },
                        { value: "advanced", text: { default: "Advanced", ar: "متقدم" } },
                        { value: "expert", text: { default: "Expert", ar: "خبير" } }
                    ]
                }
            ]
        }
    ]
};


const saveResultsToBackend = async (data) => {
    console.log("Sending data to backend:", data);
    
    // const csvData = convertToCSV([data]); // Convert the results to CSV

    try {
        await axios.post('http://localhost:3000/api/save-survey-results', data, {
            headers: {
               // 'Content-Type': 'text/csv'
            }
        });
        router.push('/thankyou');
    } catch (error) {
        alert('Error saving results. Please try again.');
    }
};

const handleSurveyCompletion = (sender) => {
    const results = sender.data;
    saveResultsToBackend(results);
};

const survey = new Model(surveyJson);
survey.onComplete.add(handleSurveyCompletion);

const setLanguage = (lang) => {
    survey.locale = lang;
    survey.render();
};
</script>

<style scoped>
  .survey-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    font-family: 'Arial', sans-serif;
  }
  
  .language-switcher {
    margin-bottom: 20px;
  }

  .language-switcher button {
    margin: 0 10px;
  }

  SurveyComponent {
    width: 70%;
    max-width: 800px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
  }

  SurveyComponent button {
    background-color: #2980b9;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
  }
  
  SurveyComponent button:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

      
    }

    .language-switcher {
        display: flex;
        justify-content: space-between;
        width: 150px; /* Adjust this value depending on the spacing you need */
    }

    .language-switcher button {
        font-size: 16px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #3498db;
        color: #ffffff;
        transition: background-color 0.3s ease, transform 0.1s ease;
    }

    .language-switcher button:hover {
        background-color: #2980b9;
    }

    .language-switcher button:active {
        transform: scale(0.95);
    }

    /* Adjust the font size of the Arabic button to balance with the English button */
    .language-switcher button:nth-of-type(2) {
        font-size: 14px;
  }
</style>
