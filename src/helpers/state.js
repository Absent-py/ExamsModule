let state = {
    status: '',
    exams: [],
    qurrentExam: '',
    examAnswers: '',
    results: ''
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

export default { setStatus, getStatus, addExam, getExam }