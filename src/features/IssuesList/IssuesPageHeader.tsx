import React from "react";

interface OrgProps {
    org: string;
    repo: string;
}

type HeaderProps = {
    openIssuesCount: number;
} & OrgProps;

function OrgRepo({ org, repo }: OrgProps) {
    return (
        <span>
            <span className="header__org">{org}</span>
            {" / "}
            <span className="header__repo">{repo}</span>
        </span>
    );
}

export function IssuesPageHeader({ openIssuesCount = -1, org, repo }: HeaderProps) {
    if (openIssuesCount === -1) {
        return (
            <h1>
                Open issues for <OrgRepo org={org} repo={repo} />
            </h1>
        );
    } else {
        const pluralizedIssue = openIssuesCount === 1 ? "issue" : "issues";
        return (
            <h1>
                <span className="header__openIssues">{openIssuesCount}</span> open {pluralizedIssue} for{" "}
                <OrgRepo org={org} repo={repo} />
            </h1>
        );
    }
}
