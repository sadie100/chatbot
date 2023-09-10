// const openai = new OpenAI({
//   apiKey: OPEN_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
// });
const OPEN_API_KEY = process.env.OPEN_API_KEY;

const bubble = document.getElementById("bubble");
const submit = document.getElementById("submit");
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
          { role: "assistant", content: `You like people.` },
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
            content: `And our last conversations were like this. lower index is the recent talk : ${conversations.toString()}`,
          },
          { role: "user", content: question },
        ],
      }),
    });
    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "We're doing a role play. You are a dog and I am your friend. You have white fur and timid. You like people, especially my mom. And you speak in Korean.",
    //     },
    //     { role: "user", content: question },
    //   ],
    //   model: "gpt-3.5-turbo",
    // });

    const jsonData = await response.json();
    const message = jsonData.choices[0].message.content;

    return message;
  } catch (err) {
    console.log(err);
  }
}

const submitBubble = async () => {
  const question = user_input.value;
  conversation.user = question;
  const answer = await getText(question);
  conversation.you = answer;
  conversations.push(conversation);
  conversation = { ...initialConversation };
  bubble.innerText = answer;
  user_input.value = "";
};

submit.addEventListener("click", () => {
  submitBubble();
});

user_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBubble();
  }
});

// bubble.addEventListener("click", () => {
//   changeBubble("안녕하세요");
// });
