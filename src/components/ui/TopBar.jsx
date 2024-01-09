import { useState, useEffect } from "react";
import { AlignJustify, Search, ListFilter } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="fixed z-50 top-0 w-full bg-light-1 px-4 h-14 shadow dark:bg-dark-2 dark:shadow-none">
      <div className="h-full w-full flex justify-between items-center">
        <div className="flex-1">
          <button type="button">
            <AlignJustify />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="">All Notes</h2>
        </div>
        <div className="flex gap-4">
          <button type="button">
            <ListFilter />
          </button>
          <button type="button">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};
