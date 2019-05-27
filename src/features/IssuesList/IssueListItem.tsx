import React from "react";
import { css } from "emotion";

import { Issue } from "../../api/githubAPI";

import { IssueLabels } from "../../components/IssueLabels";
import { UserWithAvatar } from "../../components/UserWithAvatar";

const issueStyle = css`
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 1rem 0.5rem;

    .issue__number {
        font-size: 14px;
        color: #999;
        margin-right: 0.5rem;
    }

    .issue__title {
        font-weight: bold;
    }

    .issue__label {
        display: inline-block;
        font-size: 0.75rem;
        padding: 1px 5px;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #fff;
    }
`;

export const IssueListItem = ({ number, title, labels, user, body }: Issue) => {
    return (
        <div className={issueStyle}>
            <div className="issue__body">
                <UserWithAvatar user={user} />
                <span className="issue__number">#{number}</span>
                <span className="issue__title">{title}</span>
                <p className="issue__summary">{body.slice(0, 50)}</p>
                <IssueLabels labels={labels} />
            </div>
        </div>
    );
};
