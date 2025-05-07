import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import {ScrollShadow} from "@heroui/scroll-shadow";

export default function EventBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);
  
const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const bgColor = "#FFD66B";

  const formatBotMessage = (message: string): JSX.Element[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const combinedRegex = new RegExp(`${boldRegex.source}|${urlRegex.source}`, "g");
    const bgColor = "#FFD66B";
  
    function processText(text: string): JSX.Element[] {
      const parts: JSX.Element[] = [];
      let lastIndex = 0;
      let match;
      let key = 0;
  
      while ((match = combinedRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
        }
  
        if (match[0].match(boldRegex)) {
          parts.push(<strong key={key++}>{match[1]}</strong>);
        } else if (match[0].match(urlRegex)) {
          parts.push(
            <a
              key={key++}
              href={match[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-words"
              style={{ color: bgColor }}
            >
              Más info
            </a>
          );
        }
  
        lastIndex = match.index + match[0].length;
      }
  
      if (lastIndex < text.length) {
        parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
      }
  
      return parts;
    }
  
    const paragraphs = message.split(/\n\s*\n/);
  
    return paragraphs.map((para, paraIndex) => {
      const isList = para.trim().match(/^(\d+\.\s+)/gm);
  
      if (isList) {
        const listItemRegex = /(\d+)\.\s+(.*?)(?=(\n\d+\.|\n?$))/gs;
        const items: JSX.Element[] = [];
        let match;
        let key = 0;
  
        while ((match = listItemRegex.exec(para)) !== null) {
          const number = match[1];
          const content = match[2];
  
          items.push(
            <li key={key++} className="mb-2">
              <span className="font-semibold mr-1">{number}.</span>
              {processText(content.trim())}
            </li>
          );
        }
  
        return (
          <ol key={paraIndex} className="list-none pl-6 mb-3">
            {items}
          </ol>
        );
      } else {
        return (
          <p key={paraIndex} className="mb-2">
            {processText(para)}
          </p>
        );
      }
    });
  };
  

  const sendPrompt = async () => {
    console.log(response);
    try {
      setIsLoading(true);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", message: prompt },
        
      ]);
      setPrompt("");
      const response = await fetch(`${API_BASE}/api/chat/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponse(data.response);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", message: data.response },
      ]);
    } catch (error: any) {
      console.error("Error fetching AI response:", error.message);
      alert("Error fetching AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "yellow" })}>EventBot</h1>
          <p className={subtitle({ color: "black" })}>
            Tu agente de eventos personal
          </p>
        </div>
        <Card className="w-full max-w-2xl p-4 mt-4 border-none rounded-2xl">
        <ScrollShadow className="w-full h-[300px] mb-4 pr-2 rounded-xl">
        <div className="mt-6 flex flex-col gap-2">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`max-w-[70%] px-4 py-2 my-4 mx-4 rounded-2xl ${
                  chat.sender === "user"
                    ? "self-end bg-yellow-300 text-black"
                    : "self-start bg-gray-100 text-black"
                }`}
              >
                {chat.sender === "bot" ? formatBotMessage(chat.message) : chat.message}

                
              </div>
            ))}
          </div>
          </ScrollShadow>
          <Textarea
            isClearable
            variant="flat"
            className="w-full p-2 rounded-lg"
            placeholder="Pregunta sugerida: ¡Hola! Me llamo Juan y estoy de vacaciones en Madrid con mi hija de 5 años. ¿Qué planes me recomiendas?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onClear={() => setPrompt("")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                e.preventDefault();
                e.currentTarget.blur();
                sendPrompt();
              }
            }}
            
          />
          <Button
          isLoading={isLoading}
            style={{ backgroundColor: bgColor }}
            variant="shadow"
            className="mt-2 font-semibold text-black"
            onPress={sendPrompt}
          >
            {isLoading ? "Pensando..." : "Enviar"}
          </Button>
        </Card>
      </section>
    </DefaultLayout>
  );
}
