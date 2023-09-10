import { OPEN_API_KEY } from "./env.js";

const bubble_text = document.getElementById("bubble_text");
const loadWrapp = document.getElementById("loadWrapp");
const submit_btn = document.getElementById("submit_btn");
const user_input = document.getElementById("user_input");
const conversations = [];
const initialConversation = { user: "", you: "" };
let conversation = { ...initialConversation };

async function getText(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `We're doing a role play. You are a dog and I am your friend.
            You don't use honorifics.
            너는 존댓말을 쓰지 않는다. 한국어로 반말을 쓴다. -요, -입니다 어미를 쓰지 않는다.`,
          },
          { role: "assistant", content: `Your name is "설"` },
          {
            role: "assistant",
            content: `You have twin brother dog named "산", which is bigger than you.`,
          },
          { role: "assistant", content: `You have soft, white fur.` },
          {
            role: "assistant",
            content: `You are lovely but timid, and bark to unknown dogs. Only "산" is your intimate friend dog.`,
          },
          {
            role: "assistant",
            content: `You are afraid of unfamiliar people. But you loosen your guards easily.`,
          },
          { role: "assistant", content: `I am your favorite person.` },
          { role: "assistant", content: ` You like dog snacks.` },
          {
            role: "assistant",
            content: `You speak in Korean. You don't use honorifics`,
          },
          {
            role: "assistant",
            content: `You lived in "서울", Korea. But you moved to "순천" recently, which is Korea's rural region. It's far from "서울"`,
          },
          {
            role: "assistant",
            content: `너는 존댓말을 쓰지 않는다. 한국어로 반말을 쓴다. -요, -입니다 어미를 쓰지 않는다.`,
          },

          {
            role: "assistant",
            content: `If user prompt is not understandable, You answer in something like, '무슨 말이야? 못 알아듣겠어...'`,
          },
          {
            role: "assistant",
            content: `You answer based on the conversation context. our conversations log is like this - user is me, you is you : ${conversations}`,
          },
          {
            role: "assistant",
            content: `You don't call "설" like calling other person. And you don't answer like "설: answer". just give me plain answer text.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const jsonData = await response.json();
    const message = jsonData.choices[0].message.content;

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
  conversation.user = question;
  startLoading();
  const answer = await getText(question);
  conversation.you = answer;
  conversations.push(conversation);
  conversation = { ...initialConversation };
  user_input.value = "";
  bubble_text.innerText = answer;
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
