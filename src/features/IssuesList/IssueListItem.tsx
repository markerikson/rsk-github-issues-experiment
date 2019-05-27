import React from "react";
import { css } from "emotion";

import { Issue } from "../../api/githubAPI";

import { IssueLabels } from "../../components/IssueLabels";
import { UserWithAvatar } from "../../components/UserWithAvatar";

import { shorten } from "../../utils/stringUtils";

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

type Props = Issue & {
    showIssueComments: (issueId: number) => void;
};

export const IssueListItem = ({ number, title, labels, user, body = "", showIssueComments }: Props) => {
    return (
        <div className={issueStyle}>
            <UserWithAvatar user={user} />
            <div className="issue__body">
                <a href="#comments" onClick={() => showIssueComments(number)}>
                    <span className="issue__number">#{number}</span>
                    <span className="issue__title">{title}</span>
                </a>
                <p className="issue__summary">{shorten(body)}</p>
                <IssueLabels labels={labels} />
            </div>
        </div>
    );
};
