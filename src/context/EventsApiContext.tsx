import React, { SetStateAction } from 'react'
import { EventType } from '../components/container/HomePage/uitils/ContentUitils/ContentRoutes/fixturemodalroutes/Events'
import axios from 'axios';
import { api } from '../Api';

type EventContextType = {
     events: EventType[] | null,
     setEvents: React.Dispatch<SetStateAction<EventType[] | null>>;

     fetchDataForEvents: (fixtureID: number | undefined) => void;
};

type childrenType = {
     children: React.ReactNode,
}

export const EventsContext = React.createContext<EventContextType | undefined>(undefined);

export const EventsContextProvider:React.FC<childrenType> = ({ children }) => {

     const [events, setEvents] = React.useState<EventType[] | null>(null);

     const fetchDataForEvents = async (id: number | undefined) => {
          const options = {
                    method: 'GET',
                    url: import.meta.env.VITE_APP_FIXTURES_EVENTS,
                    params: {fixture: id},
                    headers: {
                      'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPIDAPIKEY,
                      'X-RapidAPI-Host': import.meta.env.VITE_APP_RAPIDAPIHOST
                    }
          }

          const response = await axios.request(options);

          try {
               if(response.data) {
                    const data = response.data.response;
                    setEvents(data);
               } else {
                    console.log('!! doesnt response.data  if(response.data) block in events' );
               }
          } catch (error) {
               console.log('match events endpoint error (fixtures/events)', error);
          }
     }

     return (
          <EventsContext.Provider value={{ 
               events, setEvents, fetchDataForEvents
          }}>
               {children}
          </EventsContext.Provider>
     )
}

export const useEventsApi = () => {
     const context = React.useContext(EventsContext);

     if(context === undefined) {
          throw new Error('undefined is events context');
     } else {
          return context;
     }
}