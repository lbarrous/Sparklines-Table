import Store from "../store/Index";
import Component from "./Component";

describe("Component testing", () => {
  const component = new Component({ store: Store });
  it("should be defined and should subscribe to PublisherSubscriber", () => {
    expect(component).toBeDefined();
  });
});
