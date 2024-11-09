const surveyBlocks = [
    {
        name: "Data Collection",
        questions: [
            {
                text: "Does your company collect personal data?",
                advice: {
                    Yes: "Ensure that personal data collection complies with GDPR principles, including transparency, purpose limitation, and data minimization.",
                    No: "",
                    Sometimes: "Ensure that personal data collection is always in compliance with GDPR principles, and documented accordingly."
                }
            },
            {
                text: "Do you store personal data securely?",
                advice: {
                    Yes: "",
                    No: "Ensure that personal data is stored securely in compliance with GDPR data security requirements.",
                    Sometimes: "Ensure that all personal data is stored securely and consistently, following GDPR security standards."
                }
            }
        ]
    },
    {
        name: "Consent Management",
        questions: [
            {
                text: "Do you get explicit consent for data collection?",
                advice: {
                    Yes: "",
                    No: "GDPR requires explicit consent for data collection. Ensure you obtain clear, informed, and unambiguous consent.",
                    Sometimes: "Ensure that explicit consent is always obtained and documented, and consistently follows GDPR standards."
                }
            },
            {
                text: "Is consent documented?",
                advice: {
                    Yes: "",
                    No: "Documenting consent is crucial for GDPR compliance and in case of audits. Ensure that all consent is properly documented.",
                    Sometimes: "Ensure that consent is always documented to remain GDPR-compliant, especially in case of audits or requests."
                }
            }
        ]
    },
    {
        name: "Data Access Requests",
        questions: [
            {
                text: "Do you have a process for data access requests?",
                advice: {
                    Yes: "",
                    No: "Implement a process to respond to data access requests promptly as required by GDPR.",
                    Sometimes: "Ensure that all data access requests are handled consistently, in compliance with GDPR timelines and requirements."
                }
            }
        ]
    },
    {
        name: "Data Retention",
        questions: [
            {
                text: "Is data deleted after it’s no longer needed?",
                advice: {
                    Yes: "",
                    No: "GDPR requires that data be deleted when it is no longer needed for the purposes it was collected for.",
                    Sometimes: "Ensure regular reviews to delete outdated data and consistently follow GDPR's data retention principles."
                }
            }
        ]
    },
    {
        name: "Data Breach Procedures",
        questions: [
            {
                text: "Is there a plan for data breaches?",
                advice: {
                    Yes: "",
                    No: "GDPR requires having a clear and effective plan for responding to data breaches. Ensure you have one in place.",
                    Sometimes: "Ensure that a consistent data breach response plan is in place and always followed in case of incidents."
                }
            }
        ]
    }
];

let currentBlockIndex = 0;
let currentQuestionIndex = 0;
const adviceSummary = [];

function displayQuestion() {
    const questionData = surveyBlocks[currentBlockIndex].questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionData.text;
    document.getElementById("survey-form").reset();
}

function updateProgress() {
    const navSteps = document.querySelectorAll('.nav-steps li');
    const totalSteps = surveyBlocks.length;
    let completedSteps = 0;

    navSteps.forEach((step, index) => {
        step.classList.remove('completed', 'ongoing', 'pending');
        if (index < currentBlockIndex) {
            step.classList.add('completed');
            completedSteps++;
        } else if (index === currentBlockIndex) {
            step.classList.add('ongoing');
        } else {
            step.classList.add('pending');
        }
    });

    const compliancePercentage = Math.round((completedSteps / totalSteps) * 100);
    document.querySelector('.progress-text').innerText = `${compliancePercentage}% Compliant`;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return; 

    const selectedValue = selectedOption.value;
    const questionData = surveyBlocks[currentBlockIndex].questions[currentQuestionIndex];
    const advice = questionData.advice[selectedValue];

    if (advice) {
        adviceSummary.push(advice);
    }

    if (currentQuestionIndex < surveyBlocks[currentBlockIndex].questions.length - 1) {
        currentQuestionIndex++;
    } else if (currentBlockIndex < surveyBlocks.length - 1) {
        document.getElementById(`step${currentBlockIndex + 1}`).classList.add('completed');
        currentBlockIndex++;
        currentQuestionIndex = 0;
    } else {
        document.getElementById(`step${currentBlockIndex + 1}`).classList.add('completed');
        showAdviceSummary();
        return;
    }
    displayQuestion();
    updateProgress();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    } else if (currentBlockIndex > 0) {
        currentBlockIndex--;
        currentQuestionIndex = surveyBlocks[currentBlockIndex].questions.length - 1;
    }
    displayQuestion();
    updateProgress();
}

function showAdviceSummary() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("advice-summary").style.display = "block";
    const adviceList = document.getElementById("advice-list");
    adviceList.innerHTML = adviceSummary.map(advice => `<li>${advice}</li>`).join("");
    document.querySelector('.progress-text').innerText = `100% Compliant`;
}

document.addEventListener("DOMContentLoaded", function() {
    displayQuestion();
    updateProgress();
});
