"use client";

import { useState, useEffect } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { siteConfig } from "@/config/site";
import { MapIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";

type Evento = {
  event_id: string;
  name: string;
  url?: string;
  latitude: string;
  longitude: string;
  tags: string;
};

const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const [events, setEvents] = useState<Evento[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Evento[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Evento[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const bgColor = "#FFD66B";

  const mapCenter: LatLngExpression = [40.4168, -3.7038];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://qhn-backend.onrender.com/api/events");
        const data = await res.json();
        setEvents(data);
        setFeaturedEvents(
          [...data]
            .filter((event) => event.name && event.url)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const fetchEventsByTag = async (tag: string) => {
    try {
      const response = await fetch(
        `https://qhn-backend.onrender.com/api/eventsByTag?tags=${encodeURIComponent(tag)}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error fetching events");

      setFilteredEvents(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching events by tag:", error);
      setFilteredEvents([]);
    }
  };

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentFilteredEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <DefaultLayout>
      {/* Imagen principal */}
      <section className="flex flex-col items-center justify-center gap-4 pb-20 md:py-10">
        <Card className="col-span-12 sm:col-span-4 h-[600px] lg:h-[400px] w-full border-none">
          <CardHeader className="absolute z-10 top-10 flex-col !items-start m-4">
            <p className={title({ color: "white" })}>Todos tus</p>
            <p className={title({ color: "black" })}>eventos</p>
            <p className={title({ color: "white" })}>a un solo click.</p>
            <br />
            <Button
              style={{ backgroundColor: bgColor }}
              variant="light"
              className="text-black font-semibold"
            >
              Ir a eventos
            </Button>
          </CardHeader>
          <Image
            removeWrapper
            alt="HeroUI hero Image"
            className="z-0 w-full h-full object-cover"
            src="https://app.requestly.io/delay/200/https://res.cloudinary.com/doll2vtjc/image/upload/v1746471258/mike-scheid-0iqkntLw93A-unsplash_ofjmel.jpg"
          />
        </Card>
      </section>

      {/* Categorías */}
      <section className="w-full flex flex-col items-center py-8 md:py-10 bg-white dark:bg-black z-10">
      <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
        <div className="flex justify-around flex-wrap gap-4 w-full">
          {siteConfig.categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.label}
                isPressable
                onPress={() => fetchEventsByTag(category.label)}
                className="w-[150px] py-4 px-4 hover:scale-105 transition-transform duration-300 text-center whitespace-nowrap"
                style={{ backgroundColor: bgColor }}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <Icon className="h-6 mb-2 text-black" />
                  <p className="font-medium text-black">{category.label}</p>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="w-full flex flex-col items-center bg-white dark:bg-black z-10">
        {/* Botón para mostrar/ocultar el mapa */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
          <Card
            isPressable
            onPress={() => setShowMap(!showMap)}
            className="w-[150px] py-3 px-4 bg-black text-black dark:bg-white hover:scale-105 transition-transform duration-300 text-center"
            style={{ backgroundColor: bgColor }}
          >
            <CardHeader className="flex flex-row items-center justify-center p-0">
              <span className="font-medium text-sm flex items-center gap-2">
                {showMap ? "Ocultar mapa" : "Mostrar mapa"} <MapIcon />
              </span>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Mapa */}
      {showMap && (
        <section className="flex justify-center items-center py-4 px-4 bg-transparent min-h-[80vh]">
          <div className="w-full h-[80vh] max-w-7xl rounded-lg overflow-hidden shadow-lg">
            <LeafletMap
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {events
                .filter((e) => {
                  const lat = parseFloat(e.latitude);
                  const lng = parseFloat(e.longitude);
                  return (
                    e.latitude &&
                    e.longitude &&
                    !isNaN(lat) &&
                    !isNaN(lng) &&
                    lat >= -90 &&
                    lat <= 90 &&
                    lng >= -180 &&
                    lng <= 180
                  );
                })
                .map((e) => (
                  <Marker
                    key={e.event_id}
                    position={[parseFloat(e.latitude), parseFloat(e.longitude)]}
                  >
                    <Popup>
                      <div className="space-y-1">
                        <p className="font-semibold">{e.name}</p>
                        {e.url && (
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Ver evento
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </LeafletMap>
          </div>
        </section>
      )}
      {filteredEvents.length > 0 && (
        <section className="flex flex-col items-center justify-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Eventos filtrados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
            {currentFilteredEvents.map((evento) => (
              <a
                key={evento.event_id}
                href={evento.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-white text-black hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{evento.tags}</p>
                    <h4 className="font-bold text-large">{evento.name}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt={evento.name}
                      className="object-cover rounded-xl"
                      src="https://heroui.com/images/hero-card-complete.jpeg"
                      width={400}
                    />
                  </CardBody>
                </Card>
              </a>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-6">
            <Pagination
            
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              showShadow
              variant="light"
              
            />
          </div>
        </section>
      )}

      {/* Eventos destacados */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-8">
        <h2 className="text-3xl font-bold">Eventos populares</h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8 md:py-10">
        {featuredEvents.map((evento) => (
          <a
            key={evento.event_id}
            href={evento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="bg-white text-black hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  Evento destacado
                </p>
                <h4 className="font-bold text-large">{evento.name}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt={evento.name}
                  className="object-cover rounded-xl"
                  src="https://app.requestly.io/delay/200/https://res.cloudinary.com/doll2vtjc/image/upload/v1746471258/mike-scheid-0iqkntLw93A-unsplash_ofjmel.jpg"
                  width={400}
                />
              </CardBody>
            </Card>
          </a>
        ))}
      </section>
    </DefaultLayout>
  );
};

export default HomePage;
