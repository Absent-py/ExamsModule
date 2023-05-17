let state = {
    status: '',
    exams: [],
    qurrentExam: '',
    examAnswers: '',
    results: '',
    testExam:  { 
        "title": "Диффуры",
        "description": "Дифференциа́льное уравне́ние — уравнение, которое помимо функции содержит её производные. Порядок входящих в уравнение производных может быть различен. Производные, функции, независимые переменные и параметры могут входить в уравнение в различных комбинациях или отсутствовать вовсе, кроме хотя бы одной производной",
        "author": "Шевнина Юлия Сергеевна",
        "subject": "Высшая математика",
        "questions": [ { "id": 1, "text": "Шо такое дуффур?", "answers": [ { "id": 1, "text": "ди", "truth": true }, { "id": 2, "text": "фф", "truth": true }, { "id": 3, "text": "ур", "truth": false } ], "part_score": 1, "score": 3, "type": "multiple", "right": [ "ди", "фф" ] }, { "id": 2, "text": "второй вопрос", "answers": [ { "id": 1, "text": "правильный ответ", "truth": true }, { "id": 2, "text": "не", "truth": false } ], "part_score": 1, "score": 3, "type": "single", "right": [ "правильный ответ" ] } ], "max_score": 6 } 
}

function setStatus (status) {
    state.status = status
}

function getStatus () {
    return state.status
}

function addExam(examObject) {
    state.exams.push(examObject)
}

function getExam(id = 0) {
    if (id == 0) {
        return state.exams
    }
    else return state.exams[id]
}

function getTest() {
    return state.testExam
}

export default { setStatus, getStatus, addExam, getExam, getTest }