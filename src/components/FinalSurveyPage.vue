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
// import { useRouter } from 'vue-router'; 
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

// const router = useRouter();
const surveyJson = {
    locale: 'en',
    pages: [
        {
            name: "Awareness & General Knowledge",
            elements: [
            {
                    type: "radiogroup",
                    name: "awarenessOfDataCollection",
                    title: {
                        default: "Were you aware that your online activities could be tracked?",
                        ar: "هل كنت تعلم أنه يمكن تتبع نشاطاتك عبر الإنترنت؟"
                    },
                    choices: [
                        { value: "yes", text: { default: "Yes", ar: "نعم" } },
                        { value: "no", text: { default: "No", ar: "لا" } },
                        { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                    ]
                
                },
            
                {
                    type: "radiogroup",
                    name: "concernAboutDataPrivacy",
                    title: {
                        default: "How concerned are you about your online data privacy?",
                        ar: "ما مدى قلقك بشأن خصوصية البيانات عبر الإنترنت؟"
                    },
                    choices: [
                        { value: "veryConcerned", text: { default: "Very concerned", ar: "قلق جدًا" } },
                        { value: "somewhatConcerned", text: { default: "Somewhat concerned", ar: "قلق إلى حد ما" } },
                        { value: "neutral", text: { default: "Neutral", ar: "محايد" } },
                        { value: "notConcerned", text: { default: "Not concerned", ar: "لا أشعر بالقلق" } }
                    ]
                },

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
                    name: "browserFingerprintingAwareness",
                    title: {
                    default: "Do you believe that websites should inform users when they are using browser fingerprinting techniques?",
                    ar: "هل تعتقد أن المواقع يجب أن تبلغ المستخدمين عند استخدامها تقنيات التعريف الرقمي للمتصفح؟"
                        },
                    choices: [
                    { value: "yes", text: { default: "Yes", ar: "نعم" } },
                    { value: "no", text: { default: "No", ar: "لا" } },
                    { value: "notSure", text: { default: "Not sure", ar: "غير متأكد" } }
                        ]
                },

                {
                    type: "radiogroup",
                    name: "actionAfterSeeingFingerprint",
                    title: {
                        default: "Having seen your browser fingerprint, how likely are you to take steps to protect yourself from browser fingerprinting in the future?",
                        ar: "بعد رؤيتك لبصمة المتصفح الخاصة بك، إلى أي مدى تعتقد أنك ستتخذ خطوات لحماية نفسك من التعريف الرقمي للمتصفح في المستقبل؟"
                    },
                    choices: [
                        { value: "veryLikely", text: { default: "Very likely", ar: "مرجح جدا" } },
                        { value: "likely", text: { default: "Likely", ar: "مرجح" } },
                        { value: "neutral", text: { default: "Neutral", ar: "محايد" } },
                        { value: "unlikely", text: { default: "Unlikely", ar: "غير مرجح" } },
                        { value: "veryUnlikely", text: { default: "Very unlikely", ar: "غير مرجح جدا" } }
                    ]
                }  
                ]
        }
    ]
};


const saveResultsToBackend = async (data) => {
    console.log("Sending data to backend:", data);
    

    try {
        await axios.post('http://localhost:3000/api/save-final-survey-results', data, {

        });
        // router.push('/thankyou');
        console.log("done")
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
