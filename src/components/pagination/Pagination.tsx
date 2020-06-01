import React, { useState, useEffect } from "react";

type PropsType = {
  countPages: number;
  numPage: number;
  nextUsersOnPage: (numPage: number) => void;
};

const Pagination = (props: PropsType) => {
  let cntDisplayedPages = 12; //число отображаемых страниц

  const [nListPgs, setNListPgs] = useState(1 + cntDisplayedPages);

  const pagesArr = [];

  useEffect(() => {
    if (nListPgs - props.numPage > 12) {
      return setNListPgs(1 + cntDisplayedPages);
    }
  }, [nListPgs, props.numPage, cntDisplayedPages]);

  const surfOnPages = {
    fistPage() {
      props.nextUsersOnPage(1);
      setNListPgs(1 + cntDisplayedPages);
    },
    lastPage() {
      props.nextUsersOnPage(props.countPages);
      setNListPgs(props.countPages + 1);
    },
    prev() {
      if (nListPgs < 1) return;
      props.nextUsersOnPage(nListPgs - 2 * cntDisplayedPages);
      setNListPgs(nListPgs - cntDisplayedPages);
    },
    next() {
      if (nListPgs > props.countPages) return;
      props.nextUsersOnPage(nListPgs);
      setNListPgs(nListPgs + cntDisplayedPages);
    },
  };

  if (props.countPages < cntDisplayedPages) {
    cntDisplayedPages = props.countPages;
    for (let i = 1; i <= props.countPages; i++) {
      pagesArr.push(i);
    }
  } else {
    for (let i = nListPgs - cntDisplayedPages; i < nListPgs; i++) {
      pagesArr.push(i);
    }
  }

  const pages = pagesArr.map((p) => (
    <span
      key={p}
      className={
        "pagination__item " + (props.numPage === p && "pagination__item_active")
      }
      onClick={() => props.nextUsersOnPage(p)}
    >
      {p}
    </span>
  ));

  return (
    <div className="pagination">
      {props.numPage > cntDisplayedPages ? (
        <span
          className="pagination__item pagination__item_text"
          onClick={surfOnPages.fistPage}
        >
          Start
        </span>
      ) : (
        <span className="pagination__item pagination__item_text pagination__item_disabled">
          Start
        </span>
      )}
      {props.numPage > cntDisplayedPages ? (
        <span
          className="pagination__item pagination__item_text"
          onClick={surfOnPages.prev}
        >
          Prev
        </span>
      ) : (
        <span className="pagination__item pagination__item_text pagination__item_disabled">
          Prev
        </span>
      )}
      {pages}
      {props.numPage > props.countPages - cntDisplayedPages ? (
        <>
          <span className="pagination__item pagination__item_text pagination__item_disabled">
            Next
          </span>
          <span className="pagination__item pagination__item_text pagination__item_disabled">
            Last
          </span>
        </>
      ) : (
        <>
          <span
            className="pagination__item pagination__item_text"
            onClick={surfOnPages.next}
          >
            Next
          </span>
          <span
            className="pagination__item pagination__item_text"
            onClick={surfOnPages.lastPage}
          >
            Last
          </span>
        </>
      )}
    </div>
  );
};

export default Pagination;
