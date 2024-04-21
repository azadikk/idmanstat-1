//LIG CONTEXT
//LEAGUE API and MORE DATA

import React, { SetStateAction } from "react";
import axios from "axios";
import { League } from "../components/container/HomePage/uitils/LeftSidebarUitils/Ligs";
import { useQuery } from "react-query";
import { api } from "../Api";

type LeagueContextType = {
  leagues: League[];
  setLeagues: React.Dispatch<SetStateAction<League[]>>;
  fetchDataLeague: any; //fech data function
  mainLigs: League[];
  setMainLigs: React.Dispatch<SetStateAction<League[]>>;

  //add tip leagues (special for Tip Əlavə Et area);
  addTipLeagues: League[];
  setAddTipLeagues: React.Dispatch<SetStateAction<League[]>>;

  ligCountry: string | null,
  setLigCountry: React.Dispatch<SetStateAction<string | null>>;
};

type PropType = {
  children: React.ReactNode;
};

export const LigContext = React.createContext<LeagueContextType | undefined>(undefined);

export const LigContextProvider: React.FC<PropType> = ({ children }) => {
  const [leagues, setLeagues] = React.useState<League[]>([]); //all ligs
  const [mainLigs, setMainLigs] = React.useState<League[]>([]); //main ligs we get check main ligs in all ligs
  const [addTipLeagues, setAddTipLeagues] = React.useState<League[]>([]); //for special ADD TIP MODAL leagues (this includes only here);
  const [ligCountry, setLigCountry] = React.useState<string | null>("");

  const fetchDataLeagueQuery = useQuery(['popular-and-all-leagues'], async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_POPULAR_AND_ALL_LEAGUES);
      if(response.data){
        setMainLigs(response.data.data.popular_leagues)
        const AllLeaguesForTipModal = response.data.data.all_leagues.concat(response.data.data.popular_leagues);
        setAddTipLeagues(AllLeaguesForTipModal);
        setLeagues(response.data.data.all_leagues);
        return response.data.data;
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('popular league and league api endpoint error', error);
      throw error;
    }
  }, {
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });

  const fetchDataLeague = fetchDataLeagueQuery;

  return (
    <LigContext.Provider value={{ 
      setLigCountry, ligCountry,
      setLeagues, leagues, fetchDataLeague, mainLigs, setMainLigs, setAddTipLeagues, addTipLeagues
      }}>
      {children}
    </LigContext.Provider>
  );
};

export const useLigApi = () => {
  const context = React.useContext(LigContext);

  if (context === undefined) {
    throw new Error("undefined is country api");
  } else {
    return context;
  }
};
