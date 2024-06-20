import React from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { AddCell } from "../add-cell/add-cell";
import { CellListItem } from "../cell-list-item/cell-list-item";
import "./cell-list.css";

interface CellListProps {}

export const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells } = useActions();

  React.useEffect(() => {
    fetchCells();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};
