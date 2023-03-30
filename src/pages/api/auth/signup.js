import User from "../dbModels/user";
import dbConnection from "../utils/dbConnection";
import handler from "../utils/handler";

handler.post(createUser);

async function createUser(req, res) {
  dbConnection();

  const user = await User.create(req.body);
  res.status(201).json({ message: "Created user!" });
}

export default handler;
