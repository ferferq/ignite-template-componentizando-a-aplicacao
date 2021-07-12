import { createContext, ReactNode, useState } from "react";

type SelectedGenreConfigContext = {
  selectedID: number;
  selectedGenre2: (id:number) => void;
}

type SelectedGenreIdProviderProps = {
  children: ReactNode;
}

export const SelectedGenre = createContext({} as SelectedGenreConfigContext);

export function SelectedGenreId (props: SelectedGenreIdProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function selectedGenre2 (id: number) {
    setSelectedGenreId(id);
  }

  return (
    <SelectedGenre.Provider value={{selectedID:selectedGenreId, selectedGenre2}}>
      {props.children}
    </SelectedGenre.Provider> 
  )
}