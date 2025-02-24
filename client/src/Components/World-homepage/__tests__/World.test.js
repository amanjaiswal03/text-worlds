import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { getWorldQuery } from "../../../queries/queries";

import World from "../World";

describe("World detail page", () => {
  it("should render world detail page without crashing", async () => {
    const worldDetailMock = [
      {
        request: {
          query: getWorldQuery,
        },
        result: {
          data: {
            world: {
              _id: "1",
              name: "Test",
              description: "Testing",
              user: {
                name: "testUser",
                __typename: "User",
              },
              posts: [
                {
                  _id: "1",
                  title: "test",
                  text: "testing",
                  type: "Post",
                  character: {
                    name: "King",
                  },
                  dateCreated: "Nov 22, 2019 2:47 PM",
                  likes: 0,
                  deletes: 0,
                  likesCharsId: [],
                  deletesCharsId: [],
                },
              ],
              characters: [
                {
                  _id: "1",
                  dateCreated: "Nov 22 2019",
                  name: "Paul",
                  userId: "1",
                  story: "I am a test",
                  posts: [],
                },
              ],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={worldDetailMock} addTypename={false}>
        <World />
      </MockedProvider>
    );

    const worldDetailElement = await screen.findByTestId("world-item-1");

    expect(worldDetailElement).toBeInTheDocument();
  });
});
