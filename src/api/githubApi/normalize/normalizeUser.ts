import { IGithubUser } from '../common/types/entyties/githubUser';

export default function normalizeUser(user: IGithubUser) {
  return {
    id: user.id,
    name: user.login,
  };
}
