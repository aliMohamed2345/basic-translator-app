const language1 = document.getElementById("lang1");
const language2 = document.getElementById("lang2");
const selectLang1 = document.getElementById("select1");
const selectLang2 = document.getElementById("select2");
const langList1 = document.querySelectorAll(`#select1 ul li`);
const langList2 = document.querySelectorAll(`#select2 ul li`);
const plus1 = document.getElementById(`plus1`);
const plus2 = document.getElementById(`plus2`);
const minus1 = document.getElementById(`minus1`);
const currentLanguage1 = document.getElementById(`current1`);
const currentLanguage2 = document.getElementById("current2");
const minus2 = document.getElementById(`minus2`);
const Copy1Icon = document.getElementById(`clipboard1`);
const Copy2Icon = document.getElementById(`clipboard2`);
const mic1Icon = document.getElementById(`mic1`);
const mic2Icon = document.getElementById(`mic2`);
const translationBtn = document.querySelector(`.translation-btn`);
let TextFrom = document.getElementById(`TextFrom`);
let TextTo = document.getElementById(`TextTo`);
let languages = {
  Arabic: "ar-SA",
  English: "en-US",
  French: "fr-FR",
  German: "de-DE",
  Italy: "it-IT",
  Spanish: "es-ES",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Hindu: "hi-IN",
  Turkish: "tr-TR",
  Greek: "el-GR",
  Hebrew: "he-IL",
  Latin: "la-VA",
  Persian: "fa-IR",
  Russian: "ru-RU",
};
let activeState = {
  langActive1: false,
  langActive2: false,
};
function openLanguageList(language, select, activeState, plus, minus) {
  language.addEventListener("click", () => {
    if (activeState) {
      console.log(language, select);
      select.style.opacity = "1";
      select.style.top = "36px";
      select.style.left = "0px";
      language.style.color = "#052c65";
      language.style.backgroundColor = "#3498db";
      language.style.borderRadius = "10px 10px 0 0";
      plus.style.display = "none";
      minus.style.display = "block";
      chooseLanguage(currentLanguage1, langList1);
      chooseLanguage(currentLanguage2, langList2);
    } else {
      language.style.borderRadius = `10px`;
      language.style.color = `rgba(95 99 104)`;
      select.style.opacity = "0";
      language.style.backgroundColor = "transparent";
      select.style.top = "-1000px";
      plus.style.display = "block";
      minus.style.display = "none";
    }
    activeState = !activeState;
  });
}
function chooseLanguage(current, languages) {
  languages.forEach((lang) => {
    lang.addEventListener("click", (e) => {
      current.textContent = e.target.textContent;
    });
  });
}
function TranslationProcess() {
  translationBtn.addEventListener("click", () => {
    if (TextFrom.value) {
      let api = `https://api.mymemory.translated.net/get?q=${
        TextFrom.value
      }!&langpair=${languages[currentLanguage1.textContent]}|${
        languages[currentLanguage2.textContent]
      }`;

      fetch(api)
        .then((TextTo.textContent = `Loading...`))
        .then((res) => res.json())
        .then((data) => {
          TextTo.textContent = data.responseData.translatedText;
        });
    }
  });
}
function CopyText(copyIcon, textarea) {
  if (textarea != "") {
    copyIcon.addEventListener("click", () => {
      navigator.clipboard
        .writeText(textarea.value)
        .catch((error) => console.log(`don't work ${error}`));
    });
  }
}
function ReadText(microphone, textarea) {
  if (textarea != "") {
    microphone.addEventListener("click", () => {
      speechSynthesis.speak(new SpeechSynthesisUtterance(textarea.value));
    });
  }
}
CopyText(Copy1Icon, TextFrom);
CopyText(Copy2Icon, TextTo);
ReadText(mic1Icon, TextFrom);
ReadText(mic2Icon, TextTo);
chooseLanguage(currentLanguage1, langList1);
openLanguageList(
  language1,
  selectLang1,
  activeState.langActive1,
  plus1,
  minus1
);
openLanguageList(
  language2,
  selectLang2,
  activeState.langActive2,
  plus2,
  minus2
);

TranslationProcess();
