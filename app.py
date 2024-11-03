from flask import Flask, render_template, request, jsonify, request, send_file
from flask_socketio import SocketIO, emit, join_room, leave_room
from io import BytesIO
import os
import google.generativeai as genai

generation_config = {
  "temperature": 0.9,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

app = Flask(__name__)
gemini_api = os.getenv("GEMINI_API_KEY")
socketio = SocketIO(app)

# Ana sayfa rotası
@app.route("/")
def index():
    return render_template("index.html")

# Ortaokul formundan gelen veriyi işlemek için rota
@app.route("/note_send", methods=["POST"])
def note_send():
    data = request.json
    response_text = generate_ai_response(data, "ortaokul")
    socketio.emit("ai_response", {"response": response_text})
    return jsonify({"response": response_text})

# Lise formundan gelen veriyi işlemek için rota
@app.route("/test_send", methods=["POST"])
def test_send():
    data = request.json
    response_text = generate_ai_response(data, "lise")
    socketio.emit("ai_response", {"response": response_text})
    return jsonify({"response": response_text})

def generate_ai_response(data, level):
    lesson = data.get("lesson")
    class_select = data.get("class")
    topic = data.get("topic")
    question_type = data.get("type")
    question_count = data.get("question_count", 0)

    if "null" in data.values():
        response = "Lütfen tüm alanları doldurun"
    else:
        # Basit bir yanıt üretme örneği
        prompt = f"{class_select}. sınıf {lesson} dersinin {topic} dersi ile alakalı {question_type} hazırla "
        if question_type == "test" and question_count:
            prompt += f" {question_count} soru olacak"

        prompt += "Ek bilgilendirme ve uyarılara gerek yok. Sadece senden istenenleri yapman yeterli."

        print(prompt)

        content = model.generate_content(prompt)

        response = content.text.replace("*", "").replace("#", "")

        open(f"./files/ai-response_{class_select}_{lesson}_{topic}_{question_type}.txt", "w").write(response)

    return response

@app.route("/download", methods=["POST"])
def download_text():
    data = request.json
    class_name = data.get("class")
    lesson = data.get("lesson")
    topic = data.get("topic")
    type_ = data.get("type")
    print(data)

    filename = f"ai-response_{class_name}_{lesson}_{topic}_{type_}.txt"
    filepath = os.path.join("files/", filename)

    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404

    return send_file(filepath, as_attachment=True)

if __name__ == "__main__":
    socketio.run(app, debug=True)
