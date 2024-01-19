import axios from "axios";
import { getUser } from "../Util/UserTestAPI";

jest.mock("axios");

describe("fetch users", () => {
  describe("test fetch user successful", () => {
    it("Should return a user item", async () => {
      const mockFakeTodoItem = {
        userId: 1,
        fullName: "shubham",
        username: "shubham02",
        email: "shubham@gmail.com",
        password: "Abcd@1",
        confirmPassword: "Abcd@1",
      };

      axios.get.mockResolvedValueOnce(mockFakeTodoItem);
      const result = await getUser();

      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/user/viewAll"
      );
      expect(result).toEqual(mockFakeTodoItem);
    });
  });
});