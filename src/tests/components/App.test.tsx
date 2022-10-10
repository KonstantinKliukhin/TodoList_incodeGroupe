import App from "../../components/app/App";
import renderWithProviders from "../helpers/renderWithProviders";

test("renders base App layout", () => {
  const { getByTestId } = renderWithProviders(<App />);

  const appContainer = getByTestId("app-container");

  expect(appContainer).toBeInTheDocument();
});
