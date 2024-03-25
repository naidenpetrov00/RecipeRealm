import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const onErrorHandler = ({ networkError }: { networkError: any }) => {
  for (const item of networkError!.result.errors) {
    alert(`${item.extensions.code}: \n${item.message}`);
  }
};
