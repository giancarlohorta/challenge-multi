import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const mock = new MockAdapter(axios, { delayResponse: 0 });

const mockRequest = (httpStatusUser, httpStatusPost) => {
  mock
    .onGet(/users/g)
    .reply(httpStatusUser, [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ])
    .onGet(/posts/g)
    .reply(httpStatusPost, [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    ]);
};
test("render first name on user and first post", async () => {
  mockRequest(200, 200);
  render(<App />);
  const name = await screen.findByText("Leanne Graham");
  expect(name).toBeInTheDocument();
  const title = await screen.findByText(
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
  );
  expect(title).toBeInTheDocument();
});
test("render address one line", async () => {
  mockRequest(200, 200);
  render(<App />);
  const address = await screen.findByText(
    "Kulas Light, Apt. 556 - 92998-3874 Gwenborough"
  );
  expect(address).toBeInTheDocument();
});
test("render name company", async () => {
  mockRequest(200, 200);
  render(<App />);
  const company = await screen.findByText("Romaguera-Crona");
  expect(company).toBeInTheDocument();
});
