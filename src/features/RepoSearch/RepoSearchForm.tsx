import React, { useState } from "react";

import "./pure-forms.css";
import "./pure-buttons.css";

interface Props {
    org: string;
    repo: string;
    setOrgAndRepo?: Function;
    setJumpToPage?: Function;
}

export const RepoSearchForm = ({ org, repo, setOrgAndRepo, setJumpToPage }: Props) => {
    const [currentOrg, setCurrentOrg] = useState(org);
    const [currentRepo, setCurrentRepo] = useState(repo);

    return (
        <form className="pure-form">
            <div>
                <label htmlFor="org" style={{ marginRight: 5 }}>
                    Org:
                </label>
                <input name="org" value={currentOrg} />
                <label htmlFor="repo" style={{ marginRight: 5, marginLeft: 10 }}>
                    Repo:
                </label>
                <input name="repo" value={currentRepo} />
            </div>
            <div style={{ marginTop: 5 }}>
                <label htmlFor="jumpToPage" style={{ marginRight: 5 }}>
                    Issues Page:
                </label>
                <input name="jumpToPage" value={1} />
                <button type="button" className="pure-button pure-button-primary" style={{ marginLeft: 5 }}>
                    Jump to Page
                </button>
            </div>
        </form>
    );
};
