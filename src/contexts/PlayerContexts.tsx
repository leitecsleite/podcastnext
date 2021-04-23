import { createContext, useState, ReactNode, useContext} from 'react';

type Episode = {
    title: string; 
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}


type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number ;
    isPlaying: boolean; 
    isLooping: boolean;
    isShuffling: boolean; 
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void; 
    setPlayingState:(state: boolean) => void; 
    togglePlay:() => void; 
    toggleLooping: () => void; 
    toggleShuffing: () => void; 
    playNext:() => void; 
    playPrevius: () => void; 
    clearPlayerState: () => void;
    hasPrevious: boolean; 
    hasNext: boolean; 

}



export const PlayerContexts = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode; 
}

export function  PlayerContextProvider({children}: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]); 
    const [currentEpisodeIndex, setCurrentEpisodeIndex]= useState(0); 
    const [isPlaying, setIsPlaying] = useState(false); 
    const [isLooping, setIsLooping] = useState(false); 
    const [isShuffling, setIsShuffling] = useState(false); 
  
    function play (episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0); 
      setIsPlaying(true); 
    }

    function playList(list: Episode[], index: number){
      setEpisodeList(list); 
      setCurrentEpisodeIndex(index); 
      setIsPlaying(true); 
    }

    function togglePlay(){
      setIsPlaying(!isPlaying); 
    }

    function toggleLooping(){
      setIsLooping(!isLooping); 
    }

    function toggleShuffing(){
      setIsShuffling(!isShuffling)
    }
  
    function setPlayingState(state: boolean){
      setIsPlaying(state); 
    }

    function clearPlayerState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0); 
    }

    const hasPrevious = currentEpisodeIndex > 0; 
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length; 
  
  
     function playNext(){
      if (isShuffling){
        const nextRamdomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

        setCurrentEpisodeIndex(currentEpisodeIndex);
      }else if(hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1); 
      }
    }

    function playPrevius(){
      if(hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1); 
      }
     }

    return(
      <PlayerContexts.Provider 
        value ={{
        episodeList,
        currentEpisodeIndex,
        playNext, 
        playPrevius, 
        hasPrevious,
        hasNext,
        isLooping,
        isShuffling, 
        play, 
        playList,
        isPlaying,
        togglePlay,
        setPlayingState,
        toggleLooping,
        toggleShuffing,
        clearPlayerState,

      }}>
          {children}
          
      </PlayerContexts.Provider>    
    )
}


export const usePlayer = () => {
  return useContext(PlayerContexts); 
}




