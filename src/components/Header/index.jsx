import  style from './styles.module.scss';
import ptBR from 'date-fns/locale/pt-BR';
import format from 'date-fns/format';

export function Header(){
    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale: ptBR,
    });
                         
    return(
        <header className={style.headerContainer}>
            <img src="/logo.svg" alt ="Podcast"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    )
}