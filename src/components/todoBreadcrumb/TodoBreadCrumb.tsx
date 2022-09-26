import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { GithubURL } from "../../common/types/githubURL";
import { useAppSelector } from "../../redux/hooks";

const TodoBreadCrumb: FC = () => {
  const owner = useAppSelector((state) => state.currentRepo.owner);
  const repo = useAppSelector((state) => state.currentRepo.repo);

  if (!owner || !repo) {
    return null;
  }

  return (
    <Breadcrumb className="mt-3 fs-3 w-100">
      <Breadcrumb.Item target="_blank" href={`${GithubURL.BASEURL}/${owner}`}>
        {owner}
      </Breadcrumb.Item>
      <Breadcrumb.Item
        target="_blank"
        href={`${GithubURL.BASEURL}/${owner}/${repo}`}
      >
        {repo}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TodoBreadCrumb;
