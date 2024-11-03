
home = document.getElementById("home")
note = document.getElementById("note_page")
test = document.getElementById("test_page")
ai_response = document.getElementById("ai-response")

home.style.display = "block";
note.style.display = "none";
test.style.display = "none";
ai_response.style.display = "none";

function home_page() {
    home.style.display = "block";
    note.style.display = "none";
    test.style.display = "none";
    ai_response.style.display = "none";
}

function note_page() {
    home.style.display = "none";
    note.style.display = "block";
    test.style.display = "none";
    ai_response.style.display = "block";
}

function test_page() {
    home.style.display = "none";
    note.style.display = "none";
    test.style.display = "block";
    ai_response.style.display = "block";
}

let globalData = {};

// Ortaokul formunu gönderme
function note_send() {
    const data = {
        class: document.getElementById("note-classSelect").value,
        lesson: document.getElementById("note-lessonSelect").value,
        topic: document.getElementById("note-topicSelect").value,
        type: "Ders Notu",
    };

    globalData = data;

    fetch("/note_send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).catch(error => console.error("Error:", error));
}

// Lise formunu gönderme
function test_send() {
    const data = {
        class: document.getElementById("test-classSelect").value,
        lesson: document.getElementById("test-lessonSelect").value,
        topic: document.getElementById("test-topicSelect").value,
        type: "Test",
        question_count: document.getElementById("test-questionCountSelect").value
    };

    globalData = data;

    fetch("/test_send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).catch(error => console.error("Error:", error));
}

const socket = io();
socket.on("ai_response", function(data) {
    document.getElementById("ai-response-text").value = data.response;
});

function downloadText() {
    const data = globalData;

    fetch("/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `ai-response_${data.class}_${data.lesson}_${data.topic}_${data.type}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error("Error:", error));
}