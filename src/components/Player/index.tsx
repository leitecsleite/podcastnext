import { PlayerContexts } from '../../contexts/PlayerContexts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import styles from './styles.module.scss';
import {useContext, useRef, useEffect} from 'react'; 
import Image from 'next/image';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null); 

  const { episodeList , currentEpisodeIndex, isPlaying, togglePlay} = useContext(PlayerContexts)

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
              <span>00:00</span>
              <div className={styles.slider}>
                {episode ? (
                  <Slider 
                  trackStyle={{ backgroundColor: '#04d361'}}
                  railStyle={{ backgroundColor: '#9f75ff'}}
                  handleStyle={{borderColor: '#04d361', borderWidth: 4}}

                  />
                ):(
                   <div className={styles.emptySlider} />
                )}
                
              </div>
              <span>00:00</span>
            </div>

            {episode && (
              <audio 
               src={episode.url}
               ref={audioRef}
               autoPlay
              />
            )}

            <div className={styles.buttons}>
              <button type="button" disabled={!episode}>
                <img src="/shuffle.svg" alt="Embaralhar"/>
              </button>

              <button type="button" disabled={!episode}>
                <img src="/play-previous.svg" alt="Tocar Anterior"/>
              </button>

              <button type="button" onClick={togglePlay} className={styles.playButton} disabled={!episode}>
                {isPlaying 
                ? <img src="/pause.svg" alt="Tocar"/>
                : <img src ="/play.svg" alt="Tocar"/> }
               
              </button>

              <button type="button" disabled={!episode}>
                <img src="/play-next.svg" alt="Tocar próxima"/>
              </button>

              <button type="button" disabled={!episode}>
                <img src="/repeat.svg" alt="Repetir"/>
              </button>
            </div>
          </footer>
        </div>
    )
}