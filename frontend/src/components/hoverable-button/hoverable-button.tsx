import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface PlayerControlButtonProps {
    icon: IconProp
    iconOnHover: IconProp
    size?: SizeProp
    onClick: () => void
    fadeAnimation?: boolean
}

export function HoverableButton({ icon, iconOnHover, size, onClick, fadeAnimation }: PlayerControlButtonProps) {
    return (
        <button className="group flex items-center cursor-pointer" onClick={onClick}>
            <FontAwesomeIcon icon={icon} size={size} fade={fadeAnimation} className="group-hover:hidden"/>
            <FontAwesomeIcon icon={iconOnHover} size={size} fade={fadeAnimation} className="hidden group-hover:block" />
        </button>
    )
}