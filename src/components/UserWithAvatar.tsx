import React from "react";
import { css, cx } from "emotion";

import { User } from "../api/githubAPI";

interface UserAvatarProps {
    user: User;
    orientation?: "vertical" | "horizontal";
    link?: boolean;
}

const userStyles = css`
    display: inline-flex;
    align-items: center;

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

const verticalStyles = css`
    text-align: center;
    margin-right: 0.5rem;
    flex-direction: column;
    justify-content: flex-start;
    min-width: 80px;
    max-width: 80px;
`;

const horizontalStyles = css`
    .issue__user__name {
        display: inline;
        margin-left: 0.5rem;
    }
`;

export const UserWithAvatar = ({ user, orientation = "vertical", link = true }: UserAvatarProps) => {
    const classNames = cx(userStyles, {
        [verticalStyles]: orientation === "vertical",
        [horizontalStyles]: orientation === "horizontal"
    });

    const contents = (
        <React.Fragment>
            <img className="issue__user__avatar" src={user.avatar_url} alt="" />
            <div className="issue__user__name">{user.login}</div>
        </React.Fragment>
    );

    if (link) {
        return (
            <a href={`https://github.com/${user.login}`} className={classNames}>
                {contents}
            </a>
        );
    } else {
        return <span className={classNames}>{contents}</span>;
    }
};
