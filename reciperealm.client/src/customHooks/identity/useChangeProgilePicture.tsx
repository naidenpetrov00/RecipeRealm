import { useMutation } from "@apollo/client";

import { onErrorHandler } from "../helpers";
import {
  ChangePictureDocument,
  ChangeProfilePicturePayload,
} from "../../generted/graphql";

interface UseChangeProfilePictureResult {
  changePicture: (email: string, base64Image: string) => Promise<void>;
}
export const useChangeProfilePicture = (): UseChangeProfilePictureResult => {
  const [changePictureMutaion] = useMutation(ChangePictureDocument);

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
  };

  return { changePicture };
};
