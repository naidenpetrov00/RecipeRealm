import { useMutation } from "@apollo/client";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { onErrorHandler, useAppDispatch } from "../helpers";
import { ChangePictureDocument } from "../../generted/graphql";
import { changePictureState } from "../../store/profPictureSlice";
import { IUserLoginValuesWithPicture } from "../../abstractions/identity";
import { useReactAuthKitContext } from "react-auth-kit/AuthContext";

interface UseChangeProfilePictureResult {
  changePicture: (email: string, base64Image: string) => Promise<void>;
}
export const useChangeProfilePicture = (): UseChangeProfilePictureResult => {
  const [changePictureMutaion] = useMutation(ChangePictureDocument);
  const dispatch = useAppDispatch();
  const user = useAuthUser<IUserLoginValuesWithPicture>();
  const op = useReactAuthKitContext();

  const changePicture = async (email: string, base64Image: string) => {
    const result = await changePictureMutaion({
      variables: { userInput: { email, base64Image } },
      onError: onErrorHandler,
    });

    if (result.data?.changePicture.errors) {
      for (const error of result.data?.changePicture.errors) {
        alert(`${error.code}\n${error.description}`);
      }
    }
    op.set({ userState: { ...user, profilePicture: base64Image } });
    if (user) {
      user.profilePicture = base64Image;
    }
    console.log(user);

    dispatch(changePictureState(base64Image));
  };

  return { changePicture };
};
