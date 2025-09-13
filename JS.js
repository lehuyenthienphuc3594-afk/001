// Load Live2D model March 7th
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
});
PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// Chatbot logic
async function ask() {
  const q = document.getElementById("input").value;
  document.getElementById("chat").innerHTML += "<b>You:</b> " + q + "<br>";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"  
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: q }]
    })
  });

  const data = await response.json();
  const ans = data.choices[0].message.content;
  document.getElementById("chat").innerHTML += "<b>March 7th:</b> " + ans + "<br>";
  document.getElementById("input").value = "";

  // Gợi ý trigger motion (nếu model có animation)
  // if (model.motion) model.motion("tap");
}

