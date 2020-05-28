import api, { createTask, getTasks } from "../services/api";

describe("getTasks Testing", () => {
  it("Should return data on succesfull call", async () => {
    const data = ["wtf"];

    api.get = jest.fn().mockResolvedValue({ data });

    const response = await getTasks();

    expect(response).toEqual(data);
  });

  it("Should return an empty array if any error ocurr", async () => {
    const data = ["wtf"];

    api.get = jest.fn().mockRejectedValue({ data });

    window.alert = jest.fn();

    const response = await getTasks();

    expect(response).toEqual([]);
  });
});

describe("createTask Testing", () => {
  const text = "text legal";
  const day = "Sunday";

  const data = {
    id: "uuid",
    text,
    day,
  };

  it("Should return data on succesfull call", async () => {
    api.post = jest.fn().mockResolvedValue({ data });

    const response = await createTask(data);

    expect(response).toEqual(data);
  });

  it("Should return an empty array if any error ocurr", async () => {
    api.post = jest.fn().mockRejectedValue({ data });

    window.alert = jest.fn();

    const response = await createTask(data);

    expect(response).toEqual({ id: "error", text, day });
  });
});
