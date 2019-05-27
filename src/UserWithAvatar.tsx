import React from "react";
import { css } from "emotion";

export interface User {
    login: string;
    avatar_url: string;
}

interface UserAvatarProps {
    user: User;
    orientation?: "vertical" | "horizontal";
    link?: boolean;
}

const userStyles = css`
    display: inline-flex;
    align-items: center;

    text-align: center;
    margin-right: 0.5rem;
    flex-direction: column;
    justify-content: flex-start;
    min-width: 80px;
    max-width: 80px;

    .issue__user__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }

    .issue__user__name {
        color: #555;
        font-size: 0.8rem;
        word-wrap: break-word;
        max-width: 100%;
    }
`;

export const UserWithAvatar = ({ user, orientation = "vertical", link = true }: UserAvatarProps) => {
    return (
        <span className={userStyles}>
            <img className="issue__user__avatar" src={user.avatar_url} alt="" />
            <div className="issue__user__name">{user.login}</div>
        </span>
    );
};
