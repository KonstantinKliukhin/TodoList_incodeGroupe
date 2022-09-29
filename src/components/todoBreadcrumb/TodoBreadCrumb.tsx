import { GithubURL } from "../../common/types/githubURL";
import { useAppSelector } from "../../redux/hooks";
import { IRepo } from "./../../common/types/repository";
import repoSelector from "./../../redux/selectors/repoSelector";
import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";

const TodoBreadCrumb: FC = () => {
  const repo = useAppSelector<IRepo | null>(repoSelector);

  if (!repo?.owner || !repo.repoName) {
    return null;
  }

  const { owner, repoName } = repo;

  return (
    <Breadcrumb className="mt-3 fs-3 w-100">
      <Breadcrumb.Item target="_blank" href={`${GithubURL.BASEURL}/${owner}`}>
        {owner}
      </Breadcrumb.Item>
      <Breadcrumb.Item
        target="_blank"
        href={`${GithubURL.BASEURL}/${owner}/${repoName}`}
      >
        {repoName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TodoBreadCrumb;
