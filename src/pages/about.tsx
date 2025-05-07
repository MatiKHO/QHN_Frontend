import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader } from "@heroui/card";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-10 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>¿Quiénes somos?</h1>
        </div>
        <div className="flex flex-col gap-8 mb-4">
          <Card isPressable className="w-full h-full flex flex-col  bg-white text-black hover:scale-105 transition-transform duration-300 ">
            <CardHeader  className="pt-2 px-4 flex-col items-start">
              <h1 className={subtitle()} style={{color: "#FF993A"}}>
                <strong>Misión</strong>
              </h1>
              <p>En <strong><i>QuéHacerConLosNiños</i></strong>, nuestra misión es facilitar a
                las familias el <strong>acceso a planes, actividades y experiencias, </strong>
                pensadas para disfrutar con sus hijos. Queremos hacer más
                sencillo el día a día de madres y padres, ofreciendo propuestas
                fiables y útiles que promuevan el tiempo compartido y el
                equilibrio entre la vida familiar y el ocio urbano.</p>
            </CardHeader>
          </Card>

          <Card isPressable  className="h-full flex flex-col justify-between bg-white text-black hover:scale-105 transition-transform duration-300 ">
            <CardHeader className="pt-2 px-4 flex-col items-start">
              <h1 className={subtitle()} style={{color: "#FF993A"}}>
                <strong>Visión</strong>
              </h1>
              <p>Nos proyectamos como la <strong>plataforma de referencia en
              España </strong>para encontrar propuestas familiares de forma fácil,
                personalizada y de confianza. Aspiramos a crear una comunidad
                activa de familias conectadas por el deseo de vivir momentos
                significativos con sus hijos, haciendo que cada fin de semana o
                tarde libre sea una oportunidad para disfrutar juntos.</p>
            </CardHeader>
          </Card>

          <Card isPressable  className="h-full flex flex-col justify-between bg-white text-black hover:scale-105 transition-transform duration-300 ">
            <CardHeader className="pt-2 px-4 flex-col items-start">
              <h1 className={subtitle()} style={{color: "#FF993A"}}>
                <strong>Valores</strong>
              </h1>
              <p>Queremos la forma en que las familias
                descubren y disfrutan su tiempo libre, siendo el punto de
                encuentro digital donde encontrar ideas prácticas, accesibles y
                emocionantes para compartir con los niños. Nuestra visión es
                <strong> acompañar a padres y madres en la creación de recuerdos
                valiosos, haciendo del ocio familiar algo sencillo, constante y
                al alcance de todos</strong> 
                </p>
            </CardHeader>
          </Card>
              
        </div>
      </section>
    </DefaultLayout>
  );
}
