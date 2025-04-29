"use client";

import { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { siteConfig } from "@/config/site";

const HomePage = () => {
  const [showMap, setShowMap] = useState(false);

  const mapCenter: LatLngExpression = [40.4168, -3.7038];

  return (
    <DefaultLayout>
      {/* Categorías + Botón */}
      <section className="w-full flex flex-col items-center py-8 md:py-10 bg-white dark:bg-black z-10">
        <div className="flex justify-around flex-wrap gap-4 w-full">
          {siteConfig.categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.label}
                isPressable
                className="w-[150px] py-4 px-4 hover:scale-105 transition-transform duration-300 text-center whitespace-nowrap"
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <Icon className="h-6 mb-2" />
                  <p className="top-1 flex-col !items-start m-1 font-medium">
                    {category.label}
                  </p>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Botón para mostrar/ocultar el mapa */}
        <div className="mt-6">
          <Card
            isPressable
            onPress={() => setShowMap(!showMap)}
            className="w-[150px] py-3 px-4 bg-content1 text-black dark:text-white shadow-none hover:scale-105 transition-transform duration-300 text-center whitespace-nowrap"
          >
            <CardHeader className="flex flex-col items-center justify-center p-0">
              <span className="font-medium text-sm">
                {showMap ? "Ocultar mapa" : "Mostrar mapa"}
              </span>
            </CardHeader>
          </Card>
        </div>
      </section>

      {showMap ? (
        <section className="flex justify-center items-center py-4 px-4 bg-transparent min-h-[80vh]">
          <div className="w-full h-[80vh] max-w-7xl">
            <LeafletMap
              center={mapCenter}
              zoom={15}
              scrollWheelZoom={true}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LeafletMap>
          </div>
        </section>
      ) : (
        <>
          {/* Imagen principal */}
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Card className="col-span-12 sm:col-span-4 h-[600px] lg:h-full w-full border-none">
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
                className="z-0 w-full h-full object-cover"
                src="https://app.requestly.io/delay/200/https://heroui.com/images/hero-card-complete.jpeg"
              />
            </Card>
          </section>

          {/* Eventos destacados */}
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-8">
            <h2 className="text-3xl font-bold">Eventos destacados</h2>
          </section>

          {/* Event Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8 md:py-10">
            {[1, 2, 3].map((_, i) => (
              <Card
                key={i}
                isPressable
                isFooterBlurred
                className="py-4 px-4 hover:scale-105 transition-transform duration-300"
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">Daily Mix</p>
                  <small className="text-default-500">12 Tracks</small>
                  <h4 className="font-bold text-large">Frontend Radio</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://app.requestly.io/delay/200/https://heroui.com/images/hero-card-complete.jpeg"
                    width={400}
                  />
                </CardBody>
              </Card>
            ))}
          </section>
        </>
      )}
    </DefaultLayout>
  );
};

export default HomePage;
