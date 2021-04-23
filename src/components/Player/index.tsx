import { PlayerContexts, usePlayer } from '../../contexts/PlayerContexts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import styles from './styles.module.scss';
import {useContext, useRef, useEffect, useState} from 'react'; 
import Image from 'next/image';
import { covertDurationToTimeString } from '../../utils/covertDurationToTimeString';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0); 

  const { 
    episodeList ,
    currentEpisodeIndex,
    isPlaying,
    setPlayingState,
    playNext,
    playPrevius,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious, 
    togglePlay,
    toggleLooping,
    toggleShuffing,
    clearPlayerState,
    
  } = usePlayer(); 

  useEffect(() =>{
    if(!audioRef.current){
      return; 
    }
    if(isPlaying){
      audioRef.current.play(); 
    }else {
      audioRef.current.pause(); 
    }

  }, [isPlaying])

  function setupProgressListener(){
    audioRef.current.currentTime = 0; 
    
    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime)); 
    })

  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount); 
  }

  function handleEpisodeEnded (){
    if(hasNext){
      playNext(); 
    }else {
      clearPlayerState(); 
    }
  }

  const episode = episodeList[currentEpisodeIndex]; 

  const player =useContext(PlayerContexts)
    return(
        <div className={styles.playerContainer}>
          <header>
            <img src="/playing.svg" alt="Tocando agora"/>
            <strong>Tocando agora</strong>
          </header>

          {episode ? (
             <div className={styles.currentEpisode}>
               <Image 
               width={592}
               height={592}
               src ={episode.thumbnail}
               objectFit="cover"
               />

               <strong>{episode.title}</strong>
               <span>{episode.members}</span>

             </div>
          ): ( 
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>

          )}

          <footer className={episode ? styles.empty : ''}>
            <div className={styles.progress}>
              <span>{covertDurationToTimeString(progress)}</span>
              <div className={styles.slider}>
                {episode ? (
                  <Slider 
                  max = {episode.duration}
                  value ={progress}
                  onChange = {handleSeek}
                  trackStyle={{ backgroundColor: '#04d361'}}
                  railStyle={{ backgroundColor: '#9f75ff'}}
                  handleStyle={{borderColor: '#04d361', borderWidth: 4}}

                  />
                ):(
                   <div className={styles.emptySlider} />
                )}
                
              </div>
              <span>{covertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            {episode && (
              <audio 
               src={episode.url}
               ref={audioRef}
               loop={isLooping}
               onEnded = {handleEpisodeEnded}
               onPlay ={() => setPlayingState(true)}
               onPause = {() => setPlayingState(false)}
               onLoadedMetadata ={ setupProgressListener}
               autoPlay
              />
            )}

            <div className={styles.buttons}>
              <button
              onClick = {toggleShuffing}
              className ={isShuffling ? styles.isActive : ''} 
              type="button" 
              disabled={!episode || episodeList.length == 1}>
                <img src="/shuffle.svg" alt="Embaralhar"/>
              </button>

              <button type="button"  onClick= {playPrevius} disabled={!episode || !hasPrevious}>
                <img src="/play-previous.svg" alt="Tocar Anterior"/>
              </button>

              <button type="button" onClick={togglePlay} className={styles.playButton} disabled={!episode}>
                {isPlaying 
                ? <img src="/pause.svg" alt="Tocar"/>
                : <img src ="/play.svg" alt="Tocar"/> }
               
              </button>

              <button type="button" onClick ={playNext} disabled={!episode || !hasNext}>
                <img src="/play-next.svg" alt="Tocar próxima"/>
              </button>

              <button 
              type="button" 
              onClick = {toggleLooping}
              className ={isLooping ? styles.isActive : ''}
              disabled={!episode}>
                <img src="/repeat.svg" alt="Repetir"/>
              </button>
            </div>
          </footer>
        </div>
    )
}