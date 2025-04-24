import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const HomePage = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>La&nbsp;</span>
          <span className={title({ color: "yellow" })}>imaginación&nbsp;</span>
          <br />
          <span className={title()}>
            de un niño, no tiene precio.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Nuestros eventos, tampoco.
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default HomePage;
