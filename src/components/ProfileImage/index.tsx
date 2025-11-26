import styles from './styles.module.css'

interface Props {
    name?: string
    colors?: string[]
    size?: number
    font?: number
}

const ProfilePicture = ({ name = 'Unnamed Artist', colors = ['#0561bc', '#00bfff'], size = 40, font = 14 }: Props) => {

    const getInitials = (str: string): string => {

        const aux = str.toUpperCase().replaceAll('-', '').split(' ')

        return aux.length === 1 ? aux[0].slice(0,2) : aux.map((n) => n[0]).join('').slice(0, 2);

    }

    return (
        <span
            style={{
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                width: size,
                height: size,
                fontSize: font,
            }}
            className={styles.pfp}
        >
            {getInitials(name)}
        </span>
    )

}

export default ProfilePicture