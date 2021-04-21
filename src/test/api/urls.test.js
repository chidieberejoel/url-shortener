import { gql } from "apollo-server-express";

import client from "../base";
import UrlDb from "../../dbs/UrlDB";
import Context from "../context";
import char from "../../utils/getChar";
import config from "../../config/index";

let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => context.close());

it("create a short url", async () => {
  const startingCount = await UrlDb.count();

  const mutation = gql`
    mutation {
      shortenURL(url: "www.backdrop.photo") {
        data
      }
    }
  `;

  const response = await client.client.mutate({ mutation });
  const exists = await UrlDb.findByUrl(char.value);
  expect(response.data).toEqual({ shortenURL: { data: `${config.hostUrl}/${char.value}` } });
  expect(exists.url).toBe("www.backdrop.photo");

  const finishCount = await UrlDb.count();
  expect(finishCount - startingCount).toEqual(1);
});
