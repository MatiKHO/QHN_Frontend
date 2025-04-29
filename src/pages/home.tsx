import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody } from "@heroui/card";


const HomePage = () => {
  return (
    <DefaultLayout>
      {/* Hero section */}
     
      
      {/* Imagen principal  */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card
          className="col-span-12 sm:col-span-4 h-[600px] lg:h-full w-full border-none "
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start m-4">
            <p className={title({ color: "white" })}>La</p>
            <p className={title({ color: "orange" })}>imaginación</p>
            <p className={title({ color: "white" })}>de un niño</p>
            <p className={title({ color: "white" })}>no tiene límites.</p>
            <br />
            <p className={title({ color: "white" })}>Nuestros</p>
            <p className={title({ color: "blue" })}>eventos</p>
            <p className={title({ color: "white" })}>tampoco.</p>
          </CardHeader>
          <Image
            removeWrapper
            alt="HeroUI hero Image"
            className=" z-0 w-full h-full object-cover"
            src="https://heroui.com/images/hero-card-complete.jpeg"
          />

          
        </Card>
      </section>
      {/* Eventos destacados aleatorios  */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-8">
        <h2 className="text-3xl font-bold">Eventos destacados</h2>
        </section>

      {/* Event Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8 md:py-10">
        <Card isPressable isFooterBlurred className="py-4 px-4 hover:scale-105 transition-transform duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={400}
            />
            
          </CardBody>
          
        </Card>
        <Card isPressable isFooterBlurred className="py-4 px-4 hover:scale-105 transition-transform duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={400}
            />
            
          </CardBody>
          
        </Card>
        <Card isPressable isFooterBlurred className="py-4 px-4 hover:scale-105 transition-transform duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={400}
            />
            
          </CardBody>
          
        </Card>
       
       
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
