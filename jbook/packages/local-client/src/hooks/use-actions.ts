import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return React.useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
