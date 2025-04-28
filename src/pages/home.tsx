import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";

const HomePage = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card isPressable isFooterBlurred className="col-span-12 sm:col-span-4 h-[600px] lg:h-[600px] border-none">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start m-4">
            <p className={title({ color: "white" })}>La</p>
            <p className={title({ color: "orange" })}>imaginación</p>
            <p className={title({ color: "white" })}>
              de un niño
            </p>
            <p className={title({color: "white"})}>no tiene límites.</p>
            <br />
            <p className={title({color: "white"})}>Nuestros</p>
            <p className={title({ color: "blue" })}>eventos</p>
            <p className={title({color: "white"})}>tampoco.</p>

          </CardHeader>
          <Image
            removeWrapper
            alt="HeroUI hero Image"
            className=" z-0 w-full h-full object-cover"
            src="https://heroui.com/images/hero-card-complete.jpeg"
          />

          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-lg text-white">Ver eventos</p>
            <Button
              className="text-lg text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="solid"
            >
              Notifícame
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
