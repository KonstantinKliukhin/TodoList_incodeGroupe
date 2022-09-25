import { IUser } from "../../../common/types/user";
import { IGithubUser } from "../common/types/entyties/githubUser";

export default function normalizeUser(user: IGithubUser): IUser {
  return {
    id: user.id,
    name: user.login,
  };
}
