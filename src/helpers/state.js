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

export default { setStatus, getStatus }