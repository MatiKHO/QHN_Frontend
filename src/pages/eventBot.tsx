import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";

export default function EventBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendPrompt = async () => {
    try {
      setIsLoading(true);
      setChatHistory((prevHistory) => [...prevHistory, `Usuario: ${prompt}`]);
      const response = await fetch("http://localhost:3000/api/chat/generate", {
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
        `Chat: ${data.response}`,
      ]);
      console.log(chatHistory);
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
          <p className={subtitle({ color: "white" })}>
            Tu agente de eventos personal
          </p>
        </div>
        <Card className="w-full max-w-lg p-4 mt-4 border-none rounded-lg">
          <Textarea
            isClearable
            variant="underlined"
            className="w-full p-2 border-none rounded"
            placeholder="Pregunta sugerida: ¡Hola! Me llamo Juan y estoy de vacaciones en Madrid con mi hija de 5 años. ¿Qué planes me recomiendas?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onClear={() => setPrompt("")}
            onKeyDown={(e) => {
              if (e.key === "Enter" &&  !isLoading) {
                e.preventDefault();
                e.currentTarget.blur();
                sendPrompt();
              }
            }}
          />
          <Button
            variant="shadow"
            color="warning"
            className="mt-2"
            onPress={sendPrompt}
          >
            Enviar
          </Button>

          <div className="mt-4">
            {isLoading ? (
              <Spinner
                classNames={{ label: "text-foreground mt-4" }}
                variant="dots"
                color="warning"
              />
            ) : (
              response && <p>{response}</p>
            )}
          </div>
          {/* <div>
            {chatHistory.map((text, index) => (
              <span key={index}>{text}</span>
            ))}
          </div> */}
        </Card>
      </section>
    </DefaultLayout>
  );
}
