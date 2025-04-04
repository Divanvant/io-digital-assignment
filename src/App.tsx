import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Favorites from "./routes/Favorites";
import Edit from "./routes/Edit";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { IMDBMovie } from "./model/movie";
import clsx from "clsx";

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<IMDBMovie[]>([]);

  const addFavorite = (movie: IMDBMovie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  const isFavorite = (id: string) =>
    favorites.some((movie) => movie.imdbID === id);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        setFavorites,
      }}
    >
      <BrowserRouter basename="/">
        <div className="min-h-full">
          <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="#">MovieDB</a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <Search />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="py-10">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <nav
                  aria-label="Sidebar"
                  className="sticky top-4 divide-y divide-gray-300"
                >
                  <div className="pb-8 space-y-1 flex flex-col">
                    <NavLink
                      className={({ isActive }) =>
                        clsx(
                          "p-2 bg-slate-200 rounded-md hover:bg-slate-400 transition",
                          isActive ? "bg-slate-400" : ""
                        )
                      }
                      to="/"
                      end
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        clsx(
                          "p-2 bg-slate-200 rounded-md hover:bg-slate-400 transition",
                          isActive ? "bg-slate-400" : ""
                        )
                      }
                      to="/favorites"
                      end
                    >
                      Favorites
                    </NavLink>
                  </div>
                </nav>
              </div>

              <main className="lg:col-span-9">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie/:id" element={<Detail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/edit/:id" element={<Edit />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
