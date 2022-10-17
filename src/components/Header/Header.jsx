import { useTelegram } from '../../hooks/useTelegram'
import { Button } from '../Button/Button'
import styles from './header.module.scss'

export const Header =()=>{
    const {onClose,tg}=useTelegram()

    return <div className={styles.header}>
        <Button onClick ={onClose}>Закрыть</Button>
        <span className={styles.user_name}>{tg.initDataUnsafe?.user?.username}</span>
    </div>
}