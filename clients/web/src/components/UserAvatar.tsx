import { User } from "lucide-react";
import { Activity } from "react";

type Props = {
    avatar?: string;
    size?: 'small' | 'large';
}
function UserAvatar({ avatar, size = 'small' }: Props) {
    return (
        <div className={`${size === 'small' ? 'w-10 h-10' : 'w-24 h-24'} rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden`}>
            <Activity mode={avatar ? 'visible' : 'hidden'}>
                <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-fit"
                />
            </Activity>
            <Activity mode={avatar ? 'hidden' : 'visible'}>
                <User className="w-5 h-5 text-primary" />
            </Activity>
        </div>
    )
}

export default UserAvatar