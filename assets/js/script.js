const sectionMain = document.querySelector('.main');
const sectionQuestions = document.querySelector('.section_questions');
const sectionPageEnd = document.querySelector('.page_end');
const inputName = document.querySelector('.main .area_section_main .area_inputs .input_name');
const btnStart = document.querySelector('.btn_start');
const progressBar = document.querySelector('.progress_bar');
const areaLoad = document.querySelector('.background_load');

let currentQuestion = 0;
let correctQuestions = 0;

btnStart.addEventListener('click', () => {
    if(inputName.value !== '') {
        showQuestion();
    }else {
        alert('Para começar, digite seu nome.');
    }
});

window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices();
});

document.querySelector('.btn_next_question').addEventListener('click', () => {
    verifyResponse();
});

document.querySelector('.card').addEventListener('click', () => {
    speaking();
});

document.querySelector('.btn_finish').addEventListener('click', () => {
    doneQuiz();
});

document.querySelector('.btn_redo').addEventListener('click', () => {
    redoQuiz();
});

function showQuestion() {
    if(questions[currentQuestion]) {
        sectionQuestions.style.display = 'block';
        sectionMain.style.display = 'none';
        sectionPageEnd.style.display = 'none';

        let percentage = Math.floor((currentQuestion / questions.length) * 100);
        progressBar.style.width = `${percentage}%`;

        speaking();

    }else {
        areaLoad.style.display = 'flex';

        setTimeout(() => {
            finishQuiz();
        }, 1300);

    }
}

function speaking() {
    let textQuestion = questions[currentQuestion].question;
    let voiceList = window.speechSynthesis.getVoices();
    let speakText = new SpeechSynthesisUtterance(JSON.stringify(textQuestion));
    speakText.voice = voiceList[3];
    window.speechSynthesis.speak(speakText);
}

function verifyResponse() {
    let textArea = document.querySelector('.textArea');

    if(textArea.value !== '') {
        let textQuestion = questions[currentQuestion].question;

        if(textArea.value.toLowerCase() === textQuestion) {
            correctQuestions++;
        }

        currentQuestion++;
        textArea.value = '';
        showQuestion();

    }else {
        alert('Por favor, antes de avançar, responda a questão atual.');
    }

}

function finishQuiz() {
    areaLoad.style.display = 'none';

    let points = Math.floor((correctQuestions / questions.length) * 100);

    if(points < 30) {
      document.querySelector('.page_end .area_content .area_img img').src = 'assets/images/emoji-cry.png';
      document.querySelector('.page_end .area_content .area_result .person_name').innerHTML = `Continue estudando, ${inputName.value}`;
      document.querySelector('.page_end .area_content .area_result .result_porcent').style.color = '#871508';

    }else if(points > 30 && points <= 70) {
        document.querySelector('.page_end .area_content .area_img img').src = 'assets/images/emoji-happy.png';
        document.querySelector('.page_end .area_content .area_result .person_name').innerHTML = `Muito bem, ${inputName.value}`;
        document.querySelector('.page_end .area_content .area_result .result_porcent').style.color = '#857405';
    }else {
        document.querySelector('.page_end .area_content .area_img img').src = 'assets/images/emoji-glasses.png';
        document.querySelector('.page_end .area_content .area_result .person_name').innerHTML = `Parabéns, ${inputName.value}`;
        document.querySelector('.page_end .area_content .area_result .result_porcent').style.color = '#398425';
    }

    document.querySelector('.page_end .area_content .area_result .result_porcent').innerHTML = `${points}%`;
    document.querySelector('.page_end .area_content .area_result .qtd_correct').innerHTML = `De ${questions.length} questões você acertou ${correctQuestions}`;
    
    sectionQuestions.style.display = 'none';
    sectionPageEnd.style.display = 'block';
    document.querySelector('.page_end .progress_bar').style.width = '100%';
}

function doneQuiz() {
    window.location.reload();
}

function redoQuiz() {
    correctQuestions = 0;
    currentQuestion = 0;
    showQuestion();
}

// animation img section main(first page)
const imgFirstPage = document.querySelector('.main .area_section_main .img_single_main img');

setInterval(() => {
    let valueY = Math.floor(Math.random() * 30);
    imgFirstPage.style.transform = `translate(0px, -${valueY}px)`;

}, 1000);

