import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "emotion";

import { IssueLabels, Label } from "../../components/IssueLabels";
import { UserWithAvatar, User } from "../../components/UserWithAvatar";

const RAILS_API_URL = "https://api.github.com/repos/rails/rails/issues?per_page=25&page=1";

interface Issue {
    id: number;
    title: string;
    number: number;
    user: User;
    body: string;
    labels: Label[];
}

const issuesListStyle = css`
    padding: 0;
    margin: 0;

    > li {
        list-style: none;
    }
`;

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

const Issue = ({ number, title, labels, user, body }: Issue) => {
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

export const IssuesListPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function fetchIssues() {
            const result = await axios.get<Issue[]>(RAILS_API_URL);

            setIssues(result.data);
        }

        fetchIssues();
    }, []);

    const renderedIssues = issues.map(issue => (
        <li>
            <Issue {...issue} />
        </li>
    ));

    return (
        <div>
            <h2>Issues</h2>
            <ul className={issuesListStyle}>{renderedIssues}</ul>
        </div>
    );
};
