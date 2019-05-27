import React from "react";

export interface Label {
    id: number;
    name: string;
    color: string;
}

interface IssueLabelsProps {
    labels: Label[];
}

export const IssueLabels = ({ labels }: IssueLabelsProps) => (
    <div className="issue__labels">
        {labels.map(label => (
            <span
                key={label.id}
                className="issue__label"
                style={{
                    boxShadow: `0 0 2px #${label.color}`,
                    borderColor: `#${label.color}`
                }}
            >
                {label.name}
            </span>
        ))}
    </div>
);
