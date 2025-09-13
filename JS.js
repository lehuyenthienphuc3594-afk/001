// ========================
// Load Live2D model March 7th
// ========================
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  autoStart: true,
  transparent: true,
  resizeTo: window // để canvas co dãn theo cửa sổ
});

// Load model từ thư mục March7
PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);   // chỉnh size nhỏ lại
  model.x = 100;          // vị trí ngang
  model.y = 400;          // vị trí dọc
  app.stage.addChild(model);

  // Gắn model vào global để chatbot trigger animation sau này
  window.live2dModel = model;
});

// ========================
// Chatbot logic (OpenAI API)
// ========================
async function ask() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chat");
  const q = input.value.trim();

  if (!q) return;

  // Hiện câu hỏi của user
  chatBox.innerHTML += `<b>You:</b> ${q}<br>`;

  try {
    // Gửi request tới OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"" // Thay bằng API key thật của bạn
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: q }]
      })
    });

    const data = await response.json();

    if (data.error) {
      chatBox.innerHTML += `<b>March 7th (error):</b> ${data.error.message}<br>`;
    } else {
      const ans = data.choices[0].message.content;
      chatBox.innerHTML += `<b>March 7th:</b> ${ans}<br>`;

      // Nếu có model thì trigger animation khi trả lời
      if (window.live2dModel && window.live2dModel.motion) {
        try {
          window.live2dModel.motion("TapBody"); // tên motion trong folder motions
        } catch (e) {
          console.log("Không trigger được motion:", e);
        }
      }
    }
  } catch (err) {
    chatBox.innerHTML += `<b>March 7th (error):</b> ${err.message}<br>`;
  }

  // Reset input
  input.value = "";
}

