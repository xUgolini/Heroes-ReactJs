// HeroList.js
import React, { useEffect, useState } from "react";
import { useStore } from "../store";

import { Scrollbar, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import HeroFilter from "./HeroFilter";
import Card from "./Card";
import PageButton from "./PageButton";
import Dialog from "./Dialog";

const HeroList = () => {
  const { heroes, setHeroes } = useStore();
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filtered = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagesCount = Math.ceil(filtered.length / 20);
  const currentPage = filtered.slice((page - 1) * 20, page * 20);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const selectHero = (hero) => {
    if (selectedHeroes.length < 2 && hero.id !== selectedHeroes[0]?.id) {
      setSelectedHeroes((state) => [...state, hero]);

      if (selectedHeroes.length === 1) {
        setOpen(true);
      }
    }

    if (selectedHeroes.length === 1) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedHeroes([]);
    setOpen(false);
  };

  useEffect(() => {
    // Fazer a chamada para a API e atualizar o estado
    fetch("http://homologacao3.azapfy.com.br/api/ps/metahumans")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setHeroes(data);
      })
      .catch((error) => {
        console.error(`Error fetching data:`, error);
      });
  }, [setHeroes]);

  return (
    <div className="flex flex-col min-h-screen p-8 bg-slate-950">
      <h1 className="py-8 font-sans text-3xl font-bold text-center text-zinc-300">
        Heroes List
      </h1>
      <HeroFilter handleSearch={handleSearch} />

      {filtered.length > 0 && (
        <Swiper
          modules={[Scrollbar, FreeMode]}
          scrollbar={{ draggable: true }}
          freeMode={{ enabled: true }}
          spaceBetween={10}
          slidesPerView={"auto"}
          className="w-[50vw] h-16 m-8 self-center relative z-10"
        >
          {[...Array(pagesCount)].map((x, i) => (
            <SwiperSlide key={i}>
              <PageButton
                key={i}
                pageNumber={i + 1}
                changePage={setPage}
                selectedPage={page}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {filtered.length > 0 && (
        <span className="self-end py-2 text-white">
          {filtered.length} results.
        </span>
      )}

      {filtered.length > 0 ? (
        <ul className="grid items-baseline grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-4">
          {currentPage.map((hero) => (
            <Card
              key={hero.id}
              hero={hero}
              selectHero={selectHero}
              selectedHeroes={selectedHeroes}
            />
          ))}
        </ul>
      ) : heroes.length > 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-2xl font-bold text-center text-zinc-400">
            No results found.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-2xl font-bold text-center text-zinc-400">
            Carregando...
          </p>
        </div>
      )}

      <Dialog open={open} handleClose={handleClose} heroes={selectedHeroes} />
    </div>
  );
};

export default HeroList;
