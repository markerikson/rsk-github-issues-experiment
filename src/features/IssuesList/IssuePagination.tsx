import React from "react";
import Paginate, { ReactPaginateProps } from "react-paginate";
import { css, cx } from "emotion";

export type OnPageChangeCallback = ReactPaginateProps["onPageChange"];

interface Props {
    currentPage: number;
    pageCount: number;
    onPageChange?: OnPageChangeCallback;
}

const paginationStyles = css`
    padding-top: 1rem;
    text-align: center;

    > ul {
        padding: 0;
        margin: 0;
    }

    li {
        display: inline-block;
    }

    li > a {
        padding: 0.5rem;
        margin: 1px;
        display: inline-block;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #d8eef5;
        border-radius: 2px;
        min-width: 1rem;
    }

    li > a:focus {
        outline: none;
    }

    li > a:hover {
        background-color: #d8eef5;
    }

    .selected a {
        box-shadow: 0 0 2px #1b7d9e;
        background-color: #f3fcff;
    }

    .disabled > a {
        color: #ccc;
        background-color: #f8f8f8;
        border-color: #eee;
        cursor: default;
    }
    .disabled > a:hover {
        background-color: #f8f8f8;
    }
    .break {
        margin: 0 8px;
    }
    .previous {
        margin-right: 1rem;
    }
    .next {
        margin-left: 1rem;
    }
`;

export const IssuePagination = ({ currentPage, pageCount, onPageChange }: Props) => {
    return (
        <div className={cx("issues__pagination", paginationStyles)}>
            <Paginate
                forcePage={currentPage}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                nextLabel="&rarr;"
                previousLabel="&larr;"
            />
        </div>
    );
};
