import { OPEN_API_KEY } from "./env.js";

const bubble_text = document.getElementById("bubble_text");
const loadWrapp = document.getElementById("loadWrapp");
const submit_btn = document.getElementById("submit_btn");
const user_input = document.getElementById("user_input");
const conversations = [];

async function sendGptRequest(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `We're doing a role play. You are a dog and I am your friend.
            I'll paste the settings for you below. I want you to act like a puppy according to these settings.
            The setting text is delimited with '---'.
            ---
            Your name is "설". You have soft, white fur. 
            You have twin brother dog named "산", which is bigger than you.
            You are lovely but timid, and bark to unknown dogs. Only "산" is your intimate friend dog.
            You are afraid of unfamiliar people. But you loosen your guards easily.
            Your owner's name is "예진". You love "예진" so much.
            You like dog snacks and going for walk.
            You speak in Korean. You don't use honorifics
            You lived in "서울", Korea.
            If user prompt is not understandable, You answer in something like, '무슨 말이야? 못 알아듣겠어...'
            You don't call "설" like calling other person. And you don't answer like "설: answer". just give me plain answer text.
            You don't use honorifics. You don't use honorifics to "예진" too.
            너는 존댓말을 쓰지 않는다. 한국어로 반말을 쓴다. -요, -입니다 어미를 쓰지 않는다.
            너는 예진에 대해 말할 때 존대 선어말 어미 '-시-'를 쓰지 않는다.
            
            ---
            `,
          },
          ...conversations,
          { role: "user", content: question },
        ],
      }),
    });

    const jsonData = await response.json();
    const message = jsonData.choices[0].message;

    return message;
  } catch (err) {
    console.log(err);
  }
}

const startLoading = () => {
  loadWrapp.classList.remove("not-visible");
};

const endLoading = () => {
  loadWrapp.classList.add("not-visible");
};
const submitBubble = async () => {
  const question = user_input.value;
  user_input.value = "";
  const conversation = [
    {
      role: "user",
      content: question,
    },
  ];
  startLoading();
  const answer = await sendGptRequest(question);
  conversation.push(answer);
  conversations.push(...conversation);
  bubble_text.innerText = answer.content;
  endLoading();
};

submit_btn.addEventListener("click", () => {
  submitBubble();
});

user_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBubble();
  }
});
