<template>
    <div class="container-fluid p-0">
        <header class="bg-primary text-white p-2">
            <div class="container">
                <div class="d-flex justify-content-end">
                    <button @click="setLanguage('en')" :class="['btn', 'btn-outline-light', {'active': currentLanguage === 'en'}]">English</button>
                    <button @click="setLanguage('ar')" :class="['btn', 'btn-outline-light', 'ms-2', {'active': currentLanguage === 'ar'}]">عربى</button>
                </div>
            </div>
        </header>

        <div class="container mt-5">
            <h1 class="display-4 text-center mb-5 animate__animated animate__fadeInDown" :dir="direction">{{ title }}</h1>

            <div class="row">
                <div class="col-md-6">
                    <div class="card my-4 p-4 h-100 animate__animated animate__fadeInLeft">
                        <h2 class="text-center">{{ webTrackersTitle }}</h2>
                        <p class="lead text-center" :dir="direction">{{ webTrackersDescription }}</p>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card my-4 p-4 h-100 animate__animated animate__fadeInRight">
                        <h2 class="text-center">{{ browserFingerprintTitle }}</h2>
                        <p class="lead text-center" :dir="direction">{{ browserFingerprintDescription }}</p>
                    </div>
                </div>
            </div>
            <br />
            <div class="d-flex justify-content-center mt-4">
                <button @click="goToSurvey" class="btn btn-primary btn-lg animate__animated animate__bounce">{{ nextText }}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentLanguage: 'ar',  // default language
            // English text
            en: {
                title: "Information about Web Trackers and Browser Fingerprinting",
                webTrackersTitle: "Web Trackers",
                webTrackersDescription: "Tools or codes added to websites with the aim of tracking visitor interactions and behaviors. Trackers are used by website owners to understand how visitors use their site, and also by advertising companies to target users with tailored ads.",
                browserFingerprintTitle: "Browser Fingerprint",
                browserFingerprintDescription: "A collection of information that can be collected from a user's web browser when visiting a website. This includes various browser characteristics like the browser type, OS version, installed fonts, screen settings, and more. The browser fingerprint is largely unique among users, making it possible to indirectly track people across websites they visit without the need for cookies.",
                nextText: "Next"
            },
            // Arabic text
            ar: {
                title: "معلومات عن متعقبات الويب وبصمة المتصفح",
                webTrackersTitle: "متعقبات الويب",
                webTrackersDescription: "هي أدوات أو أكواد تُضاف إلى المواقع الإلكترونية بهدف تتبع تفاعلات وسلوكيات الزوار. تُستخدم هذه المتعقبات من قبل أصحاب المواقع لفهم كيفية استخدام الزوار لموقعهم، وكذلك من قبل الشركات الإعلانية لتستهدف المستخدمين بإعلانات مُخصصة.",
                browserFingerprintTitle: "بصمة المتصفح",
                browserFingerprintDescription: "هي مجموعة من المعلومات التي يمكن جمعها عن متصفح الويب للمستخدم عند زيارته لموقع إلكتروني. تتضمن هذه المعلومات الخصائص المختلفة للمتصفح مثل نوع المتصفح، إصدار نظام التشغيل، الخطوط المثبتة، وإعدادات الشاشة، وغيرها. تعتبر بصمة المتصفح فريدة بشكل كبير بين المستخدمين، مما يجعل من الممكن تتبع الأشخاص بشكل غير مباشر عبر المواقع التي يزورونها دون الحاجة إلى ملفات تعريف الارتباط (الكوكيز).",
                nextText: "التالي"
            }
        }
    },
    computed: {
        direction() {
            return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        },
        title() {
            return this[this.currentLanguage].title;
        },
        webTrackersTitle() {
            return this[this.currentLanguage].webTrackersTitle;
        },
        webTrackersDescription() {
            return this[this.currentLanguage].webTrackersDescription;
        },
        browserFingerprintTitle() {
            return this[this.currentLanguage].browserFingerprintTitle;
        },
        browserFingerprintDescription() {
            return this[this.currentLanguage].browserFingerprintDescription;
        },
        nextText() {
            return this[this.currentLanguage].nextText;
        }
    },
    methods: {
        setLanguage(lang) {
            this.currentLanguage = lang;
        },
        goToSurvey() {
            this.$router.push("/survey");
        }
    }
};
</script>

<style scoped>
@import '~animate.css';

.language-switcher {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.language-switcher button {
    margin: 0 5px;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #3498db;
    color: #ffffff;
    transition: background-color 0.3s ease;
}

.language-switcher button.active {
    background-color: #2980b9;
}

.language-switcher button:hover {
    background-color: #2980b9;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}


header {
    border-bottom: 1px solid #fff;
}

.language-switcher button.active, .btn-outline-light.active {
    background-color: #97b8e9 !important;
    color: #fff !important;
}
</style>
