import React, { useState, useEffect } from "react";
import axios from "axios";
import { render } from "react-dom";

const RAILS_API_URL = "https://api.github.com/repos/rails/rails/issues?per_page=25&page=1";

interface Issue {
    id: number;
    title: string;
    number: number;
}

export const IssuesListPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function fetchIssues() {
            const result = await axios.get<Issue[]>(RAILS_API_URL);
            console.log("Result: ", result);

            setIssues(result.data);
        }

        fetchIssues();
    }, []);

    const renderedIssues = issues.map(issue => (
        <li>
            # {issue.number}: {issue.title}
        </li>
    ));

    return (
        <div>
            <h2>Issues</h2>
            <ul>{renderedIssues}</ul>
        </div>
    );
};
