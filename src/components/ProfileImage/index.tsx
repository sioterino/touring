import styles from './styles.module.css'

interface Props {
    name?: string
}

const ProfilePicture = ({ name = "Unnamed Artist" }: Props) => {

    const getInitials = (str: string): string => {

        return str.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    }

    return (
        <span className={styles.pfp} >{getInitials(name)}</span>
    )

}

export default ProfilePicture